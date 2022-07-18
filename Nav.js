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
import { Primarycolor } from "./src/Utils/color";
import ViewNotifications from "./src/Artist/viewNotifications";
import Homeaccount from "./src/Account/homeaccount";
import Viewartist from "./src/Account/viewartist";
import Searchsong from "./src/Account/searchsong";




// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const AccountStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const MessagesStack = createNativeStackNavigator();
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
    </HomeStack.Navigator>
  );
}


function AccountStackScreen() {
  return (
    <AccountStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="homeaccount">
      <AccountStack.Screen name="homeaccount" component={Homeaccount} />
      <AccountStack.Screen name="viewartist" component={Viewartist} />
      <AccountStack.Screen name="searchsong" component={Searchsong} />
    </AccountStack.Navigator>
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
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'white',
        headerShown: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: { backgroundColor: 'black' },
        tabBarActiveBackgroundColor: "black",
        tabBarActiveTintColor: Primarycolor()


      })}

    >
      <Tab.Screen name='Home' component={HomeStackScreen} />
      <Tab.Screen name="Account" component={AccountStackScreen} />
      <Tab.Screen name="Music" component={HomeStackScreen} />
      <Tab.Screen name="Payment" component={HomeStackScreen} />
      <Tab.Screen name="Notification" component={HomeStackScreen} />
    </Tab.Navigator>

  );
}

function Aunthenticationstackscreen() {
  return (
    <Authenticationstack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Homescreen">
      <Authenticationstack.Screen name="Homescreen" component={Homescreen} />
      <Authenticationstack.Screen name="login" component={Loginscreen} />
      <Authenticationstack.Screen name="register" component={Registerscreen} />
      <Authenticationstack.Screen name="resetpassword" component={Resetpassword} />
      <Authenticationstack.Screen name="started" component={Started} />
      <Authenticationstack.Screen name="membershipplans" component={Membershipplans} />
    </Authenticationstack.Navigator>
  );
}


export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName='authentication'>
        <Stack.Screen name="default" component={HomeTabs} options={({ route }) => ({headerTitle: getHeaderTitle(route), })} />
        <Stack.Screen name="authentication" component={Aunthenticationstackscreen} />
        {/* <Stack.Screen name="homescreen" component={Homescreen}  /> */}
      </Stack.Navigator>
    </NavigationContainer>

  );
}
