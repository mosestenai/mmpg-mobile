import React, { useState, useEffect, useRef } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, TextInput, Platform } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import SwitchToggle from "react-native-switch-toggle";
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import * as SQLite from 'expo-sqlite';
import axios from "axios";
import { Getuserdetails } from "../Utils/getuserdetails";
import { pushtokenurl } from "../Utils/urls";

const db = SQLite.openDatabase('db.Userdbs') // returns Database object

var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});
const Notificationssettings = () => {
    const user = Getuserdetails();

    const navigation = useNavigation();
    const [on, seton] = useState(false);


    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        updateptoken()
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification);
        });

        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        };


    }, []);

    const updateptoken = () => {
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    if (_array[0].ptoken) {
                        seton(true)
                    } else {
                        seton(false)
                    }

                },
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
    }




    const updatetoken = (token) => {
        axios.post(pushtokenurl, {
            token: user.token,
            ptoken: token
        }).then(function (response) {
            if (!response.data.message) {
                if (response.data.success) {
                    db.transaction(tx => {
                        tx.executeSql('UPDATE User set ptoken=? where unid=?',
                            [token, user.unid], // passing sql query and parameters:null
                            // success callback which sends two things Transaction object and ResultSet Object
                            (tx, results) => {
                                if (results.rowsAffected > 0) {
                                    console.log("success")
                                }
                            },
                            (txObj, error) => console.log('Error ', error)
                        ) // end executeSQL
                    }) // end transaction

                } else {
                }
            } else {
            }
            // 
        }).catch(function (error) {
        });

    }



    const subscribe = async () => {
        if (on) {
            await schedulePushNotification2();
            seton(!on)
            console.log("it was on")
            updatetoken(null)
        } else {
            seton(!on)
            updatetoken(expoPushToken)
            console.log("it was off")
            await schedulePushNotification();
        }
    }



    return (
        <SafeAreaView style={{ backgroundColor: "black", height: deviceHeight }}>
            <View style={styles.fixedview}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "10%" }}>
                    <FontAwesome5 name="angle-left" color={"white"} size={25} />
                </TouchableOpacity>
                <View style={{ width: "80%" }}>
                    <Text style={{ alignSelf: "center", color: "white", fontWeight: "bold" }}>Notification</Text>
                </View>

            </View>
            <View style={styles.pushnotificationview}>
                <Text style={{ color: "white" }}>PUSH NOTIFICATIONS</Text>
                <View style={{ right: 5, position: "absolute" }}>
                    <SwitchToggle
                        switchOn={on}
                        onPress={() => subscribe()}
                        containerStyle={{
                            marginTop: 10,
                            width: 50,
                            height: 30,
                            borderRadius: 25,
                            padding: 5,
                        }}
                        circleStyle={{
                            width: 20,
                            height: 20,
                            borderRadius: 20,
                        }}
                        circleColorOff='black'
                        circleColorOn='white'
                        backgroundColorOn={Primarycolor()}
                        backgroundColorOff='#C4C4C4'
                    />
                </View>
            </View>
            <View style={styles.bottomCenter}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <FontAwesome5 name="home" color={"white"} size={20} />
                </TouchableOpacity>

            </View>


        </SafeAreaView>
    )
}


async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "MMPGMUSIC Notification",
            body: 'You have successfully activated push notification',
            data: { data: 'You have successfully activated push notification ' },
        },
        trigger: { seconds: 2 },
    });
}

async function schedulePushNotification2() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "MMPGMUSIC Notification",
            body: 'You have successfully deactivated push notification',
            data: { data: 'You have successfully deactivated push notification ' },
        },
        trigger: { seconds: 2 },
    });
}

const registerForPushNotificationsAsync = async () => {

    let token;

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    if (Device.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token)
        // updatetoken(token)
    } else {
        alert('Must use physical device for Push Notifications');
    }

    return token;
}




const styles = StyleSheet.create({
    pushnotificationview: {
        backgroundColor: Secondarycolor(),
        marginTop: 30,
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 5
    },
    bottomCenter: {
        backgroundColor: Secondarycolor(),
        paddingHorizontal: "5%",
        width: deviceWidth,
        borderTopLeftRadius: 5,
        height: 60,
        paddingTop: 15,
        flexDirection: "row",
        position: "absolute",
        bottom: 0
    },

    fixedview: {
        paddingHorizontal: "5%",
        paddingVertical: "5%",
        flexDirection: "row",
        backgroundColor: Secondarycolor()
    }
})


export default Notificationssettings;