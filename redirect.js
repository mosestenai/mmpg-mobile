import React, { useEffect, useState } from "react";
import * as SQLite from 'expo-sqlite';
import Homescreen from "./src/Welcome/screen1";
import Spinner from 'react-native-loading-spinner-overlay';
import { StatusBar, View, StyleSheet, KeyboardAvoidingView } from "react-native";
import App from "./Nav";
import { BallIndicator, PacmanIndicator } from 'react-native-indicators';
import { Video } from "expo-av";

const db = SQLite.openDatabase('db.Userdbs') // returns Database object

StatusBar.setBackgroundColor("white");

const Redirect = () => {
    const [display, setdisplay] = useState(false);
    const [progress, setprogress] = useState(true);


    useEffect(() => {
        CheckUser;
    }, []);


    const CheckUser =
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    if (!_array[0]?.email) {
                        StatusBar.setBackgroundColor("white");
                        setTimeout(() => {
                                setdisplay(true) 
                                setprogress(false);
                        }, 5000);
                      //  setdisplay(true)
                       // setprogress(false);
                    } else {
                        setdisplay(false);
                        setprogress(false);
                    }
                },
                // failure callback which sends two things Transaction object and Error
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction





    return (progress ?
        <View style={styles.container}>

            <Video
                source={require('./assets/videos/Splash.mp4')}
                style={styles.backgroundVideo}
                rate={1}
                shouldPlay={true}
                isLooping={true}
                volume={1}
                muted={true}
                resizeMode="cover"
            />

            <KeyboardAvoidingView behavior='padding' style={styles.container}>


                <View style={styles.loginContainer}>


                </View>

            </KeyboardAvoidingView>
        </View>

        :
        display ?<App />: <Homescreen /> 
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    loginContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center',
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default Redirect;
