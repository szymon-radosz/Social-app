import { NavigationActions } from "react-navigation";

//@ts-ignore
let _navigator;

//@ts-ignore
function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

//@ts-ignore
function navigate(routeName, params) {
  //@ts-ignore
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  );
}

// add other navigation functions that you need and export them

export default {
  navigate,
  setTopLevelNavigator
};
