import { View, Text, Platform, Pressable } from "react-native";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Image } from "expo-image";
import { blurhash } from "../utils/commons";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuth } from "../context/authContext";
import { useRouter } from "expo-router";

interface CustomHeaderProps {
  name: string;
}

const ios = Platform.OS === "ios";

const CustomHeader: React.FC<CustomHeaderProps> = ({ name }) => {
  const { top } = useSafeAreaInsets();
  const { user } = useAuth();
  const router = useRouter();

  const handleProfile = () => {
    router.push("/profile");
  };

  const imageUrl = user?.avatar ? user.avatar : undefined;

  return (
    <View
      style={{ paddingTop: ios ? top : top + 10 }}
      className="flex-row justify-between px-5 bg-slate-900 pb-6"
    >
      <View className="justify-center">
        <Text
          style={{ fontSize: hp(3) }}
          className="font-medium text-neutral-200"
        >
          {name}
        </Text>
      </View>

      <Pressable onPress={handleProfile}>
        {imageUrl ? (
          <Image
            style={{ height: hp(6.3), aspectRatio: 1, borderRadius: 100 }}
            source={{ uri: imageUrl }}
            placeholder={blurhash}
            transition={250}
          />
        ) : (
          <FontAwesome5 name="user-circle" size={hp(6.3)} color="#fff" />
        )}
      </Pressable>
    </View>
  );
};

export default CustomHeader;
