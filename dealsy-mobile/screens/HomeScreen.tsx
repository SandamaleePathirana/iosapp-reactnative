import * as React from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { ImageBackground, StyleSheet, StatusBar, Dimensions, View } from 'react-native';
import { Block, theme, Text, Button } from 'galio-framework';

const { height, width } = Dimensions.get('screen');

import { RootStackParamList } from '../types';

import Images from '../constants/Images';
import materialTheme from '../constants/Colors';

export default function HomeScreen({ navigation }: StackScreenProps<RootStackParamList, 'Home'>) {
  return (
    <Block flex style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Block flex center>
        <ImageBackground
          source={{ uri: Images.Onboarding }}
          style={{ height: height, width: width, marginTop: '-55%', zIndex: 1 }}
        />
      </Block>
      <Block flex space="between" style={styles.padded}>
        <Block flex space="around" style={{ zIndex: 2 }}>
          <Block>
            <Block>
              <Text color="white" size={60}>Welcome To</Text>
            </Block>
            <Block row>
              <Text color="white" size={60}>Dealsy</Text>
            </Block>
          </Block>
          <Block center>
            <Button
              shadowless
              style={styles.button}
              color={materialTheme.COLORS.BUTTON_COLOR}
              onPress={() => navigation.navigate('SignUp')}>
              Sign Up
              </Button>
            <Text size={16} color='rgba(255,255,255,0.6)'>
              Already have an account?
              </Text>
            <Button
              shadowless
              style={styles.button}
              color="success"
              onPress={() => navigation.navigate('SignIn')}>
              Login
              </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#20232a',
    backgroundColor: "black",
  },
  titleContainer: {
    height: 100,
  },
  title: {
    fontSize: 20,
    color: '#ffffff'
  },
  inlineText: {
    fontSize: 10,
    color: '#ffffff',
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
