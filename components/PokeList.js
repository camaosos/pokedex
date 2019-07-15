import React, { PureComponent } from "react";
//import your components from react-native
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity
} from "react-native";
//import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import POKEDEX from "../constants/Pokedex";

//const NUMBER_OF_POKEMON = 150; //Mew is the last
const URL_IMAGE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

const PPP = 30; // Pokémon per page, bigger than 30 otherwise it does not work
const MAX = 151; // mew should be the last one but not really

export default class PokeList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      list: [],
      sprites: [],
      currentName: null,
      page: 0,
      refreshing: false
    };
    // if not binded, it will throw undefined state.page
    this.handleLoadMore = this.handleLoadMore.bind(this);
  }
  async componentDidMount() {
    await this.makeRemoteRequest();
  }

  async makeRemoteRequest() {
    await POKEDEX.getPokemonsList({
      limit: PPP - 1,
      offset: this.state.page * PPP + 1
    })
      .then(pokelist =>
        this.setState({
          list: [
            ...this.state.list,
            ...pokelist.results.map(result => result.name)
          ],
          sprites: [
            ...this.state.sprites,
            ...pokelist.results.map(
              (item, index) =>
                URL_IMAGE + (this.state.page * PPP + index + 1) + ".png"
            )
          ],
          page: this.state.page
        })
      )
      .catch(error => console.log("bah error", error));
  }

  renderItem() {}

  handleLoadMore() {
    this.setState(
      { page: this.state.page + 1, refreshing: true },
      this.makeRemoteRequest
    );
  }

  handlePress(item) {
    this.setState({ currentName: item });
    this.props.navigation.navigate("Details", {
      isLogged: true,
      name: item
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.list}
          showsVerticalScrollIndicator={true}
          numColumns={2}
          renderItem={({ item, index }) => {
            return (
              <View style={styles.pokemon}>
                <TouchableOpacity onPress={() => this.handlePress(item)}>
                  <Image
                    source={{ uri: this.state.sprites[index] }} //fast
                    style={styles.image}
                  />
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              </View>
            );
          }}
          //keyExtractor={({ item, index }) => (index ? "" + index : "")} // undefined key repeated
          keyExtractor={() =>
            new Date().getTime().toString() +
            Math.floor(
              Math.random() * Math.floor(new Date().getTime())
            ).toString()
          }
          onEndReached={
            PPP * (this.state.page - 1) < MAX ? this.handleLoadMore : null
          }
          onEndReachedThreshold={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    margin: 20
  },
  text: {
    textTransform: "capitalize",
    textAlign: "center"
  },
  pokemon: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgb(225, 225, 225)",
    margin: 5
  },
  image: {
    width: 120,
    height: 120
  }
});
