import React, {useMemo} from 'react';
import {StyleSheet, View, Dimensions} from 'react-native';
import {useTheme} from '../../themes';
import {
  BottomSheetModal,
  BottomSheetScrollView,
  useBottomSheetDynamicSnapPoints,
} from '@gorhom/bottom-sheet';
import Close from '../../assets/Icons/Close.svg';
import {BottomSheetModalMethods} from '@gorhom/bottom-sheet/lib/typescript/types';
import Pressable from './Pressable';
import {ThemePropertiesType} from '../../types';
import {Text} from './Text';
import {Button} from './Button';

export type BottomSheetPropType = {
  bottomSheetModalRef: React.RefObject<BottomSheetModalMethods>;
  children: React.ReactNode;
  leftButton?: React.ReactNode;
  leftButtonOnPress?: () => void;
  heading: string;
  subheading?: string;
  primaryButtonlabel: string;
  primaryButtonOnPress: () => void;
  secondaryButtonLabel?: string;
  secondaryButtonOnPress?: () => void;
  onDismiss?: () => void;
};

const {width, height} = Dimensions.get('window');
export const BottomSheet = (props: BottomSheetPropType) => {
  const theme = useTheme();
  const initialSnapPoints = useMemo(() => ['CONTENT_HEIGHT'], []);

  const {
    animatedHandleHeight,
    animatedSnapPoints,
    animatedContentHeight,
    handleContentLayout,
  } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

  return (
    <BottomSheetModal
      onDismiss={props.onDismiss}
      enableDismissOnClose
      ref={props.bottomSheetModalRef}
      index={0}
      snapPoints={animatedSnapPoints}
      handleHeight={animatedHandleHeight}
      contentHeight={animatedContentHeight}
      containerStyle={styles(theme).sheetContainer}
      backgroundStyle={styles(theme).sheetBackground}
      handleIndicatorStyle={styles(theme).handleIndicator}>
      <View
        onLayout={handleContentLayout}
        style={styles(theme).sheetContentContainer}>
        <View>
          <View style={[styles(theme).headerContainer, {marginBottom: 12}]}>
            {props.leftButton && (
              <View style={styles(theme).leftButtonContainer}>
                <Pressable
                  style={styles(theme).leftButton}
                  onPress={props.leftButtonOnPress}>
                  {props.leftButton}
                </Pressable>
              </View>
            )}
            <Text type="title" size="large" color={theme.colors.onSurface}>
              {props.heading}
            </Text>
            <Pressable
              onPress={() => props.bottomSheetModalRef.current?.dismiss()}
              style={styles(theme).closeButton}>
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
        <BottomSheetScrollView style={styles(theme).bodyContainer}>
          {props.children}
        </BottomSheetScrollView>
        <View style={styles(theme).footerContainer}>
          {props.secondaryButtonLabel && props.secondaryButtonOnPress && (
            <Button
              fullWidth
              type="outline"
              onPress={props.secondaryButtonOnPress}>
              {props.secondaryButtonLabel}
            </Button>
          )}
          <Button fullWidth type="primary" onPress={props.primaryButtonOnPress}>
            {props.primaryButtonlabel}
          </Button>
        </View>
      </View>
    </BottomSheetModal>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    sheetBackground: {
      borderRadius: 24,
      backgroundColor: theme.colors.surface,
    },
    sheetContainer: {backgroundColor: theme.colors.onSurface + '80'},
    sheetContentContainer: {
      paddingHorizontal: 16,
      paddingTop: 12,
      paddingBottom: 24,
    },
    handleIndicator: {
      width: 0.1 * width,
      backgroundColor: theme.colors.outline,
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
      maxHeight: height * 0.6,
      marginVertical: 24,
    },
    footerContainer: {flexDirection: 'row', justifyContent: 'space-between'},
  });
