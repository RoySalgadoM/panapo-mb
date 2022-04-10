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
import OvalosTextComponent from '../../components/OvalosTextComponent';

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
    const [dataProspecto, setdataProspecto] = useState([])
    const [showModalInfoProspecto, setShowModalInfoProspecto] = useState(false)
    const [dataClient, setDataClient] = useState([])
    const [dataProjects, setDataProjects] = useState([])
    const [objectModifyProspecto, setObjectModifyProspecto] = useState([])
    const [showModalModifyProspecto, setShowModalModifyProspecto] = useState(false)
    const [modalStart, setModalStart] = useState(false)
    const [personal, setPersonal] = useState([])
    const [dataRolProject, setDataRolProject] = useState([])
    let token = ""
    const getAllClients = async () => {
        await getToken()
        fetch(`http://${ipServer}/api/client/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Authorization": `Bearer${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                let client = []
                for (let i = 0; i < responseJson.data.length; i++) {
                    let clientTemp = [
                        <Select.Item label={`${responseJson.data[i].name} ${responseJson.data[i].surname}`} value={responseJson.data[i].id} />
                    ]
                    client.push(clientTemp)
                }
                setDataClient(client)

            })
    }

    const getAllPersonal = async () => {
        await getToken()
        fetch(`http://${ipServer}/api/person/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Authorization": `Bearer${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                let personal = []
                for (let i = 0; i < responseJson.data.length; i++) {
                    if (responseJson.data.profession.name === "Docente" || responseJson.data.profession.name === "Becario") {
                        let personalTemp = [
                            <Select.Item label={`${responseJson.data[i].name} ${responseJson.data[i].surname}`} value={responseJson.data[i].id} />
                        ]
                        personal.push(personalTemp)
                    }

                }
                setPersonal(personal)

            })
    }

    const getAllProyectos = async () => {
        await getToken()
        fetch(`http://${ipServer}/api/project/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Authorization": `Bearer${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                let proyects = []
                for (let i = 0; i < responseJson.data.length; i++) {
                    let proyectTemp = [
                        <Select.Item label={`${responseJson.data[i].name}`} value={responseJson.data[i].id} />
                    ]
                    proyects.push(proyectTemp)
                }
                setDataProjects(proyects)
            })
    }

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

    const modifyProspeto = async () => {
        console.log(objectModify)
        setIsLoadingModify(true)
        setShowModalModifyProspecto(false)
        await getToken()
        fetch(`http://${ipServer}/api/project/`, {
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
                getAllClients()
                getAllProspecto()
                getAllProyectos()
                setShowModal(false)
                setIsLoadingModify(false)
            })
        setIsLoadingModify(false)
    }
    const register = async () => {
        setIsLoadingRegister(true)
        await getToken()
        let registerData = {}
        if (object.hasOwnProperty('project') && object.project != 0) {
            registerData = {
                ...object,
                client: {
                    id: object.client,
                },
                statusProject: {
                    id: 1
                },
                project: {
                    id: object.project
                }

            }

        } else if (object.project == 0) {
            registerData = {
                ...object,
                client: {
                    id: object.client,
                },
                statusProject: {
                    id: 1
                }
            }

            delete registerData.project
        }

        console.log(registerData)

        fetch(`http://${ipServer}/api/project/`, {
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
                console.log(responseJson)
                setIsOpenAlertRegister(true)
                getAll()
                getAllClients()
                getAllProspecto()
                getAllProyectos()
                setObject([])
                setIsLoadingRegister(false)
            })
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
                                setShowModalInfoProspecto(true)
                                setObjectModifyProspecto(responseJson.data[i])
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

    const getAllProspecto = async () => {
        setisLoadingTable(true);
        await getToken()

        fetch(`http://${ipServer}/api/project/`, {
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
                    if (responseJson.data[i].statusProject.description === "Prospecto") {
                        let newData = [
                            responseJson.data[i].id, responseJson.data[i].name, `${responseJson.data[i].client.name} ${responseJson.data[i].client.surname} ${responseJson.data[i].client.secondSurname}`, `${responseJson.data[i].months} meses`, responseJson.data[i].numberBeca
                            , <OvalosTextComponent text={"Prospecto"} colorB={"#6c757d"} />,
                            <ActionsButtons name={"info"} action={() => {
                                setShowModalInfoProspecto(true)
                                setObjectModifyProspecto(responseJson.data[i])
                            }} color={"white"} bgColor={"#17a2b8"} />,
                            <ActionsButtons action={() => {
                                setShowModalModifyProspecto(true)
                                setObjectModify(responseJson.data[i])

                            }} name={"edit"} color={"black"} bgColor={"#ffc107"} />,
                            <ActionsButtons name={"play"} action={() => {
                                setObjectModify(responseJson.data[i])
                                setModalStart(true)
                            }} color={"white"} bgColor={"#28a745"} />

                        ];
                        await tempData.push(newData)

                    }


                }
                await setdataProspecto(tempData)
                setisLoadingTable(false)
            })
            .catch((error) => {
                console.log(error)
                setisLoadingTable(false)
            });
    }
    useEffect(() => {
        getAll()
        getAllClients()
        getAllProyectos()
        getAllProspecto()
        getAllPersonal()
    }, [])

    return (
        <View>
            {isOpenAlertDelete ? <AlertComponent isOpen={setisOpenAlertDelete} status={"success"} title={"Estado cambiado correctamente"} /> : null}
            {isOpenAlertRegister ? <AlertComponent isOpen={setIsOpenAlertRegister} status={"success"} title={"Proyecto registrado correctamente"} /> : null}
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
                                        {dataProjects}
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
                                    <Input type='text' value={object.description} onChangeText={value => setObject({ ...object, ["description"]: value })} placeholder='Ejemplo: Sirve para hacer compras' />
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
                                        {dataClient}
                                    </Select>
                                </FormControl>

                            </Stack>

                        } />
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Cotización del proyecto"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">
                                <FormControl isRequired>
                                    <FormControl.Label>Presupuesto</FormControl.Label>
                                    <Input value={object.cotizacion} onChangeText={value => setObject({ ...object, ["cotizacion"]: value })} type='text' placeholder='Ejemplo: 5000' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Precio al cliente</FormControl.Label>
                                    <Input value={object.priceClient} type='text' onChangeText={value => setObject({ ...object, ["priceClient"]: value })} placeholder='Ejemplo: 50000' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Tiempo estimado (meses)</FormControl.Label>
                                    <Input type='text' value={object.months} onChangeText={value => setObject({ ...object, ["months"]: value })} placeholder='Ejemplo: 12' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Cantidad de becarios</FormControl.Label>
                                    <Input type='date' value={object.numberBeca} onChangeText={value => setObject({ ...object, ["numberBeca"]: value })} placeholder='Ejemplo: 2' />
                                </FormControl>
                            </Stack>
                        } />
                    </Center>
                } />
                {isOpenAlertModify ? <AlertComponent isOpen={setIsOpenAlertModify} status={"success"} title={"Proyecto modificado correctamente"} /> : null}
                <TableComponent showIcon={true} isLoadingTable={isLoadingTable} setisLoadingTable={setisLoadingTable} isOpen={false} title={"Proyectos prospecto"}
                    tableHead={['#', 'Nombre del proyecto', 'Cliente', 'Tiempo estimado', 'Cantidad de becarios', 'Estado', 'Detalles', 'Modificar', 'Iniciar']}
                    widthArr={[40, 180, 180, 180, 120, 120, 120, 120, 120]}
                    data={dataProspecto}
                />
                <TableComponent isLoadingTable={isLoadingTable} setisLoadingTable={setisLoadingTable} isOpen={true} title={"Proyectos"}
                    isSearch={false}
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
                    {/* <FormControl isDisabled isRequired>
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
                    </FormControl> */}
                    {isLoadingModify ? <Loading /> : null}
                </Modal.Body>
            } showModal={showModalInfo} header={"Detalles del personal"} setShowModal={setShowModalInfo} />


            {/* Prospectos */}
            <ModalComponent showButtonConfirm={true} action={modify} content={
                <Modal.Body>
                    <Center>
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Datos del proyecto"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">
                                <FormControl isDisabled isRequired>
                                    <FormControl.Label>Proyecto anterior</FormControl.Label>
                                    <Input type='number' value={showModalInfoProspecto ? objectModifyProspecto.project == null ? "No aplica" : objectModifyProspecto.project.name : ""} onChangeText={value => setObject({ ...object, ["name"]: value })} placeholder='Ejemplo: SIGEH' />
                                </FormControl>
                                <FormControl isDisabled isRequired>
                                    <FormControl.Label>Nombre del proyecto</FormControl.Label>
                                    <Input type='number' value={objectModifyProspecto.name} onChangeText={value => setObject({ ...object, ["name"]: value })} placeholder='Ejemplo: SIGEH' />
                                </FormControl>
                                <FormControl isDisabled isRequired>
                                    <FormControl.Label>Estado del proyecto</FormControl.Label>
                                    <Input type='text' value={`Prospecto`} onChangeText={value => setObject({ ...object, ["statusProject"]: 1 })} placeholder='Prospecto' />
                                </FormControl>
                                <FormControl isDisabled isRequired>
                                    <FormControl.Label>Descripción del proyecto</FormControl.Label>
                                    <Input type='text' value={objectModifyProspecto.description} onChangeText={value => setObject({ ...object, ["description"]: value })} placeholder='Ejemplo: Sirve para hacer compras' />
                                </FormControl>
                            </Stack>

                        } />
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Clientes del proyecto"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">

                                <FormControl isDisabled isRequired>
                                    <FormControl.Label>Cliente</FormControl.Label>
                                    <Input value={showModalInfoProspecto ? `${objectModifyProspecto.client.name} ${objectModifyProspecto.client.surname}` : ""} onChangeText={value => setObject({ ...object, ["cotizacion"]: value })} type='text' placeholder='Ejemplo: María' />
                                </FormControl>

                            </Stack>

                        } />
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Cotización del proyecto"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">
                                <FormControl isDisabled isRequired>
                                    <FormControl.Label>Presupuesto</FormControl.Label>
                                    <Input value={objectModifyProspecto.cotizacion} onChangeText={value => setObject({ ...object, ["cotizacion"]: value })} type='text' placeholder='Ejemplo: María' />
                                </FormControl>
                                <FormControl isDisabled isRequired>
                                    <FormControl.Label>Precio al cliente</FormControl.Label>
                                    <Input value={objectModifyProspecto.priceClient} type='text' onChangeText={value => setObject({ ...object, ["priceClient"]: value })} placeholder='Ejemplo: Valdez' />
                                </FormControl>
                                <FormControl isDisabled isRequired>
                                    <FormControl.Label>Tiempo estimado (meses)</FormControl.Label>
                                    <Input type='text' value={objectModifyProspecto.months} onChangeText={value => setObject({ ...object, ["months"]: value })} placeholder='Ejemplo: Díaz' />
                                </FormControl>
                                <FormControl isDisabled isRequired>
                                    <FormControl.Label>Cantidad de becarios</FormControl.Label>
                                    <Input type='date' value={objectModifyProspecto.numberBeca} onChangeText={value => setObject({ ...object, ["numberBeca"]: value })} placeholder='Ejemplo: 2002-06-21' />
                                </FormControl>
                            </Stack>
                        } />
                    </Center>
                    {isLoadingModify ? <Loading /> : null}
                </Modal.Body>
            } showModal={showModalInfoProspecto} header={"Detalles del proyecto"} setShowModal={setShowModalInfoProspecto} />

            <ModalComponent action={modifyProspeto} content={
                <Modal.Body>
                    <Center>
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Datos del proyecto"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">
                                <FormControl isRequired>
                                    <FormControl.Label>Proyecto anterior</FormControl.Label>
                                    <Select selectedValue={showModalModifyProspecto ? objectModify.project == null ? "0" : objectModify.project.id : ""} accessibilityLabel="Eco" placeholder="Seleccione una opción" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={value => setObjectModify({ ...objectModify, "project": { ...objectModify.project, "id": value } })}>
                                        <Select.Item label="No aplica" value="0" />
                                        {dataProjects}
                                    </Select>
                                    <FormControl.HelperText>
                                        Solo seleccionar un proyecto si se requiere un nuevo ciclo del mismo
                                    </FormControl.HelperText>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Nombre del proyecto</FormControl.Label>
                                    <Input type='number' value={objectModify.name} onChangeText={value => setObjectModify({ ...objectModify, ["name"]: value })} placeholder='Ejemplo: SIGEH' />
                                </FormControl>
                                <FormControl isDisabled isRequired>
                                    <FormControl.Label>Estado del proyecto</FormControl.Label>
                                    <Input type='text' value={`Prospecto`} onChangeText={value => setObjectModify({ ...objectModify, ["statusProject"]: 1 })} placeholder='Prospecto' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Descripción del proyecto</FormControl.Label>
                                    <Input type='text' value={objectModify.description} onChangeText={value => setObjectModify({ ...objectModify, ["description"]: value })} placeholder='Ejemplo: Sirve para hacer compras' />
                                </FormControl>
                            </Stack>

                        } />
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Clientes del proyecto"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">

                                <FormControl isRequired>
                                    <FormControl.Label>Seleccionar un cliente</FormControl.Label>
                                    <Select selectedValue={showModalModifyProspecto ? objectModify.client.id : ""} accessibilityLabel="Eco" placeholder="Seleccione una opción" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={value => setObjectModify({ ...objectModify, "client": { ...objectModify.client, "id": value } })}>
                                        {dataClient}
                                    </Select>
                                </FormControl>

                            </Stack>

                        } />
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Cotización del proyecto"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">
                                <FormControl isRequired>
                                    <FormControl.Label>Presupuesto</FormControl.Label>
                                    <Input value={objectModify.cotizacion} onChangeText={value => setObjectModify({ ...objectModify, ["cotizacion"]: value })} type='text' placeholder='Ejemplo: 5000' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Precio al cliente</FormControl.Label>
                                    <Input value={objectModify.priceClient} type='text' onChangeText={value => setObjectModify({ ...objectModify, ["priceClient"]: value })} placeholder='Ejemplo: 50000' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Tiempo estimado (meses)</FormControl.Label>
                                    <Input type='text' value={objectModify.months} onChangeText={value => setObjectModify({ ...objectModify, ["months"]: value })} placeholder='Ejemplo: 12' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Cantidad de becarios</FormControl.Label>
                                    <Input type='date' value={objectModify.numberBeca} onChangeText={value => setObjectModify({ ...objectModify, ["numberBeca"]: value })} placeholder='Ejemplo: 2' />
                                </FormControl>
                            </Stack>
                        } />
                    </Center>
                    {isLoadingModify ? <Loading /> : null}
                </Modal.Body>
            } showModal={showModalModifyProspecto} header={"Modificar proyecto"} setShowModal={setShowModalModifyProspecto} />

            <ModalComponent action={modifyProspeto} content={
                <Modal.Body>
                    <Center>
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Datos del proyecto"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">

                                <FormControl isRequired>
                                    <FormControl.Label>Acrónimo del proyecto</FormControl.Label>
                                    <Input type='text' value={objectModify.acronym} onChangeText={value => setObjectModify({ ...objectModify, ["acronym"]: value })} placeholder='Ejemplo: PANAPO' />
                                </FormControl>

                                <FormControl isDisabled isRequired>
                                    <FormControl.Label>Estado del proyecto</FormControl.Label>
                                    <Select selectedValue={`2`} accessibilityLabel="Eco" placeholder="Seleccione una opción" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="2" />
                                    }} mt={1} >
                                        <Select.Item label="Activo" value="2" />
                                    </Select>
                                    <FormControl.HelperText>
                                        Al iniciar un proyecto su estado por defecto es activo
                                    </FormControl.HelperText>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Prioridad</FormControl.Label>
                                    <Select selectedValue={`2`} onValueChange={value => setObjectModify({ ...objectModify, ["priority"]: value })} accessibilityLabel="Eco" placeholder="Seleccione una opción" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="2" />
                                    }} mt={1} >
                                        <Select.Item label="Selecciona una opción" value="0" />
                                        <Select.Item label="Alta" value="Alta" />
                                        <Select.Item label="Media" value="Media" />
                                        <Select.Item label="Baja" value="Baja" />
                                    </Select>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Fecha de inicio</FormControl.Label>
                                    <Input value={objectModify.dateStart} onChangeText={value => setObjectModify({ ...objectModify, ["dateStart"]: value })} type='text' placeholder='Ejemplo: 5000' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Fecha de fin</FormControl.Label>
                                    <Input value={objectModify.dateEnd} onChangeText={value => setObjectModify({ ...objectModify, ["dateEnd"]: value })} type='text' placeholder='Ejemplo: 5000' />
                                </FormControl>
                            </Stack>

                        } />
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Equipo de trabajo"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">

                                <FormControl isRequired>
                                    <FormControl.Label>Responsable de Proyecto</FormControl.Label>
                                    <Select  accessibilityLabel="Eco" placeholder="Seleccione una opción" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={value => setObjectModify({ ...objectModify, "client": { ...objectModify.client, "id": value } })}>
                                        {personal}
                                    </Select>
                                </FormControl>

                            </Stack>

                        } />
                        <BoxHeaderComponent fontColor={"#ffffff"} bgColor={"#049474"} isButton={false} action={register} isOpen={false} title={"Cotización del proyecto"} showIcon={true} Form={
                            <Stack mt={3} space={4} w="100%">
                                <FormControl isRequired>
                                    <FormControl.Label>Presupuesto</FormControl.Label>
                                    <Input value={objectModify.cotizacion} onChangeText={value => setObjectModify({ ...objectModify, ["cotizacion"]: value })} type='text' placeholder='Ejemplo: 5000' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Precio al cliente</FormControl.Label>
                                    <Input value={objectModify.priceClient} type='text' onChangeText={value => setObjectModify({ ...objectModify, ["priceClient"]: value })} placeholder='Ejemplo: 50000' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Tiempo estimado (meses)</FormControl.Label>
                                    <Input type='text' value={objectModify.months} onChangeText={value => setObjectModify({ ...objectModify, ["months"]: value })} placeholder='Ejemplo: 12' />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormControl.Label>Cantidad de becarios</FormControl.Label>
                                    <Input type='date' value={objectModify.numberBeca} onChangeText={value => setObjectModify({ ...objectModify, ["numberBeca"]: value })} placeholder='Ejemplo: 2' />
                                </FormControl>
                            </Stack>
                        } />
                    </Center>
                    {isLoadingModify ? <Loading /> : null}
                </Modal.Body>
            } showModal={modalStart} header={"Iniciar proyecto"} setShowModal={setModalStart} />
            <AlertDialogComponent isOpen={showAlertDelete} setIsOpen={setShowAlertDelete} header={"Desactivar personal"} body={"Se desactivará el personal"} action={onDelete} />
            <EnableAlertDialogComponent isOpen={showAlertEnable} setIsOpen={setShowAlertEnable} header={"Activar personal"} body={"Se activará el personal"} action={onEnable} />
        </View>
    )
}