import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import data from '../resources/data.csv';

class ChicagoNeighborhoodBarChart extends Component {
    constructor(props) {
        super(props);
        const metric = this.props.metric;
        this.processedData = this.ingestNeighborhoodData(data);

        this.mapColorDomains = {
            'homicide': [1,70],
            'unemployment': [0.5,28]
        };

        this.mapColorRanges = {
            'homicide': ['#ffe700', '#ff002e'],
            'unemployment': ['#00ff11', '#ff0000']
        };
    }

    ingestNeighborhoodData(data) {
        const metric = this.props.metric;
        return data.reduce(function(acc, elem) {
            if(elem) {
                acc.push({
                    'community': elem['Community Area Name'],
                    'homicide': Number(elem['Assault (Homicide)']),
                    'unemployment': Number(elem['Unemployment'])
                });
            }
            return acc;
        }, []).sort(function(a, b) {
            if(metric === 'unemployment') {
                return Number(a.unemployment) - Number(b.unemployment);
            } else {
                return Number(a.homicide) - Number(b.homicide);
            }
        });
    }

    componentDidMount() {
        d3.select('#chicago-neighborhood-barchart').selectAll('*').remove();
        this.createBarChart();
    }

    componentDidUpdate() {
        d3.select('#chicago-neighborhood-barchart').selectAll('*').remove();
        this.processedData = this.ingestNeighborhoodData(data);
        this.createBarChart();
        this.highlightCommunity();
    }

    highlightCommunity() {
        const targetCommunity = this.props.selectedNeighborhood;
        const select = d3.selectAll('.bar');
        const targetPath = select.filter(function(d) {
            return d.community === targetCommunity;
        });
        targetPath.style('fill', 'grey');
    }

    dataFn() {
        const metric = this.props.metric;
        return function(d) {
            return d[metric];
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
            const result = color(dataFn(arg));
            return result;
        }
    }

    createBarChart() {
        let metric = this.props.metric;

        const barchartComponent = this;
        const fillFn = this.fillFn();

        const margin = {top: 5, right: 5, bottom: 50, left: 165};
        // here, we want the full chart to be 700x200, so we determine
        // the width and height by subtracting the margins from those values
        const fullWidth = this.props.width;
        const fullHeight = this.props.height;
        // the width and height values will be used in the ranges of our scales
        const width = fullWidth - margin.right - margin.left;
        const height = fullHeight - margin.top - margin.bottom;

        let svg = d3.select('#chicago-neighborhood-barchart').append('svg')
            .attr('width', fullWidth + margin.left + margin.right)
            .attr('height', fullHeight + margin.top + margin.bottom)
            // this g is where the bar chart will be drawn
            .append('g')
            // translate it to leave room for the left and top margins
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        const processedData = this.processedData;

        let x = d3.scaleLinear()
            .range([0, fullWidth * 0.9])
            .domain([0, d3.max(processedData, function(d) {
                return d[metric];
            })]);

        let y = d3.scaleBand()
            .rangeRound([height, 0]).padding(0.1)
            .domain(processedData.map(function(d) {
                return d.community;
            }));

        let yAxis = d3.axisLeft(y)
            .tickSize(0);

        let gy = svg.append('g')
            .attr('class', 'y axis')
            .call(yAxis);

        let bars = svg.selectAll('.bar')
            .data(processedData)
            .enter()
            .append('g');

        bars.append('rect')
            .style('fill', fillFn)
            .attr('class', 'bar')
            .attr('y', function(d) {
                return y(d.community);
            })
            .attr('height', y.bandwidth)
            .attr('x', 0)
            .attr('width', function(d) {
                return x(d[metric]);
            })
            .on('mouseover',
                function(d){
                    d3.select(this).style('opacity', 0.25);
                }
            )
            .on('mouseout',
                function(d) {
                    d3.select(this).style('opacity', 1);
                }
            )
            .on('click', function(d) {
                if(barchartComponent.props.selectedNeighborhood !== d.community
                    || barchartComponent.props.selectedNeighborhoodValue !== barchartComponent.dataFn()(d) ) {
                    barchartComponent.props.neighborhoodHandler({
                        selectedNeighborhood: d.community,
                        selectedNeighborhoodValue: d[metric]
                    });
            }
            });

        bars.append('text')
            .attr('class', 'label')
            .attr('y', function(d) {
                return y(d.community) + y.bandwidth() / 2 + 4;
            })
            .attr('x', function(d) {
                return x(d[metric]) + 3;
            })
            .text(function(d) {
                return d[metric];
            })
    }

    render() {
        const centerStyle = {
            textAlign: 'center'
        };

        return <div>
            <div style={centerStyle}>
                {this.props.label}
            </div>
            <div id='chicago-neighborhood-barchart' ></div>
        </div>
    }
}

ChicagoNeighborhoodBarChart.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    metric: PropTypes.oneOf(['homicide', 'unemployment']).isRequired
};

ChicagoNeighborhoodBarChart.defaultProps = {
    height: 200,
    width: 700
};

export default ChicagoNeighborhoodBarChart;