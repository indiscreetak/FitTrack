import React from 'react';
import './ProgressBar.css';
import { connect } from 'react-redux';
import { Spring, config } from 'react-spring';

const progressBar = props => {
  const radius = 54;
  const steps = props.data[props.name];
  const target = props.target ? props.target : 100;

  const circumference = Math.PI * (radius + radius);
  const totalSteps = circumference * (steps / target);

  return (
    <svg class="progressBar" viewBox="0 0 120 120">
      <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#00b09b" />
        <stop offset="100%" stop-color="#96c93d" />
      </linearGradient>
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke="#D2D2D2"
        stroke-width="0.5"
      />
      <Spring
        from={{ steps: 0, stroke: 1 }}
        to={{ steps: totalSteps, stroke: 3 }}
        config={{ friction: 80 }}
      >
        {props => (
          <circle
            class="value"
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="url(#gradient)"
            stroke-width={props.stroke}
            stroke-dasharray={props.steps + ' ' + circumference}
          />
        )}
      </Spring>
      <text
        class="text"
        x="50%"
        y="-50%"
        text-anchor="middle"
        fill="black"
        font-family="sans-serif"
      >
        {props.type}
      </text>
    </svg>
  );
};

const mapStateToProps = state => ({
  data: state.data
});

export default connect(mapStateToProps)(progressBar);
