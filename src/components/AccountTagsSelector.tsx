import React from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View} from 'react-native';
import {useTheme} from '../themes';
import {ThemePropertiesType} from '../types';
import {Modal, Pressable, Text, TextField} from './Base';
import PlusIcon from '../assets/Icons/Plus.svg';
import Close from '../assets/Icons/Close.svg';
import ColorPicker, {
  Swatches,
  Preview,
  OpacitySlider,
  HueSlider,
} from 'reanimated-color-picker';

export type Tag = {
  color: string;
  name: string;
};

type AccountTagsSelectorProps = {
  accountTags: Tag[];
  setAccountTags: React.Dispatch<React.SetStateAction<Tag[]>>;
  currentTag?: Tag;
};
const colors = [
  '#E91E63',
  '#9C27B0',
  '#00BCD4',
  '#4CAF50',
  '#FFEB3B',
  '#FF5722',
];

export const AccountTagsSelector = ({
  accountTags,
  setAccountTags,
  currentTag,
}: AccountTagsSelectorProps) => {
  const theme = useTheme();
  const {t} = useTranslation();

  const [tagModalOpen, setTagModalOpen] = React.useState<boolean>(false);
  const [tagColor, setTagColor] = React.useState<string>(
    currentTag ? currentTag.color : colors[0],
  );

  const [missingName, setMissingName] = React.useState<boolean>(false);

  const [tagName, setTagName] = React.useState<string>(
    currentTag ? currentTag.name : '',
  );

  const handleTagSave = () => {
    if (!tagName) {
      setMissingName(true);
      setTimeout(() => setMissingName(false), 1500);
      return;
    }
    let newTags = [...accountTags];
    newTags.push({color: tagColor, name: tagName});
    setAccountTags(newTags);
    setTagModalOpen(false);
    setTagColor(colors[0]);
    setTagName('');
  };

  const handleTagRemove = (name: string) => {
    const newTags = accountTags.filter(tag => tag.name !== name);

    setAccountTags(newTags);
  };

  return (
    <View>
      <Text
        type="label"
        size="small"
        color={theme.colors.onSurfaceVariant}
        marginBottom={8}
        textAlign="left">
        {t('AccountTagsSelector.label')}
      </Text>
      <View style={styles(theme).tagContainer}>
        {accountTags.length != 0 &&
          accountTags.map((tag, i) => (
            <Pressable
              key={i}
              style={[styles(theme).tag, {backgroundColor: tag.color}]}
              onPress={() => handleTagRemove(tag.name)}>
              <Text
                marginRight={8}
                type="label"
                size="small"
                color={theme.colors.onPrimary}>
                {tag.name}
              </Text>
              <Close height={10} width={10} color={theme.colors.onPrimary} />
            </Pressable>
          ))}
        <Pressable
          style={styles(theme).tag}
          onPress={() => setTagModalOpen(true)}>
          <PlusIcon
            height={12}
            width={12}
            color={theme.colors.onPrimaryContainer}
            style={{marginRight: 8}}
          />
          <Text
            type="label"
            size="small"
            color={theme.colors.onPrimaryContainer}>
            {t('AccountTagsSelector.add')}
          </Text>
        </Pressable>
      </View>
      <Modal
        visible={tagModalOpen}
        setIsVisible={setTagModalOpen}
        heading={t('AccountTagsSelector.modal.title')}
        subheading={t('AccountTagsSelector.modal.subtitle')}
        showSecondaryButton
        primaryButtonlabel={t('buttons.save', {ns: 'global'})}
        primaryButtonOnPress={handleTagSave}>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <View style={[styles(theme).tag, {backgroundColor: tagColor}]}>
            <Text type="label" size="small" color={theme.colors.onPrimary}>
              {tagName ? tagName : t('AccountTagsSelector.modal.nameLabel')}
            </Text>
          </View>
        </View>
        <TextField
          error={missingName}
          success={tagName != ''}
          errorMessage={'Missing tag name'}
          marginBottom={16}
          label={t('AccountTagsSelector.modal.nameLabel')}
          placeholder={t('AccountTagsSelector.modal.namePlaceholder')}
          onChangeText={setTagName}
          type={'filled'}
        />
        <Text
          marginBottom={8}
          textAlign="left"
          type="label"
          size="small"
          color={theme.colors.onSurface}>
          {t('AccountTagsSelector.modal.colorLabel')}
        </Text>
        <View style={[styles(theme).swatcheContainer]}>
          {colors.map((swatch, i) => (
            <Pressable
              key={swatch + i}
              onPress={() => setTagColor(swatch)}
              style={[
                styles(theme).swatch,
                {backgroundColor: swatch},
                tagColor ? {borderColor: swatch, borderWidth: 1} : undefined,
              ]}
            />
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    tagContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      alignSelf: 'stretch',
    },
    tag: {
      paddingHorizontal: 12,
      paddingVertical: 8,
      backgroundColor: theme.colors.primaryContainer,
      borderRadius: 8,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 8,
    },
    swatcheContainer: {
      alignSelf: 'stretch',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    swatch: {
      width: 30,
      height: 30,
      borderRadius: 8,
      marginHorizontal: 5,
      marginBottom: 15,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
