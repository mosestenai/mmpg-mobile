import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, TextInput, Alert } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation } from "@react-navigation/native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { BallIndicator } from 'react-native-indicators';
import axios from 'axios';
import * as Updates from "expo-updates";
import * as SQLite from 'expo-sqlite';
import { cancelanddeleteurl } from '../Utils/urls';
import { Getuserdetails } from "../Utils/getuserdetails";

const db = SQLite.openDatabase('db.Userdbs') // returns Database object


const Deleteaccount = () => {

    const navigation = useNavigation();
    const user = Getuserdetails()
    const [loading, setloading] = useState(false);
    const [confirmpopup, setconfirmpopup] = useState(false);

    const ondeleteaccount = () => {
        setconfirmpopup(false)
        setloading(true)
        axios.post(cancelanddeleteurl, {
            token: user.token,
            action: 'DELETE'
        }).then(function (response) {
            if (!response.data.message) {
                handleLogout();
            } else {
                setloading(false)
                Alert.alert(
                    "Error",
                    response.data.message,
                    [
                        { text: "OK" }
                    ]
                );
            }
            // 
        }).catch(function (error) {
            setloading(false)
            //if(error.response.status === 401 || error.response.status === 400){}
            Alert.alert(
                "Error",
                "there was an error fetching tracks",
                [
                    { text: "OK" }
                ]
            );
        });

    }

    const handleLogout = () => {
        db.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM  User', null,
                (tx, results) => {
                    // console.log('Results', results.rowsAffected);
                    if (results.rowsAffected > 0) {
                        setloading(false)
                        // setError(json.success);
                        Alert.alert(
                            "Success",
                            "Account deleted successfully",
                            [
                                {
                                    text: 'Ok',
                                    onPress: () => Updates.reloadAsync(),
                                },
                            ]
                        );
                    } else {
                        setloading(false)
                        Alert.alert(
                            "Error",
                            "Internal app error.contact admin",
                            [
                                { text: "OK" }
                            ]
                        );
                    }
                }
            );
        });

    };

    return (
        <View style={{
            backgroundColor: "black",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            {loading &&
                <Spinner
                    visible={true}
                    color='blue'
                    size={40}
                    customIndicator={<BallIndicator color={Primarycolor()} />}
                />}
            <View style={{
                backgroundColor: Viewcolor(),
                width: "90%",
                borderRadius: 10,
            }}>
                <View style={{ padding: 20 }}>
                    <Text style={{
                        alignSelf: "center",
                        color: "white",
                        fontWeight: "bold"
                    }}>Delete account</Text>
                    <Text style={{
                        marginTop: 10,
                        fontSize: 10,
                        color: "gray",
                        alignSelf:"center"
                    }}>Are you sure you want to delete your account?</Text>
                </View>
                <View style={{ flexDirection: "row", marginTop: 0 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{
                            justifyContent: "center",
                            alignItems: "center",
                            width: "50%",
                            borderWidth: 1,
                            borderColor: Semisecondarycolor(),
                            borderLeftWidth: 0,
                            borderBottomWidth: 0,
                            paddingTop: 10,
                            paddingBottom: 15
                        }}>
                        <Text style={{ color: Primarycolor() }}>Cancel</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={ondeleteaccount} style={{
                        justifyContent: "center",
                        alignItems: "center",
                        width: "50%",
                        borderWidth: 1,
                        borderColor: Semisecondarycolor(),
                        borderLeftWidth: 0,
                        borderBottomWidth: 0,
                        borderRightWidth: 0,
                        paddingTop: 10,
                        paddingBottom: 15
                    }}>
                        <Text style={{ color: Primarycolor() }}>Yes</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default Deleteaccount;