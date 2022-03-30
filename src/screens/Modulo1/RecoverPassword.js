import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Center, Heading, Box, VStack, Image, FormControl, Input, Link, HStack, Button } from "native-base";
import STYLES from '../../styles';

export default function RecoverPassword(props) {
    const recover = () => {
        props.navigation.navigate("index")
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
                        Ingresa el código que llegó a tu correo electrónico
                    </Heading>

                    <VStack ml={"3"} mr={"3"} space={3} mt="5">
                        <FormControl >
                            <FormControl.Label>Código</FormControl.Label>
                            <Input />
                        </FormControl>
                        <Heading style={STYLES.textCenter} size="xs" fontWeight="100" color="black" _dark={{
                        }}>
                            Ingrese su nueva contraseña en los siguientes campos
                        </Heading>
                        <FormControl>
                            <FormControl.Label >Contraseña</FormControl.Label>
                            <Input type="password" />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label >Confirmar contraseña</FormControl.Label>
                            <Input type="password" />
                        </FormControl>
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
