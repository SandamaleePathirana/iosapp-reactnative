import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView, { PROVIDER_IOS } from "react-native-maps";

export default class Map extends React.Component {
  render() {
    const { location, navigation, height, width } = this.props;
    return (
      <MapView
        style={{ height: height, width: width }}
        provider={PROVIDER_IOS}
        showsUserLocation={true}
        initialRegion={{
          latitude: 7.210318,
          longitude: 79.841511,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />
    );
  }
}

