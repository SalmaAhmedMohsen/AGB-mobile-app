import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { slides } from "../utilities/slides";
const { width, height } = Dimensions.get("window");
const Slides = ({ item }) => {
  return (
    <View style={{ width, alignItems: "center", height: height * 0.7 }}>
      <Image
        style={{ height: "65%", resizeMode: "contain" }}
        source={item.img}
      />
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
    </View>
  );
};

const Footer = ({ currentSlideIndex, goToNextSlide, navigation }) => {
  return (
    <View
      style={{
        height: height * 0.25,
        paddingHorizontal: 20,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        {slides.map((_, index) => (
          <View
            key={index}
            style={[
              styles.indicator,
              currentSlideIndex == index && {
                backgroundColor: "#283A8D",
              },
            ]}
          ></View>
        ))}
      </View>
      <View>
        {currentSlideIndex == slides.length - 1 ? (
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.replace("Login")}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={goToNextSlide}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

function OnboardingScreen({ navigation }) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const flatListRef = useRef(null);

  const updateCurrentSlideIndex = (e) => {
    const currentIndex = Math.round(e.nativeEvent.contentOffset.x / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    if (currentSlideIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({
        index: currentSlideIndex + 1,
        animated: true,
      });
    }
  };

  return (
    <>
      <View style={styles.container}>
        <FlatList
          ref={flatListRef}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          horizontal
          pagingEnabled
          directionalLockEnabled={true}
          bounces={false}
          alwaysBounceHorizontal={false}
          alwaysBounceVertical={false}
          overScrollMode="never"
          showsHorizontalScrollIndicator={false}
          data={slides}
          renderItem={({ item }) => <Slides item={item} />}
        />
        <Footer
          currentSlideIndex={currentSlideIndex}
          goToNextSlide={goToNextSlide}
          navigation={navigation}
        />
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  description: {
    textAlign: "center",
    padding: 20,
    color: "grey",
  },
  button: {
    backgroundColor: "#0A3DAE",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 90,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  indicator: {
    height: 6,
    width: 30,
    backgroundColor: "#D6E4FF",
    marginHorizontal: 3,
    borderRadius: 3,
  },
});

export default OnboardingScreen;
