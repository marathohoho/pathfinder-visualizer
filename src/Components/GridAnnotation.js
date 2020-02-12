import React from "react";
import "../PathfinderVisualizer/Vertex/Vertex.scss";

function GridAnnotation(algorithm) {
  const start_overlay = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="27px"
      height="27px"
      viewBox="0 0 54 54"
      style={{ transform: "rotate(0deg)" }}
    >
      <path
        fillRule="evenodd"
        fill="#12375a"
        d="M24.996,49.999 C11.214,49.999 0.002,38.785 0.002,25.001 C0.002,11.216 11.214,0.001 24.996,0.001 C38.782,0.001 49.998,11.216 49.998,25.001 C49.998,38.785 38.782,49.999 24.996,49.999 ZM24.996,2.294 C12.479,2.294 2.296,12.480 2.296,25.001 C2.296,37.521 12.479,47.706 24.996,47.706 C37.517,47.706 47.704,37.521 47.704,25.001 C47.704,12.480 37.517,2.294 24.996,2.294 ZM14.887,41.362 L24.672,24.911 L14.887,8.971 L42.940,25.164 L14.887,41.362 Z"
      />
    </svg>
  );
  const finish_overlay = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="27px"
      height="27px"
      viewBox="0 0 54 54"
    >
      <path
        fillRule="evenodd"
        fill="#12375a"
        d="M25.000,0.001 L33.239,15.714 L49.997,19.099 L38.332,32.195 L40.449,49.999 L25.000,42.379 L9.551,49.999 L11.668,32.195 L0.003,19.099 L16.761,15.714 L25.000,0.001 "
      />
    </svg>
  );

  const weighted = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="27px"
      height="27px"
      viewBox="0 0 54 54"
    >
      <path
        fillRule="evenodd"
        fill="#ff8266"
        d="M40.132,30.614 C45.420,30.815 49.996,29.042 49.996,29.042 C49.996,29.042 46.134,25.612 41.044,24.102 C45.965,22.156 49.440,18.691 49.440,18.691 C49.440,18.691 44.524,17.107 39.256,17.774 C42.977,14.011 44.762,9.440 44.762,9.440 C44.762,9.440 39.245,10.010 34.578,13.008 C36.575,7.844 36.231,2.590 36.231,2.590 C36.231,2.590 31.185,5.619 28.259,10.567 C27.890,4.833 25.100,-0.002 25.100,-0.002 C25.100,-0.002 22.302,4.339 21.587,9.600 C18.912,5.035 14.956,2.131 14.956,2.131 C14.956,2.131 14.143,7.231 15.607,12.335 C11.319,9.233 6.530,8.168 6.530,8.168 C6.530,8.168 7.839,13.164 11.234,17.246 C6.061,16.133 1.247,17.087 1.247,17.087 C1.247,17.087 4.457,21.133 9.209,23.502 C4.025,24.567 0.004,27.379 0.004,27.379 C0.004,27.379 4.572,29.789 9.875,30.044 C5.559,33.106 3.009,37.299 3.009,37.299 C3.009,37.299 8.162,37.666 13.119,35.765 C10.401,40.305 9.756,45.170 9.756,45.170 C9.756,45.170 14.620,43.431 18.391,39.694 C17.732,44.945 19.101,49.657 19.101,49.657 C19.101,49.657 22.852,46.107 24.799,41.168 C26.310,46.240 29.461,50.002 29.461,50.002 C29.461,50.002 31.465,45.242 31.259,39.937 C34.685,43.970 39.083,46.146 39.083,46.146 C39.083,46.146 39.001,40.981 36.675,36.208 C41.435,38.521 46.337,38.741 46.337,38.741 C46.337,38.741 44.183,34.047 40.132,30.614 Z"
      />
    </svg>
  );
  const extraClassName =
    algorithm.algorithm === "dijkstra" ? "" : "box-weighted-fadeout";
  return (
    <div className="grid-annotations">
      <div className="group">
        <div className="box box-start">{start_overlay}</div>
        <h1>Start</h1>
      </div>
      <div className="group">
        <div className="box box-finish">{finish_overlay}</div>
        <h1>Finish</h1>
      </div>
      <div className="group">
        <div className="box box-wall"></div>
        <h1>Wall</h1>
      </div>
      <div className="group">
        <div className="box box-visited"></div>
        <h1>Visited</h1>
      </div>
      <div className="group">
        <div className={`box box-weighted ${extraClassName}`}>{weighted}</div>
        <h1>Weighted Node</h1>
      </div>
    </div>
  );
}

export default GridAnnotation;
