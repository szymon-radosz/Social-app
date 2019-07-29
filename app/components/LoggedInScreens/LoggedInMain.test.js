import React from "react";
import { shallow } from "enzyme";
import LoggedInMain from "./LoggedInMain";
import { findByTestAttr } from "./../../../testUtils/testUtils";

const setUp = (props = {}) => {
  const component = shallow(<LoggedInMain {...props} />);
  return component;
};

describe("<LoggedInMain />", () => {
  let component;
  beforeEach(() => {
    component = setUp();
  });

  it("Should render without errors", () => {
    const wrapper = findByTestAttr(component, "LoggedInMain");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <LoggedInScreens /> without errors", () => {
    const wrapper = findByTestAttr(component, "LoggedInScreens");
    expect(wrapper.length).toBe(1);
  });

  it("Should render feedbackIcon without errors", () => {
    const wrapper = findByTestAttr(component, "feedbackIcon");
    expect(wrapper.length).toBe(1);
  });

  it("Should render <BottomPanel /> without errors", () => {
    const wrapper = findByTestAttr(component, "BottomPanel");
    expect(wrapper.length).toBe(1);
  });

  describe("<LoggedInMain /> methods", () => {
    it("Should run setOpenFindUsers() without errors", () => {
      component.setState({
        openFindUsers: false,
        openAuctions: false,
        openMessages: false,
        openProfile: false,
        openForum: false,
        openFindUserId: 0,
        openAuctionId: 0,
        openAuctionUserId: 0,
        showFeedbackModal: false,
        feedbackMessage: "",
        feedbackTopic: [
          { index: 0, text: "Zgłoszenie błędu w aplikacji" },
          { index: 1, text: "Rozbudowanie funkcjonalności" },
          { index: 2, text: "Dodanie nowej funkcjonalności" },
          { index: 3, text: "Inne" }
        ],
        activeTopic: ""
      });
      component.instance().setOpenFindUsers(10);
      expect(component.state().openFindUsers).toBe(true);
      expect(component.state().openFindUserId).toBe(10);
    });

    it("Should run setOpenAuctions() without errors", () => {
      component.setState({
        openFindUsers: false,
        openAuctions: false,
        openMessages: false,
        openProfile: false,
        openForum: false,
        openFindUserId: 0,
        openAuctionId: 0,
        openAuctionUserId: 0,
        showFeedbackModal: false,
        feedbackMessage: "",
        feedbackTopic: [
          { index: 0, text: "Zgłoszenie błędu w aplikacji" },
          { index: 1, text: "Rozbudowanie funkcjonalności" },
          { index: 2, text: "Dodanie nowej funkcjonalności" },
          { index: 3, text: "Inne" }
        ],
        activeTopic: ""
      });
      component.instance().setOpenAuctions(10, 10);
      expect(component.state().openAuctionId).toBe(10);
      expect(component.state().openAuctionUserId).toBe(10);
    });

    it("Should run setOpenMessages() without errors", () => {
      component.setState({
        openFindUsers: false,
        openAuctions: false,
        openMessages: false,
        openProfile: false,
        openForum: false,
        openFindUserId: 0,
        openAuctionId: 0,
        openAuctionUserId: 0,
        showFeedbackModal: false,
        feedbackMessage: "",
        feedbackTopic: [
          { index: 0, text: "Zgłoszenie błędu w aplikacji" },
          { index: 1, text: "Rozbudowanie funkcjonalności" },
          { index: 2, text: "Dodanie nowej funkcjonalności" },
          { index: 3, text: "Inne" }
        ],
        activeTopic: ""
      });
      component.instance().setOpenMessages();
      expect(component.state().openMessages).toBe(true);
    });

    it("Should run setOpenForum() without errors", () => {
      component.setState({
        openFindUsers: false,
        openAuctions: false,
        openMessages: false,
        openProfile: false,
        openForum: false,
        openFindUserId: 0,
        openAuctionId: 0,
        openAuctionUserId: 0,
        showFeedbackModal: false,
        feedbackMessage: "",
        feedbackTopic: [
          { index: 0, text: "Zgłoszenie błędu w aplikacji" },
          { index: 1, text: "Rozbudowanie funkcjonalności" },
          { index: 2, text: "Dodanie nowej funkcjonalności" },
          { index: 3, text: "Inne" }
        ],
        activeTopic: ""
      });
      component.instance().setOpenForum();
      expect(component.state().openForum).toBe(true);
    });

    it("Should run setOpenProfile() without errors", () => {
      component.setState({
        openFindUsers: false,
        openAuctions: false,
        openMessages: false,
        openProfile: false,
        openForum: false,
        openFindUserId: 0,
        openAuctionId: 0,
        openAuctionUserId: 0,
        showFeedbackModal: false,
        feedbackMessage: "",
        feedbackTopic: [
          { index: 0, text: "Zgłoszenie błędu w aplikacji" },
          { index: 1, text: "Rozbudowanie funkcjonalności" },
          { index: 2, text: "Dodanie nowej funkcjonalności" },
          { index: 3, text: "Inne" }
        ],
        activeTopic: ""
      });
      component.instance().setOpenProfile();
      expect(component.state().openProfile).toBe(true);
    });

    it("Should run setShowFeedbackModal() without errors", () => {
      component.setState({
        openFindUsers: false,
        openAuctions: false,
        openMessages: false,
        openProfile: false,
        openForum: false,
        openFindUserId: 0,
        openAuctionId: 0,
        openAuctionUserId: 0,
        showFeedbackModal: false,
        feedbackMessage: "",
        feedbackTopic: [
          { index: 0, text: "Zgłoszenie błędu w aplikacji" },
          { index: 1, text: "Rozbudowanie funkcjonalności" },
          { index: 2, text: "Dodanie nowej funkcjonalności" },
          { index: 3, text: "Inne" }
        ],
        activeTopic: ""
      });
      component.instance().setShowFeedbackModal();
      expect(component.state().showFeedbackModal).toBe(true);
    });

    it("Should run setFeedbackMessage() without errors", () => {
      component.setState({
        openFindUsers: false,
        openAuctions: false,
        openMessages: false,
        openProfile: false,
        openForum: false,
        openFindUserId: 0,
        openAuctionId: 0,
        openAuctionUserId: 0,
        showFeedbackModal: false,
        feedbackMessage: "",
        feedbackTopic: [
          { index: 0, text: "Zgłoszenie błędu w aplikacji" },
          { index: 1, text: "Rozbudowanie funkcjonalności" },
          { index: 2, text: "Dodanie nowej funkcjonalności" },
          { index: 3, text: "Inne" }
        ],
        activeTopic: ""
      });
      component.instance().setFeedbackMessage("test");
      expect(component.state().feedbackMessage).toBe("test");
    });

    it("Should run setFeedbackTopic() without errors", () => {
      component.setState({
        openFindUsers: false,
        openAuctions: false,
        openMessages: false,
        openProfile: false,
        openForum: false,
        openFindUserId: 0,
        openAuctionId: 0,
        openAuctionUserId: 0,
        showFeedbackModal: false,
        feedbackMessage: "",
        feedbackTopic: [
          { index: 0, text: "Zgłoszenie błędu w aplikacji" },
          { index: 1, text: "Rozbudowanie funkcjonalności" },
          { index: 2, text: "Dodanie nowej funkcjonalności" },
          { index: 3, text: "Inne" }
        ],
        activeTopic: ""
      });
      component.instance().setFeedbackTopic(1);
      expect(component.state().activeTopic).toBe(
        "Rozbudowanie funkcjonalności"
      );
    });
  });
});
