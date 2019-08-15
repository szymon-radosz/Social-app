import React from "react";
import { shallow } from "enzyme";
import Messages from "./Messages";
import { findByTestAttr } from "./../../../../testUtils/testUtils";

const setUp = (props = {}) => {
  const component = shallow(<Messages {...props} />);
  return component;
};

describe("<Messages />", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttr(component, "Messages");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <ImageBackground /> without errors", () => {
    component.setState({ openConversationDetails: false });
    const wrapper = findByTestAttr(component, "ImageBackground");
    expect(wrapper.length).toBe(1);
  });

  it("Should render showFilterPanel without errors", () => {
    component.setState({ showFilterPanel: true });
    const wrapper = findByTestAttr(component, "showFilterPanel");
    expect(wrapper.length).toBe(1);
  });

  it("Should render MessageList without errors", () => {
    component.setState({
      openConversationDetails: false,
      messagesList: [
        {
          created_at: "2019-07-29 18:16:24",
          id: 1,
          messages: [
            {
              conversation_id: 1,
              created_at: "2019-07-29 18:16:24",
              id: 1,
              message: "Hey",
              receiver_id: 16,
              sender_id: 18,
              status: 0,
              updated_at: "2019-07-29 18:16:24"
            }
          ],
          product_id: 0,
          receiverEmail: "media@e-mamy.pl",
          receiverId: 16,
          receiverName: "Media",
          receiverPhotoPath:
            "https://e-mamy-images.s3.eu-north-1.amazonaws.com/userPhotos/1564073065-media.jpg",
          updated_at: "2019-07-29 18:16:24",
          userHadUnreadedMessages: false
        }
      ]
    });
    const wrapper = findByTestAttr(component, "MessageList");
    expect(wrapper.length).toBe(1);
  });

  it("Should render ConversationDetails without errors", () => {
    component.setState({ openConversationDetails: true });
    const wrapper = findByTestAttr(component, "ConversationDetails");
    expect(wrapper.length).toBe(1);
  });
});
