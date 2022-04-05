import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import TableComponent from '../components/TableComponent'
import { Center, ScrollView, Input, Stack, FormControl, WarningOutlineIcon, Modal } from "native-base";
import BoxHeaderComponent from '../components/BoxHeaderComponent'
import ActionsButtons from '../components/ActionsButtons'
import ModalComponent from '../components/ModalComponent'
import AlertDialogComponent from '../components/AlertDialogComponent'
import AlertComponent from '../components/AlertComponent'
import { ipServer } from "../config/Config"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';

export default function AltaDireccion() {
    const [showModal, setShowModal] = useState(false);
    const [showAlertDelete, setShowAlertDelete] = useState(false);
    const [isOpenAlertDelete, setisOpenAlertDelete] = useState(false)
    const [isOpenAlertRegister, setIsOpenAlertRegister] = useState(false)
    const [isOpenAlertModify, setIsOpenAlertModify] = useState(false)
    const [isOpenAlertErrorRegister, setIsOpenAlertErrorRegister] = useState(false)
    const [data, setData] = useState([])
    const [isLoadingTable, setisLoadingTable] = useState(true)
    const [object, setObject] = useState([])
    const [objectModify, setObjectModify] = useState([])
    const [isLoadingRegister, setIsLoadingRegister] = useState(false)
    const [isLoadingModify, setIsLoadingModify] = useState(false)
    const [errorModify, setErrorModify] = useState(false)
    const [equalsPassword, setEqualsPassword] = useState(false)

    const [filterText, setFilterText] = useState("");

    let token = ""
    const onDelete = () => {
        console.log(object.id)
        fetch(`http://${ipServer}/api/user/` + object.id, {
                    method: 'DELETE',
                    headers: {
                        Accept: 'application/json',
                        "Authorization": `Bearer${token}`,
                        'Content-Type': 'application/json',
                    },

                })
                    .then((response) => response.json())
                    .then(async (responseJson) => {
                        console.log(responseJson)
                        setObject([])
                        setisOpenAlertDelete(true)
                        getAll()
                        setIsLoadingModify(false)
                    })
                setIsLoadingModify(false)
    }
    
    const modify = async () => {
        await getToken()
        console.log(objectModify)
        if (objectModify.person.hasOwnProperty('name') && objectModify.person.hasOwnProperty('surname') && objectModify.person.hasOwnProperty('secondSurname') && objectModify.hasOwnProperty('password') && objectModify.hasOwnProperty('confirmPassword')) {

            if (objectModify.person.name === "" || objectModify.person.surname == "" || objectModify.person.secondSurname == "") {
                setErrorModify(true)
            } else if (objectModify.password === objectModify.confirmPassword) {
                setEqualsPassword(false)
                setIsLoadingModify(true)
                setErrorModify(false)
                setShowModal(false)
                fetch(`http://${ipServer}/api/user/update`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        "Authorization": `Bearer${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(objectModify),

                })
                    .then((response) => response.json())
                    .then(async (responseJson) => {
                        setObjectModify([])
                        setIsOpenAlertModify(true)
                        getAll()
                        setIsLoadingModify(false)
                    })
                setIsLoadingModify(false)

            } else {
                setEqualsPassword(true)
            }


        } else if (objectModify.person.hasOwnProperty('name') && objectModify.person.hasOwnProperty('surname') && objectModify.person.hasOwnProperty('secondSurname') && objectModify.hasOwnProperty('password')) {
            setErrorModify(true)
        }
        else if (objectModify.person.hasOwnProperty('name') && objectModify.person.hasOwnProperty('surname') && objectModify.person.hasOwnProperty('secondSurname')) {
            if (objectModify.person.name === "" || objectModify.person.surname == "" || objectModify.person.secondSurname == "") {
                setErrorModify(true)
            } else {
                setIsLoadingModify(true)
                setEqualsPassword(false)
                setErrorModify(false)
                setShowModal(false)
                fetch(`http://${ipServer}/api/person/`, {
                    method: 'PUT',
                    headers: {
                        Accept: 'application/json',
                        "Authorization": `Bearer${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(objectModify.person),

                })
                    .then((response) => response.json())
                    .then(async (responseJson) => {
                        setObjectModify([])
                        setIsOpenAlertModify(true)
                        getAll()
                        setIsLoadingModify(false)
                    })
            }

        } else {
            console.log("error")
        }
    }
    const register = () => {
        if (object.hasOwnProperty('name') && object.hasOwnProperty('surname') && object.hasOwnProperty('secondSurname') && object.hasOwnProperty('email')) {

            setIsOpenAlertErrorRegister(false)

            setIsLoadingRegister(true)
            let registerData = {
                "password": object.email,
                "person": {
                    "name": object.name,
                    "surname": object.surname,
                    "secondSurname": object.secondSurname,
                    "email": object.email,
                    "profession": {
                        "id": 3,
                        "description": "Directivo"
                    },
                    "status": {
                        "id": 1,
                        "description": "Activo"
                    }
                },
                "authorities": [
                    {
                        "id": 1,
                        "description": "Directivo"
                    }
                ],
                "status": {
                    "id": 1,
                    "description": "Activo"
                }
            }
            fetch(`http://${ipServer}/api/user/`, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    "Authorization": `Bearer${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(registerData),

            })
                .then((response) => response.json())
                .then(async (responseJson) => {
                    setObject([])
                    setIsOpenAlertRegister(true)
                    getAll()
                    setIsLoadingRegister(false)
                })

        } else {
            setIsLoadingRegister(false)
            setIsOpenAlertRegister(false)
            setIsOpenAlertErrorRegister(true)
        }
    }


    const getToken = async () => {
        try {
            token = await AsyncStorage.getItem('token')

        } catch (e) {
            console.log(e)
            // error reading value
        }
    }

    const getAll = async () => {
        setisLoadingTable(true);
        await getToken()

        fetch(`http://${ipServer}/api/user/`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer${token}`
            }
        })
            .then(async (response) => await response.json(response))
            .then(async (responseJson) => {
                let tempData = []
                for (let i = 0; i < responseJson.data.length; i++) {
                    for (let r = 0; r < responseJson.data[i].authorities.length; r++) {
                        if (responseJson.data[i].authorities[r].description === "Directivo") {
                            let newData = [
                                responseJson.data[i].id, `${responseJson.data[i].person.name} ${responseJson.data[i].person.surname} ${responseJson.data[i].person.secondSurname}`, responseJson.data[i].person.email
                                , <ActionsButtons action={() => {
                                    setShowModal(true)
                                    setObjectModify(responseJson.data[i])

                                }} name={"edit"} color={"black"} bgColor={"#ffc107"} />, <ActionsButtons name={"trash"} action={() => {
                                    setShowAlertDelete(true)
                                    setObject({
                                        "id": responseJson.data[i].id
                                    })
                                }} color={"white"} bgColor={"#dc3545"} />
                            ];
                            await tempData.push(newData)
                        }
                    }

                }
                await setData(tempData)
                setisLoadingTable(false)
            })
            .catch((error) => {
                console.log(error)
                setisLoadingTable(false)
            });
    }
    useEffect(() => {
        getAll()
    }, [])

    return (
        <View>
            {isOpenAlertDelete ? <AlertComponent isOpen={setisOpenAlertDelete} status={"success"} title={"Directivo eliminado correctamente"} /> : null}
            {isOpenAlertRegister ? <AlertComponent isOpen={setIsOpenAlertRegister} status={"success"} title={"Directivo registrado correctamente"} /> : null}
            {isOpenAlertErrorRegister ? <AlertComponent isOpen={setIsOpenAlertErrorRegister} status={"error"} title={"Rellene todos los campos primero"} /> : null}
            <ScrollView _contentContainerStyle={{
                minW: "100%"
            }}>
                <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={true} action={register} isOpen={false} title={"Registrar directivo"} showIcon={true} Form={
                    <Center>
                        <Stack mt={3} space={4} w="100%">
                            <FormControl isRequired>
                                <FormControl.Label>Nombre</FormControl.Label>
                                <Input value={object.name} onChangeText={value => setObject({ ...object, ["name"]: value })} type='text' placeholder='Ejemplo: María' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Primer apellido</FormControl.Label>
                                <Input value={object.surname} type='text' onChangeText={value => setObject({ ...object, ["surname"]: value })} placeholder='Ejemplo: Valdez' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Segundo apellido</FormControl.Label>
                                <Input type='text' value={object.secondSurname} onChangeText={value => setObject({ ...object, ["secondSurname"]: value })} placeholder='Ejemplo: Díaz' />
                            </FormControl>
                            <FormControl isRequired>
                                <FormControl.Label>Correo electrónico</FormControl.Label>
                                <Input type='email' value={object.email} onChangeText={value => setObject({ ...object, ["email"]: value })} placeholder='Ejemplo: utez@utez.edu.mx' />
                            </FormControl>
                            {isLoadingRegister ? <Loading /> : null}
                        </Stack>
                    </Center>


                } />
                {isOpenAlertModify ? <AlertComponent isOpen={setIsOpenAlertModify} status={"success"} title={"Directivo modificado correctamente"} /> : null}
                <TableComponent isLoadingTable={isLoadingTable} setisLoadingTable={setisLoadingTable} isOpen={true} title={"Registrados"}
                    isSearch={true}
                    tableHead={['#', 'Nombre completo', 'Correo electrónico', 'Modificar', 'Eliminar']}
                    widthArr={[40, 180, 200, 120, 120]}
                    data={data}
                />
            </ScrollView>
            <ModalComponent action={modify} content={
                <Modal.Body>
                    {errorModify ? <AlertComponent isOpen={setErrorModify} status={"error"} title={"Rellene todos los campos primero"} /> : null}
                    {equalsPassword ? <AlertComponent isOpen={setEqualsPassword} status={"error"} title={"Las contraseñas no son iguales"} /> : null}
                    <FormControl isRequired>
                        <FormControl.Label>Nombre</FormControl.Label>
                        <Input type='text' value={showModal ? objectModify.person.name : ""} onChangeText={value => setObjectModify({ ...objectModify, "person": { ...objectModify.person, "name": value } })} placeholder='Ejemplo: María' />
                        <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                            Something is wrong.
                        </FormControl.ErrorMessage>
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Primer apellido</FormControl.Label>
                        <Input type='text' value={showModal ? objectModify.person.surname : ""} onChangeText={value => setObjectModify({ ...objectModify, "person": { ...objectModify.person, "surname": value } })} placeholder='Ejemplo: Valdez' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Segundo apellido</FormControl.Label>
                        <Input type='text' value={showModal ? objectModify.person.secondSurname : ""} onChangeText={value => setObjectModify({ ...objectModify, "person": { ...objectModify.person, "secondSurname": value } })} placeholder='Ejemplo: Díaz' />
                    </FormControl>
                    <FormControl>
                        <FormControl.Label>Contraseña</FormControl.Label>
                        <Input value={objectModify.password} onChangeText={value => setObjectModify({ ...objectModify, ["password"]: value })} type='password' placeholder='************' />
                        <FormControl.HelperText>
                            La contraseña solo se cambiara si ingresa algún valor
                        </FormControl.HelperText>
                    </FormControl>

                    <FormControl>
                        <FormControl.Label>Confirmar contraseña</FormControl.Label>
                        <Input type='password' value={objectModify.confirmPassword} onChangeText={value => setObjectModify({ ...objectModify, ["confirmPassword"]: value })} placeholder='************' />
                    </FormControl>
                    {isLoadingModify ? <Loading /> : null}
                </Modal.Body>
            } showModal={showModal} header={"Modificar directivo"} setShowModal={setShowModal} />

            <AlertDialogComponent isOpen={showAlertDelete} setIsOpen={setShowAlertDelete} header={"Eliminar directivo"} body={"Se eliminará el directivo"} action={onDelete} />

        </View>
    )
}