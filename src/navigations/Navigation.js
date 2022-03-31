import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from '../screens/Modulo1/Login';
import { createDrawerNavigator, DrawerItem } from '@react-navigation/drawer';
import ForgotPassword from '../screens/Modulo1/ForgotPassword';
import RecoverPassword from '../screens/Modulo1/RecoverPassword';
import LoginStack from '../navigations/stacks/LoginStack';
import Dashboard from '../screens/Dashboard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Icon } from 'react-native-elements';

import { BurgerIcon, IconButton } from "native-base";
import AltaDireccion from '../screens/AltaDireccion';
import Logout from '../screens/Logout';

const Drawer = createDrawerNavigator();

export default function Navigation(props) {
  const [logged, setLogged] = useState(false)
  const {navigation} = props;
  useEffect(() => {
    console.log("s")
  }, [navigation])
  
  
  
  return (
    <NavigationContainer  >
      <Drawer.Navigator>
        <Drawer.Screen name="index" component={Login} options={{headerShown: false, hidden: true, drawerItemStyle: { display: 'none' }}}></Drawer.Screen>
        <Drawer.Screen name="forgotPassword"  component={ForgotPassword} options={{headerShown: false, hidden: true, drawerItemStyle: { display: 'none' }}}/>
        <Drawer.Screen name="recoverPassword" component={RecoverPassword} options={{headerShown: false, hidden: true, drawerItemStyle: { display: 'none' }}}/>
        <Drawer.Screen  name="dashboard" options={{title:"Dashboard"}} component={Dashboard} />
        <Drawer.Screen  name="direction" options={{title:"Gestión de usuarios de alta dirección"}} component={AltaDireccion} />
        <Drawer.Screen  name="logout" options={{title:"Cerrar sesión"}} component={Logout} />

      </Drawer.Navigator>
    </NavigationContainer>
  )
}