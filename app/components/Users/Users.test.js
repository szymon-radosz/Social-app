import React from "react";
import { shallow } from "enzyme";
import Users from "./Users";
import { findByTestAttr } from "./../../../../testUtils/testUtils";

const setUp = (props = {}) => {
  const component = shallow(<Users {...props} />);
  return component;
};

describe("<Users />", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttr(component, "FindUsers");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <ImageBackground /> without errors", () => {
    component.setState({
      userMessage: "",
      userList: [],

      filterDistance: "",
      filterChildAge: "",
      filterChildGender: "",
      filterHobbyName: "",
      showFilterModal: false,
      filterModalName: "",
      showUserDetails: false,
      showUserMessageBox: false,
      message: "",
      locationDetails: [],
      usersAreInTheSameConversation: false,
      usersFriendshipStatus: "",
      userDetailsData: [],
      userDetailsId: 0
    });
    const wrapper = findByTestAttr(component, "ImageBackground");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <FilterModal /> without errors", () => {
    component.setState({
      userMessage: "",
      userList: [
        {
          age: 22,
          api_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBkNmMzODVkY2RjMTgwZDRiOTRmNTJhODUxNjZhYjAxMjRiOWQzMjkwYmZiMzdiYjM3Nzg3Y2Q5MTkxOGIyZGRjZDgzMDVjMzI2ZjNlNzM1In0.eyJhdWQiOiI0NSIsImp0aSI6IjBkNmMzODVkY2RjMTgwZDRiOTRmNTJhODUxNjZhYjAxMjRiOWQzMjkwYmZiMzdiYjM3Nzg3Y2Q5MTkxOGIyZGRjZDgzMDVjMzI2ZjNlNzM1IiwiaWF0IjoxNTY0MDgxODczLCJuYmYiOjE1NjQwODE4NzMsImV4cCI6MTU5NTcwNDI3Mywic3ViIjoiMTYiLCJzY29wZXMiOltdfQ.PsJLtdc_8OCkippYBNqaXYN71vURRefBUKdqbQxOBd2j5L9Av3q-3ly9xLtikSNRUUbZYeWbJbBO3VdnfA7ER1F1T2pLXYW3-YlFU5g-ZjFBXdCcHeN1LIm7acr8ePSz3DxqvDMDYFr5RQTj0_bctMn1B--JC5P-KzbuHyOI-LMQf9baK8mLFrZpusg28oPo75vTkdEk0wTHibqgfmWsNwXYOsyjXlHcrni7pPxpkdYCog9fN7L9D6ClQ_TZ--R8zBIDKeXoLujjmnsnjwy7qUPuc7FNqt4_6pdWLVcaLsbUjVGS2Wl-gtZJ8waMc-Ou9yUaIOxXmZjwrKo-KreACbLzzt7pgVhGfXWE53U3qdvHzBXDMFzP9Ls5XhyOuklR6JnP9tCe4_YZLkMQKBSFF5f2S1UOKnphg4fkAKfO0G6tU0kdZG2s4s-mYLmOmCoM2bnFc3_EYjyoN2FKnfHsaKwvpvUxLCNAQgaKNxuWgpyu9iZR17Z41SsCjghrxZqMgCjN9UnnbyDVpNnRpkSxvH1EotJiR9U_U-CASIr0vakjymelcXluqPcWdcZGc3oGbb5EqBBGpjNiG4Hxekb1xoOd8rikjRu6Fjv8RnSLCY8hgkFdgUrklglze7WZPba2LJeORrX2QTuSqZ_P59rPvq55SATIgCfA9sTa3bjlYKA",
          created_at: "2019-07-25 18:41:47",
          description: null,
          email: "media@e-mamy.pl",
          email_token: "bWVkaWFAZS1tYW15LnBs",
          email_verified_at: "2019-07-25 18:42:30",
          hobbies: [],
          id: 16,
          kids: [],
          lattitude: 52.237049,
          location_string: "Śródmieście, Warszawa",
          longitude: 21.017532,
          name: "Media",
          photo_path:
            "https://e-mamy-images.s3.eu-north-1.amazonaws.com/userPhotos/1564073065-media.jpg",
          platform: "android",
          updated_at: "2019-07-25 21:11:13",
          user_filled_info: 1,
          verified: 1,
          votes: []
        }
      ],

      filterDistance: "",
      filterChildAge: "",
      filterChildGender: "",
      filterHobbyName: "",
      showFilterModal: true,
      filterModalName: "",
      showUserDetails: false,
      showUserMessageBox: false,
      message: "",
      locationDetails: [],
      usersAreInTheSameConversation: false,
      usersFriendshipStatus: "",
      userDetailsData: [],
      userDetailsId: 0
    });
    const wrapper = findByTestAttr(component, "FilterModal");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <UserMessageBox /> without errors", () => {
    component.setState({
      userMessage: "",
      userList: [],

      filterDistance: "",
      filterChildAge: "",
      filterChildGender: "",
      filterHobbyName: "",
      showFilterModal: true,
      filterModalName: "",
      showUserDetails: false,
      showUserMessageBox: true,
      message: "",
      locationDetails: [],
      usersAreInTheSameConversation: false,
      usersFriendshipStatus: "",
      userDetailsData: [
        {
          age: 22,
          api_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBkNmMzODVkY2RjMTgwZDRiOTRmNTJhODUxNjZhYjAxMjRiOWQzMjkwYmZiMzdiYjM3Nzg3Y2Q5MTkxOGIyZGRjZDgzMDVjMzI2ZjNlNzM1In0.eyJhdWQiOiI0NSIsImp0aSI6IjBkNmMzODVkY2RjMTgwZDRiOTRmNTJhODUxNjZhYjAxMjRiOWQzMjkwYmZiMzdiYjM3Nzg3Y2Q5MTkxOGIyZGRjZDgzMDVjMzI2ZjNlNzM1IiwiaWF0IjoxNTY0MDgxODczLCJuYmYiOjE1NjQwODE4NzMsImV4cCI6MTU5NTcwNDI3Mywic3ViIjoiMTYiLCJzY29wZXMiOltdfQ.PsJLtdc_8OCkippYBNqaXYN71vURRefBUKdqbQxOBd2j5L9Av3q-3ly9xLtikSNRUUbZYeWbJbBO3VdnfA7ER1F1T2pLXYW3-YlFU5g-ZjFBXdCcHeN1LIm7acr8ePSz3DxqvDMDYFr5RQTj0_bctMn1B--JC5P-KzbuHyOI-LMQf9baK8mLFrZpusg28oPo75vTkdEk0wTHibqgfmWsNwXYOsyjXlHcrni7pPxpkdYCog9fN7L9D6ClQ_TZ--R8zBIDKeXoLujjmnsnjwy7qUPuc7FNqt4_6pdWLVcaLsbUjVGS2Wl-gtZJ8waMc-Ou9yUaIOxXmZjwrKo-KreACbLzzt7pgVhGfXWE53U3qdvHzBXDMFzP9Ls5XhyOuklR6JnP9tCe4_YZLkMQKBSFF5f2S1UOKnphg4fkAKfO0G6tU0kdZG2s4s-mYLmOmCoM2bnFc3_EYjyoN2FKnfHsaKwvpvUxLCNAQgaKNxuWgpyu9iZR17Z41SsCjghrxZqMgCjN9UnnbyDVpNnRpkSxvH1EotJiR9U_U-CASIr0vakjymelcXluqPcWdcZGc3oGbb5EqBBGpjNiG4Hxekb1xoOd8rikjRu6Fjv8RnSLCY8hgkFdgUrklglze7WZPba2LJeORrX2QTuSqZ_P59rPvq55SATIgCfA9sTa3bjlYKA",
          created_at: "2019-07-25 18:41:47",
          description: null,
          email: "media@e-mamy.pl",
          email_token: "bWVkaWFAZS1tYW15LnBs",
          email_verified_at: "2019-07-25 18:42:30",
          hobbies: [],
          id: 16,
          kids: [],
          lattitude: 52.237049,
          location_string: "Śródmieście, Warszawa",
          longitude: 21.017532,
          name: "Media",
          photo_path:
            "https://e-mamy-images.s3.eu-north-1.amazonaws.com/userPhotos/1564073065-media.jpg",
          platform: "android",
          updated_at: "2019-07-25 21:11:13",
          user_filled_info: 1,
          verified: 1,
          votes: []
        }
      ],
      userDetailsId: 0
    });
    const wrapper = findByTestAttr(component, "UserMessageBox");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <Carousel /> without errors", () => {
    component.setState({
      userMessage: "",
      userList: [
        {
          age: 22,
          api_token:
            "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjBkNmMzODVkY2RjMTgwZDRiOTRmNTJhODUxNjZhYjAxMjRiOWQzMjkwYmZiMzdiYjM3Nzg3Y2Q5MTkxOGIyZGRjZDgzMDVjMzI2ZjNlNzM1In0.eyJhdWQiOiI0NSIsImp0aSI6IjBkNmMzODVkY2RjMTgwZDRiOTRmNTJhODUxNjZhYjAxMjRiOWQzMjkwYmZiMzdiYjM3Nzg3Y2Q5MTkxOGIyZGRjZDgzMDVjMzI2ZjNlNzM1IiwiaWF0IjoxNTY0MDgxODczLCJuYmYiOjE1NjQwODE4NzMsImV4cCI6MTU5NTcwNDI3Mywic3ViIjoiMTYiLCJzY29wZXMiOltdfQ.PsJLtdc_8OCkippYBNqaXYN71vURRefBUKdqbQxOBd2j5L9Av3q-3ly9xLtikSNRUUbZYeWbJbBO3VdnfA7ER1F1T2pLXYW3-YlFU5g-ZjFBXdCcHeN1LIm7acr8ePSz3DxqvDMDYFr5RQTj0_bctMn1B--JC5P-KzbuHyOI-LMQf9baK8mLFrZpusg28oPo75vTkdEk0wTHibqgfmWsNwXYOsyjXlHcrni7pPxpkdYCog9fN7L9D6ClQ_TZ--R8zBIDKeXoLujjmnsnjwy7qUPuc7FNqt4_6pdWLVcaLsbUjVGS2Wl-gtZJ8waMc-Ou9yUaIOxXmZjwrKo-KreACbLzzt7pgVhGfXWE53U3qdvHzBXDMFzP9Ls5XhyOuklR6JnP9tCe4_YZLkMQKBSFF5f2S1UOKnphg4fkAKfO0G6tU0kdZG2s4s-mYLmOmCoM2bnFc3_EYjyoN2FKnfHsaKwvpvUxLCNAQgaKNxuWgpyu9iZR17Z41SsCjghrxZqMgCjN9UnnbyDVpNnRpkSxvH1EotJiR9U_U-CASIr0vakjymelcXluqPcWdcZGc3oGbb5EqBBGpjNiG4Hxekb1xoOd8rikjRu6Fjv8RnSLCY8hgkFdgUrklglze7WZPba2LJeORrX2QTuSqZ_P59rPvq55SATIgCfA9sTa3bjlYKA",
          created_at: "2019-07-25 18:41:47",
          description: null,
          email: "media@e-mamy.pl",
          email_token: "bWVkaWFAZS1tYW15LnBs",
          email_verified_at: "2019-07-25 18:42:30",
          hobbies: [],
          id: 16,
          kids: [],
          lattitude: 52.237049,
          location_string: "Śródmieście, Warszawa",
          longitude: 21.017532,
          name: "Media",
          photo_path:
            "https://e-mamy-images.s3.eu-north-1.amazonaws.com/userPhotos/1564073065-media.jpg",
          platform: "android",
          updated_at: "2019-07-25 21:11:13",
          user_filled_info: 1,
          verified: 1,
          votes: []
        }
      ],

      filterDistance: "",
      filterChildAge: "",
      filterChildGender: "",
      filterHobbyName: "",
      showFilterModal: false,
      filterModalName: "",
      showUserDetails: false,
      showUserMessageBox: false,
      message: "",
      locationDetails: [],
      usersAreInTheSameConversation: false,
      usersFriendshipStatus: "",
      userDetailsData: [],
      userDetailsId: 0
    });
    const wrapper = findByTestAttr(component, "Carousel");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <ActiveFilters /> without errors", () => {
    component.setState({
      showUserDetails: false
    });
    const wrapper = findByTestAttr(component, "ActiveFilters");
    expect(wrapper.length).toBe(1);
  });
});
