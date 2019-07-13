import React from "react";
import { TouchableOpacity, View, Text } from "react-native";
import styles from "./../style";
import { v4 as uuid } from "uuid";
import ButtonComponent from "./../../Utils/ButtonComponent";
import TextAreaComponent from "./../../Utils/TextAreaComponent";

const FeedbackModal = (props: {
  setFeedbackMessage: any;
  feedbackMessage: string;
  sendFeedback: any;
  feedbackTopic: any;
  setFeedbackTopic: any;
  activeTopic: string;
}): any => {
  return (
    <View
      style={{
        width: "100%",
        height: "100%"
      }}
    >
      <Text style={styles.feedbackHeaderText}>Napisz do nas!</Text>
      <Text style={styles.feedbackSubHeaderText}>
        Podziel się z nami swoją opinią co możemy poprawić lub zgłoś błąd
        działania aplikacji.
      </Text>

      <Text style={styles.feedbackTopic}>Temat wiadomości</Text>

      {props.feedbackTopic.map((topic: any, index: number) => {
        return (
          <View style={styles.checkboxWrapper} key={uuid()}>
            <TouchableOpacity
              onPress={() => props.setFeedbackTopic(index)}
              style={
                props.activeTopic == topic.text
                  ? styles.activeCheckbox
                  : styles.inActiveCheckbox
              }
            />
            <Text
              onPress={() => props.setFeedbackTopic(index)}
              style={
                props.activeTopic == topic.text
                  ? styles.checkboxTextActive
                  : styles.checkboxText
              }
            >
              {topic.text}
            </Text>
          </View>
        );
      })}

      <View style={{ paddingLeft: 10, paddingRight: 10 }}>
        <TextAreaComponent
          placeholder="Napisz wiadomość..."
          inputOnChange={(feedbackMessage: string) =>
            props.setFeedbackMessage(feedbackMessage)
          }
          value={props.feedbackMessage}
          maxLength={800}
          multiline={true}
          numberOfLines={10}
        />
      </View>

      <ButtonComponent
        pressButtonComponent={props.sendFeedback}
        buttonComponentText="Wyślij"
        fullWidth={true}
        underlayColor="#dd904d"
      />
    </View>
  );
};

export default FeedbackModal;
