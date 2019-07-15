import React from "react";
import ReactDOM from "react-dom";
import { Text, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";

class CredentialsRevealed extends React.Component {
  render() {
    return (
      <View id="mountable">
        <Text> email: bootcamp@globant.com </Text>
        <Text> password: bootcamp123 </Text>
      </View>
    );
  }
  componentDidMount() {
    //console.log("mount");
  }

  componentWillUnmount() {
    //console.log("unmount");
  }
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isRevealed: false,
      isLogged: false
    };
  }

  handleSubmit = event => {
    let { email, password } = this.state;
    //email === "bootcamp@globant.com" && password === "bootcamp123"
    email === "A" && password === "B"
      ? this.handleLogin()
      : Alert.alert("Wrong email or password!");
    event.preventDefault();
  };

  validateForm() {
    return (
      (this.state.email.length > 0 && this.state.password.length > 0) ||
      this.state.isLogged
    );
  }

  handleLogin = event => {
    Alert.alert("Logged In");
    this.setState({ isLogged: true });
    this.props.navigation.navigate("List", { isLogged: true });
  };

  handleLogout = event => {
    Alert.alert("Logged Out");
    this.setState({ isLogged: false });
    this.props.navigation.navigate("List", { isLogged: false });
    event.preventDefault();
  };

  render() {
    //console.log(this.props.navigation);
    return (
      <View className="form" style={{ width: "100%" }}>
        <Input
          id="email"
          type="email"
          placeholder="email"
          autoComplete="username"
          onChangeText={email => this.setState({ email })}
          style={{ fontSize: 17 }}
        />
        <Input
          id="password"
          type="password"
          secureTextEntry={true}
          placeholder="password"
          autoComplete="current-password"
          onChangeText={password => this.setState({ password })}
          style={{ fontSize: 17 }}
        />
        <Button
          onPress={this.state.isLogged ? this.handleLogout : this.handleSubmit}
          style={{ borderRadius: 3 }}
          disabled={!this.validateForm()}
          title={this.state.isLogged ? "Log Out" : "Log In"}
        />
      </View>
    );
  }
}

export default Login;
