import React, { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

function SignupScreenOne({ navigation }) {
  const [cardNumber, setCardNumber] = useState("");
  return (
    <SafeAreaView style={styles.container}>
      <View style={{ margin: 20 }}>
        <Text style={styles.createTitle}>Create new accounty</Text>
        <Text>Card number</Text>
        <TextInput
          style={styles.input}
          onChangeText={setCardNumber}
          value={cardNumber}
          keyboardType="numeric"
          maxLength={16}
        />
        <TouchableOpacity
          style={[
            cardNumber.length == 16
              ? styles.continueBtnActive
              : styles.continueBtnInactive,
          ]}
          disabled={cardNumber.length != 16}
          onPress={() => navigation.navigate("SignupScreenTwo")}
        >
          <Text style={styles.continueText}>Continue</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SignupScreenOne;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  createTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 30,
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#EBEBEB",
    padding: 15,
    marginBottom: 20,
    marginTop: 10,
  },
  continueBtnActive: {
    width: "100%",
    backgroundColor: "#0A3DAE",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 10,
  },
  continueBtnInactive: {
    width: "100%",
    backgroundColor: "#90B2E3",
    alignItems: "center",
    paddingVertical: 20,
    borderRadius: 10,
  },
  continueText: {
    color: "white",
    fontWeight: "bold",
  },
});
