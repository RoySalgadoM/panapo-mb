import { View, Text } from 'react-native'
import React from 'react'
import TableComponent from '../components/TableComponent'
import { Center, ScrollView, Flex, Divider, Button } from "native-base";
import { MinusIcon, IconButton, Progress, Box } from "native-base";
import ProgressBarComponent from '../components/ProgressBarComponent';
import IconButtonComponent from '../components/IconButtonComponent';
import OvalosTextComponent from '../components/OvalosTextComponent';
import { CommonActions } from '@react-navigation/native';
import Example from './Modulo1/Example';

export default function Dashboard(props) {
  return (
    <View style={{ backgroundColor: "#ffffff" }} alignItems={"center"} >
      
      <ScrollView _contentContainerStyle={{
        minW: "100%"
      }}>
        <Center>
          <Box width="93%" bg="#28a745" p="3" alignItems={"center"} shadow={2} _text={{
            fontSize: "md",
            fontWeight: "bold",
            color: "white"
          }}>
            <Text style={{ fontSize: 20, color: "#ffff", fontWeight: "bold" }}>
              5
            </Text>
            <Text style={{ fontSize: 17, textAlign: "center", color: "#ffff" }}>
              Proyectos activos
            </Text>
          </Box>
        </Center>
        <Center>
          <Flex direction="row" mt={-6} mb={-4} _text={{
            color: "coolGray.800"
          }}>
            <Center size="48">
              <Box width="92%" bg="#ffc107" p="3" alignItems={"center"} shadow={2} _text={{
                fontSize: "md",
                fontWeight: "bold",
                color: "white"
              }}>
                <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
                  5
                </Text>
                <Text style={{ fontSize: 17, textAlign: "center", color: "black" }}>
                  Proyectos pausados
                </Text>
              </Box>
            </Center>
            <Center size="48">
              <Box width="92%" bg="#17a2b8" p="3" alignItems={"center"} shadow={2} _text={{
                fontSize: "md",
                fontWeight: "bold",
                color: "white"
              }}>
                <Text style={{ fontSize: 20, color: "#ffff", fontWeight: "bold" }}>
                  5
                </Text>
                <Text style={{ fontSize: 17, textAlign: "center", color: "#ffff" }}>
                  Proyectos cerrados
                </Text>
              </Box>
            </Center>
          </Flex>
        </Center>

        <Center>
          <Flex direction="row" mb={-4} mt={-12} _text={{
            color: "coolGray.800"
          }}>

            <Center size="48">
              <Box width="92%" bg="#dc3545" p="3" alignItems={"center"} shadow={2} _text={{
                fontSize: "md",
                fontWeight: "bold",
                color: "white"
              }}>
                <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>
                  5
                </Text>
                <Text style={{ fontSize: 17, textAlign: "center", color: "white" }}>
                  Proyectos cancelados
                </Text>
              </Box>
            </Center>
            <Center size="48">
              <Box width="92%" bg="#6c757d" p="3" alignItems={"center"} shadow={2} _text={{
                fontSize: "md",
                fontWeight: "bold",
                color: "white"
              }}>
                <Text style={{ fontSize: 20, color: "#ffff", fontWeight: "bold" }}>
                  5
                </Text>
                <Text style={{ fontSize: 17, textAlign: "center", color: "#ffff" }}>
                  Proyectos prospecto
                </Text>
              </Box>
            </Center>
          </Flex>
        </Center>
        <Divider />
        <TableComponent isOpen={false} title={"Prospectos"}  showIcon={true}
          tableHead={['#', 'Identificador', 'Avance real del proyecto', 'Etapa', 'Prioridad']}
          widthArr={[40, 120, 200, 120, 120]}
          data={[['1', 'TREMO',
            <ProgressBarComponent progress={55} text={"77% Completado"} />
            , <OvalosTextComponent text={"Activo"} colorScheme={"success"} />, <OvalosTextComponent text={"Alta"} colorScheme={"danger"} />]]}
        />
        <TableComponent isOpen={true} title={"Proyectos"} showIcon={true}
          tableHead={['#', 'Identificador', 'Avance real del proyecto', 'Etapa', 'Prioridad']}
          widthArr={[40, 120, 200, 120, 120]}
          data={[['1', 'TREMO',
            <ProgressBarComponent progress={55} text={"77% Completado"} />
            , <OvalosTextComponent text={"Activo"} colorScheme={"success"} />, <OvalosTextComponent text={"Alta"} colorScheme={"danger"} />]]}
        />
        
      </ScrollView>

    </View>


  )
}