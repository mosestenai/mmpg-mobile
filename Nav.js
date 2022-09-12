import React, { useState, useEffect } from "react";
import axios from "axios";
import { View } from "react-native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Icon from '@expo/vector-icons/FontAwesome5';
import Artistdashboard from "./src/Artist/dashboard";
import Loginscreen from "./src/Welcome/loginscreen";
import Homescreen from "./src/Welcome/screen1";
import Registerscreen from "./src/Welcome/Registerscreen";
import Resetpassword from "./src/Welcome/Resetpassword";
import Started from "./src/Welcome/started";
import Membershipplans from "./src/Welcome/membersiplans";
import { Primarycolor, Viewcolor } from "./src/Utils/color";
import ViewNotifications from "./src/Artist/viewNotifications";
import Homeaccount from "./src/Account/homeaccount";
import Viewartist from "./src/Account/viewartist";
import Searchsong from "./src/Account/searchsong";
import Viewsong from "./src/Account/viewsong";
import Catalogue from "./src/Music/catalogue";
import Viewmusic from "./src/Music/viewmusic";
import Viewpayment from "./src/Payment/viewpayment";
import Uploader from "./src/Music/uploader";
import Paymentdetails from "./src/Payment/paymentdetails";
import Addsplit from "./src/Payment/addsplit";
import Settings from "./src/Artist/settings";
import Details from "./src/Artist/details";
import Notificationssettings from "./src/Artist/notifications";
import Membershipsettings from "./src/Artist/membership";
import Logout from "./src/Artist/logout";
import Deleteaccount from "./src/Artist/deleteaccount";
import Step1 from "./src/Uploader/step1";
import Step2 from "./src/Uploader/step2";
import Step3 from "./src/Uploader/step3";
import Step4 from "./src/Uploader/step4";
import Step5 from "./src/Uploader/step5";
import Step6 from "./src/Uploader/step6";
import Help from "./src/Artist/help";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.Userdbs') // returns Database object





// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AccountStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const MusicStack = createNativeStackNavigator();
const PaymentStack = createNativeStackNavigator();
const NotificationsStack = createNativeStackNavigator();

const Authenticationstack = createNativeStackNavigator();





function getHeaderTitle(route) {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  // In this case, it's "Home" as that's the first screen inside the navigator
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Login';

  switch (routeName) {
    case 'Home':
      return 'Homee';
    case 'Login':
      return 'Loginn';
    case 'Settingss':
      return 'Settings';
    case 'Notificationss':
      return 'Notifications';
    case 'Register':
      return 'Register';

  }
}




function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="dashboard">
      <HomeStack.Screen name="dashboard" component={Artistdashboard} />
      <HomeStack.Screen name="viewnotifications" component={ViewNotifications} />
      <HomeStack.Screen name="settings" component={Settings} />
    </HomeStack.Navigator>
  );
}


function AccountStackScreen() {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="homeaccount">
      <AccountStack.Screen name="homeaccount" component={Homeaccount} />
      <AccountStack.Screen name="viewartist" component={Viewartist} />
      <AccountStack.Screen name="searchsong" component={Searchsong} />
      <AccountStack.Screen name="Viewsong" component={Viewsong} />
    </AccountStack.Navigator>
  );
}

function MusicStackScreen() {
  return (
    <MusicStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="catalogue">
      <MusicStack.Screen name="catalogue" component={Catalogue} />
      {/* <MusicStack.Screen name="viewmusic" component={Viewmusic} /> */}

    </MusicStack.Navigator>
  );
}

function PaymentStackScreen() {
  return (
    <MusicStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="viewpaymente">
      <MusicStack.Screen name="viewpayment" component={Viewpayment} />


    </MusicStack.Navigator>
  );
}


