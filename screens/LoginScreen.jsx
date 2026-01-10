import React, { useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import AsyncStorage from "@react-native-async-storage/async-storage";

function LoginScreen({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isDisabled = !username || !password;
  const { t, i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const changeLanguage = async (language) => {
    await AsyncStorage.setItem("language", language);
    i18n.changeLanguage(language);
  };

  const handleLogin = async () => {
    const response = await fetch("https://dummyjson.com/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    if (response.ok) {
      navigation.replace("BottomTabs", { username: username });
    } else {
      Toast.show({
        type: "error",
        text1: t("login.loginError"),
      });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={120}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <View style={styles.container}>
        {/* Top */}
        <View style={styles.topSection}>
          <View>
            <TouchableOpacity
              style={styles.langButton}
              onPress={() => {
                changeLanguage(isAr ? "en" : "ar");
              }}
            >
              <Text style={styles.langText}>
                {isAr ? "English" : "العربية"}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.logo}>
            <Image
              source={require("@/assets/images/Logo.png")}
              resizeMode="contain"
            />
          </View>
        </View>
        {/* Bottom */}
        <View style={styles.bottomSection}>
          {/* Inputs */}
          <View>
            <Text style={styles.title}>{t("login.welcome")}</Text>
            <Text style={{ marginBottom: 5, fontWeight: "bold" }}>
              {t("login.username")}
            </Text>
            <TextInput
              style={styles.input}
              onChangeText={setUsername}
              value={username}
            />
            <Text style={{ marginBottom: 5, fontWeight: "bold" }}>
              {t("login.password")}
            </Text>
            <View style={{ position: "relative" }}>
              <TextInput
                style={styles.input}
                secureTextEntry={hidePassword}
                onChangeText={setPassword}
                value={password}
              />
              <Ionicons
                onPress={() => setHidePassword(!hidePassword)}
                style={{ position: "absolute", top: 15, right: 15 }}
                name={hidePassword ? "eye" : "eye-off"}
                size={20}
                color="#555"
              />
            </View>
          </View>
          {/* Forgot password */}
          <TouchableOpacity>
            <Text style={styles.link}>{t("login.forgotPassword")}</Text>
          </TouchableOpacity>
          {/* Login button and finger print */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              onPress={handleLogin}
              style={[
                isDisabled ? styles.loginBtnInactive : styles.loginBtnActive,
                { flex: 1, marginRight: 40 },
              ]}
              disabled={isDisabled}
            >
              <Text style={styles.loginText}>{t("login.loginButton")}</Text>
            </TouchableOpacity>
            <FontAwesome5
              name="fingerprint"
              size={25}
              color="#0A3DAE"
              style={{ marginRight: 20 }}
            />
          </View>
          {/* Create new account link*/}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 50,
            }}
          >
            <Text style={{ color: "#888", fontWeight: "bold" }}>
              {t("login.noAccount")}{" "}
            </Text>
            <TouchableOpacity>
              <Text
                style={styles.link}
                onPress={() => navigation.navigate("SignupScreenOne")}
              >
                {t("login.createAccount")}
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.appVersion}>{t("login.appVersion")}</Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#0A3DAE",
    flex: 1,
  },
  topSection: {
    flex: 0.3,
  },
  langButton: {
    position: "absolute",
    top: 50,
    right: 30,
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  langText: {
    color: "black",
    fontWeight: "bold",
    fontSize: 15,
  },
  logo: {
    alignItems: "center",
    marginTop: 130,
  },
  bottomSection: {
    flex: 0.7,
    backgroundColor: "white",
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    marginTop: 50,
    padding: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EBEBEB",
    padding: 15,
    marginBottom: 20,
  },
  loginBtnActive: {
    width: "100%",
    backgroundColor: "#0A3DAE",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 10,
  },
  loginBtnInactive: {
    width: "100%",
    backgroundColor: "#90B2E3",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 10,
  },
  loginText: {
    color: "white",
    fontWeight: "bold",
  },
  link: {
    textDecorationLine: "underline",
    textAlign: "right",
    marginBottom: 30,
    color: "#0A3DAE",
    fontWeight: "bold",
  },
  appVersion: {
    textAlign: "center",
    color: "#888",
  },
});

export default LoginScreen;
