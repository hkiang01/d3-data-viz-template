import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import data from '../resources/data.csv';

class HomicideUnemploymentPlot extends Component {

    constructor(props) {
        super(props);
        this.dataRaw = data;
        this.ingestedData = this.ingestNeighborhoodData(data);

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
        return data.reduce(function(acc, elem) {
            const key = elem['Community Area Name'].toLowerCase();
            if(elem && key.length) {
                acc[key] = {
                    'homicide': elem['Assault (Homicide)'],
                    'unemployment': elem['Unemployment']
                }
            }
            return acc;
        }, []);
    }

    componentDidMount() {
        const selection = d3.select('#plot');
        selection.selectAll("*").remove();
        this.createPlot();
    }

    componentDidUpdate() {
        const selection = d3.select('#plot');
        selection.selectAll("*").remove();
        this.createPlot();
        this.highlightDot();
    }

    highlightDot() {
        const targetCommunity = this.props.selectedNeighborhood;
        const targetDot = d3.selectAll('.dot').filter(function(d) {
            return d['Community Area Name'] === targetCommunity;
        });
        targetDot.style('r', 12);
    }

    clearToolTip() {
        d3.selectAll('.tooltip').style('opacity', 0);
    }

    create_data(dataArg) {
        let communities = [];
        let x = [];
        let y = [];
        let n = 0;
        let x_mean = 0;
        let y_mean = 0;
        let term1 = 0;
        let term2 = 0;

        for(var i = 0; i < dataArg.length; i++) {
            const community = dataArg[i]['Community Area Name']
            const unemployment = Number(dataArg[i]['Unemployment']);
            const homicide = Number(dataArg[i]['Assault (Homicide)']);
            if(community && unemployment && homicide) {
                communities.push(community);
                x.push(unemployment);
                x_mean += unemployment;
                y.push(homicide);
                y_mean += homicide;
                n++;
            }
        }

        // calculate mean x and y
        x_mean /= n;
        y_mean /= n;

        // calculate coefficients
        let xr = 0;
        let yr = 0;
        for (i = 0; i < x.length; i++) {
            xr = x[i] - x_mean;
            yr = y[i] - y_mean;
            term1 += xr * yr;
            term2 += xr * xr;

        }
        let b1 = term1 / term2;
        let b0 = y_mean - (b1 * x_mean);
        // perform regression

        let yhat = [];
        // fit line using coeffs
        for (i = 0; i < x.length; i++) {
            yhat.push(b0 + (x[i] * b1));
        }

        let data = [];
        for (i = 0; i < y.length; i++) {
            data.push({
                "Community Area Name": communities[i],
                "yhat": yhat[i],
                "y": y[i],
                "x": x[i]
            })
        }
        return (data);
    }

    dataFn() {
        const metric = this.props.metric;
        return function(d) {
            return metric === 'unemployment' ? d.x : d.y;
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

    createPlot() {
        const metric = this.props.metric;
        const homicideUnemploymentPlotComponent = this;

        const fillFn = this.fillFn();

        function dataFn(d) {
            return metric === 'unemployment' ? d.x : d.y;
        }

        function getTooltipText(d) {
            return d['Community Area Name'] + "\n" + dataFn(d);
        }

        function mouseOver(d) {
            const tooltipText = getTooltipText(d);
            return tooltip
                .style('opacity', .7)
                .text(tooltipText);
        }

        function mouseMove(d) {
            const tooltipText = getTooltipText(d);
            return tooltip.style("top", (event.pageY-28)+"px").style("left",(event.pageX)+"px")
                .text(tooltipText);
        }

        function mouseOut(d) {
            homicideUnemploymentPlotComponent.clearToolTip();
            const tooltipText = getTooltipText(d);
            return tooltip
                .text(tooltipText);
        }


        let margin = {
                top: 20,
                right: 20,
                bottom: 50,
                left: 70
            },
            padding = -60,
            width = this.props.width - margin.left - margin.right,
            height = this.props.height - margin.top - margin.bottom;

        let x = d3.scaleLinear()
            .range([0, width]);

        let y = d3.scaleLinear()
            .range([height, 0]);

        let xAxis = d3.axisBottom()
            .scale(x);

        let yAxis = d3.axisLeft()
            .scale(y);

        let svg = d3.select('#plot').append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        const data = this.create_data(this.dataRaw);

        data.forEach(function(d) {
            d.x = +d.x;
            d.y = +d.y;
            d.yhat = +d.yhat;
        });

        let line = d3.line()
            .x(function(d) {
                return x(d.x);
            })
            .y(function(d) {
                return y(d.yhat);
            });

        x.domain(d3.extent(data, function(d) {
            return d.x;
        }));
        y.domain(d3.extent(data, function(d) {
            return d.y;
        }));

        const tooltip = d3.select("body")
            .append("div")
            .attr('class', 'tooltip')
            .style('text-align', 'center')
            .style('font', '15px sans-serif')
            .style('width', '180px')
            .style('pointer-events', 'none');

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .append("text")
            .attr("class", "label")
            .attr("x", width)
            .attr("y", -6)
            .style("text-anchor", "end")
            .text("X-Value");

        svg.append('text')
            .attr('text-anchor', 'middle')
            // text is drawn off the screen top left, move down and out and rotate
            .attr("transform", "translate("+ (width/2) +","+(height-(padding/1.5))+")")  // centre below axis
            .text('Unemployment Percentage');

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", 6)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Y-Value");

        svg.append('text')
            .attr('text-anchor', 'middle')
            // text is drawn off the screen top left, move down and out and rotate
            .attr("transform", "translate("+ (padding/2) +","+(height/2)+")rotate(-90)")
            .text('Homicides per 100k');

        svg.selectAll(".dot")
            .data(data)
            .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", function(d) {
                return x(d.x);
            })
            .attr("cy", function(d) {
                return y(d.y);
            })
            .style('fill', fillFn)
            .on("mousemove",
                function(d){
                    return mouseMove(d);
                }
            ).on("mouseover",
                function(d){
                    d3.select(this).style('r', 12);
                    return mouseOver(d);
                }
            )
            .on("mouseout",
                function(d){
                    if(homicideUnemploymentPlotComponent.props.selectedNeighborhood !== d['Community Area Name']) {
                        d3.select(this).style('r', 3.5);
                    }
                    return mouseOut(d)
                }
            ).on('click',
                function(d) {
                    if(homicideUnemploymentPlotComponent.props.selectedNeighborhood !== d['Community Area Name']
                    || homicideUnemploymentPlotComponent.props.selectedNeighborhoodValue !== dataFn(d)) {
                        homicideUnemploymentPlotComponent.props.neighborhoodHandler({
                            selectedNeighborhood: d['Community Area Name'],
                            selectedNeighborhoodValue: dataFn(d)
                        });
                    }
                }
            );

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);
    }

    render() {
        const centerStyle = {
            textAlign: 'center'
        };

        return <div>
            <div style={centerStyle}>
                Homicides vs Unemployment Plot
            </div>
            <div id='plot'></div>
        </div>
    }
}

HomicideUnemploymentPlot.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    metric: PropTypes.oneOf(['homicide', 'unemployment']).isRequired
};

HomicideUnemploymentPlot.defaultProps = {
    height: 525,
    width: 645
};

export default HomicideUnemploymentPlot;
