import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import CText from 'react-native-falconeer-ui-ctext'
import { PortalProvider } from '@gorhom/portal'

export default function App() {
  return (
    <PortalProvider>
    <View style ={styles.container}>
      <CText numberOfLines={1} >
      The universe is all of space and time and their contents including planets, stars, galaxies, and all other forms of matter and energy.</CText>
    </View>
    </PortalProvider>
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
