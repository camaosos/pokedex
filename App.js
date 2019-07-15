import React from "react";
import AppNavigator from "./navigation/AppNavigator";
import { createAppContainer } from "react-navigation";
import { YellowBox } from "react-native";
import _ from "lodash";

//just to ignore those annoying warnings
YellowBox.ignoreWarnings(["Setting a timer"]);
const _console = _.clone(console);
console.warn = message => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
