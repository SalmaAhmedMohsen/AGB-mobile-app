import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { passwordRules } from "../passwordRules";

function SignupScreenTwo({ navigation }) {
  const [hidePassword, setHidePassword] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const isPasswordValid = passwordRules.every((rule) => rule.test(password));
  const isDisabled = !username || !password || !isPasswordValid;

  return (
    <View style={styles.container}>
      <View style={{ margin: 20 }}>
        {/* Inputs */}
        <View>
          <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Username</Text>
          <TextInput
            style={styles.input}
            onChangeText={setUsername}
            value={username}
          />
          <Text style={{ marginBottom: 5, fontWeight: "bold" }}>Password</Text>
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

        {/* Validation */}
        <View>
          {passwordRules.map((rule, index) => {
            const isValid = rule.test(password);
            return (
              <View key={index} style={styles.validationRow}>
                {isValid && (
                  <FontAwesome
                    name="check"
                    style={[{ marginRight: 5 }, styles.valid]}
                  />
                )}
                {
                  <Text style={isValid ? styles.valid : styles.inValid}>
                    {rule.label}
                  </Text>
                }
              </View>
            );
          })}
        </View>

        {/* Continue btn */}
        <TouchableOpacity
          style={[
            isDisabled ? styles.continueBtnInactive : styles.continueBtnActive,
            styles.btn,
          ]}
          disabled={isDisabled}
          onPress={() => navigation.navigate("SuccessMsgScreen")}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignupScreenTwo;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EBEBEB",
    padding: 15,
    marginBottom: 20,
  },
  btn: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 50,
  },
  continueBtnActive: {
    backgroundColor: "#0A3DAE",
  },
  continueBtnInactive: {
    backgroundColor: "#90B2E3",
  },
  continueText: {
    color: "white",
    fontWeight: "bold",
  },
  valid: {
    color: "green",
  },
  inValid: {
    color: "grey",
  },
  validationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
});
