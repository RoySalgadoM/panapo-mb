import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Center, Heading, Box, VStack, Image, FormControl, Input, Link, HStack, Button } from "native-base";
import STYLES from '../../styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertComponent from "../../components/AlertComponent"
import {ipServer} from "../../config/Config"

export default function Login(props) {
  const { logged, setLogged } = props;
  const [dataLogin, setDataLogin] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false)
  const goToForgot = () => {
    props.navigation.navigate("forgotPassword")
  }
  const { navigation } = props;
  const goToDashboard = async () => {
    fetch(`http://${ipServer}:8081/api/auth/login`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataLogin),

    })
      .then((response) => response.json())
      .then(async(responseJson) => {
        console.log(responseJson)
        try {
          await AsyncStorage.setItem("token", responseJson.data.token)
          setErrorAlert(false)
          setDataLogin([])
          setLogged(true)
        } catch (e) {
          
        }
      })
      .catch((error) => {
        setErrorAlert(true)
      });
      
  }
  return (
      <Center flexDirection={"column"} alignItems={"center"} style={[STYLES.backBlue, styles.height100, STYLES.fontWhite]}>
        <Center w="90%" bg={"white"}>
        {errorAlert ? <AlertComponent isOpen={setErrorAlert} status={"error"} title={"Contraseña o usuario incorrecto"}/> : null}
          <Image mt={"2"} source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzvJ2rH4GkrSgqsGL9BU0s4Z4jm-aZ7XuT6RFNc1bZ4CawW2JDXJw6GzC7rE23m_7ry80&usqp=CAU"
          }} alt="Alternate Text" size="xl" />
          <Box safeArea p="2" py="8" mt={"-50"} w="100%">
            <Heading style={STYLES.textCenter} size="xs" fontWeight="100" color="black" _dark={{
            }}>
              Para ingresar al sistema primero inicia sesión
            </Heading>

            <VStack ml={"3"} mr={"3"} space={3} mt="5">
              <FormControl >
                <FormControl.Label>Correo electrónico</FormControl.Label>
                <Input value={dataLogin.username} onChangeText={value => setDataLogin({ ...dataLogin, ["username"]: value })} type='email' />
              </FormControl>
              <FormControl>
                <FormControl.Label >Contraseña</FormControl.Label>
                <Input value={dataLogin.password} onChangeText={value => setDataLogin({ ...dataLogin, ["password"]: value })} type="password" />
              </FormControl>
              <Button mt="4" bg="#042b61" onPress={goToDashboard}>
                Iniciar sesión
              </Button>
              <Link onPress={goToForgot} marginTop={"4"} _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500"
              }} alignSelf="flex-start" mt="1">
                Recuperar contraseña
              </Link>
            </VStack>
          </Box>
        </Center>
      </Center>
    )

}
const styles = StyleSheet.create({
  height100: {
    height: "100%"
  }
})
