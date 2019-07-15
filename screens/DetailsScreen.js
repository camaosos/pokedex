import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import Pokemon from "../components/Pokemon";

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.isLogged = false;
    this.name = null;
  }
  render() {
    this.isLogged = this.props.navigation.getParam("isLogged", null);
    this.name = this.props.navigation.getParam("name", null);
    return (
      <View style={styles.container}>
        {this.isLogged ? (
          <Pokemon
            navigation={this.props.navigation}
            isLogged={true}
            name={this.name}
          />
        ) : (
          <Text>Please login to see the Pokémon</Text>
        )}
      </View>
    );
  }
}

SettingsScreen.navigationOptions = {
  title: "Pokémon"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
