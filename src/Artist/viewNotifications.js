import React, { useState } from "react";
import { View, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Secondarycolor } from "../Utils/color";
import Icon from '@expo/vector-icons/FontAwesome5';
import { useNavigation, useRoute } from "@react-navigation/native";



var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const ViewNotifications = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [notifications, setnotifications] = useState(route.params.notifications.reverse());


    return (
        <SafeAreaView style={{ height: deviceHeight, backgroundColor: "black" }}>
            <View style={{
                height: 50,
                width: deviceWidth,
                backgroundColor: Secondarycolor()
            }}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{
                    marginLeft: "5%",
                    marginTop: 10
                }}>
                    <Icon name="angle-left" color="white" size={25} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{ paddingBottom: 100 }}>
                    {notifications.map((val, key) => {

                        return (
                            <TouchableOpacity key={key} style={styles.notview}>
                                <View style={{ flexDirection: "row" }}>
                                    <View style={{
                                        marginLeft: "5%",
                                        marginTop: 20,
                                        padding: 5,
                                        justifyContent:"center",
                                        alignItems:"center"
                                    }}>
                                        <Image
                                            source={require("./../../assets/images/png/roundlogo.png")}
                                            style={{
                                                height: 35,
                                                width: 35,
                                            }}
                                        />
                                    </View>
                                    {/* <Image
                                        source={require("./../../assets/gif/icon.png")}
                                        style={{
                                            height: 30,
                                            width: 30,
                                            marginLeft: "5%",
                                            marginTop: 20,
                                            borderWidth: 1,
                                            borderColor: "white",
                                            borderRadius: 20
                                        }}
                                    /> */}
                                    <Text style={styles.nottitle}>MMPG</Text>
                                    <Text style={styles.notdate}>{val.date}</Text>
                                </View>
                                <View style={styles.notmessage}>
                                    <Text style={{ color: "gray", fontSize: 11 }}>
                                        {val.message}
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}

                </View>

            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    notdate: {
        color: "gray",
        fontSize: 10,
        position:"absolute",
        right:10,
        marginTop: 30
    },
    notview: {
        width: "90%",
        marginHorizontal: "5%",
        marginVertical: 10
    },
    nottitle: {
        color: "white",
        marginLeft: 10,
        marginTop: 30,
        fontWeight: "bold",
        fontSize: 10,
        width: "60%"
    },
    notmessage: {
        backgroundColor: Secondarycolor(),
        marginLeft: "20%",
        padding: 10,
        borderRadius: 5
    }
})

export default ViewNotifications;