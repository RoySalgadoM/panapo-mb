import { View, Text } from 'react-native'
import React, { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from './Modulo1/Login';
import Dashboard from './Dashboard';
import Navigation from '../navigations/Navigation';
import Loading from '../components/Loading';

export default function Index(props) {
    const [isLogged, setIsLogged] = useState(null)
    let token = "";
    
    const getToken = async () => {
        try {
            token = await AsyncStorage.getItem('token')
            console.log(token)
            if (token === "undefined") {
                setIsLogged(false)
            }else{
                setIsLogged(true)
                props.navigation.navigate("dashboard")
            }
        } catch (e) {
        }
    }
    useEffect(() => {
        getToken()
    }, [isLogged])

    if (isLogged===null) return <Loading isVisible={true} text={"Cargando..."}></Loading>
    if(isLogged==true) return <Navigation/>
    return (
        <Login logged={isLogged} setLogged={setIsLogged}/>
    )
    
}