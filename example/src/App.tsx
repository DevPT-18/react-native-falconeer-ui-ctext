import * as React from 'react';

import { StyleSheet, View } from 'react-native';
import CText from 'react-native-falconeer-ui-ctext';

export default function App() {

 

  return (
    <View style={styles.container}>
      <CText numberOfLines={1} readMoreText={"Show More"} readLessText={"Show Less"} readMoreStyle={{color: "red", marginStart:30}} readLessStyle={{color: "green",fontStyle:"italic"}} >
      Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
      when an unknown printer took a galley of type and scrambled it to make a type specimen book</CText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginStart:10,
    marginEnd:10,
    marginVertical: 30
  },
  box: {
    marginEnd:30,
    marginVertical: 30,
  },
});
