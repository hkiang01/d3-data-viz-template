import "../assets/js/jquery.min.js";
import "../assets/js/jquery.dropotron.min.js";
import "../assets/js/jquery.scrollgress.min.js";
import "../assets/js/main.js";
import "../assets/css/main.css";
import pic01 from "../images/pic01.jpg";

import React, {Component} from 'react';
import VizParent from "../src/VizParent";

class App extends Component {
    render() {
        return (
            <div id="parent-wrapper">
                {/*<!-- Header -->*/}
                <header id="header">
                    <h1><a href="index.html">Alpha</a> by HTML5 UP</h1>
                    <nav id="nav">
                        {/*<ul>*/}
                            {/*<li><a href="index.html">Home</a></li>*/}
                            {/*<li>*/}
                                {/*<a href="#" className="icon fa-angle-down">Layouts</a>*/}
                                {/*<ul>*/}
                                    {/*<li>*/}
                                        {/*<a href="#">Submenu</a>*/}
                                        {/*<ul>*/}
                                            {/*<li><a href="#">Option One</a></li>*/}
                                            {/*<li><a href="#">Option Two</a></li>*/}
                                            {/*<li><a href="#">Option Three</a></li>*/}
                                            {/*<li><a href="#">Option Four</a></li>*/}
                                        {/*</ul>*/}
                                    {/*</li>*/}
                                {/*</ul>*/}
                            {/*</li>*/}
                            {/*<li><a href="#" className="button">Sign Up</a></li>*/}
                        {/*</ul>*/}
                    </nav>
                </header>

                {/*<!-- Main -->*/}
                <section id="main" className="container">
                    <header>
                        <h2>Generic</h2>
                        <p>A generic page for every non-generic situation.</p>
                    </header>
                    <div className="box">
                        <span className="image featured"><img src={pic01} alt="" /></span>
                        <h3>This is a subheading</h3>
                        <div id="root" className='App'>

                            <div>
                                <VizParent height={1000} width={1000} />
                            </div>
                        </div>

                        <p>Cep risus aliquam gravida cep ut lacus amet. Adipiscing faucibus nunc placerat. Tempus adipiscing turpis non blandit accumsan eget lacinia nunc integer interdum amet aliquam ut orci non col ut ut praesent. Semper amet interdum mi. Phasellus enim laoreet ac ac commodo faucibus faucibus. Curae ante vestibulum ante. Blandit. Ante accumsan nisi eu placerat gravida placerat adipiscing in risus fusce vitae ac mi accumsan nunc in accumsan tempor blandit aliquet aliquet lobortis. Ultricies blandit lobortis praesent turpis. Adipiscing accumsan adipiscing adipiscing ac lacinia cep. Orci blandit a iaculis adipiscing ac. Vivamus ornare laoreet odio vis praesent nunc lorem mi. Erat. Tempus sem faucibus ac id. Vis in blandit. Nascetur ultricies blandit ac. Arcu aliquam. Accumsan mi eget adipiscing nulla. Non vestibulum ac interdum condimentum semper commodo massa arcu.</p>
                        <div className="row">
                            <div className="6u 12u(mobilep)">
                                <h3>And now a subheading</h3>
                                <p>Adipiscing faucibus nunc placerat. Tempus adipiscing turpis non blandit accumsan eget lacinia nunc integer interdum amet aliquam ut orci non col ut ut praesent. Semper amet interdum mi. Phasellus enim laoreet ac ac commodo faucibus faucibus. Curae lorem ipsum adipiscing ac. Vivamus ornare laoreet odio vis praesent.</p>
                            </div>
                            <div className="6u 12u(mobilep)">
                                <h3>And another subheading</h3>
                                <p>Adipiscing faucibus nunc placerat. Tempus adipiscing turpis non blandit accumsan eget lacinia nunc integer interdum amet aliquam ut orci non col ut ut praesent. Semper amet interdum mi. Phasellus enim laoreet ac ac commodo faucibus faucibus. Curae lorem ipsum adipiscing ac. Vivamus ornare laoreet odio vis praesent.</p>
                            </div>
                        </div>
                    </div>
                </section>
                {/*<!--&lt;!&ndash; Footer &ndash;&gt;-->*/}
                {/*<!--<footer id="footer">-->*/}
                {/*<!--<ul class="icons">-->*/}
                {/*<!--<li><a href="#" class="icon fa-twitter"><span class="label">Twitter</span></a></li>-->*/}
                {/*<!--<li><a href="#" class="icon fa-facebook"><span class="label">Facebook</span></a></li>-->*/}
                {/*<!--<li><a href="#" class="icon fa-instagram"><span class="label">Instagram</span></a></li>-->*/}
                {/*<!--<li><a href="#" class="icon fa-github"><span class="label">Github</span></a></li>-->*/}
                {/*<!--<li><a href="#" class="icon fa-dribbble"><span class="label">Dribbble</span></a></li>-->*/}
                {/*<!--<li><a href="#" class="icon fa-google-plus"><span class="label">Google+</span></a></li>-->*/}
                {/*<!--</ul>-->*/}
                {/*<!--<ul class="copyright">-->*/}
                {/*<!--<li>&copy; Untitled. All rights reserved.</li><li>Design: <a href="http://html5up.net">HTML5 UP</a></li>-->*/}
                {/*<!--</ul>-->*/}
                {/*<!--</footer>-->*/}

            </div>
        );
    }
}

export default App;
