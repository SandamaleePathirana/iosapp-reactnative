/* eslint-disable no-console */
import React from 'react';
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  RefreshControl,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import Constants from 'expo-constants';
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
import { searchDeals } from '../services/apiservice';
import { Deal } from '../components';
import { Block, theme, Text, Button } from 'galio-framework';

export default class DealsScreen extends React.Component {
  constructor() {
    super();

    this.state = {
      location: null,
      dealsCount: 0,
      deals: [],
      loading: false,
      refreshing: false,
    };
  }

  onRefresh = async () => {
    this.setState({ refreshing: true });

    try {
      await this.search();
    } catch (e) {
      console.log(e.message);
    } finally {
      this.setState({ refreshing: false });
    }
  };

  componentDidMount = async () => {
    await this.setCurrentLocation();
    await this.search();
  };

  setCurrentLocation = async () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({ location: position });
        this.search();
      },
      (error) => Alert.alert(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000,
      },
    );
  };

  search = async () => {
    try {
      let latitude = 0;
      let longitude = 0;

      await this.setCurrentLocation();

      if (this.state.location !== null) {
        latitude = this.state.location.coords.latitude;
        longitude = this.state.location.coords.longitude;
      }

      const deals = await searchDeals(latitude, longitude);
      this.setState({ dealsCount: deals.resultsCount });

      const jsonDeals: any[] = [];

      deals.results.map((d: any) => {
        const json = JSON.parse(d);
        jsonDeals.push(json);
      });

      this.setState({ deals: jsonDeals });
    } catch (error) {
      Alert.alert('An error occurred while retrieving the deals.');
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView
          contentContainerStyle={styles.scrollView}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        >
          {this.state.loading ? (
            <View style={styles.container}>
              <ActivityIndicator color={'#ffffff'} />
            </View>
          ) : (
              <View style={styles.container}>
                {this.state.dealsCount === 0 ? (
                  <Text center style={styles.title}>No Deals Today</Text>
                ) : (
                    <View style={styles.container}>
                      <Text center style={styles.title}>
                        {this.state.dealsCount} Deal(s) Found
                  </Text>
                      {this.state.deals.map((d: any) => {
                        return <Deal key={d._id} product={d} horizontal />;
                      })}
                    </View>
                  )}
              </View>
            )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeContainer: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
    backgroundColor: 'pink',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  padded: {
    paddingHorizontal: theme.SIZES.BASE * 2,
    position: 'relative',
    bottom: theme.SIZES.BASE,
  },
});
