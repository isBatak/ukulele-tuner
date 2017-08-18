import React from 'react';
import { scaleRange } from '../../utils/scale';

const componentName = ({cents}) => {
  const rotation = scaleRange(cents, [-50, 50], [-45, 45]);

  const pointerStyle = {
    transform: `rotate(${rotation}deg)`,
  }

  return (
    <div className="meter">
      <div className="origin"/>
      <div className="pointer scale strong" style={pointerStyle} />
      <div className="scale scale-5 strong"/>
      <div className="scale scale-4"/>
      <div className="scale scale-3"/>
      <div className="scale scale-2"/>
      <div className="scale scale-1"/>
      <div className="scale strong"/>
      <div className="scale scale1"/>
      <div className="scale scale2"/>
      <div className="scale scale3"/>
      <div className="scale scale4"/>
      <div className="scale scale5 strong"/>
      <style jsx>{`
        .meter {
          height: 200px;
          margin-bottom: 40px;
          position: relative;
          margin-left: 50%;
        }
        .origin {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          width: 10px;
          height: 10px;
          border-radius: 10px;
          background-color: #FFFFFF;
        }
        .scale {
          position: absolute;
          left: 0;
          right: 0;
          width: 1px;
          height: 100%;
          box-sizing: border-box;
          border-top-width: 10px;
          border-top-color: #FFFFFF;
          margin-left: 4.5px;
          border-top-style: solid;
          transform-origin: center bottom 0px;
        }
        .strong {
          width: 2px;
          border-top-width: 20px;
        }
        .pointer {
          border-top-width: 195px;
          transition: transform 0.5s ease-in-out;
        }
        .scale-1 {
          transform: rotate(-9deg);
        }
        .scale-2 {
          transform: rotate(-18deg);
        }
        .scale-3 {
          transform: rotate(-27deg);
        }
        .scale-4 {
          transform: rotate(-36deg);
        }
        .scale-5 {
          transform: rotate(-45deg);
        }
        .scale1 {
          transform: rotate(9deg);
        }
        .scale2 {
          transform: rotate(18deg);
        }
        .scale3 {
          transform: rotate(27deg);
        }
        .scale4 {
          transform: rotate(36deg);
        }
        .scale5 {
          transform: rotate(45deg);
        }
      `}</style>
    </div>
  );
};

export default componentName;