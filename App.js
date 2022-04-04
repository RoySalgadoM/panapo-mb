import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from './src/components/Loading';
import { AuthContext } from './src/config/AuthContext';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {
  Text,
  Link,
  HStack,
  Center,
  Heading,
  Switch,
  useColorMode,
  NativeBaseProvider,
  extendTheme,
  VStack,
  Code,
  Button,
} from "native-base";

const config = {
  useSystemColorMode: false,
  initialColorMode: "dark",
};
export const theme = extendTheme({ config });

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();


import Login from "./src/screens/Modulo1/Login"
import RecoverPassword from './src/screens/Modulo1/RecoverPassword';
import ForgotPassword from './src/screens/Modulo1/ForgotPassword';
import Dashboard from './src/screens/Dashboard';
import AltaDireccion from './src/screens/AltaDireccion';
import Clientes from './src/screens/Clientes';
export default function App({ navigation }) {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            directior: null,
            coordinador: null,
            rape: null,
            rd: null,
            rolSign: null
          };
        case 'COORDINADOR':
          return {
            ...prevState,
            coordinador: action.enable
          };
        case 'DIRECTIVO':
          return {
            ...prevState,
            directivo: action.enable
          };
        case 'RAPE':
          return {
            ...prevState,
            rape: action.enable
          };
        case 'RD':
          return {
            ...prevState,
            rd: action.enable
          };
        case 'ROL_ACTIVE':
          return {
            ...prevState,
            rolSign: action.rol
          };
          
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      directivo: null,
      coordinador: null,
      rape: null,
      rd: null,
      rolSign: null
    }
  );

  const authContext = React.useMemo(
    () => ({
      signIn: async (token) => {
        dispatch({ type: 'SIGN_IN', token: token });
        try {
          await AsyncStorage.setItem('token',token)

      } catch (e) {
          console.log(e)
          // error reading value
      }
      },
      signOut: async () => {
        dispatch({ type: 'SIGN_OUT', token: null })
        dispatch({ type: 'DIRECTIVO', enable: null })
        dispatch({ type: 'RD', enable: null })
        dispatch({ type: 'RAPE', enable: null })
        dispatch({ type: 'COORDINADOR', enable: null })
        dispatch({ type: 'ROL_ACTIVE', rol: null })
      },
      getRoles: () => {
        return state.directivo
      },
      setRoles: async(directivo, coordinador, rape, rd) => {
        if (coordinador == true) {
          dispatch({ type: 'COORDINADOR', enable: true });
          dispatch({ type: 'ROL_ACTIVE', rol: "COORDINADOR" });
        } else if (rape == true) {
          dispatch({ type: 'RAPE', enable: true });
          dispatch({ type: 'ROL_ACTIVE', rol: "RAPE" });
        } else if (rd == true) {
          dispatch({ type: 'RD', enable: true });
          dispatch({ type: 'ROL_ACTIVE', rol: "RD" });
        } else if (directivo == true) {
          dispatch({ type: 'DIRECTIVO', enable: true });
          dispatch({ type: 'ROL_ACTIVE', rol: "DIRECTIVO" });
        }
      },
      setRoleActive: (rol) => {
        dispatch({ type: 'ROL_ACTIVE', rol: rol });
      }

    }),
    []
  );

    React.useEffect(() => {
      dispatch({ type: 'SIGN_OUT', token: null })
        dispatch({ type: 'DIRECTIVO', enable: null })
        dispatch({ type: 'RD', enable: null })
        dispatch({ type: 'RAPE', enable: null })
        dispatch({ type: 'COORDINADOR', enable: null })
        dispatch({ type: 'ROL_ACTIVE', rol: null })
    }, [])
  
  return (
    <NativeBaseProvider>
      <AuthContext.Provider value={authContext}>

        <NavigationContainer>
          {state.userToken == null ? (
              <Stack.Navigator>
                <Stack.Screen
                  name="login"
                  component={Login}
                  options={{
                    headerShown: false, hidden: true,
                    animationTypeForReplace: state.isSignout ? 'pop' : 'push',
                  }}
                />
                <Stack.Screen
                  name="forgotPassword"
                  component={ForgotPassword}
                  options={{
                    headerShown: false, hidden: true
                  }}
                />
                <Stack.Screen
                  name="recoverPassword"
                  component={RecoverPassword}
                  options={{
                    headerShown: false, hidden: true
                  }}
                />
              </Stack.Navigator>
            ) :

              state.rolSign == "COORDINADOR" ?
                <Drawer.Navigator initialRouteName='dashboard'>
                  <Drawer.Screen name="dashboard" options={{ title: "Dashboard", headerRight: () => (<Button onPress={() => authContext.signOut()} mr={2}>Cerrar sesión</Button>) }} component={Dashboard} />
                  <Drawer.Screen name="direction" options={{ title: "Gestión de usuarios de alta dirección" }} component={AltaDireccion} />
                  <Drawer.Screen name="clients" options={{ title: "Gestión de clientes" }} component={Clientes} />
                </Drawer.Navigator>
                : state.rolSign == "DIRECTIVO" ?
                  <Drawer.Navigator initialRouteName='dashboard'>
                    <Drawer.Screen name="dashboard" options={{ title: "Dashboard", headerRight: () => (<Button onPress={() => authContext.signOut()} mr={2}>Cerrar sesión</Button>) }} component={Dashboard} />
                  </Drawer.Navigator>
                  : state.rolSign == "RD" ?
                    <Drawer.Navigator initialRouteName='dashboard'>
                      <Drawer.Screen name="dashboard" options={{ title: "Dashboard", headerRight: () => (<Button onPress={() => authContext.signOut()} mr={2}>Cerrar sesión</Button>) }} component={Dashboard} />
                    </Drawer.Navigator>
                    : state.rolSign == "RAPE" ?
                      <Drawer.Navigator initialRouteName='dashboard'>
                        <Drawer.Screen name="dashboard" options={{ title: "Dashboard", headerRight: () => (<Button onPress={() => authContext.signOut()} mr={2}>Cerrar sesión</Button>) }} component={Dashboard} />
                      </Drawer.Navigator>
                      : null
          }
        </NavigationContainer>
      </AuthContext.Provider>
    </NativeBaseProvider>

  );
}

function ToggleDarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <HStack space={2} alignItems="center">
      <Text>Dark</Text>
      <Switch
        isChecked={colorMode === "light"}
        onToggle={toggleColorMode}
        aria-label={
          colorMode === "light" ? "switch to dark mode" : "switch to light mode"
        }
      />
      <Text>Light</Text>
    </HStack>
  );
}