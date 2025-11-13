import { View, Text, Pressable } from "react-native";
import React from "react";
import { blurhash } from "../utils/commons";
import { Image } from "expo-image";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

interface CustomUserItemProps {
  item: any;
  action: any;
  icon: any;
}

const CustomUserItem: React.FC<CustomUserItemProps> = ({
  item,
  action,
  icon,
}) => {
  return (
    <View className="flex-row items-center justify-between py-2">
      <View className="flex-row items-center">
        <Image
          source={{ uri: item.avatar }}
          style={{ height: hp(7), aspectRatio: 1, borderRadius: 100 }}
          placeholder={blurhash}
          transition={250}
        />
        <Text className="text-white ml-4">{item.user_name}</Text>
      </View>
      <Pressable onPress={() => action(item.id)}>{icon}</Pressable>
    </View>
  );
};

export default CustomUserItem;
