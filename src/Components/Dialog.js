import React, { useState, Fragment } from "react";
import "../App.scss";
import "../Components/navbar.scss";

export const Dialog = () => {
  const [step, setStep] = useState(3);

  const markEndPoints = step => {
    if (step !== 1) {
      return null;
    }
    return (
      <div className="card-group">
        {" "}
        <h1>Choose Algorithm</h1>
      </div>
    );
  };
  const chooseAlgorithm = step => {
    if (step !== 2) {
      return null;
    }
    return (
      <div className="card-group">
        <h1>Choose Algorithm</h1>
      </div>
    );
  };
  const chooseHeuristics = step => {
    if (step !== 3) {
      return null;
    }
    return (
      <div className="card-group">
        <h1>Choose heuristics if applicable</h1>
      </div>
    );
  };
  const startVisualization = step => {
    if (step !== 4) {
      return null;
    }
    return (
      <div className="card-group">
        <h1>Start the visualization</h1>
      </div>
    );
  };

  const _next = () => {
    let currentStep = step;
    currentStep = currentStep >= 3 ? 4 : currentStep + 1;
    setStep(currentStep);
  };

  const _prev = () => {
    let currentStep = step;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    setStep(currentStep);
  };

  const nextButton = () => {
    if (step < 4)
      return (
        <button className="brk-btn" onClick={() => _next()}>
          Next
        </button>
      );
    else
      return (
        <button className="brk-btn disabled" disabled>
          Next
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
        <h1> ..here comes mini tutorial;</h1>
      </div>
      <div className="card-body">
        <p>Step {step}</p>
        {markEndPoints(step)}
        {chooseAlgorithm(step)}
        {chooseHeuristics(step)}
        {startVisualization(step)}
      </div>
      <div className="card-buttons">
        <div>
          {prevButton()}
          {nextButton()}
        </div>
        <div>{skipMe()}</div>
      </div>
    </div>
  );
};
