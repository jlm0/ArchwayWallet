import React from 'react';
import {useTheme} from '../themes';
import {StyleSheet, View} from 'react-native';
import sampleSize from 'lodash/sampleSize';
import isEqual from 'lodash/isEqual';
import {Pressable, Text} from './Base';
import {ThemePropertiesType} from '../types';

type SeedConfirmProps = {
  seed: string[];
  onConfirm: (isConfirmed: boolean) => void;
};

export const SeedConfirm = ({seed, onConfirm}: SeedConfirmProps) => {
  const theme = useTheme();

  const randomSample = React.useMemo(() => sampleSize(seed, 6), [seed]);
  const [mockSeed, setMockSeed] = React.useState<string[]>(
    seed.map(seedWord => (randomSample.includes(seedWord) ? '' : seedWord)),
  );

  console.log(seed, randomSample, mockSeed);

  const updateTempSeed = (seedWord: string) => {
    const tempSeed = [...mockSeed];
    const index = tempSeed.indexOf(seedWord);
    const emptyIndex = tempSeed.indexOf('');

    index !== -1
      ? (tempSeed[index] = '')
      : emptyIndex !== -1 && (tempSeed[emptyIndex] = seedWord);

    onConfirm(isEqual(tempSeed, seed));
    setMockSeed(tempSeed);
  };

  return (
    <View>
      <View style={styles(theme).tempSeedContainer}>
        {mockSeed.map((mockSeedWord, index) => (
          <View
            style={[
              styles(theme).word,
              mockSeedWord === '' ? styles(theme).missingWord : null,
            ]}
            key={index}>
            <Text
              type="label"
              size="large"
              color={theme.colors.onSurfaceVariant}>
              {mockSeedWord}
            </Text>
          </View>
        ))}
      </View>
      <View style={styles(theme).sampleSeedContainer}>
        {randomSample.map((randomSampleWord, index) =>
          mockSeed.includes(randomSampleWord) ? (
            <View key={index} style={styles(theme).selectedWordContainer}>
              <Pressable
                style={styles(theme).selectedWord}
                onPress={() => updateTempSeed(randomSampleWord)}>
                <Text
                  type="label"
                  size="large"
                  color={theme.colors.onSecondary}>
                  {randomSampleWord}
                </Text>
              </Pressable>
            </View>
          ) : (
            <Pressable
              style={styles(theme).word}
              key={index}
              onPress={() => updateTempSeed(randomSampleWord)}>
              <Text type="label" size="large" color={theme.colors.onSurface}>
                {randomSampleWord}
              </Text>
            </Pressable>
          ),
        )}
      </View>
    </View>
  );
};

const styles = (theme: ThemePropertiesType) =>
  StyleSheet.create({
    tempSeedContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: 24,
      borderRadius: 10,
      backgroundColor: theme.colors.primaryContainer,
      padding: 8,
    },
    sampleSeedContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      padding: 8,
    },
    word: {
      width: '30%',
      borderRadius: 10,
      padding: 5,
      margin: 4,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.surfaceVariant,
    },
    missingWord: {},
    selectedWordContainer: {
      width: '30%',
      margin: 4,
    },
    selectedWord: {
      borderRadius: 10,
      padding: 5,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.secondary,
    },
  });
