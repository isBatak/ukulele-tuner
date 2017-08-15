import React, { Component } from 'react';
import Tuner from '../core/tuner';
import Meter from '../components/meter'

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: {
        name: 'A',
        octave: 4,
        frequency: 440,
      },
    }
  }

  componentDidMount() {
    this.tuner = new Tuner();
    this.tuner.onNoteDetected = note => {
      this.setState({
        note
      });
    }
  }

  render() {
    return (
      <div>
        <Meter cents={ this.state.note.cents }/>
        <p>{ this.state.note.frequency.toFixed(1) }</p>
      </div>
    );
  }
}

export default Index;