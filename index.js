import '@stardazed/streams-polyfill';
import 'react-native-gesture-handler';
import 'react-native-get-random-values';
import 'fastestsmallesttextencoderdecoder';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import App from './src/App';
AppRegistry.registerComponent(appName, () => App);
