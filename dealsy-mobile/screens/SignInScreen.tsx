import React, { useState } from 'react';
import { View, TextInput, StyleSheet, Alert, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { signIn } from '../services/firebaseauthservice';
import { Button, Block, Text, Input, theme } from "galio-framework";
import materialTheme from '../constants/Colors';

const { height, width } = Dimensions.get("screen");


export default function SignIn({
  navigation,
}: StackScreenProps<RootStackParamList, 'SignIn'>) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handlePress = async () => {
    if (!email) {
      Alert.alert('Email field is required.');
      return;
    }

    if (!password) {
      Alert.alert('Password field is required.');
      return;
    }

    try {
      await signIn(email, password);
      setError('');
      navigation.replace('Root');
    } catch (err) {
      setError(err.toString());
      navigation.replace('Home');
    } finally {
      setEmail('');
      setPassword('');
    }
  };

  return (
    <Block flex style={styles.container}>
      <Block flex style={styles.group}>
        <Block flex style={styles.padded}>
          <Text center bold style={styles.text}>Sign in to your account:</Text>

          <Input
            style={styles.textInput}
            placeholder="Enter your email"
            placeholderTextColor={'gray'}
            autoCompleteType={'username'}
            textContentType={'username'}
            autoCorrect={false}
            keyboardType={'email-address'}
            value={email}
            onChangeText={(email) => setEmail(email)}
            autoCapitalize="none"
          />
          <Input
            style={styles.textInput}
            placeholder="Enter your password"
            autoCompleteType={'password'}
            value={password}
            autoCapitalize={'none'}
            autoCorrect={false}
            textContentType={'password'}
            placeholderTextColor={'gray'}
            onChangeText={(password) => setPassword(password)}
            secureTextEntry={true}
          />

          <Text style={{ color: 'red' }}>{error}</Text>

          <Block center>
            <Button
              shadowless
              style={styles.button}
              color="success"
              // onPress={handlePress}
              onPress={handlePress}
            >
              Login
              </Button>
            <Block style={styles.divider} />
            <Text size={16} color="rgba(255,255,255,0.6)">
              Already have an account?
              </Text>
            <Button
              shadowless
              style={styles.button}
              color={materialTheme.COLORS.BUTTON_COLOR}
              onPress={() => navigation.navigate('SignUp')}
            >
              Sign Up
              </Button>
          </Block>
        </Block>
      </Block>
    </Block>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
  },
  text: {
    fontSize: 30,
    color: '#ffffff',
  },
  textInput: {
    backgroundColor: '#ffffff',
    color: '#000000',
    borderRadius: 5
  },
  button: {
    padding: 10,
    width: width - theme.SIZES.BASE * 6,
    color: '#ffffff',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 30,
  },
  titleContainer: {
    height: 100,
  },
  title: {
    fontSize: 20,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    color: theme.COLORS.WHITE,
  }, login: {
    width: width,
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE,
    position: "relative",
    bottom: theme.SIZES.BASE,
  },
  header: {
    elevation: 0,
  },
  divider: {
    borderWidth: 0.3,
    borderColor: theme.COLORS.WHITE,
  },
  group: {
    paddingTop: theme.SIZES.BASE * 15,
  },
});
