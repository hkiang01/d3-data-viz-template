import "../assets/js/jquery.min.js";
import "../assets/js/jquery.dropotron.min.js";
import "../assets/js/jquery.scrollgress.min.js";
import "../assets/js/main.js";
import '../assets/css/main.css';

import React, {Component} from 'react';
import VizParent from "../src/VizParent";

class App extends Component {
    render() {
        return (
            <div className='App'>

                <div>
                    <VizParent height={1000} width={1000} />
                </div>
            </div>
        );
    }
}

export default App;
