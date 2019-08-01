import React from "react";
import { shallow } from "enzyme";
import EditProfileInfo from "./EditProfileInfo";
import { findByTestAttr } from "./../../../../testUtils/testUtils";

const setUp = (props = {}) => {
  const component = shallow(<EditProfileInfo {...props} />);
  return component;
};

describe("<EditProfileInfo />", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttr(component, "editProfileInfoContainer");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <AgeDescScreen /> without errors", () => {
    component.setState({ actualStep: 1 });
    const wrapper = findByTestAttr(component, "ageDescScreenContainer");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <PhotoScreen /> without errors", () => {
    component.setState({ actualStep: 2 });
    const wrapper = findByTestAttr(component, "photoScreenContainer");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <CoordsScreen /> without errors", () => {
    component.setState({ actualStep: 3 });
    const wrapper = findByTestAttr(component, "coordsScreenContainer");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <ChooseKidsScreen /> without errors", () => {
    component.setState({ actualStep: 4 });
    const wrapper = findByTestAttr(component, "chooseKidsScreenContainer");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <ChooseHobbiesScreen /> without errors", () => {
    component.setState({ actualStep: 5 });
    const wrapper = findByTestAttr(component, "chooseHobbiesScreenContainer");
    expect(wrapper.length).toBe(1);
  });

  describe("<EditProfileInfo /> Methods", () => {
    it("Should run nextStep() without errors", () => {
      component.setState({ actualStep: 1 });
      component.instance().nextStep();
      let currentStep = component.state().actualStep;
      expect(currentStep).toBe(2);
    });

    it("Should run prevStep() without errors", () => {
      component.setState({ actualStep: 2 });
      component.instance().prevStep();
      let currentStep = component.state().actualStep;
      expect(currentStep).toBe(1);
    });
  });
});
