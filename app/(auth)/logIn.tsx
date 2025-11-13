import { Alert, Pressable, Text, View, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomInputActions from "../../components/CustomInputOcticons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import Loading from "../../components/Loading";
import CustomKeyboardView from "../../components/CustomKeyboardView";
import { useAuth } from "../../context/authContext";

const logIn = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const [loginTry, setLoginTry] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleLogin = async () => {
    if (!emailRef.current || !passwordRef.current) {
      setLoginTry(true);
      return;
    } else {
      console.log("boton false");
      setLoginTry(false);
    }

    setLoading(true);

    let response = await login(emailRef.current, passwordRef.current);
    setLoading(false);
    if (!response.succes) {
      Alert.alert("No se pudo Acceder.");
    } else {
      router.replace("/(tabs)/grupos");
    }
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="light" />
      <View className="flex-1 bg-slate-900">
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
        <View
          className="gap-10"
          style={{ paddingHorizontal: hp(2), paddingTop: hp(1) }}
        >
          <Text
            style={{ fontSize: hp(4) }}
            className="font-bold tracking-wider text-center text-neutral-200"
          >
            Inicio de sesión
          </Text>
          <View className="gap-4">
            <CustomInputActions
              onChangeText={(value) => (emailRef.current = value)}
              iconName="mail"
              iconColor="#115242"
              placeHolderName="E-mail"
              placeholderColor="#d4d4d4"
              textContentType="emailAddress"
            />
            <CustomInputActions
              onChangeText={(value) => (passwordRef.current = value)}
              iconName="lock"
              iconColor="#115242"
              placeHolderName="Contraseña"
              placeholderColor="#d4d4d4"
              secureTextEntry={true}
              textContentType="password"
            />
            {loginTry && (
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-right text-red-400"
              >
                Debe cumplimentar los campos
              </Text>
            )}
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-right text-neutral-400"
            >
              ¿Has olvidado la contraseña?
            </Text>
          </View>
          <Pressable
            onPress={handleLogin}
            style={{ height: hp(6.5) }}
            className=" flex active:bg-emerald-500 bg-emerald-400 rounded-xl justify-center items-center"
          >
            {loading ? (
              <View className="flex-row ">
                <Loading />
              </View>
            ) : (
              <Text
                style={{ fontSize: hp(2.7) }}
                className="text-neutral-900 font-bold tracking-wider "
              >
                Acceder
              </Text>
            )}
          </Pressable>
          <View className="flex-row justify-center">
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-neutral-400"
            >
              ¿No tienes una cuenta?
            </Text>
            <Pressable onPress={() => router.push("Auth/Register")}>
              <Text
                style={{ fontSize: hp(1.8), paddingLeft: hp(1) }}
                className="font-semibold text-emerald-500"
              >
                Regístrate
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default logIn;
