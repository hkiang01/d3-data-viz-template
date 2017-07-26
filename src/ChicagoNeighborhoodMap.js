import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import * as d3geo from 'd3-geo';
import communityAreaBoundaries from '../resources/boundaries-community-areas-current.json';
import data from '../resources/data.csv';
import '../node_modules/tether/dist/js/tether.min.js';
import '../node_modules/bootstrap/scss/bootstrap.scss';
import './app.css';

class ChicagoNeighborhoodMap extends Component {
    constructor(props) {
        super(props);

        // ingest chicago data
        this.ingestedData = (new Array(data)[0]).reduce(function(acc, elem) {
            const key = elem['Community Area Name'].toLowerCase();
            if(elem && key.length) {
                acc[key] = {
                    'Community Area Namee': elem['Community Area Name'],
                    'homicide': elem['Assault (Homicide)'],
                    'unemployment': elem['Unemployment']
                }
            }
            return acc;
        }, []);

        this.ingestedBoundaryFeatures = this.ingestBoundaries(communityAreaBoundaries.features);

        // map constants
        this.w = this.props.width;
        this.h = this.props.height;
        this.mapScale = Math.min(this.w/0.0055, this.h/0.0068);

        this.mapColorDomains = {
            'homicide': [1,70],
            'unemployment': [0.5,28]
        };

        this.mapColorRanges = {
            'homicide': ['#ffe700', '#ff002e'],
            'unemployment': ['#00ff11', '#ff0000']
        };
    }

    componentDidMount() {
        this.clearToolTip();
        this.createMap();
    }

    componentDidUpdate() {
        this.clearToolTip();
        const selection = d3.select('#chicago-neighborhood-map');
        selection.selectAll("*").remove();
        this.createMap();
        this.highlightCommunity();
    }

    highlightCommunity() {
        const targetCommunity = this.props.selectedNeighborhood;
        const targetPath = d3.selectAll('.chicago-neighborhood').filter(function(d) {
            return d.properties.community === targetCommunity;
        });
        targetPath.style('fill', 'grey');
    }

    componentWillReceiveProps(nextProps) {
        // if(this.props.selectedNeighborhood !== nextProps.selectedNeighborhood) {
        //     console.log('nextProps', nextProps);
        // }
    }

    clearToolTip() {
        d3.selectAll('.tooltip').style('opacity', 0);
    }

    toTitleCase(str) {
        return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    ingestBoundaries(features) {
        const thisComponent = this;
        features.map(function(feature) {
           feature.properties.community = thisComponent.toTitleCase(feature.properties.community);
           return feature;
        });
        return features;
    }

    mapProjection() {
        return d3geo.geoAlbers()
            .center([0, 41.83])
            .rotate([87.735, 0])
            .parallels([40, 45])
            .scale(this.mapScale)
            .translate([this.w / 2, this.h / 2]);
    }

    mapPath() {
        const mapProjection = this.mapProjection();
        return d3geo.geoPath(mapProjection);
    }

    nameFn() {
        // Get community area name
        return function(arg) {
            return arg && arg.properties ? arg.properties.community.toLowerCase() : null;
        }
    }

    dataFn() {
        const nameFn = this.nameFn();
        const ingestedData = this.ingestedData;
        const metric = this.props.metric;
        return function(arg) {
            const communityAreaName = nameFn(arg);
            const communityData = ingestedData[communityAreaName];
            return communityData ? communityData[metric] : null;
        }
    }

    color() {
        const metric = this.props.metric;
        const domain = this.mapColorDomains[metric];
        const range = this.mapColorRanges[metric];

        return d3.scaleLinear()
            .domain(domain)
            .range(range);
    }

    fillFn(d) {
        const dataFn = this.dataFn();
        const color = this.color();
        return function(arg) {
            return color(dataFn(arg));
        }
    }

    createMap() {
        const fillFn = this.fillFn();
        const mapPath = this.mapPath();

        const metric = this.props.metric;
        const ingestedData = this.ingestedData;

        const chicagoNeighborhoodMapComponent = this;

        const tooltip = d3.select("body")
            .append("div")
            .attr('class', 'tooltip')
            .style('text-align', 'center')
            .style('font', '15px sans-serif')
            .style('width', '180px')
            .style('pointer-events', 'none');

        function toTitleCase(str)
        {
            return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        }

        function getTooltipText(d) {
            const communityAreaName = d && d.properties ? d.properties.community.toLowerCase() : null;
            const communityAreaNameTitleCase = toTitleCase(communityAreaName);

            const communityAreaData = ingestedData[communityAreaName];
            const dataValue = communityAreaData ? communityAreaData[metric] : NaN;
            return communityAreaNameTitleCase + "\n" + dataValue;
        }

        function mouseOver(d) {
            const tooltipText = getTooltipText(d);
            return tooltip
                .style('opacity', .9)
                .text(tooltipText);
        }

        function mouseMove(d) {
            const tooltipText = getTooltipText(d);
            return tooltip.style("top", (event.pageY-28)+"px").style("left",(event.pageX)+"px")
                .text(tooltipText);
        }

        function mouseOut(d) {
            chicagoNeighborhoodMapComponent.clearToolTip();
            const tooltipText = getTooltipText(d);
            return tooltip
                .text(tooltipText);
        }

        d3.select('#chicago-neighborhood-map')
            .append('svg')
            .attr('border', 'black')
            .attr('width', this.w)
            .attr('height', this.h)
            .selectAll('path')
            .data(this.ingestedBoundaryFeatures)
            .enter()
            .append('path')
            .attr('class', 'chicago-neighborhood')
            .attr('d', mapPath)
            .attr('vector-effect', 'non-scaling-stroke')
            .style('stroke', 'white')
            .style('fill', fillFn)
            .on("mousemove",
                function(d){
                  return mouseMove(d);
                }
            ).on("mouseover",
                function(d){
                    d3.select(this).style('fill-opacity', 0.25);
                    return mouseOver(d);
                }
            )
            .on("mouseout",
                function(d){
                    d3.select(this).style('fill-opacity', 1);
                    return mouseOut(d)
                }
            ).on('click',
                function(d){
                    const communityAreaName = d && d.properties ? d.properties.community.toLowerCase() : null;
                    const communityAreaNameTitleCase = toTitleCase(communityAreaName);
                    if(chicagoNeighborhoodMapComponent.props.selectedNeighborhood !== communityAreaNameTitleCase
                    || chicagoNeighborhoodMapComponent.props.selectedNeighborhoodValue !== chicagoNeighborhoodMapComponent.dataFn()(d)) {
                        d3.selectAll('.tooltip').remove();
                        const dataValue = chicagoNeighborhoodMapComponent.dataFn()(d);
                        chicagoNeighborhoodMapComponent.props.neighborhoodHandler({
                            selectedNeighborhood: communityAreaNameTitleCase,
                            selectedNeighborhoodValue: dataValue
                        });
                    }
                }
        )
        ;
    }

    render() {
        const centerStyle = {
            textAlign: 'center'
        };

        return <div>
            <div style={centerStyle}>
                Chicago Neighborhoods
            </div>
            <div id='chicago-neighborhood-map' >
            </div>
        </div>
    }
}

ChicagoNeighborhoodMap.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    metric: PropTypes.oneOf(['homicide', 'unemployment']).isRequired
};

ChicagoNeighborhoodMap.defaultProps = {
    height: 525,
    width: 645
};

export default ChicagoNeighborhoodMap;
