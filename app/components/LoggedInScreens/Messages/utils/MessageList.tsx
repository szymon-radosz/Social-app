import React, { useContext } from "react";
import { Text } from "react-native";
import ListItem from "./../../../Utils/ListItem";
import moment from "moment";
import "moment/locale/pl";
import { GlobalContext } from "./../../../Context/GlobalContext";

const MessageList = (props: {
  messagesList: any;
  openConversationDetails: any;
}): any => {
  const context = useContext(GlobalContext);
  if (props.messagesList) {
    return props.messagesList && props.messagesList.length > 0 ? (
      props.messagesList.map((conversation: any, i: number) => {
        if (conversation[i]) {
          return (
            <ListItem
              API_URL={context.API_URL}
              key={`MessageList-${i}`}
              image={`${conversation[i].receiverPhotoPath}`}
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
              userHadUnreadedMessages={conversation[i].userHadUnreadedMessages}
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
