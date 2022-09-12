import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import SwitchToggle from "react-native-switch-toggle";

var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width
const Notificationssettings = () => {

    const navigation = useNavigation();
    const [on, seton] = useState(false);


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
                <View style={{right:5,position:"absolute"}}>
                    <SwitchToggle
                        switchOn={on}
                        onPress={() => seton(!on)}
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