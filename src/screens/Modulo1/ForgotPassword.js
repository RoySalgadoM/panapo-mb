import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { Center, Heading, Box, VStack, Image, FormControl, Input, Link, HStack, Button } from "native-base";
import STYLES from '../../styles';
import AlertComponent from '../../components/AlertComponent';
import Loading from '../../components/Loading';
import { ipServer } from "../../config/Config"

export default function ForgotPassword(props) {
    const goToLogin = () => {
        props.navigation.navigate("login")
    }
    const [email, setEmail] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [empty, setEmpty] = useState(false)

    const recover = () => {
        if (email === "") {
            setEmpty(true)
        } else {
            setEmpty(false)
            let data = {
                "username": email
            }
            setIsLoading(true)
            fetch(`http://${ipServer}/api/user/password/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),

            })
                .then((response) => response.json())
                .then(async (responseJson) => {
                    if(responseJson.status==500){
                        setError(true)
                    setIsLoading(false)
                    }else{
                        setError(false)
                        setIsLoading(false)
                        props.navigation.navigate("recoverPassword")
                    }
                    
                })
                .catch((response) => {
                    setError(true)
                    setIsLoading(false)
                })
        }
    }
    return (
        <Center flexDirection={"column"} alignItems={"center"} style={[STYLES.backBlue, styles.height100, STYLES.fontWhite]}>
            <Center w="90%" bg={"white"}>
                {error ? <AlertComponent isOpen={setError} status={"error"} title={"Este correo no existe"} /> : null}
                {empty ? <AlertComponent isOpen={setEmpty} status={"error"} title={"Ingresa un correo"} /> : null}
                <Image mt={"2"} source={{
                    uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzvJ2rH4GkrSgqsGL9BU0s4Z4jm-aZ7XuT6RFNc1bZ4CawW2JDXJw6GzC7rE23m_7ry80&usqp=CAU"
                }} alt="Alternate Text" size="xl" />
                <Box safeArea p="2" py="8" mt={"-50"} w="100%">
                    <Heading style={STYLES.textCenter} size="xs" fontWeight="100" color="black" _dark={{
                    }}>
                        ¿Olvidaste tu contraseña? Solicita una nueva ingresando tu correo a continuación
                    </Heading>

                    <VStack ml={"3"} mr={"3"} space={3} mt="5">
                        <FormControl >
                            <FormControl.Label>Correo electrónico</FormControl.Label>
                            <Input type='email' value={email} onChangeText={value => setEmail(value)} />
                        </FormControl>
                        {isLoading ? <Loading /> : null}
                        <Button mt="4" bg="#042b61" onPress={recover}>
                            Confirmar
                        </Button>
                        <Link onPress={goToLogin} marginTop={"4"} _text={{
                            fontSize: "xs",
                            fontWeight: "500",
                            color: "indigo.500"
                        }} alignSelf="flex-start" mt="1">
                            Volver al inicio de sesión
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
