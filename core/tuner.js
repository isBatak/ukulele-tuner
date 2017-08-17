import React, { Component } from 'react';
import PitchFinder from 'pitchfinder';
import getUserMedia from 'get-user-media-promise';

export default function tuner(WrappedComponent) {
  return class extends Component {
    FFTSIZE = 2048;
    middleA = 440;
    semitone = 69;
    noteStrings = ['C', 'C♯', 'D', 'D♯', 'E', 'F', 'F♯', 'G', 'G♯', 'A', 'A♯', 'B'];

    constructor(props) {
      super(props);

      this.state = {
        note: {
          name: 'A',
          octave: 4,
          frequency: this.middleA,
        },
      }

      this.dispatchAudioData = this.dispatchAudioData.bind(this);
    }

    componentDidMount() {
      this.stream = null;
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
      this.analyser = this.audioContext.createAnalyser();
      this.gainNode = this.audioContext.createGain();
      this.microphone = null;

      this.gainNode.gain.value = 0;
      this.analyser.fftSize = this.FFTSIZE;
      this.analyser.smoothingTimeConstant = 0;

      this.frequencyBufferLength = this.FFTSIZE;
      this.frequencyBuffer = new Float32Array(this.frequencyBufferLength);

      this.pitchFinder = new PitchFinder.YIN({
        sampleRate: this.audioContext.sampleRate
      });

      this.requestUserMedia();
    }

    requestUserMedia() {
      getUserMedia({
        audio: true
      }).then((stream) => {
        this.sendingAudioData = true;
        this.stream = stream;
        this.microphone = this.audioContext.createMediaStreamSource(stream);
        this.microphone.connect(this.analyser);
        this.analyser.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);

        requestAnimationFrame(this.dispatchAudioData);
      }).catch(function(err) {
        console.log(err.name + ": " + err.message);
      });
    }

    dispatchAudioData(timestamp) {
      if (this.sendingAudioData) {
        requestAnimationFrame(this.dispatchAudioData);
      }

      this.analyser.getFloatTimeDomainData(this.frequencyBuffer);

      const frequency = this.pitchFinder(this.frequencyBuffer);

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