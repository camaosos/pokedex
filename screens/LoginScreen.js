import * as WebBrowser from "expo-web-browser";
import React, { Component } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";

import Login from "../components/Form";

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRevealed: false
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.welcomeContainer}>
            <Image
              source={require("../assets/images/PokemonLogo.png")}
              style={styles.welcomeImage}
            />
          </View>

          <View style={styles.getStartedContainer}>
            <DevelopmentModeNotice />
            <Text style={styles.getStartedText}>Enter your credentials</Text>
            <View style={styles.codeHighlightContainer}>
              <Login navigation={this.props.navigation} />
            </View>
          </View>

          <View style={styles.forgotContainer}>
            <TouchableOpacity
              // if I dont write () => the context is changed and infinite loop comes
              onPress={() =>
                this.setState({ isRevealed: !this.state.isRevealed })
              }
              style={styles.forgotLink}
            >
              <Text style={styles.forgotLinkText}>Forgot your password?</Text>
            </TouchableOpacity>
            {this.state.isRevealed ? <ForgotPassword /> : null}
          </View>
        </ScrollView>
      </View>
    );
  }
}

HomeScreen.navigationOptions = {
  header: null
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.forgotLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Welcome to the National Kanto Pokédex. This app is in development.{" "}
        {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        Welcome to the National Kanto Pokédex.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function ForgotPassword() {
  return (
    <View id="mountable">
      <Text> email: bootcamp@globant.com </Text>
      <Text> password: bootcamp123 </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    paddingTop: 30
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 200,
    height: 160,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  codeHighlightContainer: {
    backgroundColor: "rgba(0,0,0,0.05)",
    borderRadius: 3,
    paddingHorizontal: 0,
    width: "95%"
  },
  getStartedText: {
    fontSize: 17,
    color: "rgba(96,100,109, 1)",
    lineHeight: 24,
    textAlign: "center"
  },
  forgotContainer: {
    marginTop: 15,
    alignItems: "center"
  },
  forgotLink: {
    paddingVertical: 15
  },
  forgotLinkText: {
    fontSize: 14,
    color: "#2e78b7"
  }
});
