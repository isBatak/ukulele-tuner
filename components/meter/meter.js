import React, {PureComponent} from 'react';
import * as Animated from 'animated/lib/targets/react-dom';

export default class Meter extends PureComponent {
  state = {
    cents: new Animated.Value(0),
  }

  componentWillReceiveProps(props) {
    Animated.timing(this.state.cents, {
      toValue: props.cents,
      duration: 500,
    }).start()
  }

  render() {
    const cents = this.state.cents.interpolate({
      inputRange: [-50, 50],
      outputRange: ['-45deg', '45deg']
    });

    const pointerStyle = {
      transform: `rotate(${cents.__getValue()})`,
    }

    return (
      <div style={style.meter}>
        <div style={style.origin}/>
        <div style={{...style.scale, ...style.strong, ...style.pointer, ...pointerStyle}}/>
        <div style={{...style.scale, ...style.scale_5, ...style.strong}}/>
        <div style={{...style.scale, ...style.scale_4}}/>
        <div style={{...style.scale, ...style.scale_3}}/>
        <div style={{...style.scale, ...style.scale_2}}/>
        <div style={{...style.scale, ...style.scale_1}}/>
        <div style={{...style.scale, ...style.strong}}/>
        <div style={{...style.scale, ...style.scale1}}/>
        <div style={{...style.scale, ...style.scale2}}/>
        <div style={{...style.scale, ...style.scale3}}/>
        <div style={{...style.scale, ...style.scale4}}/>
        <div style={{...style.scale, ...style.scale5, ...style.strong}}/>
        {/* <style jsx>{`
          .meter {
            padding: 200px;
            margin-bottom: 40px;
          }
          .origin {
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            width: 10px;
            height: 10px;
            border-radius: 10px;
            background-color: #37474f;
          }
        `}</style> */}
      </div>
    )
  }
}

const style = {
  meter: {
    height: 200,
    marginBottom: 40,
    position: 'relative',
    marginLeft: '50%',
  },
  origin: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    width: 10,
    height: 10,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  pointer: {
    borderTopWidth: 195,
  },
  scale: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: 1,
    height: '100%',
    boxSizing: 'border-box',
    borderTopWidth: 10,
    borderTopColor: '#FFFFFF',
    marginLeft: 4.5,
    borderTopStyle: 'solid',
    transformOrigin: 'center bottom 0px',
  },
  strong: {
    width: 2,
    borderTopWidth: 20,
  },
  scale_1: {
    transform: `rotate(-9deg)`,
  },
  scale_2: {
    transform: `rotate(-18deg)`,
  },
  scale_3: {
    transform: `rotate(-27deg)`,
  },
  scale_4: {
    transform: `rotate(-36deg)`,
  },
  scale_5: {
    transform: `rotate(-45deg)`,
  },
  scale1: {
    transform: `rotate(9deg)`,
  },
  scale2: {
    transform: `rotate(18deg)`,
  },
  scale3: {
    transform: `rotate(27deg)`,
  },
  scale4: {
    transform: `rotate(36deg)`,
  },
  scale5: {
    transform: `rotate(45deg)`,
  },
};