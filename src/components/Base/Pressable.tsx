import React from 'react';
import {Pressable as Touchable, PressableProps} from 'react-native';
import HapticFeedback from 'react-native-haptic-feedback';
import {GestureResponderEvent} from 'react-native-modal';

const Pressable = (props: PressableProps) => {
  const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
  };

  const onPress = (e: GestureResponderEvent) => {
    HapticFeedback.trigger('impactLight', options);
    props.onPress && props.onPress(e);
  };

  return (
    <Touchable {...props} onPress={e => onPress(e)}>
      {props.children}
    </Touchable>
  );
};

export default Pressable;
