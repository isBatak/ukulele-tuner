import React, { Component } from 'react';
import tuner from '../core/tuner';
import { Meter } from '../components'

@tuner
class Index extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     note: {
  //       name: 'A',
  //       octave: 4,
  //       frequency: 440,
  //     },
  //   }
  // }

  // componentDidMount() {
  //   this.tuner = new Tuner();
  //   this.tuner.onNoteDetected = note => {
  //     this.setState({
  //       note
  //     });
  //   }
  // }

  render() {
    return (
      <div>
        <Meter cents={ this.props.note.cents }/>
        <p>{ this.props.note.frequency.toFixed(1) }</p>
      </div>
    );
  }
}

export default Index;