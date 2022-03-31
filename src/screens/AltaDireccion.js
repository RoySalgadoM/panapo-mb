import { View, Form } from 'react-native'
import React, { useState, useEffect } from 'react'
import TableComponent from '../components/TableComponent'
import ProgressBarComponent from '../components/ProgressBarComponent'
import OvalosTextComponent from '../components/OvalosTextComponent'
import { Center, ScrollView, Flex, Divider, Box, Input, Stack, FormControl, WarningOutlineIcon, Button, Modal } from "native-base";
import BoxHeaderComponent from '../components/BoxHeaderComponent'
import ActionsButtons from '../components/ActionsButtons'
import ModalComponent from '../components/ModalComponent'
import AlertDialogComponent from '../components/AlertDialogComponent'
import AlertComponent from '../components/AlertComponent'
import { ipServer } from "../config/Config"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AltaDireccion() {
    const [showModal, setShowModal] = useState(false);
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [isOpenAlertDelete, setisOpenAlertDelete] = useState(false)
    const [isOpenAlertRegister, setIsOpenAlertRegister] = useState(false)
    const [isOpenAlertErrorRegister, setIsOpenAlertErrorRegister] = useState(false)
    const [dataModalEdit, setDataModalEdit] = useState([])
    const [data, setData] = useState([])

    const [object, setObject] = useState([])
    const onDelete = () => {
        setisOpenAlertDelete(true)
        console.log(object)
    }
    const register = () => {
        console.log(object)
        if (object.name === undefined) {
            setIsOpenAlertErrorRegister(true)
        } else {
            setIsOpenAlertRegister(true)
            setIsOpenAlertErrorRegister(false)
            setObject([])
        }
    }

    let token = ""
    const getToken = async () => {
        try {
            token = await AsyncStorage.getItem('token')
        } catch (e) {
            console.log(e)
            // error reading value
        }
    }

    const getAll=async()=>{
        await getToken()
        fetch(`http://${ipServer}:8081/api/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer${token}`
            }
        })
            .then(async(response) => await response.json(response))
            .then(async(responseJson) => {
                let tempData = []
                for (let i = 0; i < responseJson.data.length; i++) {
                    let newData = [
                        responseJson.data[i].id, responseJson.data[i].person.name, responseJson.data[i].person.email
                        , <ActionsButtons action={() => setShowModal(true)} name={"edit"} color={"black"} bgColor={"#ffc107"} />, <ActionsButtons name={"trash"} action={() => {
                            setShowAlertDelete(true)
                            setObject({ "id": responseJson.data[i].id })
                        }} color={"white"} bgColor={"#dc3545"} />
                    ];
                    await tempData.push(newData)
                }
                await setData(tempData)
                console.log(data)
            })
            .catch((error) => {
                console.log(error)
            });
    }
    useEffect(() => {
        getAll()
    },[])

    return (
        <View>
            {isOpenAlertDelete ? <AlertComponent isOpen={setisOpenAlertDelete} status={"success"} title={"Directivo eliminado correctamente"} /> : null}
            {isOpenAlertRegister ? <AlertComponent isOpen={setIsOpenAlertRegister} status={"success"} title={"Directivo registrado correctamente"} /> : null}
            {isOpenAlertErrorRegister ? <AlertComponent isOpen={setIsOpenAlertErrorRegister} status={"error"} title={"Rellene todos los campos primero"} /> : null}
            <ScrollView _contentContainerStyle={{
                minW: "100%"
            }}>
                <BoxHeaderComponent action={register} isOpen={false} title={"Registrar directivo"} showIcon={true} Form={
                    <Center>
                        <Stack mt={3} space={4} w="100%">
                            <FormControl isRequired>
                                <FormControl.Label>Nombre</FormControl.Label>
                                <Input value={object.name} onChangeText={value => setObject({ ...object, ["name"]: value })} type='text' placeholder='Ejemplo: María' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Primer apellido</FormControl.Label>
                                <Input value={object.name} type='text' onChangeText={value => setObject({ ...object, ["surname"]: value })} placeholder='Ejemplo: Valdez' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Segundo apellido</FormControl.Label>
                                <Input type='text' value={object.name} onChangeText={value => setObject({ ...object, ["surname"]: value })} placeholder='Ejemplo: Díaz' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Correo electrónico</FormControl.Label>
                                <Input type='email' value={object.name} onChangeText={value => setObject({ ...object, ["surname"]: value })} placeholder='Ejemplo: utez@utez.edu.mx' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Contraseña</FormControl.Label>
                                <Input type='password' value={object.name} onChangeText={value => setObject({ ...object, ["surname"]: value })} placeholder='************' />
                            </FormControl>

                        </Stack>
                    </Center>


                } />
                <TableComponent isOpen={true} title={"Registrados"}
                    isSearch={true}
                    tableHead={['#', 'Nombre completo', 'Correo electrónico', 'Modificar', 'Eliminar']}
                    widthArr={[40, 180, 200, 120, 120]}
                    data={data}
                />
            </ScrollView>
            <ModalComponent content={
                <Modal.Body>
                    <FormControl isRequired>
                        <FormControl.Label>Nombre</FormControl.Label>
                        <Input type='text' placeholder='Ejemplo: María' />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Something is wrong.
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Primer apellido</FormControl.Label>
                        <Input type='text' placeholder='Ejemplo: Valdez' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Segundo apellido</FormControl.Label>
                        <Input type='text' placeholder='Ejemplo: Díaz' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Correo electrónico</FormControl.Label>
                        <Input type='email' placeholder='Ejemplo: utez@utez.edu.mx' />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Contraseña</FormControl.Label>
                        <Input type='password' placeholder='************' />
                        <FormControl.HelperText>
                            La contraseña solo se cambiara si ingresa algún valor
                        </FormControl.HelperText>
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Confirmar contraseña</FormControl.Label>
                        <Input type='password' placeholder='************' />
                    </FormControl>
                </Modal.Body>
            } showModal={showModal} header={"Modificar directivo"} setShowModal={setShowModal} />

            <AlertDialogComponent isOpen={showAlertDelete} setIsOpen={setShowAlertDelete} header={"Eliminar directivo"} body={"Se eliminará el directivo"} action={onDelete} />

        </View>
    )
}