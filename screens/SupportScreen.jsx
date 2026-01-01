import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
const copyText = async (value) => {
  await Clipboard.setStringAsync(value);
  Toast.show({
    type: "success",
    text1: "Copied to clipboard",
    text2: value,
  });
};

function SupportScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Please contact us by email or hotline</Text>
      {/* Email */}
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>Email</Text>
          <Text style={{ color: "grey" }}>wecare@ABGbank.net</Text>
        </View>
        <TouchableOpacity onPress={() => copyText("wecare@ABGbank.net")}>
          <Text style={styles.copy}>Copy</Text>
        </TouchableOpacity>
      </View>
      {/* Contact Number */}
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>Contact Number</Text>
          <Text style={{ color: "grey" }}>0800 00 3355</Text>
        </View>
        <TouchableOpacity onPress={() => copyText("0800 00 3355")}>
          <Text style={styles.copy}>Copy</Text>
        </TouchableOpacity>
      </View>
      {/* FAQs */}
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>FAQs</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome5
            name="external-link-alt"
            style={styles.icon}
          ></FontAwesome5>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SupportScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 25,
  },
  text: {
    color: "grey",
    fontSize: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
  },
  title: {
    marginBottom: 10,
    fontWeight: "600",
    fontSize: 15,
  },
  copy: {
    textDecorationLine: "underline",
    color: "#0A3DAE",
    fontWeight: "bold",
  },
  icon: {
    color: "#0A3DAE",
    fontWeight: "bold",
    fontSize: 16,
  },
});
