import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Image, Alert } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Primarycolor, Secondarycolor } from "../Utils/color";
import { Feather } from "../Components/feather";
import { Fontisto } from "../Components/fontisto";
import { Ionicons } from "../Components/ioniicons";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { BallIndicator } from "react-native-indicators";


var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width
const Viewmusic = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [confirmpopup, setconfirmpopup] = useState(false);

    const requesttakedown = () => {

    }

    return (
        <SafeAreaView style={{ backgroundColor: "black", height: deviceHeight }}>
            {confirmpopup &&
                <Spinner
                    visible={true}
                    color='red'
                    size={30}
                    customIndicator={
                        <View style={{ backgroundColor: "white", padding: 15 }}>
                            <Text style={{ fontWeight: "bold", color: Primarycolor() }}>Are you sure you want to take down  this music? this action cannot be undone</Text>
                            <View style={{ marginTop: 10, flexDirection: "row" }}>
                                <TouchableOpacity onPress={()=>setconfirmpopup(false)} style={{
                                    backgroundColor: Primarycolor(),
                                    padding: 10,
                                    borderRadius: 5,
                                    margin: 10
                                }}>
                                    <Text style={{ color: "white" }}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={{
                                    backgroundColor: Primarycolor(),
                                    padding: 10,
                                    borderRadius: 5,
                                    margin: 10
                                }}>
                                    <Text style={{ color: "white" }}>Ok,Takedown</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}

                />}
            <View style={styles.fixedview}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "10%" }}>
                    <FontAwesome5 name="angle-left" color={"gray"} size={25} />
                </TouchableOpacity>
                <View style={{ width: "80%" }}>
                    <Text style={{ alignSelf: "center", color: "gray" }}>{route.params.artist}/{route.params.title}</Text>
                </View>

            </View>
            <View style={styles.imageview}>

                <Image
                    source={{ uri: route.params.url }}
                    style={{
                        height: "100%",
                        width: "95%",
                        marginHorizontal: 10,
                        borderRadius: 200
                    }}
                />
            </View>

            <View style={styles.contentview}>
                <TouchableOpacity>
                    <Text style={{ color: Primarycolor() }}>SMARTLINK</Text>
                </TouchableOpacity>
                <Text style={styles.sharemusictext}>Share your music {`\n`}with the world</Text>

                <View style={{ flexDirection: "row", marginTop: 25 }}>
                    <TouchableOpacity style={styles.buttonshare}>
                        <Ionicons name="ios-arrow-redo-outline" color={"white"} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonshare}>
                        <Ionicons name={"copy-outline"} color={"white"} size={25} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonshare}>
                        <Fontisto name="world-o" color={"white"} size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.bottomCenter}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <FontAwesome5 name="home" color={"white"} size={20} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setconfirmpopup(true)} style={{
                    backgroundColor: "#e8005e",
                    marginLeft: "65%",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    height: 30,
                    borderRadius: 5
                }}>
                    <Text style={{ color: "white" }}>Takedown</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    imageview: {
        height: deviceHeight / 2
    },
    bottomCenter: {
        backgroundColor: Secondarycolor(),
        paddingHorizontal: "5%",
        borderTopLeftRadius: 5,
        height: 60,
        paddingTop: 15,
        flexDirection: "row",
        position: "absolute",
        bottom: 0
    },
    buttonshare: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "white",
        width: "30%",
        height: 45,
        marginRight: 5
    },
    sharemusictext: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25
    },
    contentview: {
        marginHorizontal: "10%"
    },
    fixedview: {
        paddingHorizontal: "5%",
        paddingVertical: "5%",
        flexDirection: "row"
    }
})


export default Viewmusic;