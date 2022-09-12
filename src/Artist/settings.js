import React from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome5';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import { Primarycolor, Secondarycolor } from "../Utils/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "../Components/fontawesome";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { Feather } from "../Components/feather";
import { Ionicons } from "../Components/ioniicons";
import { MaterialCommunityIcons } from "../Components/materialcommunity";



var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

const Settings = () => {
    const navigation = useNavigation();



    return (
        <SafeAreaView style={{ backgroundColor: "black", height: deviceHeight }}>
            <View style={{ paddingBottom: 20, paddingTop: 20, backgroundColor: Secondarycolor() }}>
                <TouchableOpacity style={{ position: "absolute", left: "3%", top: 15 }} onPress={() => navigation.goBack()}>
                    <Icon name="angle-left" color="white" size={25} />
                </TouchableOpacity>
                <Text style={{ color: "white", fontWeight: "bold", alignSelf: "center" }}>Settings</Text>
            </View>

            <ScrollView>
                <View style={{ marginHorizontal: "5%" }}>
                    <View style={{ marginTop: 20, }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>GENERAL</Text>
                    </View>

                    <View>

                        <View style={styles.div}>
                            <View style={{ width: "20%" }}>
                                <SimpleLineIcons name="user" color={"white"} size={25} />
                            </View>
                            <View style={{ width: "40%" }}>
                                <Text style={{ fontWeight: "bold", color: "white" }}>Account</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('authentication', { screen: 'details' })}
                                style={{ position: "absolute", right: 5 }}>
                                <FontAwesome5 name={"angle-right"} color="white" size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.div}>
                            <View style={{ width: "20%" }}>
                                <Feather name="bell" color={"white"} size={25} />
                            </View>
                            <View style={{ width: "40%" }}>
                                <Text style={{ fontWeight: "bold", color: "white" }}>Notifications</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('authentication', { screen: 'notificationsettings' })}
                                style={{ position: "absolute", right: 5 }}>
                                <FontAwesome5 name={"angle-right"} color="white" size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.div}>
                            <View style={{ width: "20%" }}>
                                <FontAwesome5 name="chess-queen" color={"white"} size={25} />
                            </View>
                            <View style={{ width: "40%" }}>
                                <Text style={{ fontWeight: "bold", color: "white" }}>Membership</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('authentication', { screen: 'membershipsettings' })}
                                style={{ position: "absolute", right: 5 }}>
                                <FontAwesome5 name={"angle-right"} color="white" size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.div}>
                            <View style={{ width: "20%" }}>
                                <Ionicons name="trash-outline" color={"white"} size={25} />
                            </View>
                            <View style={{ width: "40%" }}>
                                <Text style={{ fontWeight: "bold", color: "white" }}>Delete Account</Text>
                            </View>
                            <TouchableOpacity 
                             onPress={() => navigation.navigate('authentication', { screen: 'deleteaccount' })}
                            style={{ position: "absolute", right: 5 }}>
                                <FontAwesome5 name={"angle-right"} color="white" size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.div}>
                            <View style={{ width: "20%" }}>
                                <MaterialCommunityIcons name="logout" color={"white"} size={25} />
                            </View>
                            <View style={{ width: "40%" }}>
                                <Text style={{ fontWeight: "bold", color: "white" }}>Logout</Text>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('authentication', { screen: 'logout' })}
                                style={{ position: "absolute", right: 5 }}>
                                <FontAwesome5 name={"angle-right"} color="white" size={25} />
                            </TouchableOpacity>
                        </View>
                        <View style={{ marginTop: 10, }}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>FEEDBACK</Text>
                        </View>
                        <View style={styles.div}>
                            <View style={{ width: "20%" }}>
                                <AntDesign name="questioncircleo" color={"white"} size={25} />
                            </View>
                            <View style={{ width: "40%" }}>
                                <Text style={{ fontWeight: "bold", color: "white" }}>Help</Text>
                            </View>
                            <TouchableOpacity 
                             onPress={() => navigation.navigate('authentication', { screen: 'help' })}
                            style={{ position: "absolute", right: 5 }}>
                                <FontAwesome5 name={"angle-right"} color="white" size={25} />
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    div: {
        flexDirection: "row",
        marginVertical: 20
    }

})

export default Settings;