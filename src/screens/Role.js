import React,{useState,useEffect} from 'react';
import { VStack, Box, Divider, Center, Button, ScrollView, View } from 'native-base';
import { Icon } from 'react-native-elements';
import { AuthContext } from '../config/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Role(props) {
    const {setRoleActive } = React.useContext(AuthContext);
    const [role, setRole] = useState("")
    let rol="";
    let rd="";
    let rape=""
    let coordinador=""
    const [rdGet, setRdGet] = useState("")
    const [rapeGet, setRapeGet] = useState("")
    const [coordinadorGet, setCoordinadorGet] = useState("")

    const getRole=async()=>{
        try {
            rol = await AsyncStorage.getItem('role');
            rd = await AsyncStorage.getItem('RD');
            rape = await AsyncStorage.getItem('RAPE');
            coordinador = await AsyncStorage.getItem('COORDINADOR');
            setRole(rol)
            setRdGet(rd)
            setCoordinadorGet(coordinador)
            setRapeGet(rape)
          } catch (e) {
            console.log(e)
          }
    }
    getRole()
    const action = (rol) => {
        setRoleActive(rol)
        props.navigation.navigate("dashboard",{rol:rol})
        getRole()
    }
    return (
            <View >
                <ScrollView m={"4"}   _contentContainerStyle={{
                    minW: "100%"
                }}>
                    {role!="COORDINADOR" && coordinadorGet === "true" ? <Center bg={"#049474"}>
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

                    </Center>:null}
                    {role!="RAPE" && rapeGet === "true" ? <Center bg={"#049474"} mt={"3"}>
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

                    </Center>:null}
                    
                    {role!="RD" && rdGet === "true"? <Center bg={"#049474"} mt={"3"}>
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

                    </Center>:null}
                    
                </ScrollView>
            </View>
    )
}