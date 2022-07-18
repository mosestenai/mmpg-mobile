import React from "react";
import { View, Text, Dimensions, SafeAreaView, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Secondarycolor } from "../Utils/color";
import Icon from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";


var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const ViewNotifications = () => {

    const navigation = useNavigation();



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

                <TouchableOpacity style={styles.notview}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={require("./../../assets/gif/icon2.png")}
                            style={{
                                height: 30,
                                width: 30,
                                marginLeft: "5%",
                                marginTop: 20,
                                borderWidth: 1,
                                borderColor: "white",
                                borderRadius: 20
                            }}
                        />
                        <Text style={styles.nottitle}>MMPG</Text>
                        <Text style={styles.notdate}>06 Aug</Text>
                    </View>
                    <View style={styles.notmessage}>
                        <Text style={{color:"gray",fontSize:11}}>
                            Hello, We're reaching out to let you know that
                            the following project that was recently
                            submitted
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.notview}>
                    <View style={{ flexDirection: "row" }}>
                        <Image
                            source={require("./../../assets/gif/icon2.png")}
                            style={{
                                height: 30,
                                width: 30,
                                marginLeft: "5%",
                                marginTop: 20,
                                borderWidth: 1,
                                borderColor: "white",
                                borderRadius: 20
                            }}
                        />
                        <Text style={styles.nottitle}>MMPG</Text>
                        <Text style={styles.notdate}>06 Aug</Text>
                    </View>
                    <View style={styles.notmessage}>
                        <Text style={{color:"gray",fontSize:11}}>
                            Hello, We're reaching out to let you know that
                            the following project that was recently
                            submitted
                        </Text>
                    </View>
                </TouchableOpacity>




            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    notdate: {
        color: "gray",
        fontSize: 10,
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
        width: "70%"
    },
    notmessage: {
        backgroundColor: Secondarycolor(),
        marginLeft:"20%",
        padding:10,
        borderRadius:5
    }
})

export default ViewNotifications;