import React, { Component } from "react";

const Weekly = () => (
  <div className="weekly-container" class="column">
    <h3>Weekly Contributions</h3>
    <div id="nav-buttons">
      <button id="previous">&laquo; Previous</button>
      <button id="current">This Month</button>
    </div>
    <div id="contribution">Current Week</div>
    <div id="contribution">Previous Week</div>
    <div id="contribution">2 Weeks Ago</div>
    <div id="contribution">3 Weeks Ago</div>
  </div>
);

export default Weekly;
