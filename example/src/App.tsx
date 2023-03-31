import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import CText from 'react-native-falconeer-ui-ctext'
import { OverlayProvider } from '@react-native-aria/overlays'

export default function App() {
  return (
    <OverlayProvider>
    <View style ={styles.container}>
      <CText numberOfLines={1} >
      The universe is all of space and time and their contents including planets, stars, galaxies, and all other forms of matter and energy.</CText>
    </View>
    </OverlayProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    marginEnd:30,
    marginVertical: 30,
  },
})
