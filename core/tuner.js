import React, { Component } from 'react';
import PitchFinder from 'pitchfinder';

export default function tuner(WrappedComponent, sampleRate = 22050, bufferSize = 2048) {
  return class extends Component {
    middleA = 440;
    semitone = 69;
    noteStrings = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

    constructor(props) {
      super(props);

      this.state = {
        note: {
          name: 'A',
          octave: 4,
          frequency: 440,
        },
      }

      this.pitchFinder = new PitchFinder.YIN({
        sampleRate
      });
    }

    componentDidMount() {
      navigator.getUserMedia = navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      if (navigator.getUserMedia) {
        console.log('getUserMedia supported.');
        navigator.getUserMedia(
          // constraints - only audio needed for this app
          {
            audio: true
          },

          // Success callback
          (stream) => {

            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.start(bufferSize);
            console.log(mediaRecorder.state);
            console.log("recorder started");

            mediaRecorder.ondataavailable = (event) => {
              console.log(event.data);
              const frequency = this.pitchFinder(event.data);
              console.log(frequency);
              if (frequency) {
                const note = this.getNote(frequency)
                this.setState({
                  note: {
                    name: this.noteStrings[note % 12],
                    value: note,
                    cents: this.getCents(frequency, note),
                    octave: parseInt(note / 12) - 1,
                    frequency: frequency,
                  }
                });
              }
            }
          },

          // Error callback
          (err) => {
            console.log('The following gUM error occured: ' + err);
          }
        );
      } else {
        console.log('getUserMedia not supported on your browser!');
      }
    }

    // start() {
    //   Recording.init(this.sampleRate, this.bufferSize)
    //   Recording.start()
    //   Recording.on('recording', data => {
    //     const frequency = this.pitchFinder(data)
    //     if (frequency && this.onNoteDetected) {
    //       const note = this.getNote(frequency)
    //       this.onNoteDetected({
    //         name: this.noteStrings[note % 12],
    //         value: note,
    //         cents: this.getCents(frequency, note),
    //         octave: parseInt(note / 12) - 1,
    //         frequency: frequency,
    //       })
    //     }
    //   })
    // }

    /**
     * get musical note from frequency
     *
     * @param {number} frequency
     * @returns {number}
     */
    getNote(frequency) {
      const note = 12 * (Math.log(frequency / this.middleA) / Math.log(2))
      return Math.round(note) + this.semitone
    }

    /**
     * get the musical note's standard frequency
     *
     * @param note
     * @returns {number}
     */
    getStandardFrequency(note) {
      return this.middleA * Math.pow(2, (note - this.semitone) / 12)
    }

    /**
     * get cents difference between given frequency and musical note's standard frequency
     *
     * @param {float} frequency
     * @param {int} note
     * @returns {int}
     */
    getCents(frequency, note) {
      return Math.floor(1200 * Math.log(frequency / this.getStandardFrequency(note)) / Math.log(2))
    }

    render() {
      return <WrappedComponent note={this.state.note} {...this.props} />;
    }
  }
}