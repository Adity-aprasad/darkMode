import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer , DarkTheme, DefaultTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { EventRegister } from 'react-native-event-listeners'
import { useState,useEffect } from 'react'
import Themecolour  from './theme/Themecolour';
import Themecontext from './theme/Themecontext';
import Home from './src/Home';
import Profile from './src/Profile';

// Create the Stack Navigator
const Stack = createStackNavigator();

export default function App() {
  const[darkmode,setdarkmode]=useState(false)
  const theme = darkmode ? Themecolour.dark : Themecolour.light;


useEffect(()=>{
  const listeners=EventRegister.addEventListener('changeTheme',(data)=>{
    setdarkmode(data)
    console.log(data)
  })
  return()=>{
  EventRegister.removeAllListeners(listeners)

  }
},[darkmode])
  return (
    <Themecontext.Provider value={darkmode === true ? Themecolour.dark:Themecolour.light} >
    <NavigationContainer theme={darkmode === true ? DarkTheme: DefaultTheme}>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }} >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Profile" component={Profile}/>
      </Stack.Navigator>
    </NavigationContainer>
    </Themecontext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
