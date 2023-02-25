import {ImageSourcePropType, ViewStyle} from 'react-native';

export type AvatarPickerPropType = {
  avatarImage: AvatarImageType;
  setAvatarImageSource: React.Dispatch<React.SetStateAction<AvatarImageType>>;
  avatarContainerStyle?: ViewStyle;
  disabled?: boolean;
};

export type AvatarImageType = {
  id: string;
  source: ImageSourcePropType;
};