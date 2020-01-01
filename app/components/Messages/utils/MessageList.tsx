import React, { useContext } from "react";
import { Text } from "react-native";
import ListItem from "./../../Utils/ListItem";
import moment from "moment";
import { GlobalContext } from "./../../../Context/GlobalContext";
import lang from "./../../../assets/lang/Messages/utils/MessageList";

const MessageList = (props: { messagesList: any; navigation: any }): any => {
  const context = useContext(GlobalContext);
  if (props.messagesList) {
    //console.log(["MessageList", props]);
    return props.messagesList && props.messagesList.length > 0 ? (
      props.messagesList.map((conversation: any, i: number) => {
        /*console.log([
          "conversation",
          conversation,
          i,
          props.messagesList[i][0]
        ]);*/

        return (
          <ListItem
            API_URL={context.API_URL}
            key={`MessageList-${i}`}
            image={`${props.messagesList[i][0].receiverPhotoPath}`}
            mainText={props.messagesList[i][0].receiverName}
            subText={props.messagesList[i][0].messages[
              props.messagesList[i][0].messages.length - 1
            ].message.substring(0, 20)}
            subSubText={moment(
              props.messagesList[i][0].messages[
                props.messagesList[i][0].messages.length - 1
              ].updated_at
            ).format("LLL")}
            onPress={(): void => {
              /*console.log([
                "ConversationDetails",
                props.messagesList[i][0].id,
                props.messagesList[i][0].receiverId,
                props.messagesList[i][0].receiverName,
                props.messagesList[i][0].receiverEmail,
                props.messagesList[i][0].receiverPhotoPath
              ]);*/

              props.navigation.navigate("ConversationDetails", {
                conversationId: props.messagesList[i][0].id,
                receiverId: props.messagesList[i][0].receiverId
              });
            }}
            userHadUnreadedMessages={
              props.messagesList[i][0].userHadUnreadedMessages
            }
          />
        );
      })
    ) : (
      <Text style={{ paddingLeft: 10 }}>{lang.noResults["en"]}</Text>
    );
  }
};

export default React.memo(MessageList);
