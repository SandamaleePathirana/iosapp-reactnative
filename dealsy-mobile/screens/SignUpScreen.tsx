import React, { useState } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { StyleSheet, View, Dimensions, TextInput, Alert, ScrollView, Keyboard, SafeAreaView, TouchableOpacity } from 'react-native';

import { RootStackParamList } from '../types';
import { registration } from '../services/firebaseauthservice';

import { Button, Block, Text, Input, theme } from "galio-framework";

import materialTheme from "../constants/Colors";

const { height, width } = Dimensions.get("screen");

export default function SignUpScreen({ navigation }: StackScreenProps<RootStackParamList, 'SignUp'>) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const emptyState = () => {
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const handlePress = () => {
    if (!firstName) {
      Alert.alert('First name is required');
    } else if (!password) {
      Alert.alert('Password is required');
    } else if (!email) {
      Alert.alert('Email is required');
    } else if (!confirmPassword) {
      setPassword('');
      Alert.alert('Confirm password is required');
    } else if (password !== confirmPassword) {
      Alert.alert('Password does not match');
    } else {
      registration(
        email,
        password,
        lastName,
        firstName,
      );
      emptyState();
      navigation.navigate('Loading');
    }
  };

  return (
    <Block flex style={styles.container}>
      <Block flex style={styles.group}>
        <Block flex style={styles.padded}>
          <Text center bold style={styles.text}>Create an account</Text>

          <Input
            right
            style={styles.textInput}
            placeholder="First name*"
            placeholderTextColor={'gray'}
            value={firstName}
            onChangeText={(name: React.SetStateAction<string>) => setFirstName(name)}
          />

          <Input
            style={styles.textInput}
            placeholder="Last name"
            placeholderTextColor={'gray'}
            value={lastName}
            onChangeText={(name: React.SetStateAction<string>) => setLastName(name)}
          />

          <Input
            style={styles.textInput}
            placeholder="Enter your email*"
            placeholderTextColor={'gray'}
            value={email}
            onChangeText={(email: React.SetStateAction<string>) => setEmail(email)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Input
            style={styles.textInput}
            placeholder="Enter your password*"
            placeholderTextColor={'gray'}
            value={password}
            onChangeText={(password: React.SetStateAction<string>) => setPassword(password)}
            secureTextEntry={true}
          />

          <Input
            style={styles.textInput}
            placeholder="Retype your password to confirm*"
            placeholderTextColor={'gray'}
            value={confirmPassword}
            onChangeText={(password2: React.SetStateAction<string>) => setConfirmPassword(password2)}
            secureTextEntry={true}
          />
          <Button
            shadowless
            style={styles.button}
            color={materialTheme.COLORS.BUTTON_COLOR}
            onPress={handlePress}
          >
            Sign Up
              </Button>

          <Text center style={styles.inlineText}>Already have an account?</Text>
          <Button
            shadowless
            style={styles.button}
            color="success"
            // onPress={handlePress}
            onPress={() => navigation.navigate('SignIn')}
          >
            Login
              </Button>
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
    color: '#ffffff'
  },
  textInput: {
    backgroundColor: '#ffffff',
    color: '#000000'
  },
  button: {
    padding: 10,
    color: '#ffffff',
    width: width - theme.SIZES.BASE * 4,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 30
  },
  titleContainer: {
    height: 100,
  },
  title: {
    fontSize: 20,
    paddingVertical: theme.SIZES.BASE,
    paddingHorizontal: theme.SIZES.BASE * 2,
    color: theme.COLORS.WHITE,
  },
  inlineText: {
    fontSize: 20,
    marginTop: 15,
    color: '#ffffff',
  },
  login: {
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
    paddingTop: theme.SIZES.BASE * 10,
  },
});
