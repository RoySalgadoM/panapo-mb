import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Center, Heading, Box, VStack, Image, FormControl, Input, Link, HStack, Button } from "native-base";
import STYLES from '../../styles';
import Loading from '../../components/Loading';
import AlertComponent from '../../components/AlertComponent';
import { ipServer } from "../../config/Config"

export default function RecoverPassword(props) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [empty, setEmpty] = useState(false)
    const [data, setData] = useState([])
    const [equals, setEquals] = useState(false)
    const recover = () => {
        if (data.hasOwnProperty('password') && data.hasOwnProperty('confirmPassword') && data.hasOwnProperty('code')) {
            if (data.password == "" || data.confirmPassword == "" || data.code == "") {
                setEmpty(true)
            } else {
                if (data.password === data.confirmPassword) {
                    setIsLoading(true)
                    fetch(`http://${ipServer}/api/user/confir/`, {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),

                    })
                        .then((response) => response.json())
                        .then(async (responseJson) => {
                            if (responseJson.error ==true) {
                                setError(true)
                                setIsLoading(false)
                                setEquals(false)
                            } else {
                                setError(false)
                                setIsLoading(false)
                                setEquals(false)
                                props.navigation.navigate("login")
                            }

                        })
                        .catch((response) => {
                            setError(true)
                            setIsLoading(false)
                        })
                }else{
                    setEquals(true)
                    setEmpty(false)
                }

            }

        } else {
            setEmpty(true)
        }
    }
    return (
        <Center flexDirection={"column"} alignItems={"center"} style={[STYLES.backBlue, styles.height100, STYLES.fontWhite]}>
            <Center w="90%" bg={"white"}>
                {error ? <AlertComponent isOpen={setError} status={"error"} title={"Este código no es correcto"} /> : null}
                {empty ? <AlertComponent isOpen={setEmpty} status={"error"} title={"Rellena todos los campos"} /> : null}
                {equals ? <AlertComponent isOpen={setEquals} status={"error"} title={"Las contraseñas no son iguales"} /> : null}
                <Image mt={"2"} source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzvJ2rH4GkrSgqsGL9BU0s4Z4jm-aZ7XuT6RFNc1bZ4CawW2JDXJw6GzC7rE23m_7ry80&usqp=CAU"
                }} alt="Alternate Text" size="xl" />
                <Box safeArea p="2" py="8" mt={"-50"} w="100%">
                    <Heading style={STYLES.textCenter} size="xs" fontWeight="100" color="black" _dark={{
                    }}>
                        Ingresa el código que llegó a tu correo electrónico
                    </Heading>

                    <VStack ml={"3"} mr={"3"} space={3} mt="5">
                        <FormControl >
                            <FormControl.Label>Código</FormControl.Label>
                            <Input value={data.code} onChangeText={value => setData({ ...data, ["code"]: value })} />
                        </FormControl>
                        <Heading style={STYLES.textCenter} size="xs" fontWeight="100" color="black" _dark={{
                        }}>
                            Ingrese su nueva contraseña en los siguientes campos
                        </Heading>
                        <FormControl>
                            <FormControl.Label >Contraseña</FormControl.Label>
                            <Input value={data.password} onChangeText={value => setData({ ...data, ["password"]: value })} type="password" />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label >Confirmar contraseña</FormControl.Label>
                            <Input type="password" value={data.confirmPassword} onChangeText={value => setData({ ...data, ["confirmPassword"]: value })} />
                        </FormControl>
                        {isLoading ? <Loading /> : null}
                        <Button mt="4" bg="#042b61" onPress={recover}>
                            Cambiar contraseña
                        </Button>
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
