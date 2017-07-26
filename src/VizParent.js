import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChicagoNeighborhoodMap from "./ChicagoNeighborhoodMap";
import ChicagoNeighborhoodBarChart from "./ChicagoNeighborhoodBarChart";
import HomicideUnemploymentPlot from "./HomicideUnemploymentPlot";
import Select from 'react-select';
import { RadioGroup, RadioButton } from 'react-radio-buttons';
import 'react-select/dist/react-select.css';
import '../node_modules/tether/dist/js/tether.min.js'
import '../node_modules/bootstrap/scss/bootstrap.scss';
import styles from './app.css';

class VizParent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            metric: this.props.metric,
            label: this.props.label,
            selectedNeighborhood: "Click a neighborhood, dot, or bar!",
            selectedNeighborhoodValue: null
        };
        this.metricHandler = this.metricHandler.bind(this);
        this.neighborhoodHandler = this.neighborhoodHandler.bind(this);
        this.getSelectedNeighborhood = this.getSelectedNeighborhood.bind(this);
    }

    metricHandler(e) {
        if(e === 'homicide') {
            this.setState({
                metric: 'homicide',
                label: 'Homicides per 100k'
            })
        } else if (e === 'unemployment') {
            this.setState({
                metric: 'unemployment',
                label: 'Unemployment %'
            })
        }
        return e;
    }

    getSelectedNeighborhood() {
        return this.state.selectedNeighborhood;
    }

    neighborhoodHandler(e) {
        this.setState(e);
        return e;
    }

    render() {
        // https://github.com/JedWatson/react-select
        const options = [
            {Value: 'homicide', label: 'Homicides per 100k'},
            {Value: 'unemployment', label: 'Unemployment %'}
        ];

        const centerStyle = {
          textAlign: 'center'
        };

        return <div>
            <RadioGroup onChange={this.metricHandler} horizontal>
                <RadioButton value="homicide">
                    Homicides per 100k
                </RadioButton>
                <RadioButton value="unemployment">
                    Unemployment %
                </RadioButton>
            </RadioGroup>
            <h4 style={centerStyle}> Selected Chicago Neighborhood - {this.state.selectedNeighborhood}: {this.state.selectedNeighborhoodValue} </h4>
            <div className="row" >
                    <ChicagoNeighborhoodMap className="col-md-1"
                        width={this.props.width/2}
                        height={this.props.height/2}
                        metric={this.state.metric}
                        selectedNeighborhood={this.state.selectedNeighborhood}
                        neighborhoodHandler={this.neighborhoodHandler}/>
                    <HomicideUnemploymentPlot className="col-md-1"
                                              width={this.props.width/2}
                                              height={this.props.height/2}
                                              metric={this.state.metric}
                                              selectedNeighborhood={this.state.selectedNeighborhood}
                                              neighborhoodHandler={this.neighborhoodHandler}
                    />
            </div>
            <div className="row">
                <ChicagoNeighborhoodBarChart className="col-md-1"
                                             label={this.state.label}
                                             width={this.props.width}
                                             height={this.props.height}
                                             metric={this.state.metric}
                                             selectedNeighborhood={this.state.selectedNeighborhood}
                                             neighborhoodHandler={this.neighborhoodHandler}/>
            </div>
        </div>
    }
}

VizParent.propTypes = {
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    metric: PropTypes.oneOf(['homicide', 'unemployment']).isRequired,
    label: PropTypes.oneOf(['Homicides per 100k', 'Unemployment %']).isRequired
};

VizParent.defaultProps = {
    metric: 'homicide',
    label: 'Homicides per 100k'
};

export default VizParent;
