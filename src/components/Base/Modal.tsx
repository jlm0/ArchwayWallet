import React, {useState} from 'react';
import {StyleSheet, View, Dimensions, ScrollView} from 'react-native';
import {ReactNativeModal} from 'react-native-modal';
import {useTheme} from '../../themes';
import Close from '../../assets/Icons/Close.svg';
import {Text} from './Text';
import {Button} from './Button';
import {ThemePropertiesType} from '../../types';
import {Pressable} from './Pressable';

type ModalPropsType = {
  children: React.ReactNode;
  visible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  heading: string;
  subheading?: string;
  primaryButtonlabel: string;
  primaryButtonOnPress: () => void;
};
const {width, height} = Dimensions.get('window');
export const Modal = (props: ModalPropsType) => {
  const theme = useTheme();

  const toggleModal = () => {
    const newVisible = !props.visible;
    props.setIsVisible(newVisible);
  };
  return (
    <ReactNativeModal
      useNativeDriver
      hideModalContentWhileAnimating
      isVisible={props.visible}
      onBackButtonPress={toggleModal}>
      <View style={styles(theme).modalContentContainer}>
        <View>
          <View style={[styles(theme).headerContainer, {marginBottom: 12}]}>
            <Text type="title" size="large" color={theme.colors.onSurface}>
              {props.heading}
            </Text>
            <Pressable onPress={toggleModal} style={styles(theme).closeButton}>
              <Close height={18} width={18} color={theme.colors.onSurface} />
            </Pressable>
          </View>
          <View style={styles(theme).headerContainer}>
            {props.subheading && (
              <Text type="title" size="medium" color={theme.colors.onSurface}>
                {props.subheading}
              </Text>
            )}
          </View>
        </View>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles(theme).bodyContainer}>
          {props.children}
        </ScrollView>
        <View style={styles(theme).footerContainer}>
          <View style={{flex: 1, marginRight: 8}}>
            <Button fullWidth type="outline" onPress={toggleModal}>
              Cancel
            </Button>
          </View>
          <View style={{flex: 1}}>
            <Button
              fullWidth
              type="primary"
              onPress={props.primaryButtonOnPress}>
              {props.primaryButtonlabel}
            </Button>
          </View>
        </View>
      </View>
    </ReactNativeModal>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    modalContentContainer: {
      backgroundColor: theme.colors.surface,
      borderRadius: 24,
      paddingHorizontal: 16,
      paddingVertical: 12,
      maxHeight: 0.5 * height,
    },
    handleStyle: {paddingTop: 12, paddingBottom: 12},
    handleContainer: {
      justifyContent: 'center',
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    closeButton: {position: 'absolute', zIndex: 1, right: 0},
    leftButtonContainer: {position: 'absolute', zIndex: 1, left: 0},
    leftButton: {flex: 1, justifyContent: 'center', alignItems: 'center'},

    bodyContainer: {
      marginVertical: 24,
    },
    footerContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  });
