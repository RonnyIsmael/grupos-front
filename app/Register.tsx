import { Alert, Pressable, Text, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { StatusBar } from "expo-status-bar";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import CustomInputActions from "../components/CustomInputOcticons";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import Loading from "../components/Loading";
import { useAuth } from "../context/authContext";
import CustomKeyboardView from "../components/CustomKeyboardView";

const Register = () => {
  const router = useRouter();
  const { register } = useAuth();
  const { setIsAuthenticated } = useAuth();
  const emailRef = useRef("");
  const passwordRef = useRef("");
  const userNameRef = useRef("");
  const [registerTry, setRegisterTry] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!emailRef.current || !passwordRef.current || !userNameRef.current) {
      setRegisterTry(true);
      return;
    } else {
      console.log("boton false");
      setRegisterTry(false);
    }

    setLoading(true);

    let response = await register(
      userNameRef.current,
      emailRef.current,
      passwordRef.current
    );
    setLoading(false);

    console.log("register: " + response);
    if (!response.succes) {
      Alert.alert("No se pudo registrar.");
    }
    Alert.alert(
      "Notificación",
      "Registro satisfactorio. Ya puede acceder a la aplicación",
      [
        {
          text: "Aceptar",
          onPress: () => {
            setIsAuthenticated(true);
          },
        },
      ]
    );
  };

  return (
    <CustomKeyboardView>
      <StatusBar style="light" />
      <View className="flex-1  bg-slate-800">
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
            Registro
          </Text>
          <View className="gap-4">
            <CustomInputActions
              onChangeText={(value) => (userNameRef.current = value)}
              iconName="person"
              iconColor="#115242"
              placeHolderName="Apodo"
              placeholderColor="#d4d4d4"
              textContentType="emailAddress"
            />
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
            {registerTry && (
              <Text
                style={{ fontSize: hp(1.8) }}
                className="font-semibold text-right text-red-400"
              >
                Debe cumplimentar todos los campos
              </Text>
            )}
          </View>

          <View
            style={{ height: hp(6.5) }}
            className="bg-emerald-400 rounded-xl justify-center items-center active:bg-emerald-500"
          >
            {loading ? (
              <View className="flex-row ">
                <Loading />
              </View>
            ) : (
              <Pressable onPress={handleRegister}>
                <Text
                  style={{ fontSize: hp(2.7) }}
                  className="text-neutral-700 font-bold tracking-wider "
                >
                  Registrarse
                </Text>
              </Pressable>
            )}
          </View>
          <View className="flex-row justify-center">
            <Text
              style={{ fontSize: hp(1.8) }}
              className="font-semibold text-neutral-400"
            >
              ¿Ya tienes una cuenta?
            </Text>
            <Pressable onPress={() => router.push("LogIn")}>
              <Text
                style={{ fontSize: hp(1.8), paddingLeft: hp(1) }}
                className="font-semibold text-emerald-500"
              >
                Inicia Sesión
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </CustomKeyboardView>
  );
};

export default Register;
