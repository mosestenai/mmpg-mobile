import React from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, SafeAreaView, Image } from "react-native";
import { Primarycolor, Secondarycolor } from "../Utils/color";
import Icon from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";


var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

var currentdate = new Date();

var time = currentdate.getHours() + ":" + currentdate.getMinutes();
var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
const hours = currentdate.getHours().toString().length > 1 ? currentdate.getHours() : "0" + currentdate.getHours()


const Artistdashboard = () => {

    const navigation = useNavigation();


    return (
        <View style={styles.contaner}>
            <View style={{
                marginTop: 40,
                flexDirection: "row",
                width: "90%",
                marginHorizontal: "5%"
            }}>
                <Text style={{ color: "white", fontSize: 20, width: "60%", marginTop: 10, fontWeight: "bold" }}>Dashboard</Text>
                <TouchableOpacity style={{
                    backgroundColor: Primarycolor(),
                    flexDirection: "row",
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    borderRadius: 5
                }}>
                    <Icon name="cloud-upload-alt" color="white" style={{ marginTop: 5 }}></Icon>
                    <Text style={{ color: "white", marginLeft: 5 }}>
                        Uploader
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 50, marginHorizontal: "5%" }}>
                <Text style={{ color: "gray" }}>Hello, test user</Text>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "60%", marginTop: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={styles.dateview}>
                                <Text style={styles.textin} >06</Text>
                                <Text style={styles.textin} >Aug</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pendingview}>
                                <Text style={styles.pendingnumber}>1</Text>
                                <Text style={styles.pendingtext}>Pending</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <TouchableOpacity style={styles.realeasesview}>
                                <Text style={styles.releasestext}>Releases</Text>
                                <Text style={styles.releasesnumber}>8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dateview}>
                                <Text style={styles.textin} >20</Text>
                                <Text style={styles.textin} >22</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.profilepic}>
                        <Icon name="plus-circle" color="white" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{ marginHorizontal: "5%", marginTop: 10 }}>
                <View style={{ flexDirection: "row" }}>
                    <Text style={{ fontSize: 20, color: "white", width: "95%", fontWeight: "bold" }}>Notifications</Text>
                    <TouchableOpacity>
                        <Icon name="angle-right" color="white" size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={{ marginHorizontal: "5%", marginTop: 10 }}>
                    <View style={styles.notificationscontainer}>
                        <TouchableOpacity 
                        onPress={()=>navigation.navigate("viewnotifications")}
                        style={{
                            width: "90%",
                            marginBottom: 10,
                            flexDirection: "row"
                        }}>
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
                            <View style={{
                                marginLeft: 20,
                                paddingTop: 10
                            }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "bold", color: "white", width: "80%" }}>MMPG</Text>
                                    <Text style={{ color: "gray", fontSize: 10 }}>6 Aug</Text>
                                </View>
                                <Text style={{ color: "gray" }}>
                                    Hello we are reaching out to ...
                                </Text>

                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                         onPress={()=>navigation.navigate("viewnotifications")}
                        style={{
                            width: "90%",
                            marginBottom: 10,
                            flexDirection: "row"
                        }}>
                            <Image
                                source={require("./../../assets/gif/icon2.png")}
                                style={{
                                    height: 30,
                                    width: 30,
                                    marginLeft: "5%",
                                    marginTop: 20,
                                    borderWidth: 1,
                                    borderColor: Primarycolor(),
                                    borderRadius: 20
                                }}
                            />
                            <View style={{
                                marginLeft: 20,
                                paddingTop: 10
                            }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ fontWeight: "bold", color: "white", width: "80%" }}>MMPG</Text>
                                    <Text style={{ color: "gray", fontSize: 10 }}>6 Aug</Text>
                                </View>
                                <Text style={{ color: "gray" }}>
                                    Hello we are reaching out to ...
                                </Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    noticon: {
        height: 20,
        width: 20,
        marginLeft: "5%",
        marginTop: 20,
    },
    notificationscontainer: {
        backgroundColor: Secondarycolor(),
        width: "100%",
        borderRadius: 10
    },
    notificationchild: {

    },
    profilepic: {
        backgroundColor: "#1c1c1c",
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 5,
        marginTop: 10,
        width: "40%",
        borderRadius: 5
    },
    pendingtext: {
        color: "white",
        marginTop: 10
    },
    pendingnumber: {
        color: "white",
        fontSize: 25,
        paddingVertical: 15,
        paddingLeft: 15,
        paddingRight: 5
    },
    releasesnumber: {
        color: "white",
        fontSize: 25,
        paddingVertical: 15,
        paddingLeft: 20,
        paddingRight: 0
    },
    releasestext: {
        color: "white",
        marginTop: 10,
        marginLeft: 10
    },
    realeasesview: {
        backgroundColor: "#1c1c1c",
        flexDirection: "row",
        width: "65%",
        borderRadius: 5,
        marginRight: 5
    },
    pendingview: {
        backgroundColor: "#1c1c1c",
        flexDirection: "row",
        marginLeft: 10,
        width: "55%",
        borderRadius: 5
    },
    contaner: {
        backgroundColor: "black",
        height: deviceHeight,
    },
    dateview: {
        backgroundColor: Primarycolor(),
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 5
    },
    textin: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    }
})

export default Artistdashboard;