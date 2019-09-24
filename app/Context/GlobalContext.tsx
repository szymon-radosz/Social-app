import React from "react";

export const GlobalContext = React.createContext({
  showAlert: false,
  alertType: "",
  alertMessage: "",
  userData: [],
  API_URL: "",
  setUserData: (data: any): any => {},
  setAlert: (
    showAlert: boolean,
    alertType: string,
    alertMessage: string
  ): any => {},
  closeAlert: (): any => {},
  clearUserData: (): any => {},
  showLoader: false,
  setShowLoader: (param: boolean): any => {},
  setUserFilledInfo: (): any => {},
  //editProfileData: false,
  clearUserUnreadedMessages: (
    userId: number,
    conversationId: number
  ): any => {},
  clearUserNotificationsStatus: (userId: number): any => {},
  setShowUserProfile: (userId: number): any => {},
  NavigationService: (): any => {},
  currentNavName: "",
  setCurrentNavName: (name: string) => {}
});
