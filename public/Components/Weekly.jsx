import React, { Component } from "react";


const Weekly = props => (
  
  <div className="weekly-container" class="column">
    {/*<h3>Weekly Contributions</h3>*/}
    {/*<div id="nav-buttons">
      <button id="current">This Week</button>
      <button id="previous">&laquo; Previous</button>
    </div>*/}

    <div id="contribution" >Current Week's Contribution: ${props.contributions}</div>

  </div>
);

export default Weekly;
