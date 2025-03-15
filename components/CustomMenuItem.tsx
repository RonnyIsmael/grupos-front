
import React from 'react'
import { View, Text } from 'react-native';
import {  MenuOption } from 'react-native-popup-menu';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


interface CustomMenuItemProps{
    text: string,
    action: any,
    value: any,
    icon: any
}

const CustomMenuItem : React.FC<CustomMenuItemProps> = ({text, action, value, icon}) => {
  return (
   <MenuOption onSelect={()=> action(value)}>
        <View className='px-4 py-1 flex-row justify-between items-center'>
            <Text style={{fontSize: hp(1.7)}} className='font-semibold text-neutral-500'>
                {text}
            </Text>
            {icon}
        </View>
   </MenuOption>
  )
}

export default CustomMenuItem