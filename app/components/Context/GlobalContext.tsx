import React from "react";
export const GlobalContext = React.createContext({
  showAlert: false,
  alertType: "",
  alertMessage: "",
  setAlert: (
    showAlert: boolean,
    alertType: string,
    alertMessage: string
  ): any => {}
});
