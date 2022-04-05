import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import TableComponent from '../components/TableComponent'
import { Center, ScrollView, Input, Stack, FormControl, WarningOutlineIcon, Modal, Text, Select, CheckIcon } from "native-base";
import BoxHeaderComponent from '../components/BoxHeaderComponent'
import ActionsButtons from '../components/ActionsButtons'
import ModalComponent from '../components/ModalComponent'
import AlertDialogComponent from '../components/AlertDialogComponent'
import AlertComponent from '../components/AlertComponent'
import { ipServer } from "../config/Config"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../components/Loading';

export default function Clientes() {
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
    const [showModalInfo, setShowModalInfo] = useState(false)

    const [filterText, setFilterText] = useState("");

    let token = ""
    const onDelete = () => {
        setisOpenAlertDelete(true)
        console.log(object)
    }

    const modify = async () => {
        console.log(objectModify)
        setIsLoadingModify(true)
        setShowModal(false)
        await getToken()
        fetch(`http://${ipServer}/api/client/`, {
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
                console.log(responseJson)
                setObjectModify([])
                setIsOpenAlertModify(true)
                getAll()
                setShowModal(false)
                setIsLoadingModify(false)
            })
        setIsLoadingModify(false)

        // if (objectModify.person.hasOwnProperty('name') && objectModify.person.hasOwnProperty('surname') && objectModify.person.hasOwnProperty('secondSurname') && objectModify.hasOwnProperty('password') && objectModify.hasOwnProperty('confirmPassword')) {

        //     if (objectModify.person.name === "" || objectModify.person.surname == "" || objectModify.person.secondSurname == "") {
        //         setErrorModify(true)
        //     } else if (objectModify.password === objectModify.confirmPassword) {
        //         setEqualsPassword(false)
        //         setIsLoadingModify(true)
        //         setErrorModify(false)
        //         setShowModal(false)
        //         fetch(`http://${ipServer}/api/user/update`, {
        //             method: 'PUT',
        //             headers: {
        //                 Accept: 'application/json',
        //                 "Authorization": `Bearer${token}`,
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(objectModify),

        //         })
        //             .then((response) => response.json())
        //             .then(async (responseJson) => {
        //                 console.log(responseJson)
        //                 setObjectModify([])
        //                 setIsOpenAlertModify(true)
        //                 getAll()
        //                 setIsLoadingModify(false)
        //             })
        //         setIsLoadingModify(false)

        //     } else {
        //         setEqualsPassword(true)
        //     }


        // } else if (objectModify.person.hasOwnProperty('name') && objectModify.person.hasOwnProperty('surname') && objectModify.person.hasOwnProperty('secondSurname') && objectModify.hasOwnProperty('password')) {
        //     setErrorModify(true)
        // }
        // else if (objectModify.person.hasOwnProperty('name') && objectModify.person.hasOwnProperty('surname') && objectModify.person.hasOwnProperty('secondSurname')) {
        //     if (objectModify.person.name === "" || objectModify.person.surname == "" || objectModify.person.secondSurname == "") {
        //         setErrorModify(true)
        //     } else {
        //         console.log("token")
        //         console.log(token)
        //         setIsLoadingModify(true)
        //         setEqualsPassword(false)
        //         setErrorModify(false)
        //         setShowModal(false)
        //         fetch(`http://${ipServer}/api/person/`, {
        //             method: 'PUT',
        //             headers: {
        //                 Accept: 'application/json',
        //                 "Authorization": `Bearer${token}`,
        //                 'Content-Type': 'application/json',
        //             },
        //             body: JSON.stringify(objectModify.person),

        //         })
        //             .then((response) => response.json())
        //             .then(async (responseJson) => {
        //                 console.log(responseJson)
        //                 setObjectModify([])
        //                 setIsOpenAlertModify(true)
        //                 getAll()
        //                 setIsLoadingModify(false)
        //             })
        //     }

        // } else {
        //     console.log("error")
        // }
    }
    const register = async () => {
        setIsLoadingRegister(true)
        await getToken()
        let registerData = {
            ...object,
            typeClient: {
                id: object.typeClient,
            }
        }
        console.log(registerData)
        fetch(`http://${ipServer}/api/client/`, {
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
        // if (object.hasOwnProperty('name') && object.hasOwnProperty('surname') && object.hasOwnProperty('secondSurname') && object.hasOwnProperty('email')) {

        //     setIsOpenAlertErrorRegister(false)

        //     setIsLoadingRegister(true)
        //     let registerData = {
        //         "password": object.email,
        //         "person": {
        //             "name": object.name,
        //             "surname": object.surname,
        //             "secondSurname": object.secondSurname,
        //             "email": object.email,
        //             "profession": {
        //                 "id": 2,
        //                 "description": "Docente"
        //             }
        //         },
        //         "authorities": [
        //             {
        //                 "id": 1,
        //                 "description": "Directivo"
        //             }
        //         ],
        //         "status": {
        //             "id": 1,
        //             "description": "Activo"
        //         }
        //     }
        //     fetch(`http://${ipServer}/api/user/`, {
        //         method: 'POST',
        //         headers: {
        //             Accept: 'application/json',
        //             "Authorization": `Bearer${token}`,
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(registerData),

        //     })
        //         .then((response) => response.json())
        //         .then(async (responseJson) => {
        //             setObject([])
        //             setIsOpenAlertRegister(true)
        //             getAll()
        //             setIsLoadingRegister(false)
        //         })

        // } else {
        //     setIsLoadingRegister(false)
        //     setIsOpenAlertRegister(false)
        //     setIsOpenAlertErrorRegister(true)
        // }
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

        fetch(`http://${ipServer}/api/client/`, {
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
                    let newData = [
                        responseJson.data[i].id, `${responseJson.data[i].name} ${responseJson.data[i].surname} ${responseJson.data[i].secondSurname}`, responseJson.data[i].company, responseJson.data[i].typeClient.description
                        , <ActionsButtons name={"info"} action={() => {
                            setShowModalInfo(true)
                            setObjectModify(responseJson.data[i])
                        }} color={"white"} bgColor={"#17a2b8"} />,
                        <ActionsButtons action={() => {
                            setShowModal(true)
                            setObjectModify(responseJson.data[i])

                        }} name={"edit"} color={"black"} bgColor={"#ffc107"} />
                    ];
                    await tempData.push(newData)
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
            {isOpenAlertDelete ? <AlertComponent isOpen={setisOpenAlertDelete} status={"success"} title={"Cliente eliminado correctamente"} /> : null}
            {isOpenAlertRegister ? <AlertComponent isOpen={setIsOpenAlertRegister} status={"success"} title={"Cliente registrado correctamente"} /> : null}
            {isOpenAlertErrorRegister ? <AlertComponent isOpen={setIsOpenAlertErrorRegister} status={"error"} title={"Rellene todos los campos primero"} /> : null}
            <ScrollView _contentContainerStyle={{
                minW: "100%"
            }}>

                <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={true} action={register} isOpen={false} title={"Registrar clientes"} showIcon={true} Form={

                    <Center>
                        <BoxHeaderComponent fontColor={"#000"} bgColor={"#ffffff"} isButton={false} action={register} isOpen={false} title={"Datos del cliente"} showIcon={true} Form={
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
                                    <FormControl.Label>Nombre de la empresa</FormControl.Label>
                                    <Input type='text' value={object.company} onChangeText={value => setObject({ ...object, ["company"]: value })} placeholder='Ejemplo: NISSAN' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Teléfono</FormControl.Label>
                                    <Input type='number' value={object.phoneClient} onChangeText={value => setObject({ ...object, ["phoneClient"]: value })} placeholder='Ejemplo: 7775698741' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Correo electrónico</FormControl.Label>
                                    <Input type='email' value={object.emailClient} onChangeText={value => setObject({ ...object, ["emailClient"]: value })} placeholder='Ejemplo: Email' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Tipo de cliente</FormControl.Label>
                                    <Select selectedValue={object.typeClient} accessibilityLabel="Eco" placeholder="Seleccione una opción" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={value => setObject({ ...object, ["typeClient"]: value })}>
                                        <Select.Item label="Externo" value="1" />
                                        <Select.Item label="Interno" value="2" />
                                    </Select>
                                </FormControl>

                            </Stack>
                        } />
                        <BoxHeaderComponent fontColor={"#000"} bgColor={"#ffffff"} isButton={false} action={register} isOpen={false} title={"Datos del representante del cliente"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">
                                <FormControl isRequired>
                                    <FormControl.Label>Nombre</FormControl.Label>
                                    <Input value={object.nameRepre} onChangeText={value => setObject({ ...object, ["nameRepre"]: value })} type='text' placeholder='Ejemplo: María' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Primer apellido</FormControl.Label>
                                    <Input value={object.surnameRepre} type='text' onChangeText={value => setObject({ ...object, ["surnameRepre"]: value })} placeholder='Ejemplo: Valdez' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Segundo apellido</FormControl.Label>
                                    <Input type='text' value={object.secondSurnameRepre} onChangeText={value => setObject({ ...object, ["secondSurnameRepre"]: value })} placeholder='Ejemplo: Díaz' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Teléfono</FormControl.Label>
                                    <Input type='number' value={object.phoneRepre} onChangeText={value => setObject({ ...object, ["phoneRepre"]: value })} placeholder='Ejemplo: 771144520' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Correo electrónico</FormControl.Label>
                                    <Input type='email' value={object.emailRepre} onChangeText={value => setObject({ ...object, ["emailRepre"]: value })} placeholder='Ejemplo: utez@utez.edu.mx' />
                                </FormControl>
                                {isLoadingRegister ? <Loading /> : null}
                            </Stack>
                        } />

                    </Center>


                } />
                {isOpenAlertModify ? <AlertComponent isOpen={setIsOpenAlertModify} status={"success"} title={"Cliente modificado correctamente"} /> : null}
                <TableComponent isLoadingTable={isLoadingTable} setisLoadingTable={setisLoadingTable} isOpen={true} title={"Clientes registrados"}
                    isSearch={true}
                    tableHead={['#', 'Nombre completo', 'Nombre de la empresa', 'Tipo del cliente', 'Detalles', 'Modificar']}
                    widthArr={[40, 180, 200, 150, 120, 120]}
                    data={data}
                />
            </ScrollView>
            <ModalComponent action={modify} content={
                <Modal.Body>
                    {errorModify ? <AlertComponent isOpen={setErrorModify} status={"error"} title={"Rellene todos los campos primero"} /> : null}
                    {equalsPassword ? <AlertComponent isOpen={setEqualsPassword} status={"error"} title={"Las contraseñas no son iguales"} /> : null}
                    <FormControl isRequired>
                        <FormControl.Label>Teléfono</FormControl.Label>
                        <Input type='number' value={objectModify.phoneClient} onChangeText={value => setObjectModify({ ...objectModify, ["phoneClient"]: value })} placeholder='Ejemplo: 7771144520' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Correo electrónico</FormControl.Label>
                        <Input type='email' value={objectModify.emailClient} onChangeText={value => setObjectModify({ ...objectModify, ["emailClient"]: value })} placeholder='Ejemplo: Email' />
                    </FormControl>
                    <Text style={{ fontWeight: "bold" }}>Información del representante del cliente</Text>
                    <FormControl isRequired>
                        <FormControl.Label>Nombre</FormControl.Label>
                        <Input value={objectModify.nameRepre} onChangeText={value => setObjectModify({ ...objectModify, ["nameRepre"]: value })} type='text' placeholder='Ejemplo: María' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Primer apellido</FormControl.Label>
                        <Input value={objectModify.surnameRepre} type='text' onChangeText={value => setObjectModify({ ...objectModify, ["surnameRepre"]: value })} placeholder='Ejemplo: Valdez' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Segundo apellido</FormControl.Label>
                        <Input type='text' value={objectModify.secondSurnameRepre} onChangeText={value => setObjectModify({ ...objectModify, ["secondSurnameRepre"]: value })} placeholder='Ejemplo: Díaz' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Teléfono</FormControl.Label>
                        <Input type='number' value={objectModify.phoneRepre} onChangeText={value => setObjectModify({ ...objectModify, ["phoneRepre"]: value })} placeholder='Ejemplo: 7771144520' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Correo electrónico</FormControl.Label>
                        <Input type='email' value={objectModify.emailRepre} onChangeText={value => setObjectModify({ ...objectModify, ["emailRepre"]: value })} placeholder='Ejemplo: utez@utez.edu.mx' />
                    </FormControl>
                    {isLoadingModify ? <Loading /> : null}
                </Modal.Body>
            } showModal={showModal} header={"Modificar directivo"} setShowModal={setShowModal} />
            <ModalComponent showButtonConfirm={true} action={modify} content={
                <Modal.Body>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Teléfono</FormControl.Label>
                        <Input type='number' value={objectModify.phoneClient} onChangeText={value => setObjectModify({ ...objectModify, ["phoneClient"]: value })} placeholder='Ejemplo: 7771144520' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Correo electrónico</FormControl.Label>
                        <Input type='email' value={objectModify.emailClient} onChangeText={value => setObjectModify({ ...objectModify, ["emailClient"]: value })} placeholder='Ejemplo: Email' />
                    </FormControl>
                    <Text style={{ fontWeight: "bold" }}>Información del representante del cliente</Text>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Nombre</FormControl.Label>
                        <Input value={objectModify.nameRepre} onChangeText={value => setObjectModify({ ...objectModify, ["nameRepre"]: value })} type='text' placeholder='Ejemplo: María' />
                    </FormControl>
                    <FormControl isRequired isDisabled>
                        <FormControl.Label>Primer apellido</FormControl.Label>
                        <Input value={objectModify.surnameRepre} type='text' onChangeText={value => setObjectModify({ ...objectModify, ["surnameRepre"]: value })} placeholder='Ejemplo: Valdez' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Segundo apellido</FormControl.Label>
                        <Input type='text' value={objectModify.secondSurnameRepre} onChangeText={value => setObjectModify({ ...objectModify, ["secondSurnameRepre"]: value })} placeholder='Ejemplo: Díaz' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Teléfono</FormControl.Label>
                        <Input type='number' value={objectModify.phoneRepre} onChangeText={value => setObjectModify({ ...objectModify, ["phoneRepre"]: value })} placeholder='Ejemplo: 7771144520' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Correo electrónico</FormControl.Label>
                        <Input type='email' value={objectModify.emailRepre} onChangeText={value => setObjectModify({ ...objectModify, ["emailRepre"]: value })} placeholder='Ejemplo: utez@utez.edu.mx' />
                    </FormControl>
                    {isLoadingModify ? <Loading /> : null}
                </Modal.Body>
            } showModal={showModalInfo} header={"Detalles del cliente"} setShowModal={setShowModalInfo} />

        </View>
    )
}