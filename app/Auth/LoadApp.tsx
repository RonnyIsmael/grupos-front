import {
  Alert,
  Pressable,
  Text,
  View,
  Dimensions,
  InteractionManager,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomInputActions from "../../components/CustomInputOcticons";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/Loading";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useAuth } from "../../context/authContext";

const LoadApp = () => {
  return (
    <View className="flex-1 bg-slate-900">
      <StatusBar style="light" />

      <View
        style={{ paddingTop: wp(8), paddingHorizontal: wp(10) }}
        className="items-center"
      >
        <Text
          className="font-extrabold color-teal-700"
          style={{ fontSize: hp(2) }}
        >
          Tiki Taka Party
        </Text>
        <MaterialCommunityIcons
          name="soccer-field"
          size={hp(25)}
          color="rgb(15 118 110)"
        />
      </View>
      <View className="items-center flex-1 justify-end mb-10">
        <Loading />
        <Text className="font-extrabold color-teal-200">
          Cargando aplicación
        </Text>
      </View>
    </View>
  );
};

export default LoadApp;
