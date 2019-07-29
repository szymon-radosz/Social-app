import React from "react";
import { shallow } from "enzyme";
import LoggedInScreens from "./LoggedInScreens";
import { findByTestAttr } from "./../../../../testUtils/testUtils";

const setUp = (props = {}) => {
  const component = shallow(<LoggedInScreens {...props} />);
  return component;
};

describe("<LoggedInScreens />", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render <LoggedInScreens /> without errors", () => {
    const wrapper = findByTestAttr(component, "LoggedInScreens");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <FindUsers /> without errors", () => {
    component.setProps({ openFindUsers: true, showFeedbackModal: false });
    const wrapper = findByTestAttr(component, "LoggedInScreens");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <Auctions /> without errors", () => {
    component.setProps({ openAuctions: true, showFeedbackModal: false });
    const wrapper = findByTestAttr(component, "Auctions");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <Messages /> without errors", () => {
    component.setProps({ openMessages: true, showFeedbackModal: false });
    const wrapper = findByTestAttr(component, "Messages");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <Forum /> without errors", () => {
    component.setProps({ openForum: true, showFeedbackModal: false });
    const wrapper = findByTestAttr(component, "Forum");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <Profile /> without errors", () => {
    component.setProps({ openProfile: true, showFeedbackModal: false });
    const wrapper = findByTestAttr(component, "Profile");
    expect(wrapper.length).toBe(1);
  });
});
