import React, { Component } from "react";
import { ScrollView, StyleSheet, Text } from "react-native";
import PokeList from "../components/PokeList";

export default class LinksScreen extends Component {
  render() {
    let isLogged = this.props.navigation.getParam("isLogged", false);
    return (
      <ScrollView style={styles.container}>
        {isLogged ? (
          <PokeList navigation={this.props.navigation} isLogged={true} />
        ) : (
          <Text>Please login to see the Pokélist</Text>
        )}
      </ScrollView>
    );
  }
}

LinksScreen.navigationOptions = {
  title: "Pokémon List"
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: "#fff"
  }
});
