import React from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';

const { width } = Dimensions.get('window');

const BottomWave: React.FC = () => {
  return (
    <Svg
      width={width}
      height={150}
      viewBox={`0 0 ${width} 150`}
      style={{ position: 'absolute', bottom: 0 }}
    >
      <Defs>
        <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
          <Stop offset="0" stopColor="#DFD0F7" />
          <Stop offset="1" stopColor="#B586FF" />
        </LinearGradient>
      </Defs>
      <Path
        d={`
          M0 35
          C ${width * 0.60} 120, ${width * 0.75} -15, ${width} 60
          L ${width} 150
          L 0 150
          Z
        `}
        fill="url(#grad)"
      />
    </Svg>
  );
};

export default BottomWave;