function HomeTabs() {
  return (
    <Tab.Navigator

      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Account') {
            iconName = focused ? 'user-alt' : 'user-alt';
          } else if (route.name === 'Music') {
            iconName = focused ? 'music' : 'music';
          } else if (route.name === 'Payment') {
            iconName = focused ? 'dollar-sign' : 'dollar-sign';
          }
          else if (route.name === 'Notification') {
            iconName = focused ? 'bell' : 'bell';
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={20} color={color} />;
        },
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { backgroundColor: Viewcolor() },
        tabBarActiveTintColor: Primarycolor()


      })}

    >
      <Tab.Screen name='Home' component={HomeStackScreen} />
      <Tab.Screen name="Account" component={AccountStackScreen} />
      <Tab.Screen name="Music" component={MusicStackScreen} />
      <Tab.Screen name="Payment" component={PaymentStackScreen} />
      <Tab.Screen name="Notification" component={PaymentStackScreen} />
 
    </Tab.Navigator>

  );
}

function Aunthenticationstackscreen() {
 

  return ( 
    <Authenticationstack.Navigator screenOptions={{ headerShown: false }} initialRouteName= "Homescreen">
      <Authenticationstack.Screen name="Homescreen" component={Homescreen} />
      <Authenticationstack.Screen name="login" component={Loginscreen} />
      <Authenticationstack.Screen name="register" component={Registerscreen} />
      <Authenticationstack.Screen name="resetpassword" component={Resetpassword} />
      <Authenticationstack.Screen name="started" component={Started} />
      <Authenticationstack.Screen name="membershipplans" component={Membershipplans} />
      <Authenticationstack.Screen name="viewmusic" component={Viewmusic} />
      <Authenticationstack.Screen name="uploader" component={Uploader} />
      <Authenticationstack.Screen name="paymentdetails" component={Paymentdetails} />
      <Authenticationstack.Screen name="addsplit" component={Addsplit} />
      <Authenticationstack.Screen name="details" component={Details} />
      <Authenticationstack.Screen name="notificationsettings" component={Notificationssettings} />
      <Authenticationstack.Screen name="membershipsettings" component={Membershipsettings} />
      <Authenticationstack.Screen name="logout" component={Logout} />
      <Authenticationstack.Screen name="help" component={Help} />
      <Authenticationstack.Screen name="deleteaccount" component={Deleteaccount} />
      <Authenticationstack.Screen name="step1" component={Step1} />
      <Authenticationstack.Screen name="step2" component={Step2} />
      <Authenticationstack.Screen name="step3" component={Step3} />
      <Authenticationstack.Screen name="step4" component={Step4} />
      <Authenticationstack.Screen name="step5" component={Step5} />
      <Authenticationstack.Screen name="step6" component={Step6} />
    </Authenticationstack.Navigator>
  );
}


export default function Nav() {

  const [typeexists, settypeexists] = useState(false);
  const [userexists, setuserexists] = useState(false);

  useEffect(() => {
    checktype();
  }, []);


  const checktype = () => {
    db.transaction(tx => {
      // sending 4 arguments in executeSql
      tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
        // success callback which sends two things Transaction object and ResultSet Object
        (txObj, { rows: { _array } }) => {
          _array.length > 0 ? setuserexists(true) : setuserexists(false)
          if (!_array[0]?.type) {
            settypeexists(false)
          } else {
            settypeexists(true)
          }
        },
        // failure callback which sends two things Transaction object and Error
        (txObj, error) => console.log('Error ', error)
      ) // end executeSQL
    }) // end transaction
  }

 

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} >
        {typeexists ?
        <Stack.Screen name="default2" component={HomeTabs} options={({ route }) => ({ headerTitle: getHeaderTitle(route), })} /> :
        <Stack.Screen name="authentication2" component={Aunthenticationstackscreen} />}
        {/* <Stack.Screen name="homescreen" component={Homescreen}  /> */}
        <Stack.Screen name="default" component={HomeTabs} />
        <Stack.Screen name="authentication" component={Aunthenticationstackscreen} />
      </Stack.Navigator>
    </NavigationContainer>

  );
}
