import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation } from "@react-navigation/native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";


const Deleteaccount = () => {

    const navigation = useNavigation();

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
                    }}>Delete account</Text>
                    <Text style={{
                        marginTop: 10,
                        fontSize: 10,
                        color: "gray"
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
                    <TouchableOpacity style={{
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