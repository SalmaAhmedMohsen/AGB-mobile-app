import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

function SuccessMsgScreen({ navigation }) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image source={require("../assets/images/Success.png")} />
        <Text style={styles.text}>{t("success.successMessage")}</Text>
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        style={styles.btn}
      >
        <Text style={styles.btnText}>{t("success.loginButton")}</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SuccessMsgScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingBottom: 50,
  },
  content: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  text: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    width: "80%",
    marginTop: 30,
  },
  btn: {
    backgroundColor: "#0A3DAE",
    paddingVertical: 20,
    width: "90%",
    borderRadius: 10,
    alignItems: "center",
    alignSelf: "center",
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
});
