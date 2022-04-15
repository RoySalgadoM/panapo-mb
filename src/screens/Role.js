import React from 'react';
import { VStack, Box, Divider, Center, Button, ScrollView, View } from 'native-base';
import { Icon } from 'react-native-elements';
import { AuthContext } from '../config/AuthContext';

export default function Role(props) {
    const {setRoleActive, getRoles } = React.useContext(AuthContext);

    const action = (rol) => {
        setRoleActive(rol)
        props.navigation.navigate("dashboard")
    }
    return (
            <View >
                <ScrollView m={"4"}   _contentContainerStyle={{
                    minW: "100%"
                }}>
                    <Center bg={"#049474"}>
                        <Box px="4" borderBottomColor={"#fff"} pt="4" _text={
                            {
                                fontSize: "25",
                                color: "#fff"
                            }
                        }>
                            Coordinador
                        </Box>
                        <Box px="4" pb="4">
                            <Icon type="font-awesome" size={100} name={"user"} color={"black"} />
                        </Box>
                        <Box px="4">
                            <Button m={"3"} onPress={()=>{
                                action("COORDINADOR")
                            }} backgroundColor={"#042B61"} startIcon rightIcon={<Icon type="ionicon" name={"enter-outline"} color={"white"} />}>
                                Cambiar
                            </Button>
                        </Box>

                    </Center>
                    <Center bg={"#049474"} mt={"3"}>
                        <Box px="4" borderBottomColor={"#fff"} pt="4" _text={
                            {
                                fontSize: "25",
                                color: "#fff"
                            }
                        }>
                            RAPE
                        </Box>
                        <Box px="4" pb="4">
                            <Icon type="font-awesome" size={100} name={"user"} color={"black"} />
                        </Box>
                        <Box px="4">
                            <Button m={"3"} onPress={()=>{
                                action("RAPE")
                            }} backgroundColor={"#042B61"} startIcon rightIcon={<Icon type="ionicon" name={"enter-outline"} color={"white"} />}>
                                Cambiar
                            </Button>
                        </Box>

                    </Center>
                    <Center bg={"#049474"} mt={"3"}>
                        <Box px="4" borderBottomColor={"#fff"} pt="4" _text={
                            {
                                fontSize: "25",
                                color: "#fff"
                            }
                        }>
                            RD
                        </Box>
                        <Box px="4" pb="4">
                            <Icon type="font-awesome" size={100} name={"user"} color={"black"} />
                        </Box>
                        <Box px="4">
                            <Button m={"3"} onPress={()=>{
                                action("RD")
                            }} backgroundColor={"#042B61"} startIcon rightIcon={<Icon type="ionicon" name={"enter-outline"} color={"white"} />}>
                                Cambiar
                            </Button>
                        </Box>

                    </Center>
                </ScrollView>
            </View>
    )
}