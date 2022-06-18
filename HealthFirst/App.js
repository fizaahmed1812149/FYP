import React,{useState, useEffect, createContext, useContext} from 'react';
import {View, Text, StyleSheet, Image, Button, ImageBackground, ActivityIndicator} from 'react-native'
import { Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Splash from './Screens/Splash';
import Login from './Screens/Login'
import Forgetpassword from './Screens/Forgetpassword';
import Signup from './Screens/Signup';
import Homee from './Screens/Home';
import bmicalculator from './Screens/bmicalculator';
import Homeremedies from './Screens/Homeremedies';
import Consultation from './Screens/Consultation';
import pharmacystore from './Screens/pharmacystore';
import Consultbutton from './Screens/Consultbutton';
import auth from '@react-native-firebase/auth'
import { onAuthStateChanged } from '@react-native-firebase/auth';
import { async } from '@firebase/util';
import { firebase } from '@react-native-firebase/auth';
import Bodypainremedies from './Screens/Bodypainremedies';
import Skinremedies from './Screens/Skinremedies';
import Fluremedies from './Screens/Fluremedies';
import DoctorHome from './Screens/DoctorHome';
import DoctorSignup from './Screens/DoctorSignup';
import DocHome from './Screens/DoctorHome';
import COLORS from "./color"
import PharmacySearch from './Screens/PharmacySearch';
import PharmacyOrders from './Screens/PharmacyOrders';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const AuthenticationUserContext = createContext();


const AuthenticatedUserProvider = ({children})=>{
  const [user,setUser] = useState(null);
  const [users, setUsers] = useState([])
  return(
    <AuthenticationUserContext.Provider value = {{user,setUser}}>
      {children}
    </AuthenticationUserContext.Provider>
  )
}
  
const Application = () => { 
  return (
    
       <Stack.Navigator defaultScreenOptions={Homee}>
        <Stack.Screen name="Home"component={Homee} options={{headerShown:false}} />
        <Stack.Screen name="DoctorHome"component={DocHome} options={{headerShown:false}} />
        <Stack.Screen name="bmicalculator"component={bmicalculator} options={{headerShown:false}}/>
        <Stack.Screen name="homeremedies"component={Homeremedies} options={{headerShown:false}}/>
        <Stack.Screen name="bodypainremedies"component={Bodypainremedies} options={{headerShown:false}}/>
        <Stack.Screen name="skinremedies"component={Skinremedies} options={{headerShown:false}}/>
        <Stack.Screen name="fluremedies"component={Fluremedies} options={{headerShown:false}}/>
        <Stack.Screen name="consultation"component={Consultation} options={{headerShown:false}}/>   
        <Stack.Screen name="RootPharmacyTabs" component={RootPharmacyTabs} options={{headerShown:false}}/>
        <Stack.Screen name="Consultbutton" component={Consultbutton} options={({ route }) => ({ title: route.params.name , uid: route.params.uid})}/>
      </Stack.Navigator>
      
      
  )
}

const AuthStack=()=>{
  return(
  <Stack.Navigator  defaultScreenOptions={Login}>
      <Stack.Screen name="Splash"component={Splash} options={{headerShown:false}}/>
      <Stack.Screen name="Login"component={Login} options={{headerShown:false}}/>
      <Stack.Screen name="Forgetpassword"component={Forgetpassword} options={{headerShown:false}}/>
      <Stack.Screen name="Signup"component={Signup} options={{headerShown:false}}/>
      <Stack.Screen name="DoctorSignup"component={DoctorSignup} options={{headerShown:false}}/>

  </Stack.Navigator>
  )

}

const RootPharmacyTabs=()=>{
  return(
      <Tab.Navigator
      //tabBarOptions = {{activeTintColor : COLORS.buttons}}
      >
        <Tab.Screen 
        name='pharmacystore'
        component={pharmacystore}
        options={
          {
            headerShown:false,
            tabBarLabel : "Home",
            tabBarLabelStyle : {fontSize:12, color:'black'},
            tabBarIcon : ()=>(
              <MaterialCommunityIcons
              name="home"
              size={30}
              style={{paddingRight:5}}
              
              />
              
            )
          }
        }
        />
           <Tab.Screen 
        name='PharmacySearch'
        component={PharmacySearch}
        options={
          {
            headerShown:false,
            tabBarLabel : "Search",
            tabBarLabelStyle : {fontSize:12, color:'black'},
            tabBarIcon : ()=>(
              <AntDesign
              name="search1"
              size={27}
              style={{paddingRight:5}}

              />
            )
          }
        }
        />
        
         <Tab.Screen 
        name='PharmacyOrders'
        component={PharmacyOrders}
        options={
          {
            headerShown:false,
            tabBarLabel : "Orders",
            tabBarLabelStyle : {fontSize:12, color:'black'},
            tabBarIcon : ()=>(
              
              <MaterialCommunityIcons
              name="order-bool-ascending"
              size={27}
              style={{paddingRight:5}}

              />
            )
          }
        }
        />
      </Tab.Navigator>
  )
}


const RootNavigator = () => {
  const {user, setUser} = useContext(AuthenticationUserContext)
  const [loading,setLoading] = useState(true);
  useEffect(()=>{
      const unsubscribe = firebase.auth().onAuthStateChanged(
      async authenticatedUser =>{
      authenticatedUser ? setUser(authenticatedUser) : setUser(null);
      setLoading(false);
      });
      return()=>unsubscribe();
  },[user]);
  if(loading){
    return(
      
      <View style={{flex:1, justifyContent:"center", alignItems:"center"}}>
          
      </View>
    )
  }
  return(
  <NavigationContainer>
    {user ? <Application /> : <AuthStack />}
  </NavigationContainer>
  )
}

const App=()=>{

return (
<AuthenticatedUserProvider>
<RootNavigator/>
</AuthenticatedUserProvider>
)
}

export default App;
