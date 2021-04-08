import * as React from 'react';
import * as Application from 'expo-application';
import { StyleSheet } from 'react-native';

import { Text, View } from '../components/Themed';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Test 3</Text>
      <Text style={styles.title}>{Application.nativeBuildVersion}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
