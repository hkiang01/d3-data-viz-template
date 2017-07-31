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
                {/*<header id="header">*/}
                    {/*<nav id="nav">*/}
                        {/*<ul>*/}
                            {/*<li><a href="/">Home</a></li>*/}
                        {/*</ul>*/}
                    {/*</nav>*/}
                {/*</header>*/}

                {/*<!-- Main -->*/}
                <section id="main" className="container">
                    <header>
                        <h3>Chicago Neighborhoods - Homicides and Unemployment</h3>
                        <p>
                            By Harrison Kiang
                            <br/>
                            CS 498 - Data Visualization
                        </p>
                    </header>
                    <div className="box">
                        <span className="image featured"><img src={pic01} />
                            <p>Image Credit: <a href="https://www.flickr.com/photos/galverson2/4064715098/in/photolist-7cbJbN-KkcRZb-JRSU1M-HcC3tf-EdJ4aG-TPEpAz-GYTgSC-KFEdSp-zLzyR6-KnGv4x-JL1F9p-V1duJk-wcWun6-RSquMK-L4gttx-ov1VKW-xYdtNW-TQpAvA-yPghFr-buJ6E4-TNCDuX-LWp8Bs-TUuRP6-t7uuRd-V9Md9c-yfTTX1-K64J1g-8xNdht-WJrXFG-4TuGub-62vAsR-dwEJkj-8CHYdj-6rhXat-KjTx4W-dNNiK9-yuy48i-9hTbK-6VEGHG-FtbSg-nacnXZ-bo6D68-d5uuCy-gd82aA-TY9JYu-4Tqodn-4RN2at-QvutNg-TfbSBE-WmCXah">(flickr user Matt B)</a>
                                <br />
                                License: <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/">Attribution-NonCommercial-NoDerivs 2.0 Generic (CC BY-NC-ND 2.0)</a>
                            </p>
                        </span>

                        <h3>Premise</h3>
                        <p>Chicago has for a long time suffered from a history of violence, especially in its southern and western neighborhoods. President Donald Trump even “describes our beloved city as a ‘war zone,’” according to a <a href="http://www.chicagotribune.com/news/opinion/commentary/ct-chicago-south-side-crime-unemployment-perspec-0131-md-20170130-story.html">report</a> by the Chicago Tribune. “In the first 29 days of January, there were 295 shooting victims and 50 homicides in Chicago, up 5.5 percent from this time last year”.</p>
                        <p>Another issue plaguing the city is its declining labor force. According to a recent <a href="http://www.chicagotribune.com/business/ct-chicago-metro-unemployment-may-0623-biz-20170622-story.html">report</a>, also by the Chicago Tribune, “Chicago metro area’s labor force - which includes everyone working or looking for work - shrank by about 70,000.”</p>
                        <p>One’s intuition may lead them to believe that these two issues are related. The purpose of this visualization is to evaluate whether there is in fact a relationship between unemployment and homicides in various Chicago neighborhoods.</p>

                        <br/>

                        <h3>Data</h3>
                        <p>The City of Chicago has made public, through data.com, select public health indicators by Chicago community area. The data sources below were used:</p>
                        <ul>
                            <li><a href="https://data.cityofchicago.org/Facilities-Geographic-Boundaries/Boundaries-Community-Areas-current-/cauq-8yn6/data">Chicago Community Area Boundaries (kml)</a></li>
                            <li><a href="https://catalog.data.gov/dataset/public-health-statistics-selected-public-health-indicators-by-chicago-community-area-f2a90">Select public health indicators (csv)</a></li>
                        </ul>
                        <p>Chicago Community Area boundaries comes in kml format and was transferred into geojson, a popular format for encoding a variety of geographic data structures. The public health indicators examined were Assault (Homicide) and Unemployment. Homicides per 100l residents between 2005-2009 were examined, as well as unemployment for residents 16 years or older between 2007-2011.</p>

                        <br/>

                        <h3>Hybrid Structure: Martini Glass and Drill Down Story</h3>
                        <p>The premise, data, and other description sections supply the author-controlled content, in which the context of the problem and information on each of the visualizations. The relationship between each of the visualizations and the interactions that implement them are also described. See “Visualizations and Scenes”.</p>
                        <p>Drilling down to obtain data about each community is possible by exercising the interactions that exist between each of the scenes in the visualization. See “Annotations and Triggers: Tooltips, mouse-over and click events”.</p>

                        <br/>

                        <h3>Visualizations and Scenes</h3>
                        <p>Three interactive visualizations are provided below, all built using d3.js. The color schemes for each of the three visualizations are the same, allowing the user to associate color with the data points that they are interested, making it possible for the user to visually compare data points, providing another dimension of information rather than just a data record in a csv file.</p>
                        <p>The map provides information in a context familiar to the author, as the viewer would most probably know the general layout of Chicago from looking at a map. This is the first scene that the user would be presented with.</p>
                        <p>A scatter plot populates the second scene, allowing the user to see the relationship between unemployment and homicides in various Chicago neighborhoods. The relationship itself is made more explicit by the trend line, calculated by a simple linear regression operation.</p>
                        <p>Each community is also represented in the bar chart that lies under the map and scatter plot, allowing the user to drill down into the details of the selected metric for each community, whether it is unemployment or homicides.</p>

                        <br/>

                        <h3>Parameters: Radio Buttons</h3>
                        <p>The main parameter in the visualization is the radio button that allows the user to switch between two metrics: “Homicides per 100k” and “Unemployment %”. When the user switches their selection from one metric to another, the visualizations and scenes rerender to provide information about the selected metric for each neighborhood. </p>

                        <br/>

                        <h3>Annotations and Triggers: Tooltips, mouse-over and click events</h3>
                        <p>When the user mouses over each neighborhood in the map, each dot in the plot, or each bar in the bar chart, a tooltip appears detailing the information about the selected metric for the respective neighborhood.</p>
                        <p>For example, if the metric is “Unemployment”, and the users mouses over the “Loop” neighborhood, a tooltip with the text “Loop 0.7” will appear, indicating that the “Loop” neighborhood has an unemployment rate of 0.7 percent.</p>
                        <p>If the user were to click on a specific neighborhood, a dot in the plot with an x coordinate of 0.7 will have its radius enlarged, attracting the user’s attention to that dot. Similarly, a bar in the bar chart will be colored in with gray, a color that contrasts easily from the green-red color scheme that the surrounding bars follow.</p>
                        <p>Clicking on a dot in the plot or a bar in the bar chart will yield similar results. Note that there also exists text containing data associated with the selected neighborhood and the selected metric.</p>
                        <div id="root" className='App'>
                            <div>
                                <VizParent height={1000} width={1000} />
                            </div>
                        </div>

                        <h3>Conclusion</h3>
                        <p>Looking at the data itself in the context of a scatter plot, where the x axis represents unemployment and the y axis represents homicides, there exists a relationship between unemployment and homicides. Note that the slope of the line of best fit corresponds to a positive correlation.</p>
                        <p>The formula for the linear regression is as follows:
                            <ul>
                                <li>Assault (Homicide) = 1.91903 * Unemployment - 7.46172</li>
                                <li>R-Squared: 0.663956</li>
                                <li>P-value: Less than 0.0001</li>
                            </ul>
                        </p>
                        <p>Although a middle R-squared value indicates the lack of explanation for a lot of the variation, such a low p value further validates the trend, as it indicates the correlation is statistically relevant. In other words, given the unemployment rate of a Chicago neighborhood, you can accurately predict its homicide rate.</p>
                        <p>The corresponding Tableau visualization exists <a href="https://public.tableau.com/profile/harrison.kiang#!/vizhome/HomocidesandUnemployementinChicagoNeighborhoods/Dashboard">here</a></p>
                        <p>You can examine the source code <a href="https://github.com/hkiang01/d3-data-viz-template">here</a></p>
                        {/*<p>Cep risus aliquam gravida cep ut lacus amet. Adipiscing faucibus nunc placerat. Tempus adipiscing turpis non blandit accumsan eget lacinia nunc integer interdum amet aliquam ut orci non col ut ut praesent. Semper amet interdum mi. Phasellus enim laoreet ac ac commodo faucibus faucibus. Curae ante vestibulum ante. Blandit. Ante accumsan nisi eu placerat gravida placerat adipiscing in risus fusce vitae ac mi accumsan nunc in accumsan tempor blandit aliquet aliquet lobortis. Ultricies blandit lobortis praesent turpis. Adipiscing accumsan adipiscing adipiscing ac lacinia cep. Orci blandit a iaculis adipiscing ac. Vivamus ornare laoreet odio vis praesent nunc lorem mi. Erat. Tempus sem faucibus ac id. Vis in blandit. Nascetur ultricies blandit ac. Arcu aliquam. Accumsan mi eget adipiscing nulla. Non vestibulum ac interdum condimentum semper commodo massa arcu.</p>*/}
                        {/*<div className="row">*/}
                            {/*<div className="6u 12u(mobilep)">*/}
                                {/*<h3>And now a subheading</h3>*/}
                                {/*<p>Adipiscing faucibus nunc placerat. Tempus adipiscing turpis non blandit accumsan eget lacinia nunc integer interdum amet aliquam ut orci non col ut ut praesent. Semper amet interdum mi. Phasellus enim laoreet ac ac commodo faucibus faucibus. Curae lorem ipsum adipiscing ac. Vivamus ornare laoreet odio vis praesent.</p>*/}
                            {/*</div>*/}
                            {/*<div className="6u 12u(mobilep)">*/}
                                {/*<h3>And another subheading</h3>*/}
                                {/*<p>Adipiscing faucibus nunc placerat. Tempus adipiscing turpis non blandit accumsan eget lacinia nunc integer interdum amet aliquam ut orci non col ut ut praesent. Semper amet interdum mi. Phasellus enim laoreet ac ac commodo faucibus faucibus. Curae lorem ipsum adipiscing ac. Vivamus ornare laoreet odio vis praesent.</p>*/}
                            {/*</div>*/}
                        {/*</div>*/}
                    </div>
                </section>
                <footer id="footer">
                    <ul className="copyright">
                        <li>Design: <a href="http://html5up.net/alpha">HTML5 UP</a></li>
                    </ul>
                </footer>

            </div>
        );
    }
}

export default App;
