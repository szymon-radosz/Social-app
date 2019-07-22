import React, { useContext } from "react";
import { View } from "react-native";
import Alert from "../../Alert/Alert";
import { GlobalContext } from "../Context/GlobalContext";

const NotLoggedInMain = () => {
  const context = useContext(GlobalContext);
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      {context.showAlert && (
        <Alert
          alertType={context.alertType}
          alertMessage={context.alertMessage}
          closeAlert={context.closeAlert}
        />
      )}
      <View />
    </View>
  );
};

export default NotLoggedInMain;
