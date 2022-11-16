import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, Modal } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import ListingEditScreen from "../screens/ListingEditScreen";

function NewQuestionButton() {
  const [modalVisible, setModalVisible] = useState(false);

  const onPress = () => {
    setModalVisible(true);
  };

  const onCloseQuestion = () => {
    setModalVisible(false);
  };

  return (
    <>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <ListingEditScreen
          onCloseQuestion={onCloseQuestion}
        ></ListingEditScreen>
      </Modal>
      <TouchableOpacity
        activeOpacity={0.8}
        style={styles.button}
        onPress={onPress}
      >
        <MaterialCommunityIcons
          name={"comment-question"}
          size={30}
          color="white"
        />
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.tint,
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NewQuestionButton;
