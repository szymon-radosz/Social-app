import React, { useState, useEffect } from "react";
import { Button, Text, View, TouchableHighlight } from "react-native";
import styles from "./style";

const Alert = (props: any) => {
  const [showAlert, setShowAlert] = useState(true);
  const [message, setMessage] = useState("");

  const closeAlert = () => {
    setShowAlert(false);
  };

  useEffect(() => {
    if (props.alertMessage) {
      setShowAlert(true);
      setMessage(props.alertMessage);
    }
  }, [props.alertMessage]);

  if (showAlert) {
    return (
      <View style={styles.alertContainer}>
        <Text
          style={
            props.alertType == "success"
              ? styles.successContainer
              : props.alertType == "danger"
              ? styles.dangerContainer
              : null
          }
        >
          {message}
        </Text>
        <TouchableHighlight style={styles.closeAlert}>
          <Button title="X" color="#fff" onPress={closeAlert} />
        </TouchableHighlight>
      </View>
    );
  } else {
    return <View />;
  }
};
export default Alert;
