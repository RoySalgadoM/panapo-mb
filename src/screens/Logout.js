import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Logout(props) {
  console.log(props)
    const logout = async () => {
        try {
          await AsyncStorage.setItem("isLogged","false")
         
        } catch (e) {
            console.log(e)
        }
        props.navigation.jumpTo("index")
      }
    useEffect(() => {
      logout()
    }, [])
    
  return (
    <View>
      <Text>Logout</Text>
    </View>
  )
}