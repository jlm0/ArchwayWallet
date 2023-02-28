import React from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';

import * as bip39 from '@scure/bip39';
import {wordlist} from '@scure/bip39/wordlists/english';
import {ThemePropertiesType} from '../types';
import {useTheme} from '../themes';
import {Text} from './Base/Text';
import {Pressable} from './Base/Pressable';

export const SeedCreate = ({
  onSeedPhraseChange,
}: SeedPhraseGeneratorPropType) => {
  const theme = useTheme();

  const [numWords, setNumWords] = React.useState<number>(12);
  const [seedPhrase, setSeedPhrase] = React.useState<string>(
    bip39.generateMnemonic(wordlist, 128),
  );

  React.useEffect(() => {
    onSeedPhraseChange(seedPhrase);
  }, []);

  const handleWordCountChange = (newWordCount: number) => {
    setNumWords(newWordCount);
    const newSeedPhrase = bip39.generateMnemonic(
      wordlist,
      newWordCount === 12 ? 128 : 256,
    );
    setSeedPhrase(newSeedPhrase);
    onSeedPhraseChange(newSeedPhrase);
  };

  return (
    <View>
      <View style={styles(theme).buttonContainer}>
        <Pressable
          onPress={() => {
            handleWordCountChange(12);
          }}
          style={[
            styles(theme).button,
            numWords == 12 && styles(theme).buttonSelected,
          ]}>
          <Text
            type="label"
            size="large"
            color={
              numWords == 12
                ? theme.colors.onSecondary
                : theme.colors.onSurfaceVariant
            }>
            12 Words
          </Text>
        </Pressable>
        <Pressable
          onPress={() => {
            handleWordCountChange(24);
          }}
          style={[
            styles(theme).button,
            numWords == 24 && styles(theme).buttonSelected,
          ]}>
          <Text
            type="label"
            size="large"
            color={
              numWords == 12
                ? theme.colors.onSurfaceVariant
                : theme.colors.onSecondary
            }>
            24 Words
          </Text>
        </Pressable>
      </View>
      <ScrollView
        indicatorStyle={'white'}
        style={styles(theme).seedPhraseContainer}
        contentContainerStyle={styles(theme).seedPhraseInnerContainer}>
        {seedPhrase.split(' ').map((word, index) => (
          <View style={styles(theme).word} key={index}>
            <Text type="label" size="large" color={theme.colors.onSurface}>
              {word}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 4,
      backgroundColor: theme.colors.surfaceVariant,
      width: '100%',
      borderRadius: 10,
      marginBottom: 16,
    },
    button: {
      flex: 1,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 32,
    },
    buttonSelected: {
      backgroundColor: theme.colors.secondary,
    },
    seedPhraseContainer: {
      backgroundColor: theme.elevation.surface5,
      maxHeight: 192,
      borderRadius: 10,
      padding: 8,
    },
    seedPhraseInnerContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    word: {
      backgroundColor: theme.elevation.surface,
      width: '30%',
      borderRadius: 10,
      padding: 5,
      margin: 4,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
