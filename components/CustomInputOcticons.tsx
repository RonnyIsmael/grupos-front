import { Octicons } from "@expo/vector-icons";
import { TextInput, View, TextInputProps } from "react-native";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


interface CustomInputActionsProps extends Partial<TextInputProps>  {
    iconName: any;
    iconColor: string
    placeHolderName: string;
    placeholderColor: string;
};

const CustomInputActions: React.FC<CustomInputActionsProps> = ( {iconName, iconColor, placeHolderName, placeholderColor, ...props} ) => {
    return (
    <View style={{height:hp(7)}} 
    className="flex-row gap-4 px-4 text-neutral-800 bg-teal-500 items-center rounded-lg">
        <Octicons name={iconName} size={hp(2.7)} color={iconColor}/>
        <TextInput style={{fontSize: hp(2)}} 
        className="flex-1 font-semibold text-neutral-700" 
        placeholder={placeHolderName} 
        placeholderTextColor={placeholderColor}
        {...props}/>
    </View>
    )
}

export default CustomInputActions;