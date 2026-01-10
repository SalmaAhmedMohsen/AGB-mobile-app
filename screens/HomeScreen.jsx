import { FontAwesome5 } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
const { width, height } = Dimensions.get("window");

function HomeScreen({ route }) {
  const { username } = route.params;
  const [data, setData] = useState([]);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const updateCurrentSlideIndex = (e) => {
    const currentIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentSlideIndex(currentIndex);
  };
  const currentCard = data[currentSlideIndex];
  const isActive = !!currentCard?.isActive;
  const { t } = useTranslation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        "https://694696adca6715d122f85a31.mockapi.io/account"
      );
      const result = await response.json();
      setData(result);
    };
    fetchData();
  }, []);
  return (
    <>
      {/* Top */}
      <SafeAreaView style={styles.topContainer}>
        <View style={{ alignItems: "center" }}>
          <View style={{ width: "100%" }}>
            <View style={styles.avatar}>
              <Text style={styles.avatarTxt}>
                {username.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text style={styles.headerTitle}>
              {t("home.hello")}, {username}
            </Text>
          </View>
          <Text style={{ paddingTop: 30 }}>{t("home.balance")}</Text>

          <FlatList
            horizontal
            pagingEnabled
            directionalLockEnabled={true}
            bounces={false}
            alwaysBounceHorizontal={false}
            alwaysBounceVertical={false}
            onMomentumScrollEnd={updateCurrentSlideIndex}
            overScrollMode="never"
            data={data}
            renderItem={({ item }) => {
              return (
                <View
                  style={{ width, alignItems: "center", height: height * 0.7 }}
                >
                  <Text style={styles.cardNumber}>{item?.cardNumber}</Text>
                  <Text style={styles.balance}>
                    {t("home.currency")} {isActive ? item?.balance : 0}
                  </Text>
                  <Image
                    style={styles.card}
                    source={require("../assets/images/Card.png")}
                  />
                </View>
              );
            }}
          />
        </View>
      </SafeAreaView>

      {/* Center */}
      {/* Action Buttons */}
      {isActive ? (
        <View style={styles.btnsContainer}>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <FontAwesome5
              name="arrow-up"
              style={[styles.btns, { transform: [{ rotate: "45deg" }] }]}
            />
            <Text style={styles.bntsTxt}>{t("home.send")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <FontAwesome5 name="eye" style={styles.btns} />
            <Text style={styles.bntsTxt}>{t("home.Details")}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ alignItems: "center" }}>
            <FontAwesome5 name="cog" style={styles.btns} />
            <Text style={styles.bntsTxt}>{t("home.manage")}</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Activate Card Button
        <TouchableOpacity
          style={styles.activateCardBtn}
          onPress={() => {
            setData((prev) =>
              prev.map((card, i) =>
                i === currentSlideIndex ? { ...card, isActive: true } : card
              )
            );
          }}
        >
          <FontAwesome5
            name="unlock"
            style={{ fontSize: 20, color: "white" }}
          />
          <Text style={{ color: "white", fontWeight: "bold", fontSize: 16 }}>
            {t("home.activateBtn")}
          </Text>
        </TouchableOpacity>
      )}

      {/* Bottom */}
      <View
        style={{ backgroundColor: "white", flex: 1, paddingHorizontal: 25 }}
      >
        <Text style={styles.transactionTxt}>{t("home.transactions")}</Text>
        <View>
          {data[0]?.transactions.length == 0 ? (
            // No Transaction Yet
            <View style={styles.emptyTransactions}>
              <View style={styles.emptyTxnIcon}>
                <FontAwesome5
                  style={{ fontSize: 25, color: "grey" }}
                  name="exchange-alt"
                />
              </View>
              <Text style={{ marginTop: 20, fontSize: 20, fontWeight: "bold" }}>
                {t("home.noTransactions")}
              </Text>
            </View>
          ) : (
            // Transactions List
            <FlatList
              keyExtractor={(item) => item.id}
              data={data}
              renderItem={({ item }) => (
                <View style={{ marginBottom: 30 }}>
                  {item.transactions.map((txn, index) => (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        marginBottom: 20,
                        alignItems: "center",
                      }}
                    >
                      {/* Icon Container */}
                      <View
                        style={[
                          txn.type == "in"
                            ? styles.txnInContainer
                            : styles.txnOutContainer,
                          styles.txnContainer,
                        ]}
                      >
                        <FontAwesome5
                          name={txn.type == "in" ? "arrow-down" : "arrow-up"}
                          style={[
                            txn.type == "in"
                              ? styles.txnIconIn
                              : styles.txnIconOut,
                            styles.txnIcon,
                          ]}
                        />
                      </View>
                      {/* Merchant & Time */}
                      <View style={{ flex: 1, gap: 8 }}>
                        <Text style={{ fontSize: 16, fontWeight: "600" }}>
                          {txn.merchant}
                        </Text>
                        <Text style={{ color: "grey" }}>{txn.time}</Text>
                      </View>
                      {/* Amount */}
                      <Text
                        style={{ color: txn.type == "in" ? "green" : "red" }}
                      >
                        {txn.type == "in" ? "" : "-"}USD {txn.amount}
                      </Text>
                    </View>
                  ))}
                </View>
              )}
            />
          )}
        </View>
      </View>
    </>
  );
}

export default HomeScreen;
const styles = StyleSheet.create({
  topContainer: {
    paddingVertical: 10,
    backgroundColor: "#EFF1FA",
    height: 460,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  balance: {
    paddingTop: 10,
    fontWeight: "bold",
    fontSize: 26,
  },
  card: {
    width: 320,
    height: 250,
    resizeMode: "contain",
    paddingTop: 20,
  },
  cardNumber: {
    position: "absolute",
    color: "white",
    top: "12%",
    left: "35%",
    zIndex: 1,
    fontWeight: "bold",
  },
  transactionTxt: {
    paddingTop: 93,
    fontSize: 20,
    fontWeight: "bold",
  },
  activateCardBtn: {
    backgroundColor: "#0A3DAE",
    padding: 20,
    alignSelf: "center",
    position: "absolute",
    top: 433,
    zIndex: 1,
    borderRadius: 10,
    alignItems: "center",
    flexDirection: "row",
    gap: 15,
  },
  emptyTransactions: {
    alignItems: "center",
    justifyContent: "center",
    height: "78%",
  },
  emptyTxnIcon: {
    backgroundColor: "#EFF1FA",
    padding: 20,
    borderRadius: "100%",
  },
  avatar: {
    position: "absolute",
    left: 30,
    backgroundColor: "white",
    width: 40,
    height: 40,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  avatarTxt: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0A3DAE",
  },
  txnContainer: {
    marginRight: 20,
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  txnInContainer: {
    backgroundColor: "#ECF6FE",
    transform: [{ rotate: "45deg" }],
  },
  txnOutContainer: {
    backgroundColor: "#FDECEC",
    transform: [{ rotate: "45deg" }],
  },
  txnIcon: {
    fontSize: 18,
  },
  txnIconIn: {
    color: "green",
  },
  txnIconOut: {
    color: "red",
  },
  btnsContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    position: "absolute",
    zIndex: 1,
    top: "52%",
    gap: 20,
  },
  btns: {
    backgroundColor: "#0A3DAE",
    padding: 18,
    borderRadius: 50,
    color: "white",
    fontSize: 15,
  },
  bntsTxt: {
    marginVertical: 10,
    fontWeight: "600",
  },
});
