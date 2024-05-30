import React, { useEffect, useRef } from 'react';
import {View, Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

export default function SvgComponent(props) {
  const radiusAnim = useRef(new Animated.Value(1)).current;
  const strokeWidthAnim = useRef(new Animated.Value(0)).current;
  const strokeOpacityAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = () => {
      Animated.parallel([
        Animated.loop(
          Animated.timing(radiusAnim, {
            toValue: 80,
            duration: 2000,
            easing: Easing.bezier(0, 0.2, 0.5, 1),
            useNativeDriver: false,
          })
        ),
        Animated.loop(
          Animated.timing(strokeWidthAnim, {
            toValue: 25,
            duration: 2000,
            easing: Easing.bezier(0, 0.2, 0.5, 1),
            useNativeDriver: false,
          })
        ),
        Animated.loop(
          Animated.timing(strokeOpacityAnim, {
            toValue: 0,
            duration: 2000,
            easing: Easing.bezier(0, 0.2, 0.5, 1),
            useNativeDriver: false,
          })
        ),
      ]).start();
    };

    animation();
  }, [radiusAnim, strokeWidthAnim, strokeOpacityAnim]);

  return (
    <View style={styles.container}>
    <Svg height="50%" width="50%" viewBox="0 0 200 200" {...props}>
      <AnimatedCircle
        cx="100"
        cy="100"
        r={radiusAnim}
        stroke="#219ebc"
        strokeWidth={strokeWidthAnim}
        strokeOpacity={strokeOpacityAnim}
        fill="none"
      />
    </Svg>
    </View>
  );
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    },
  });