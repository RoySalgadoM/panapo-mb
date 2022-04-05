import { View } from 'react-native'
import React, { useState, useEffect } from 'react'
import TableComponent from '../../components/TableComponent'
import { Center, ScrollView, Input, Stack, FormControl, WarningOutlineIcon, Modal, Text, Select, CheckIcon } from "native-base";
import BoxHeaderComponent from '../../components/BoxHeaderComponent'
import ActionsButtons from '../../components/ActionsButtons'
import ModalComponent from '../../components/ModalComponent'
import AlertDialogComponent from '../../components/AlertDialogComponent'
import AlertComponent from '../../components/AlertComponent'
import { ipServer } from "../../config/Config"
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Loading';
import EnableAlertDialogComponent from '../../components/EnableAlertDialogComponent';

export default function ProjectsCoordinador() {
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
    const [showAlertEnable, setShowAlertEnable] = useState(false)
    let token = ""
    const onDelete = () => {
        let data = {
            ...objectModify,
            status: {
                description: "Inactivo",
                id: 2,
            }
        }
        fetch(`http://${ipServer}/api/person/`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                "Authorization": `Bearer${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                setisOpenAlertDelete(true)
                getAll()
                setObjectModify([])
            })
    }
    const onEnable = () => {
        setisOpenAlertDelete(true)
        let data = {
            ...objectModify,
            status: {
                description: "Activo",
                id: 1,
            }
        }

        fetch(`http://${ipServer}/api/person/`, {
            method: 'PUT',
            headers: {
                Accept: 'application/json',
                "Authorization": `Bearer${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),

        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                setisOpenAlertDelete(true)
                getAll()
                setObjectModify([])
            })
    }

    const modify = async () => {
        setIsLoadingModify(true)
        setShowModal(false)
        await getToken()
        fetch(`http://${ipServer}/api/person/`, {
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
        console.log(object)
        // let registerData = {
        //     ...object,
        //     profession: {
        //         id: object.profession,
        //     }
        // }
        // fetch(`http://${ipServer}/api/person/`, {
        //     method: 'POST',
        //     headers: {
        //         Accept: 'application/json',
        //         "Authorization": `Bearer${token}`,
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(registerData),

        // })
        //     .then((response) => response.json())
        //     .then(async (responseJson) => {
        //         setObject([])
        //         setIsOpenAlertRegister(true)
        //         getAll()
        //         setIsLoadingRegister(false)
        //     })



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

        fetch(`http://${ipServer}/api/person/`, {
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
                    if (responseJson.data[i].profession.description != "Directivo") {
                        let newData = [
                            responseJson.data[i].id, `${responseJson.data[i].name} ${responseJson.data[i].surname} ${responseJson.data[i].secondSurname}`, responseJson.data[i].email
                            , <ActionsButtons name={"info"} action={() => {
                                setShowModalInfo(true)
                                setObjectModify(responseJson.data[i])
                            }} color={"white"} bgColor={"#17a2b8"} />,
                            <ActionsButtons action={() => {
                                setShowModal(true)
                                setObjectModify(responseJson.data[i])

                            }} name={"edit"} color={"black"} bgColor={"#ffc107"} />,
                            responseJson.data[i].status.id == 1 ? <ActionsButtons name={"trash"} action={() => {
                                setShowAlertDelete(true)
                                setObjectModify(responseJson.data[i])
                            }} color={"white"} bgColor={"#dc3545"} /> : <ActionsButtons name={"check-circle"} action={() => {
                                setShowAlertEnable(true)
                                setObjectModify(responseJson.data[i])
                            }} color={"white"} bgColor={"#218838"} />

                        ];
                        await tempData.push(newData)

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
            {isOpenAlertDelete ? <AlertComponent isOpen={setisOpenAlertDelete} status={"success"} title={"Estado cambiado correctamente"} /> : null}
            {isOpenAlertRegister ? <AlertComponent isOpen={setIsOpenAlertRegister} status={"success"} title={"Personal registrado correctamente"} /> : null}
            {isOpenAlertErrorRegister ? <AlertComponent isOpen={setIsOpenAlertErrorRegister} status={"error"} title={"Rellene todos los campos primero"} /> : null}
            <ScrollView _contentContainerStyle={{
                minW: "100%"
            }}>

                <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={true} action={register} isOpen={false} title={"Registrar proyectos"} showIcon={true} Form={
                    <Center>
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Datos del proyecto"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">
                                <FormControl isRequired>
                                    <FormControl.Label>Proyecto anterior</FormControl.Label>
                                    <Select selectedValue={object.project} accessibilityLabel="Eco" placeholder="Seleccione una opción" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={value => setObject({ ...object, ["project"]: value })}>
                                        <Select.Item label="No aplica" value="0" />
                                        <Select.Item label="SIGEH" value="1" />
                                        <Select.Item label="SIGEH" value="2" />
                                    </Select>
                                    <FormControl.HelperText>
                                        Solo seleccionar un proyecto si se requiere un nuevo ciclo del mismo
                                    </FormControl.HelperText>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Nombre del proyecto</FormControl.Label>
                                    <Input type='number' value={object.name} onChangeText={value => setObject({ ...object, ["name"]: value })} placeholder='Ejemplo: SIGEH' />
                                </FormControl>
                                <FormControl isDisabled isRequired>
                                    <FormControl.Label>Estado del proyecto</FormControl.Label>
                                    <Input type='text' value={`Prospecto`} onChangeText={value => setObject({ ...object, ["statusProject"]: 1 })} placeholder='Prospecto' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Descripción del proyecto</FormControl.Label>
                                    <Input type='text' value={object.description} onChangeText={value => setObject({ ...object, ["description"]: value })} placeholder='Ejemplo: Email' />
                                </FormControl>
                            </Stack>

                        } />
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Clientes del proyecto"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">
                                
                                <FormControl isRequired>
                                    <FormControl.Label>Seleccionar un cliente</FormControl.Label>
                                    <Select selectedValue={object.client} accessibilityLabel="Eco" placeholder="Seleccione una opción" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={value => setObject({ ...object, ["client"]: value })}>
                                        <Select.Item label="Roy" value="1" />
                                        <Select.Item label="Miriam" value="2" />
                                        {
                                            
                                        }
                                    </Select>
                                </FormControl>

                            </Stack>

                        } />
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Cotización del proyecto"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">
                                <FormControl isRequired>
                                    <FormControl.Label>Presupuesto</FormControl.Label>
                                    <Input value={object.cotizacion} onChangeText={value => setObject({ ...object, ["cotizacion"]: value })} type='text' placeholder='Ejemplo: María' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Precio al cliente</FormControl.Label>
                                    <Input value={object.priceClient} type='text' onChangeText={value => setObject({ ...object, ["priceClient"]: value })} placeholder='Ejemplo: Valdez' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Tiempo estimado (meses)</FormControl.Label>
                                    <Input type='text' value={object.months} onChangeText={value => setObject({ ...object, ["months"]: value })} placeholder='Ejemplo: Díaz' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Cantidad de becarios</FormControl.Label>
                                    <Input type='date' value={object.numberBeca} onChangeText={value => setObject({ ...object, ["numberBeca"]: value })} placeholder='Ejemplo: 2002-06-21' />
                                </FormControl>
                            </Stack>
                        } />
                    </Center>


                } />
                {isOpenAlertModify ? <AlertComponent isOpen={setIsOpenAlertModify} status={"success"} title={"Personal modificado correctamente"} /> : null}
                <TableComponent showIcon={true} isLoadingTable={isLoadingTable} setisLoadingTable={setisLoadingTable} isOpen={false} title={"Proyectos"}
                    isSearch={false}
                    tableHead={['#', 'Nombre completo', 'Correo', 'Detalles', 'Modificar', 'Acción']}
                    widthArr={[40, 180, 200, 150, 120, 120]}
                    data={data}
                />
                <TableComponent isLoadingTable={isLoadingTable} setisLoadingTable={setisLoadingTable} isOpen={true} title={"Proyectos"}
                    tableHead={['#', 'Nombre completo', 'Correo', 'Detalles', 'Modificar', 'Acción']}
                    widthArr={[40, 180, 200, 150, 120, 120]}
                    data={data}
                />
            </ScrollView>
            <ModalComponent action={modify} content={
                <Modal.Body>
                    {errorModify ? <AlertComponent isOpen={setErrorModify} status={"error"} title={"Rellene todos los campos primero"} /> : null}
                    {equalsPassword ? <AlertComponent isOpen={setEqualsPassword} status={"error"} title={"Las contraseñas no son iguales"} /> : null}
                    <FormControl isRequired>
                        <FormControl.Label>Nombre</FormControl.Label>
                        <Input value={objectModify.name} onChangeText={value => setObjectModify({ ...objectModify, ["name"]: value })} type='text' placeholder='Ejemplo: María' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Primer apellido</FormControl.Label>
                        <Input value={objectModify.surname} type='text' onChangeText={value => setObjectModify({ ...objectModify, ["surname"]: value })} placeholder='Ejemplo: Valdez' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Segundo apellido</FormControl.Label>
                        <Input type='text' value={objectModify.secondSurname} onChangeText={value => setObjectModify({ ...objectModify, ["secondSurname"]: value })} placeholder='Ejemplo: Díaz' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Fecha de nacimiento</FormControl.Label>
                        <Input type='date' value={objectModify.dateBirth} onChangeText={value => setObjectModify({ ...objectModify, ["dateBirth"]: value })} placeholder='Ejemplo: 2002-06-21' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Teléfono</FormControl.Label>
                        <Input type='number' value={objectModify.phone} onChangeText={value => setObjectModify({ ...objectModify, ["phone"]: value })} placeholder='Ejemplo: 7775698741' />
                    </FormControl>
                    <FormControl isRequired>
                        <FormControl.Label>Rol</FormControl.Label>
                        <Select selectedValue={showModal ? `${objectModify.profession.id}` : ""} accessibilityLabel="Eco" placeholder="Seleccione una opción" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={value => setObjectModify({ ...objectModify, "profession": { ...objectModify.profession, "id": value } })}>
                            <Select.Item label="Docente" value="1" />
                            <Select.Item label="Becario" value="2" />
                        </Select>
                    </FormControl>
                    {isLoadingModify ? <Loading /> : null}
                </Modal.Body>
            } showModal={showModal} header={"Modificar directivo"} setShowModal={setShowModal} />
            <ModalComponent showButtonConfirm={true} action={modify} content={
                <Modal.Body>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Nombre</FormControl.Label>
                        <Input value={objectModify.name} onChangeText={value => setObjectModify({ ...objectModify, ["name"]: value })} type='text' placeholder='Ejemplo: María' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Primer apellido</FormControl.Label>
                        <Input value={objectModify.surname} type='text' onChangeText={value => setObjectModify({ ...objectModify, ["surname"]: value })} placeholder='Ejemplo: Valdez' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Segundo apellido</FormControl.Label>
                        <Input type='text' value={objectModify.secondSurname} onChangeText={value => setObjectModify({ ...objectModify, ["secondSurname"]: value })} placeholder='Ejemplo: Díaz' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Fecha de nacimiento</FormControl.Label>
                        <Input type='date' value={objectModify.dateBirth} onChangeText={value => setObjectModify({ ...objectModify, ["dateBirth"]: value })} placeholder='Ejemplo: 2002-06-21' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Teléfono</FormControl.Label>
                        <Input type='number' value={objectModify.phone} onChangeText={value => setObjectModify({ ...objectModify, ["phone"]: value })} placeholder='Ejemplo: 7775698741' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Rol</FormControl.Label>
                        <Select selectedValue={showModalInfo ? `${objectModify.profession.id}` : ""} accessibilityLabel="Eco" placeholder="Seleccione una opción" _selectedItem={{
                            bg: "teal.600",
                            endIcon: <CheckIcon size="5" />
                        }} mt={1} onValueChange={value => setObjectModify({ ...objectModify, "profession": { ...objectModify.profession, "id": value } })}>
                            <Select.Item label="Docente" value="1" />
                            <Select.Item label="Becario" value="2" />
                        </Select>
                    </FormControl>
                    {isLoadingModify ? <Loading /> : null}
                </Modal.Body>
            } showModal={showModalInfo} header={"Detalles del personal"} setShowModal={setShowModalInfo} />
            <AlertDialogComponent isOpen={showAlertDelete} setIsOpen={setShowAlertDelete} header={"Desactivar personal"} body={"Se desactivará el personal"} action={onDelete} />
            <EnableAlertDialogComponent isOpen={showAlertEnable} setIsOpen={setShowAlertEnable} header={"Activar personal"} body={"Se activará el personal"} action={onEnable} />
        </View>
    )
}