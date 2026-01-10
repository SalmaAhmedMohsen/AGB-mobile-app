import React from "react";
import { StyleSheet, View } from "react-native";
import { useLinkBuilder, useTheme } from "@react-navigation/native";
import { Text, PlatformPressable } from "@react-navigation/elements";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons, FontAwesome5, FontAwesome } from "@expo/vector-icons";
import HomeScreen from "@/screens/HomeScreen";
import SupportScreen from "@/screens/SupportScreen";
import { useTranslation } from "react-i18next";

function MyTabBar({ state, descriptors, navigation }) {
  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (
    <View style={styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const label = options.tabBarLabel ?? options.title ?? route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({ type: "tabLongPress", target: route.key });
        };

        return (
          <PlatformPressable
            key={route.key}
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1, padding: 12, alignItems: "center" }}
          >
            <Ionicons
              name={
                route.name === "Home"
                  ? isFocused
                    ? "home"
                    : "home-outline"
                  : isFocused
                  ? "help-circle"
                  : "help-circle-outline"
              }
              size={24}
              color={isFocused ? "#0A3DAE" : colors.text}
            />
            <Text
              style={{
                color: isFocused ? "#0A3DAE" : colors.text,
                fontSize: 12,
                marginTop: 4,
              }}
            >
              {label}
            </Text>
          </PlatformPressable>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();
export default function BottomTabs({ route }) {
  const { t } = useTranslation();
  const { username } = route.params;
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        initialParams={{ username }}
        options={{ title: t("tabs.home"), headerShown: false }}
      />
      <Tab.Screen
        name="Support"
        component={SupportScreen}
        options={{
          title: t("tabs.support"),
          headerShadowVisible: false,
          headerStyle: { elevation: 0 },
          headerTitleStyle: { fontWeight: "bold", fontSize: 19 },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    height: 90,
    backgroundColor: "white",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
});
