import React from "react";
import { shallow } from "enzyme";
import Auctions from "./Auctions";
import { findByTestAttr } from "./../../../../testUtils/testUtils";

const setUp = (props = {}) => {
  const component = shallow(<Auctions {...props} />);
  return component;
};

describe("<Auctions />", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttr(component, "Auctions");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <FilterModal /> without errors", () => {
    component.setState({
      showFilterModal: true,
      displayProductDetails: false,
      displayNewProductBox: false,
      productList: [{ id: 1, name: "test" }]
    });
    const wrapper = findByTestAttr(component, "FilterModal");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <Carousel /> without errors", () => {
    component.setState({
      displayProductDetails: false,
      displayNewProductBox: false,
      showFilterModal: false,
      productList: [{ id: 1, name: "test" }]
    });
    const wrapper = findByTestAttr(component, "Carousel");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <ActiveFilters /> without errors", () => {
    component.setState({
      displayProductDetails: false,
      displayNewProductBox: false
    });
    const wrapper = findByTestAttr(component, "ActiveFilters");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <AuctionList /> without errors", () => {
    component.setState({
      displayProductDetails: false,
      displayNewProductBox: false,
      showFilterModal: false
    });
    const wrapper = findByTestAttr(component, "AuctionList");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <ButtonComponent /> without errors", () => {
    component.setState({
      displayProductDetails: false,
      displayNewProductBox: false,
      showFilterModal: false
    });
    const wrapper = findByTestAttr(component, "ButtonComponent");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <ProductDetails /> without errors", () => {
    component.setState({
      displayProductDetails: true,
      showFilterModal: false
    });
    const wrapper = findByTestAttr(component, "ProductDetails");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <AddNewProductBox /> without errors", () => {
    component.setState({
      displayNewProductBox: true,
      showFilterModal: false
    });
    const wrapper = findByTestAttr(component, "AddNewProductBox");
    expect(wrapper.length).toBe(1);
  });
});
