import React from "react";
import { View, Text } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image } from "expo-image";
import { blurhash } from "../utils/commons";
import { FontAwesome5 } from "@expo/vector-icons";
import { Card } from "react-native-paper";
import { useRouter } from "expo-router";

type Props = {
  id: number;
  name: string;
  userNumbers: number;
  avatar: string;
  sport: string;
  owner: number;
};

const CustomCardItem = ({ id, name, userNumbers, avatar, sport }: Props) => {
  const router = useRouter();

  const handlePress = () => {
    router.navigate(`/(grupo)/${id}`);
  };

  return (
    <Card
      className="flex-1 m-2 mb-4 mx-2 overflow-hidden bg-slate-800 rounded-xl"
      onPress={handlePress}
    >
      <View className="relative">
        <Image
          style={{ height: hp(20), width: "100%" }}
          source={{ uri: avatar }}
          placeholder={blurhash}
          transition={250}
        />
        <View className="absolute top-0 left-0 right-0 bg-black/50 py-1">
          <Text className="text-base font-bold text-white text-center">
            {name}
          </Text>
        </View>
        <View className="absolute bottom-0 left-0 right-0 bg-black/60 py-2 px-3 flex-row justify-between">
          <View className="flex-row items-center">
            <FontAwesome5 name="users" size={14} color="#e5e7eb" />
            <Text className="text-gray-200 ml-2">{userNumbers}</Text>
          </View>
          <Text className="text-gray-200">{sport}</Text>
        </View>
      </View>
    </Card>
  );
};

export default CustomCardItem;
