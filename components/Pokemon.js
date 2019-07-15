import React, { Component } from "react";
//import your components from react-native
import { StyleSheet, View, Text, Image, ActivityIndicator } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import TYPES_COLORS from "../constants/TypesColors";
import POKEDEX from "../constants/Pokedex";

export default class Pokemon extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: null,
      weight: null,
      height: null,
      moves: null,
      sprite: null,
      mainType: null,
      secondaryType: null,
      entry: null
    };
  }
  async componentWillMount() {
    await POKEDEX.getPokemonByName(this.props.name)
      .then(pokemon => {
        this.setState({
          name: pokemon.name,
          weight: pokemon.weight,
          height: pokemon.height,
          moves: pokemon.moves,
          sprite: pokemon.sprites.front_default,
          mainType: pokemon.types[0].type.name,
          secondType:
            pokemon.types.length > 1 ? pokemon.types[1].type.name : null,
          species: pokemon.species.url
        });
      })
      .catch(error =>
        console.log(
          "annoying network or setting state error or incorrect pokemon",
          error
        )
      );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.left}>
          <Image
            style={{ width: 125, height: 125 }}
            source={{
              uri: this.state.sprite
            }}
          />
          <Text style={styles.capitalize}>Name: {this.state.name}</Text>
          <Text>Weight: {this.state.weight}</Text>
          <Text>Height: {this.state.height}</Text>
          <Text
            style={[
              styles.capitalize,
              { color: TYPES_COLORS[this.state.mainType] }
            ]}
          >
            First type: {this.state.mainType}
          </Text>
          {this.state.secondType ? (
            <Text
              style={[
                styles.capitalize,
                { color: TYPES_COLORS[this.state.secondType] }
              ]}
            >
              Second type: {this.state.secondType}
            </Text>
          ) : null}
        </View>
        <View style={styles.right}>
          <Text style={{ fontSize: 17, marginBottom: 10 }}>
            Available moves
          </Text>
          {this.state.moves ? (
            <FlatList
              data={this.state.moves}
              showsVerticalScrollIndicator={true}
              renderItem={({ item, index }) => (
                <Text style={styles.capitalize}>
                  {this.state.moves[index].move.name}
                </Text>
              )}
              //keyExtractor={({ item, index }) => (index ? "" + index : "")} // undefined key repeated
              keyExtractor={() =>
                new Date().getTime().toString() +
                Math.floor(
                  Math.random() * Math.floor(new Date().getTime())
                ).toString()
              }
            />
          ) : (
            <ActivityIndicator />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between"
  },
  left: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  right: {
    flex: 1,
    backgroundColor: "#fff",
    height: "75%"
  },
  capitalize: {
    textTransform: "capitalize"
  }
});
