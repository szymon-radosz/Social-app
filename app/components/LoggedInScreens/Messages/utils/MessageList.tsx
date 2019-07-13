import React from "react";
import { Text } from "react-native";
import { v4 as uuid } from "uuid";
import ListItem from "./../../../Utils/ListItem";
import moment from "moment";
import "moment/locale/pl";

const MessageList = (props: {
  messagesList: any;
  API_URL: string;
  openConversationDetails: any;
}): any => {
  if (props.messagesList) {
    return props.messagesList && props.messagesList.length > 0 ? (
      props.messagesList.map((conversation: any, i: number) => {
        if (conversation[i]) {
          console.log(["i", i, conversation[i]]);
          return (
            <ListItem
              API_URL={props.API_URL}
              key={uuid()}
              image={`${props.API_URL}userPhotos/${
                conversation[i].receiverPhotoPath
              }`}
              mainText={conversation[i].receiverName}
              subText={conversation[i].messages[
                conversation[i].messages.length - 1
              ].message.substring(0, 20)}
              subSubText={moment(
                conversation[i].messages[conversation[i].messages.length - 1]
                  .updated_at
              ).format("LLL")}
              onPress={(): void => {
                props.openConversationDetails(
                  conversation[i].id,
                  conversation[i].receiverId,
                  conversation[i].receiverName,
                  conversation[i].receiverEmail,
                  conversation[i].receiverPhotoPath
                );
              }}
            />
          );
        }
      })
    ) : (
      <Text style={{ paddingLeft: 10 }}>Brak wyników</Text>
    );
  }
};

export default React.memo(MessageList);
