import { View, Text, Platform } from 'react-native'
import React from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { blurhash } from '../utils/commons';
import { Menu, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import CustomMenuItem from './CustomMenuItem';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAuth } from '../context/authContext';

interface CustomHeaderProps {
  name: String
}

const ios = Platform.OS == 'ios';
const CustomHeader : React.FC<CustomHeaderProps> =  ({name}) => {
    const {top} = useSafeAreaInsets();
    const handleProfile = ()=>{

    }

    const {logout} = useAuth();
    const handleLogout = async () => {
        await logout();
    }
  return (
    <View style={{paddingTop: ios? top:top+10}} className='flex-row justify-between px-5 bg-slate-800 pb-6 '>
      <View className='justify-center'>
        <Text style={{fontSize: hp(3)}} className='font-medium text-neutral-200'>
            {name}
        </Text>    
      </View>
      
      <View>
        <Menu>
          <MenuTrigger customStyles={{
            triggerWrapper:{
              //trigger wrapper styles
            }
          }}>
            <Image
              style={{ height: hp(6.3), aspectRatio: 1, borderRadius: 100}}
              source="https://drive.google.com/uc?export=view&id=1fwMARkZmx-LE1gQzFT33L9WPpY0NqjQ_" 
              placeholder={blurhash}
              transition={250}
            />
          </MenuTrigger>
            <MenuOptions>
              <CustomMenuItem
                text='Perfil'
                action={handleProfile}
                value={null}
                icon={<FontAwesome5 name='user' size={hp(2.5)} color="#737373"/>} 
              />
               <CustomMenuItem
                text='Cerrar Sesión'
                action={handleLogout}
                value={null}
                icon={<FontAwesome5 name='sign-out-alt' size={hp(2.5)} color="#737373"/>} 
              />
          </MenuOptions>
        </Menu>
        
      </View>
    </View>
  )
}

export default CustomHeader