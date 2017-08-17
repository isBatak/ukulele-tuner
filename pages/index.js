import React, { Component } from 'react';
import tuner from '../core/tuner';
import { Meter } from '../components';

@tuner
class Index extends Component {
  render() {
    return (
      <div>
        <Meter cents={ this.props.note.cents }/>
        <p>{ this.props.note.frequency.toFixed(1) }</p>
        <p>{ this.props.note.name }</p>
        <style global jsx>{`
          body {
            color: #FFFFFF;
            background: #464646;
            font-family: Arial, Helvetica, sans-serif;
          }
        `}</style>
      </div>
    );
  }
}

export default Index;