import React, { useState, useEffect } from "react";
import socketio from 'socket.io-client'
import AsyncStorage from "@react-native-community/async-storage";
import { SafeAreaView, Alert, ScrollView, Image, StyleSheet, TouchableOpacity } from "react-native"

import SpotList from '../components/SpotList'

import logo from '../assets/logo.png'

export default function List({ navigation }) {
  const [techs, setTechs] = useState([])

  useEffect(() => {
    AsyncStorage.getItem('user').then(user_id => {
      const socket = socketio('http://localhost:3333', {
        query: { user_id }
      })

      socket.on('booking_response', booking => {
        Alert.alert(`Sua reserva em ${booking.spot.company} em ${booking.date} foi ${booking.approved ? 'APROVADA' : 'REJEITADA'}`)
      })
    })
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('techs').then(storagedTechs => {
      const techsArray = storagedTechs.split(',').map(tech => tech.trim())

      setTechs(techsArray)
    })
  }, [])

  async function handleLogout() {

    await AsyncStorage.removeItem('user');
    await AsyncStorage.removeItem('techs')

    navigation.navigate('Login')
  }

  return (
    <>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity onPress={handleLogout}>
          <Image style={styles.logo} source={logo} />
        </TouchableOpacity>
        <ScrollView>
          {techs.map(tech => <SpotList key={tech} tech={tech} />)}
        </ScrollView>
      </SafeAreaView>
      <SafeAreaView style={styles.footer}></SafeAreaView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fbfaf5'
  },

  logo: {
    height: 32,
    resizeMode: "contain",
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 5
  },

  footer: {
    height: 20,
    backgroundColor: '#fbfaf5'
  }
})