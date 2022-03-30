import { View, Text } from 'react-native'
import React, { useState } from 'react'
import TableComponent from '../components/TableComponent'
import ProgressBarComponent from '../components/ProgressBarComponent'
import OvalosTextComponent from '../components/OvalosTextComponent'
import { Center, ScrollView, Flex, Divider, Box, Input, Stack, FormControl, WarningOutlineIcon, Button, Modal } from "native-base";
import BoxHeaderComponent from '../components/BoxHeaderComponent'
import ActionsButtons from '../components/ActionsButtons'
import ModalComponent from '../components/ModalComponent'

export default function AltaDireccion() {
    const [showModal, setShowModal] = useState(false);
    const [showModalDelete, setShowModalDelete] = useState(false);
    return (
        <View>
            <ScrollView _contentContainerStyle={{
                minW: "100%"
            }}>
                <BoxHeaderComponent isOpen={false} title={"Registrar directivo"} showIcon={true} Form={
                    <Center>
                        <Stack mt={3} space={4} w="75%" maxW="300px">
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
                            <FormControl isRequired>
                                <FormControl.Label>Contraseña</FormControl.Label>
                                <Input type='password' placeholder='************' />
                            </FormControl>
                            <Button mt="4" bg="#042b61" >
                                Registrar
                            </Button>
                        </Stack>
                    </Center>


                } />
                <TableComponent isOpen={true} title={"Registrados"}
                isSearch={true}
                    tableHead={['#', 'Nombre completo', 'Correo electrónico', 'Modificar', 'Eliminar']}
                    widthArr={[40, 180, 200, 120, 120]}
                    data={[
                        ['1', 'Marco Hernández Goméz', "utez@utez.edu.mx"
                            , <ActionsButtons action={() => setShowModal(true)} name={"edit"} color={"black"} bgColor={"#ffc107"} />, <ActionsButtons name={"trash"} action={() => setShowModalDelete(true)} color={"white"} bgColor={"#dc3545"} />],
                        ['1', 'Sofía Montes Herrea', "utez@utez.edu.mx"
                            , <ActionsButtons action={() => setShowModal(true)} name={"edit"} color={"black"} bgColor={"#ffc107"} />, <ActionsButtons name={"trash"} action={() => setShowModalDelete(true)} color={"white"} bgColor={"#dc3545"} />]
                    ]}
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

            <ModalComponent content={
                <Modal.Body>
                    <FormControl isRequired>
                        <FormControl.Label>Nombre del directivo</FormControl.Label>
                        <Input type='text' placeholder='Ingrese el nombre completo para poder eliminarlo' />
                    </FormControl>
                </Modal.Body>
            } showModal={showModalDelete} header={"Eliminar directivo"} setShowModal={setShowModalDelete} />
        </View>
    )
}