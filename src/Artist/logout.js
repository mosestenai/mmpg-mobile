import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, TextInput,Alert } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation } from "@react-navigation/native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import * as Updates from "expo-updates";
import * as SQLite from 'expo-sqlite';
import axios from "axios";
import { Getuserdetails } from "../Utils/getuserdetails";


const db = SQLite.openDatabase('db.Userdbs') // returns Database object



const Logout = () => {
    const user = Getuserdetails();

    const navigation = useNavigation();

     //handle logout
     const handleLogout = () => {
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('UPDATE User set type=? where email=?',
                ["", user.email], // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        // setError(json.success);
                        Alert.alert(
                            "Success",
                            "Logged out successfully",
                            [
                                { text: "OK" }
                            ]
                        );
                        setTimeout(() => {
                            Updates.reloadAsync();
                        }, 3000);
                    } else {

                        Alert.alert(
                            "Error",
                            "Internal app error.contact admin",
                            [
                                { text: "OK" }
                            ]
                        );
                    }
                },
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction

    };

    return (
        <View style={{
            backgroundColor: "black",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
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
                    }}>Logout</Text>
                    <Text style={{
                        marginTop: 10,
                        fontSize: 10,
                        color: "gray",
                        alignSelf:"center"
                    }}>Are you sure you want to logout from this account?</Text>
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
                    <TouchableOpacity onPress={handleLogout} style={{
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

export default Logout;