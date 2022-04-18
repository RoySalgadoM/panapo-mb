import { View, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Input, ScrollView, Modal, FormControl } from "native-base";
import TableComponent from '../components/TableComponent';
import ProgressBarComponent from '../components/ProgressBarComponent';
import OvalosTextComponent from '../components/OvalosTextComponent';
import { ipServer } from '../config/Config';
import ModalComponent from '../components/ModalComponent';
import ActionsButtons from '../components/ActionsButtons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function ViewReports(props) {
    const [data, setData] = useState([])
    const [isLoadingTable, setIsLoadingTable] = useState(false)
    const [showModalInfo, setShowModalInfo] = useState(false)
    const [refreshing, setRefreshing] = React.useState(false);
    const [object, setObject] = useState(false)
    let token = ""
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getAllReports()
        setRefreshing(false)
    }, []);
    useEffect(() => {
        console.log(props.route.params?.id)

        getAllReports();
    }, [props.route.params?.id])
    const getToken = async () => {
        try {
            token = await AsyncStorage.getItem('token')

        } catch (e) {
            console.log(e)
            // error reading value
        }
    }


    const getAllReports = async () => {
        await getToken()
        setIsLoadingTable(true)
        fetch(`http://${ipServer}/api/report/`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                "Authorization": `Bearer${token}`,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => response.json())
            .then(async (responseJson) => {
                let tempData = []
                let cont = 0;
                for (let i = 0; i < responseJson.data.length; i++) {
                    let temp = {
                        cierre: "",
                        inicio: "",
                        requerimientos: "",
                        construccion: "",
                        analisis: "",
                        integracion: ""
                    }
                    setIsLoadingTable(true)

                    if (responseJson.data[i].project.id == props.route.params?.id) {
                        fetch(`http://${ipServer}/api/reportphases/`, {
                            method: 'GET',
                            headers: {
                                Accept: 'application/json',
                                "Authorization": `Bearer${token}`,
                                'Content-Type': 'application/json',
                            },
                        })
                            .then((response) => response.json())
                            .then(async (response2) => {
                                for (let m = 0; m < response2.data.length; m++) {
                                    if (response2.data[m].report.project.id == props.route.params?.id) {
                                
                                        if (response2.data[m].phases.id == 1) {
                                            temp={
                                                ...temp,
                                                inicio : response2.data[m].porcentaje
                                            }
                                        }
                                        if (response2.data[m].phases.id == 2) {
                                            temp={
                                                ...temp,
                                                requerimientos : response2.data[m].porcentaje
                                            }
                                            
                                        }
                                        if (response2.data[m].phases.id == 3) {
                                            temp={
                                                ...temp,
                                                analisis : response2.data[m].porcentaje
                                            }
                                            
                                        }
                                        if (response2.data[m].phases.id == 4) {
                                            temp={
                                                ...temp,
                                                construccion : response2.data[m].porcentaje
                                            }
                                            
                                        }
                                        if (response2.data[m].phases.id == 5) {
                                            temp={
                                                ...temp,
                                                integracion : response2.data[m].porcentaje
                                            }
                                            
                                        }
                                        if (response2.data[m].phases.id == 6) {
                                            temp={
                                                ...temp,
                                                cierre : response2.data[m].porcentaje
                                            }
                                            
                                        }

                                    }

                                }
                            })
                        cont++;
                        let start = new Date(responseJson.data[i].project.dateStart).getTime();
                        let end = new Date(responseJson.data[i].project.dateEnd).getTime();
                        let diferencia = end - start;
                        let final = diferencia / (1000 * 60 * 60 * 24)
                        let porcentaje = (final * responseJson.data[i].daysDeviation) / 100;
                        porcentaje = porcentaje * -1;
                        porcentaje = porcentaje * -1;
                        console.log(porcentaje)
                        let newData = [
                            cont, responseJson.data[i].date, responseJson.data[i].stagePlanned, responseJson.data[i].stageReal,
                            responseJson.data[i].phasePlanned, responseJson.data[i].phaseReal, 
                            <ProgressBarComponent progress={responseJson.data[i].percentage} text={`${responseJson.data[i].percentage}% Completado`} />,
                            
                            <ActionsButtons name={"bars"} action={() => {
                                
                                setObject(temp)
                                setShowModalInfo(true)
                                console.log(temp)
                            }} color={"white"} bgColor={"#0b5ed7"} />,
                            responseJson.data[i].cost,
                            
                            porcentaje >= 0 && porcentaje <= 10 ?
                                <OvalosTextComponent text={responseJson.data[i].daysDeviation} colorB={"rgb(40, 167, 69)"} />
                                : porcentaje >= 10 && porcentaje <= 15 ?
                                    <OvalosTextComponent text={responseJson.data[i].daysDeviation} colorB={"rgb(255, 193, 7)"} />
                                    :
                                    <OvalosTextComponent text={responseJson.data[i].daysDeviation} colorB={"rgb(220, 53, 69)"} />

                        ]
                        await tempData.push(newData)
                    }

                }
                await setData(tempData)
                setIsLoadingTable(false)
            })
    }

    return (
        <View style={{ backgroundColor: "#ffffff" }} alignItems={"center"} >
            <ScrollView refreshControl={<RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />} _contentContainerStyle={{
                minW: "100%"
            }}>
                <TableComponent isLoadingTable={isLoadingTable} setisLoadingTable={setIsLoadingTable} isOpen={true} title={"Reportes"}
                    isSearch={false}
                    tableHead={['#', 'Fecha', 'Etapa planeada', 'Etapa real', 'Fase planeada', 'Fase real', 'Porcentaje de avance total', 'Porcentaje de avance por fase', 'Costo total de inversión', 'Días de desviación']}
                    widthArr={[40, 180, 180, 180, 180, 180, 180, 120, 180, 120]}
                    data={data}
                />
            </ScrollView>

            <ModalComponent showButtonConfirm={true} content={
                <Modal.Body>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Inicio</FormControl.Label>
                        <Input type='number' value={`${object.inicio}`} isDisabled placeholder='Ejemplo: SIGEH' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Requerimientos</FormControl.Label>
                        <Input type='number' value={`${object.requerimientos}`} isDisabled placeholder='Ejemplo: SIGEH' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Análisis y diseño</FormControl.Label>
                        <Input type='number' value={`${object.analisis}`} isDisabled placeholder='Ejemplo: SIGEH' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Construcción</FormControl.Label>
                        <Input type='number' value={`${object.construccion}`} isDisabled placeholder='Ejemplo: SIGEH' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Integración y pruebas</FormControl.Label>
                        <Input type='number' value={`${object.integracion}`} isDisabled placeholder='Ejemplo: SIGEH' />
                    </FormControl>
                    <FormControl isDisabled isRequired>
                        <FormControl.Label>Cierre</FormControl.Label>
                        <Input type='number' value={`${object.cierre}`} isDisabled placeholder='Ejemplo: SIGEH' />
                    </FormControl>
                </Modal.Body>
            } showModal={showModalInfo} header={"Porcentaje de avances por fases"} setShowModal={setShowModalInfo} />
        </View>
    )
}