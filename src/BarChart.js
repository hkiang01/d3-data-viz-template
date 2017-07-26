import React, { Component } from 'react'
import { scaleLinear } from 'd3-scale'
import { max } from 'd3-array'
import * as d3 from 'd3'

class BarChart extends Component {
    constructor(props) {
        super(props);
        this.createBarChart = this.createBarChart.bind(this);
    }

    componentDidMount() {
        this.createBarChart();
    }

    componentDidUpdate() {
        this.createBarChart();
    }

    createBarChart() {
        const dataMax = max(this.props.data);
        const yScale = scaleLinear()
            .domain([0, dataMax])
            .range([0, this.props.size[1]]);

        var viz = d3.select('#barchart').append('svg');

        viz
            .selectAll('rect')
            .data(this.props.data)
            .enter()
            .append('rect');

        viz
            .selectAll('rect')
            .data(this.props.data)
            .exit()
            .remove();

        viz
            .selectAll('rect')
            .data(this.props.data)
            .style('fill', '#fe9922')
            .attr('x', (d,i) => i * 25)
            .attr('y', d => this.props.size[1] - yScale(d))
            .attr('height', d => yScale(d))
            .attr('width', 25);
    }

    render() {
        return <svg id='barchart'
                    width={200} height={500}>
        </svg>
    }
}

export default BarChart;
