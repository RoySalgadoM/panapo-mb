import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Icon } from 'react-native-elements';
import { Text } from 'react-native';
import Login from '../../screens/Modulo1/Login';

const Stack = createStackNavigator();

export default function IndexStack(props) {
  const { navigation } = props;
  return (
    <Stack.Navigator>
      <Stack.Screen name='index'
        component={Login} />

    </Stack.Navigator>
  )
}