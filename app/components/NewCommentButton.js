import React, { useState } from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  Modal,
  TouchableWithoutFeedback,
  Text,
} from "react-native";
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import NewTweetScreen from "../screens/NewTweetScreen";
import NewCommentScreen from "../screens/NewCommentScreen";

function NewCommentButton({ tweet }) {
  const [modalVisible, setModalVisible] = useState(false);

  const onPress = () => {
    setModalVisible(true);
  };

  const onCloseTweet = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <NewCommentScreen
          onCloseTweet={onCloseTweet}
          tweet={tweet}
        ></NewCommentScreen>
      </Modal>
      <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.iconContainer}>
          <Feather name={"message-circle"} size={20} color={"grey"} />
          <Text style={styles.number}>{tweet.numberOfComments}</Text>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
}

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  number: {
    marginLeft: 5,
    color: "grey",
    textAlign: "center",
  },
});

export default NewCommentButton;
