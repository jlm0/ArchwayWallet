![Archway Wallet Banner](/src/assets/banner.png)

# Archway Wallet

Android and iOS wallet for the Archway & Cosmos Ecosystem.

## Table of Contents

1. [General Info](#general-info)
2. [Technologies](#technologies)
3. [Installation](#installation)

## General Info

---

Archway Wallet is a new cutting-edge cryptocurrency wallet built for the Cosmos Ecosystem. Currently, under active development with an Alpha release on the horizon, Archway Wallet is one of the market's most user-friendly and secure wallets. With cutting-edge features and a simple intuitive UI interface, users are able to store, manage, and transfer their digital assets. Built with the latest security best practices Archway Wallet ensures that user assets are always safe and secure. Whether you are a seasoned cryptocurrency user or just getting started, Archway Wallet is the perfect choice for anyone looking for a reliable and user-friendly wallet solution in the Cosmos ecosystem.

## Technologies

---

A sample list of primary technologies used within the project:

- [React Native](https://reactnative.dev/)
- [React Navigation](https://reactnavigation.org/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Native MMKV Storage](https://rnmmkv.vercel.app/#/)
- [React Native Quick Crypto](https://github.com/margelo/react-native-quick-crypto)
- [Protobuf Ts](https://github.com/timostamm/protobuf-ts)

## Installation

---

Installation requires polyfilling certain libraries for React native.

```
$ yarn
$ yarn patch-stream
$ yarn android
```

Note: Yarn needs to be installed and updated to the latest version.
Note: package-patch will throw errors on versoin but can be ignored.
