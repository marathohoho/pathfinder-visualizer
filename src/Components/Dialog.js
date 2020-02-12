import React, { useState } from "react";
import "../App.scss";
import "../Components/navbar.scss";
import placing_img from "../static/placing.png";
import draw_wall from "../static/wall.png";
import algorithms from "../static/algorithms.png";
import weighted_node from "../static/weighted_node.png";

export const Dialog = () => {
  const [step, setStep] = useState(1);

  const intro = step => {
    if (step !== 1) {
      return null;
    }
    return (
      <div className="card-group">
        {" "}
        <h2>What is pathfinding Algorithm?</h2>
        <p>
          Pathfinding or pathing is the plotting, by a computer application, of
          the shortest route between two points. It is a more practical variant
          on solving mazes. This field of research is based heavily on
          Dijkstra's algorithm for finding the shortest path on a weighted
          graph. Pathfinding is closely related to the shortest path problem,
          within graph theory, which examines how to identify the path that best
          meets some criteria (shortest, cheapest, fastest, etc) between two
          points in a large network.
        </p>
      </div>
    );
  };
  const markEndPoints = step => {
    if (step !== 2) {
      return null;
    }
    return (
      <div className="card-group">
        <h2>Place the end points</h2>
        <img src={placing_img} alt="Placing endpoints" />
      </div>
    );
  };
  const drawWall = step => {
    if (step !== 3) {
      return null;
    }
    return (
      <div className="card-group">
        <h2>Draw a wall</h2>
        <img src={draw_wall} alt="Placing endpoints" />
      </div>
    );
  };
  const chooseAlgorithm = step => {
    if (step !== 4) {
      return null;
    }
    return (
      <div className="card-group">
        <h2>
          Choose a pathfinding algorithm and heuristic methods if applicable
        </h2>
        <img src={algorithms} alt="Placing endpoints" />
      </div>
    );
  };
  const placeWeights = step => {
    if (step !== 5) {
      return null;
    }
    return (
      <div className="card-group">
        <h2>
          In order to get full experience with Dijkstra algorithm, you need to
          place weighted nodes. Place the nodes by clicking on the grid and
          holding "Ctrl" key
        </h2>
        <img src={weighted_node} alt="Placing endpoints" />
      </div>
    );
  };

  const startVisualization = step => {
    if (step !== 6) {
      return null;
    }
    return (
      <div className="card-group">
        <h2>Start the visualization</h2>
        <p>Press start</p>
      </div>
    );
  };

  const _next = () => {
    let currentStep = step;
    currentStep = currentStep >= 7 ? 7 : currentStep + 1;
    setStep(currentStep);
  };

  const _prev = () => {
    let currentStep = step;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    setStep(currentStep);
  };

  const nextButton = () => {
    if (step < 6)
      return (
        <button className="brk-btn" onClick={() => _next()}>
          Next
        </button>
      );
    else
      return (
        <button className="brk-btn" onClick={() => closeTutorial()}>
          Close
        </button>
      );
  };
  const prevButton = () => {
    if (step !== 1)
      return (
        <button className="brk-btn" onClick={() => _prev()}>
          Previous
        </button>
      );
    else
      return (
        <button className="brk-btn disabled" disabled>
          Previous
        </button>
      );
  };
  const closeTutorial = () => {
    document.getElementById("card").style.display = "none";
    setStep(1);
  };

  const skipMe = () => {
    return (
      <button className="brk-btn" onClick={() => closeTutorial()}>
        Skip me
      </button>
    );
  };
  return (
    <div className="card" id="card">
      <div className="card-header">
        <h1> Pathfinding Algorithm Tutorial</h1>
      </div>
      <div className="card-body">
        {/* {step > 1 ? <p>Step {step}</p> : ""} */}
        {intro(step)}
        {markEndPoints(step)}
        {drawWall(step)}
        {chooseAlgorithm(step)}
        {startVisualization(step)}
        {placeWeights(step)}
        <div className="card-buttons">
          <div>
            {prevButton()}
            {nextButton()}
          </div>
          <div>{skipMe()}</div>
        </div>
      </div>
    </div>
  );
};
