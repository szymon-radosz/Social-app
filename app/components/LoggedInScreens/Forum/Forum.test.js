import React from "react";
import { shallow } from "enzyme";
import Forum from "./Forum";
import { findByTestAttr } from "./../../../../testUtils/testUtils";

const setUp = (props = {}) => {
  const component = shallow(<Forum {...props} />);
  return component;
};

describe("<Forum />", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttr(component, "Forum");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <ImageBackground /> without errors", () => {
    const wrapper = findByTestAttr(component, "ImageBackground");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <PostDetails /> without errors", () => {
    component.setState({
      showPostDetails: true,
      showSavePost: false,
      showSortByCategory: false,
      showPostDetailsId: 1,
      showSortByCategoryId: 0,
      showPosts: false,
      categoryName: "",
      postList: []
    });
    const wrapper = findByTestAttr(component, "PostDetails");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <SavePost /> without errors", () => {
    component.setState({
      showPostDetails: false,
      showSavePost: true,
      showSortByCategory: false,
      showPostDetailsId: 1,
      showSortByCategoryId: 0,
      showPosts: false,
      categoryName: "",
      postList: []
    });
    const wrapper = findByTestAttr(component, "SavePost");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <CategoriesList /> without errors", () => {
    component.setState({
      showPostDetails: false,
      showSavePost: false,
      showSortByCategory: true,
      showPostDetailsId: 1,
      showSortByCategoryId: 0,
      showPosts: false,
      categoryName: "",
      postList: []
    });
    const wrapper = findByTestAttr(component, "CategoriesList");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <CategoryDetailsSinglePostOnList /> without errors", () => {
    component.setState({
      showPostDetails: false,
      showSavePost: false,
      showSortByCategory: true,
      showPostDetailsId: 1,
      showSortByCategoryId: 0,
      showPosts: true,
      categoryName: "",
      postList: [
        {
          category_id: 1,
          comments: [],
          created_at: "2019-07-29 19:33:18",
          description: "Test",
          id: 1,
          title: "Test",
          updated_at: "2019-07-29 19:33:18",
          user_id: 18,
          votes: []
        }
      ]
    });
    const wrapper = findByTestAttr(
      component,
      "CategoryDetailsSinglePostOnList"
    );
    expect(wrapper.length).toBe(1);
  });

  it("Should render ask without errors", () => {
    component.setState({
      showPostDetails: false,
      showSavePost: false,
      showSortByCategory: true,
      showPostDetailsId: 1,
      showSortByCategoryId: 0,
      showPosts: false,
      categoryName: "",
      postList: []
    });
    const wrapper = findByTestAttr(component, "ask");
    expect(wrapper.length).toBe(1);
  });

  it("Should <ButtonComponent /> ask without errors", () => {
    component.setState({
      showPostDetails: false,
      showSavePost: false,
      showSortByCategory: true,
      showPostDetailsId: 1,
      showSortByCategoryId: 0,
      showPosts: false,
      categoryName: "",
      postList: []
    });
    const wrapper = findByTestAttr(component, "ButtonComponent");
    expect(wrapper.length).toBe(1);
  });
});
