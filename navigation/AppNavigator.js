import { createStackNavigator, createAppContainer } from "react-navigation";
import LoginScreen from "../screens/LoginScreen";
import ListScreen from "../screens/ListScreen";
import DetailsScreen from "../screens/DetailsScreen";

// si se hace con StackNavigator... bota errores extraños
const AppNavigator = createStackNavigator({
  Login: LoginScreen,
  List: ListScreen,
  Details: DetailsScreen
});

export default AppNavigator;
