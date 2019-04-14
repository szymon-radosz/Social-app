import { NavigationScreenProps } from "react-navigation";

export default interface NavigationScreenInterface {
  navigation: {
    navigate: any;
    getParam: any;
    state: any;
  };
}
