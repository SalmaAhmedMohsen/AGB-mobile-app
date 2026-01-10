import { FontAwesome5 } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Clipboard from "expo-clipboard";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";

function SupportScreen() {
  const { t } = useTranslation();
  const copyText = async (value) => {
    await Clipboard.setStringAsync(value);
    Toast.show({
      type: "success",
      text1: t("support.copiedToClipboard"),
      text2: value,
    });
  };
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{t("support.contactInstructions")}</Text>
      {/* Email */}
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{t("support.email")}</Text>
          <Text style={{ color: "grey" }}>wecare@ABGbank.net</Text>
        </View>
        <TouchableOpacity onPress={() => copyText("wecare@ABGbank.net")}>
          <Text style={styles.copy}>{t("support.copy")}</Text>
        </TouchableOpacity>
      </View>
      {/* Contact Number */}
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{t("support.contactNumber")}</Text>
          <Text style={{ color: "grey" }}>0800 00 3355</Text>
        </View>
        <TouchableOpacity onPress={() => copyText("0800 00 3355")}>
          <Text style={styles.copy}>{t("support.copy")}</Text>
        </TouchableOpacity>
      </View>
      {/* FAQs */}
      <View style={styles.row}>
        <View>
          <Text style={styles.title}>{t("support.faqs")}</Text>
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
