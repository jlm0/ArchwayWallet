import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {View, Image, StyleSheet, Dimensions} from 'react-native';
import PlusIcon from '../assets/Icons/Plus.svg';
import {useTheme} from '../themes';
import {
  AvatarImageType,
  AvatarPickerPropType,
  ThemePropertiesType,
} from '../types';
import {Modal, Pressable} from './Base';

const {width} = Dimensions.get('window');
export const avatarImages: AvatarImageType[] = [
  {
    id: '1',
    source: require('../assets/Avatars/1.png'),
  },
  {
    id: '2',
    source: require('../assets/Avatars/2.png'),
  },
  {
    id: '3',
    source: require('../assets/Avatars/3.png'),
  },
  {
    id: '4',
    source: require('../assets/Avatars/4.png'),
  },
  {
    id: '5',
    source: require('../assets/Avatars/5.png'),
  },
  {
    id: '6',
    source: require('../assets/Avatars/6.png'),
  },
];

export const AvatarPicker = (props: AvatarPickerPropType) => {
  const theme = useTheme();
  const {t} = useTranslation('global');
  const [modalVisible, setModalVisible] = useState(false);

  const handleAvatarImagePress = () => {
    setModalVisible(true);
  };

  const handleAvatarImageSelect = (selectedAvatarImage: AvatarImageType) => {
    props.setAvatarImageSource(selectedAvatarImage);
  };

  const handleConfirmPress = () => {
    setModalVisible(false);
  };

  return (
    <View>
      <Pressable
        disabled={props.disabled}
        onPress={handleAvatarImagePress}
        style={styles(theme).avatarButton}>
        <Image
          source={props.avatarImage.source}
          style={styles(theme).avatarButtonImage}
        />
        {!props.disabled && (
          <View style={{position: 'absolute', bottom: 0, right: -12}}>
            <View style={styles(theme).avatarButtonPlus}>
              <PlusIcon color={theme.colors.onPrimary} />
            </View>
          </View>
        )}
      </Pressable>
      <Modal
        heading={t('SetupProfile.subtitle')}
        visible={modalVisible}
        setIsVisible={setModalVisible}>
        <View style={styles(theme).modalAvatarcontainer}>
          {avatarImages.map(image => (
            <Pressable
              key={image.id}
              onPress={() => handleAvatarImageSelect(image)}
              style={[
                styles(theme).avatarImage,
                image.id === props.avatarImage.id
                  ? styles(theme).selectedAvatarImage
                  : null,
              ]}>
              <Image
                style={{
                  flex: 1,
                  width: '100%',
                  height: '100%',
                  resizeMode: 'contain',
                }}
                source={image.source}
              />
            </Pressable>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    avatarButton: {
      alignSelf: 'center',
      marginBottom: 24,
      backgroundColor: theme.colors.onBackground,
    },
    avatarButtonImage: {
      height: 132,
      width: 132,
      borderWidth: 1,
      borderRadius: 10,
      borderColor: theme.colors.outline,
      resizeMode: 'contain',
      alignSelf: 'center',
      backgroundColor: 'black',
    },
    avatarButtonPlus: {
      width: 24,
      height: 24,
      borderRadius: 5,
      backgroundColor: theme.colors.primary,
      borderWidth: 1,
      borderColor: theme.colors.outline,
      justifyContent: 'center',
      alignItems: 'center',
    },
    avatarImage: {
      width: (width - 96) * 0.33,
      height: (width - 96) * 0.33,
      padding: 4,
      borderRadius: 50,
      alignSelf: 'center',
      backgroundColor: theme.colors.onBackground,
      marginBottom: 8,
    },
    selectedAvatarImage: {
      borderWidth: 2,
      borderColor: theme.colors.secondary,
    },
    modalAvatarcontainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      marginBottom: 32,
    },
  });
