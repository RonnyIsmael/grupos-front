import { View, Text } from "react-native";
import React from "react";
import LottieView from "lottie-react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Loading() {
  return (
    <View style={{ height: hp(13.5), aspectRatio: 1 }}>
      <LottieView
        style={{ flex: 1 }}
        source={require("../assets/animations/loading-animation.json")}
        autoPlay
        loop
      />
    </View>
  );
}
