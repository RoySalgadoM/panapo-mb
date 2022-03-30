import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Center, Heading, Box, VStack, Image, FormControl, Input, Link, HStack, Button } from "native-base";
import STYLES from '../../styles';

export default function ForgotPassword(props) {
    const goToLogin = () => {
        props.navigation.navigate("index")
    }

    const recover = () => {
        props.navigation.navigate("recoverPassword")
    }
    return (
        <Center flexDirection={"column"} alignItems={"center"} style={[STYLES.backBlue, styles.height100, STYLES.fontWhite]}>
            <Center w="90%" bg={"white"}>
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
                            <Input />
                        </FormControl>
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
