import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';

import ArchwayLogo from './assets/AppLogos/ArchwayBrandmark.png';

function App(): JSX.Element {
  return (
    <SafeAreaView style={{backgroundColor: 'white', flex: 1}}>
      <StatusBar backgroundColor={'#FF4D00'} />
      <View
        style={{
          backgroundColor: '#FF4D00',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image source={ArchwayLogo} />
        <Text style={{color: 'white', fontSize: 24}}>Hello World</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});

export default App;
