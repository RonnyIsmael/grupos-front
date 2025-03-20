import { Tabs } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { heightPercentageToDP as hp } from "react-native-responsive-screen";
import CustomHeader from "../../../components/CustomHeader";

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "rgb(229 229 229)",
        tabBarStyle: {
          backgroundColor: "rgb(30 41 59)",
          borderTopWidth: 0,
        },
      }}
    >
      <Tabs.Screen
        name="Grupos"
        options={{
          header: () => <CustomHeader name="Grupos" />,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="th-list"
              size={hp(2.7)}
              color={focused ? "rgb(229 229 229)" : "rgb(163 163 163)"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Partidos"
        options={{
          header: () => <CustomHeader name="Partidos" />,
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="motion-play"
              size={hp(2.7)}
              color={focused ? "rgb(229 229 229)" : "rgb(163 163 163)"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="Amigos"
        options={{
          header: () => <CustomHeader name="Amigos" />,
          tabBarIcon: ({ focused }) => (
            <FontAwesome5
              name="users"
              size={hp(2.7)}
              color={focused ? "rgb(229 229 229)" : "rgb(163 163 163)"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
