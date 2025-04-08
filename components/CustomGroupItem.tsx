import { View, Text } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "../utils/commons";
import { FontAwesome5 } from "@expo/vector-icons";

type props = {
  name: string;
  userNumbers: number;
  avatar: string;
  sport: string;
};

const CustomGroupItem = ({ name, userNumbers, avatar, sport }: props) => {
  const imageUrl = `https://drive.google.com/uc?export=view&id=${avatar}`;

  return (
    <View className="flex-row py-2 bg-teal-600  my-1 mx-2">
      <Image
        style={{
          height: hp(7.5),
          aspectRatio: 1,
          borderRadius: hp(1),
          marginLeft: hp(0.9),
        }}
        source={{ uri: imageUrl }}
        placeholder={blurhash}
        transition={250}
      />
      <View className="flex-1  justify-center pl-2">
        <Text className="font-bold">{name}</Text>
        <Text className="font-bold">{sport}</Text>
      </View>

      <View
        className="flex-row justify-between items-center bg-teal-100 rounded-xl mr-2 my-1"
        style={{ width: hp(9) }}
      >
        <View className="pl-2">
          <FontAwesome5 name="users" size={hp(2.7)} color="rgb(28 25 23)" />
        </View>
        <Text className="font-bold pr-2">{userNumbers}</Text>
      </View>
    </View>
  );
};

export default CustomGroupItem;
