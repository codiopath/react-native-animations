import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Animated, {useSharedValue, useAnimatedStyle, withTiming, withSpring, withRepeat} from 'react-native-reanimated'

const SIZE = 100.0

export function LoaderAnimation() {

  const handleRotation = (progress) => {
    'worklet'
    return `${progress.value * 2 * Math.PI}rad`
  }

  const progress = useSharedValue(1)
  const scale = useSharedValue(2)


  console.log(Math.PI, 'Math.PI', progress.value )

  const reanimatedStyle = useAnimatedStyle(()=>{
    return {
      opacity: progress.value,
      borderRadius: progress.value * 100 / 2,
      transform: [{scale: scale.value}, {rotate: handleRotation(progress)}]
    }
  }, [])

  useEffect(()=> {
    progress.value = withRepeat(withSpring(0.5), 9, true) 
    scale.value = withRepeat(withSpring(1), 9, true)
  }, [])


  return (
    <View style={styles.container}>
      <Animated.View style={[{height: SIZE, width: SIZE, backgroundColor: 'blue'}, reanimatedStyle]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
