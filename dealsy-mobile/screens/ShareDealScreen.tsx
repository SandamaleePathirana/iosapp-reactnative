import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Dimensions
} from 'react-native';
import Picker from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

import { usePermissions } from 'expo-permissions';
import * as Permissions from 'expo-permissions';

import EditScreenInfo from '../components/EditScreenInfo';
import { View } from '../components/Themed';
import * as firebase from 'firebase';

import * as apiKeys from '../config/apiKeys';
import { saveDeal, getLocationInformation } from '../services/apiservice';
const { height, width } = Dimensions.get("screen");

import { Button, Block, Text, Input, theme } from "galio-framework";
import materialTheme from '../constants/Colors';


export default class ShareDealScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      imageUri1: '',
      imageUri2: '',
      imageUri3: '',
      selectedCategory: 'retail',
      description: '',
      url: '',
      comments: '',
      loading: false,
      storeName: '',
      price: '',
      location: null,
      additionalCategories: [],
    };
  }

  componentDidMount = async () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        await this.onRegionChange(position);
        // Make a call to get details about where the user is...
        const jsonLocationInformation = await getLocationInformation(
          this.state.location.coords.latitude,
          this.state.location.coords.longitude,
        );

        if (jsonLocationInformation !== '') {
          // We don't want to capture details if the
          // user is at home
          if (jsonLocationInformation === 'place') {
            this.setState({
              storeName: jsonLocationInformation.items[0].title,
            });
          }
        }
      },
      (error) => Alert.alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  onRegionChange = async (location: any) => {
    this.setState({ location: location });
  };

  pickImage = async (clickedImage: string) => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      aspect: [4, 3],
      quality: 0.3,
    });

    if (!result.cancelled) {
      if (clickedImage === '1') {
        this.setState({ imageUri1: result.uri });
      } else if (clickedImage === '2') {
        this.setState({ imageUri2: result.uri });
      } else {
        this.setState({ imageUri3: result.uri });
      }
    }
  };

  shareDeal = async () => {
    try {
      if (this.state.description === '') {
        Alert.alert('You must supply a description');
        return;
      }

      if (this.state.storeName === '') {
        Alert.alert('You must supply a store name');
        return;
      }

      if (this.state.price === '') {
        Alert.alert('You must supply a price');
        return;
      }

      const priceToSend = parseFloat(this.state.price);

      if (priceToSend <= 0.0) {
        Alert.alert('You must supply a price greater than 0');
        return;
      }

      const currentUser = firebase.auth().currentUser;

      this.setState({ loading: true });
      await saveDeal(
        this.state.imageUri1,
        this.state.imageUri2,
        this.state.imageUri3,
        this.state.selectedCategory,
        this.state.description,
        this.state.url,
        this.state.comments,
        this.state.location,
        currentUser.uid,
        this.state.storeName,
        priceToSend,
      );

      this.emptyFields();
    } catch (error) {
      Alert.alert('Something went wrong');
    } finally {
      this.setState({ loading: false });
    }
  };

  emptyFields = async () => {
    this.setState({ imageUri1: '' });
    this.setState({ imageUri2: '' });
    this.setState({ imageUri3: '' });
    this.setState({ selectedCategory: 'retail' });
    this.setState({ description: '' });
    this.setState({ url: '' });
    this.setState({ comments: '' });
    this.setState({ storeName: '' });
    this.setState({ price: '' });
  };

  render() {
    return (
      <View style={styles.container}>
        {this.state.loading ? (
          <View style={styles.container}>
            <ActivityIndicator color={'#ffffff'} />
          </View>
        ) : (
            <View style={styles.container}>
              <View style={styles.images}>
                <TouchableOpacity onPress={() => this.pickImage('1')}>
                  <Image
                    source={
                      this.state.imageUri1 === ''
                        ? require('../assets/images/emptyimage.png')
                        : { uri: this.state.imageUri1 }
                    }
                    style={styles.image}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.pickImage('2')}>
                  <Image
                    source={
                      this.state.imageUri2 === ''
                        ? require('../assets/images/emptyimage.png')
                        : { uri: this.state.imageUri2 }
                    }
                    style={styles.image}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.pickImage('3')}>
                  <Image
                    source={
                      this.state.imageUri3 === ''
                        ? require('../assets/images/emptyimage.png')
                        : { uri: this.state.imageUri3 }
                    }
                    style={styles.image}
                  />
                </TouchableOpacity>
              </View>
              <View>
                <Picker
                  style={{
                    ...styles.picker,
                    placeholder: {
                      color: '#ffffff',
                      fontSize: 30,
                    },
                    iconContainer: {
                      top: 20,
                    },
                  }}
                  value={this.state.selectedCategory}
                  placeholder={{ label: 'Retail Store', value: 'retail' }}
                  onValueChange={(itemValue: any) =>
                    this.setState({ selectedCategory: itemValue })
                  }
                  items={[
                    { label: 'Online', value: 'online' },
                    { label: 'Dining', value: 'dining' },
                    { label: 'Grocery Store', value: 'grocery' },
                    { label: 'Travel', value: 'travel' },
                    { label: 'Coupon', value: 'coupon' },
                    { label: 'Other', value: 'other' },
                  ]}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Store*"
                  placeholderTextColor={'gray'}
                  value={this.state.storeName}
                  maxLength={255}
                  onChangeText={(storeName) =>
                    this.setState({ storeName: storeName })
                  }
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Price*"
                  placeholderTextColor={'gray'}
                  value={this.state.price}
                  keyboardType={'decimal-pad'}
                  onChangeText={(price) => this.setState({ price: price })}
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="Description*"
                  placeholderTextColor={'gray'}
                  value={this.state.description}
                  maxLength={255}
                  onChangeText={(description) =>
                    this.setState({ description: description })
                  }
                />
                <TextInput
                  style={styles.textInput}
                  placeholder="url"
                  placeholderTextColor={'gray'}
                  textContentType={'URL'}
                  value={this.state.url}
                  maxLength={2048}
                  onChangeText={(url) => this.setState({ url: url })}
                />
                <View style={styles.map}>
                  <MapView
                    style={styles.map}
                    showsUserLocation={true}
                    region={{
                      latitude:
                        this.state.location === null
                          ? 35.902916
                          : this.state.location.coords.latitude,
                      longitude:
                        this.state.location === null
                          ? -80.256996
                          : this.state.location.coords.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }}
                    zoomEnabled={true}
                  />
                </View>
              </View>
              <Block center>
              <Button
                shadowless
                style={styles.button}
                color={materialTheme.COLORS.BUTTON_COLOR}
                onPress={this.shareDeal}
              >
                Share
          </Button>
              </Block>
            </View>
    )
  }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  images: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  textInput: {
    backgroundColor: '#ffffff',
    width: 300,
    margin: 10,
    height: 40,
  },
  picker: {
    fontSize: 30,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'green',
    color: '#ffffff',
  },
  image: {
    margin: 10,
    width: 75,
    height: 75,
  },
  text: {
    fontSize: 20,
    color: '#ffffff',
  },
  map: {
    height: 200,
  },
  button: {
    padding: 10,
    color: '#ffffff',
  },
  button: {
    width: width - theme.SIZES.BASE * 4,
    height: theme.SIZES.BASE * 3,
    shadowRadius: 0,
    shadowOpacity: 0,
  },
});
