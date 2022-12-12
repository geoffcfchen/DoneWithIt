import React from "react";
import { View, StyleSheet } from "react-native";
import { Tabs } from "react-native-collapsible-tab-view";
import AppText from "../components/AppText";

const HEADER_HEIGHT = 300;

const DATA = [0, 1, 2, 3, 4];
const identity = (v) => v + "";

const Header = () => {
  return (
    <View style={styles.header}>
      <AppText>test1</AppText>
    </View>
  );
};

const Example = () => {
  const renderItem = React.useCallback(({ index }) => {
    return (
      <View style={[styles.box, index % 2 === 0 ? styles.boxB : styles.boxA]}>
        <AppText>test</AppText>
      </View>
    );
  }, []);

  return (
    <Tabs.Container
      renderHeader={Header}
      headerHeight={HEADER_HEIGHT} // optional
    >
      <Tabs.Tab name="A">
        <Tabs.FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={identity}
        />
      </Tabs.Tab>
      <Tabs.Tab name="B">
        <Tabs.ScrollView>
          <View style={[styles.box, styles.boxA]}>
            <AppText>test</AppText>
          </View>
          <View style={[styles.box, styles.boxB]}></View>
        </Tabs.ScrollView>
      </Tabs.Tab>
    </Tabs.Container>
  );
};

const styles = StyleSheet.create({
  box: {
    height: 250,
    width: "100%",
  },
  boxA: {
    backgroundColor: "red",
  },
  boxB: {
    backgroundColor: "green",
  },
  header: {
    height: HEADER_HEIGHT,
    width: "100%",
    backgroundColor: "#2196f3",
  },
});

export default Example;
