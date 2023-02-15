module.exports = {
  presets: [
    [
      'module:metro-react-native-babel-preset',
      {
        unstable_transformProfile: 'hermes-stable',
      },
    ],
  ],
  plugins: [
    [
      'babel-plugin-rewrite-require',
      {
        aliases: {
          crypto: 'crypto-browserify',
          stream: 'stream-browserify',
          buffer: '@craftzdog/react-native-buffer',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
