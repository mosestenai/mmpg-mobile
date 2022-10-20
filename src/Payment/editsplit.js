import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, TextInput, Alert } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import Entypo from "@expo/vector-icons/Entypo";
import { Ionicons } from "../Components/ioniicons";
import { MaterialCommunityIcons } from "../Components/materialcommunity";
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from "../Components/fontawesome";
import { Getuserdetails } from "../Utils/getuserdetails";
import * as SQLite from 'expo-sqlite';
import Spinner from "react-native-loading-spinner-overlay/lib";
import { BallIndicator } from "react-native-indicators";
import axios from "axios";
import { Getartistdetailsurl, updatesplitsurl } from "../Utils/urls";


const db = SQLite.openDatabase('db.Userdbs') // returns Database object

var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width
const Editplit = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const user = Getuserdetails()
    const [error, seterror] = useState('');
    const [total, settotal] = useState('');
    const [nothing, setnothing] = useState(false);
    const song = route.params.song;
    const [track, settrack] = useState(route.params?.song?.id);
    const [loading, setloading] = useState(false);
    const [percentages, setpercentages] = useState([]);


    const [collaborators, setcollaborators] = useState(route.params.song?.splits);

    const name = route.params.song?.splits[0].name;




    useEffect(() => {
        collaborators.forEach(element => {
            percentages.push(element.percentage)
        });
        settotal(percentages.reduce((a, b) => a + b, 0))
    }, []);






    const onchangeemail = (id, email) => {
        var index = collaborators.findIndex(obj => obj?.id == id);
        collaborators[index].email = email;
    }

    const onchangepercentage = (id, action) => {

        if (action === "add") {
            if (total === 100 || total > 100) {
                Alert.alert(
                    "Error",
                    "Percentage cannot exceed 100",
                    [
                        { text: "OK" }
                    ]
                );
            } else {
                var index = collaborators.findIndex(obj => obj?.id == id);
                const final = parseInt(collaborators[index].percentage) + 5;
                collaborators[index].percentage = final;
                settotal(parseInt(total) + 5)
                setnothing(!nothing)
            }
        } else {
            if (total === 0 || total < 0) {
                Alert.alert(
                    "Error",
                    "Percentage cannot be below 0",
                    [
                        { text: "OK" }
                    ]
                );
            } else {
                var index = collaborators.findIndex(obj => obj?.id == id);
                const final = parseInt(collaborators[index].percentage) - 5;
                collaborators[index].percentage = final;
                settotal(parseInt(total) - 5)
                setnothing(!nothing)
            }
        }


    }

    const addnewmember = () => {

        var last_element = collaborators[collaborators.length - 1];
        const id = parseInt(last_element.id) + 1;


        const object = {
            email: "",
            percentage: 0,
            id: id
        }

        collaborators.push(object)
        setnothing(!nothing)

    }

    const removemember = (val) => {
        const index = collaborators.indexOf(val);
        if (index > -1) { // only splice array when item is found
            collaborators.splice(index, 1); // 2nd parameter means remove one item only
        }
        const reducedtotal = parseInt(total) - parseInt(val.percentage);
        settotal(reducedtotal);
        setnothing(!nothing)
    }


    const savesplits = () => {

        if (total < 100) {
            Alert.alert(
                "Error",
                "Split total does not add upto required percentage 100",
                [
                    { text: "OK" }
                ]
            );
        } else {
            setloading(true)
            axios.post(updatesplitsurl, {
                token: user.token,
                id: track,
                splits: collaborators
            }).then(function (response) {
                setloading(false)
                if (!response.data.message) {
                    if (response.data.success) {
                        Alert.alert(
                            "Success",
                            response.data.success,
                            [
                                {
                                    text: "OK",
                                    onPress: () => navigation.goBack(),
                                }
                            ]
                        );
                    } else {
                        Alert.alert(
                            "Error",
                            "There was unidentified internal error.Contact admin",
                            [
                                { text: "OK" }
                            ]
                        );
                    }

                } else {
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
                Alert.alert(
                    "Error",
                    "There was an error try again later",
                    [
                        { text: "OK" }
                    ]
                );
            });
        }
    }




    return (
        <SafeAreaView style={{ backgroundColor: "black", height: deviceHeight }}>
            {loading &&
                <Spinner
                    visible={true}
                    color='blue'
                    size={40}
                    customIndicator={<BallIndicator color={Primarycolor()} />}
                />}
            <View style={styles.fixedview}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ position: "absolute", left: "5%", marginTop: "3%" }}>
                    <FontAwesome5 name="angle-left" color={"gray"} size={25} />
                </TouchableOpacity>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                    <Text style={{ color: "white", fontSize: 20 }}>Payments</Text>
                </View>
            </View>

            <View style={styles.connectview}>
                <Text style={{ color: "white", fontWeight: "bold", }}>Payment</Text>
                <Text style={{ color: "gray", fontSize: 8 }}>To set yourself up for payments, connect your PayPal account</Text>

                <TouchableOpacity style={styles.paypalbtn}>
                    <Entypo name="paypal" color={"#858480"} size={20} style={{ marginRight: 5 }} />
                    <Text style={{ color: "#858480", fontWeight: "bold" }}>Connect PayPal</Text>
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={styles.addsplitview}>
                    <View style={styles.pickerview}>
                        <Text style={{ color: "white" }}>{song?.title + "/" + song?.artist}</Text>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.leftside}>
                            <Text style={{ color: "gray" }}>Revenue share</Text>
                        </View>
                        <View style={styles.rightside}>
                            <Text style={{ color: "gray" }}>Collaborator</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.leftside}>
                            <View style={styles.counterview}>
                                <Text style={{ color: "white", marginLeft: 5, marginTop: 5 }}>{collaborators[0]?.percentage}%</Text>
                                <View style={{ marginLeft: 30, marginTop: -7 }}>
                                    <TouchableOpacity onPress={() => {
                                        onchangepercentage(1, "add")
                                    }} style={{ paddingTop: 5 }}>
                                        <Entypo name="triangle-up" color={"white"} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        onchangepercentage(1, "reduce")
                                    }} style={{ paddingBottom: 5 }}>
                                        <Entypo name="triangle-down" color={"white"} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.rightside}>
                            <TextInput
                                style={{
                                    height: 40,
                                    width: "80%",
                                    color: "white",
                                    backgroundColor: Secondarycolor(),
                                    borderRadius: 5,
                                    paddingLeft: 10
                                }}
                                placeholder="Artist Name"
                                value={name}
                                onChangeText={newText => { }}
                                placeholderTextColor="gray"
                            />
                        </View>
                    </View>
                    {collaborators?.map((val, key) => {

                        return (val.id !== 1 &&
                            <View style={{ flexDirection: "row" }} key={key}>
                                <View style={styles.leftside}>
                                    <View style={styles.counterview}>
                                        <Text style={{ color: "white", marginLeft: 5, marginTop: 5 }}>{val?.percentage}%</Text>
                                        <View style={{ marginLeft: 30, marginTop: -7 }}>
                                            <TouchableOpacity onPress={() => {
                                                onchangepercentage(val.id, "add")
                                            }} style={{ paddingTop: 5 }}>
                                                <Entypo name="triangle-up" color={"white"} />
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => {
                                                onchangepercentage(val.id, "reduce")
                                            }} style={{ paddingBottom: 5 }}>
                                                <Entypo name="triangle-down" color={"white"} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                                <View style={styles.rightside}>
                                    <View style={{ flexDirection: "row" }}>
                                        <TextInput
                                            style={{
                                                height: 40,
                                                width: "80%",
                                                color: "white",
                                                backgroundColor: Secondarycolor(),
                                                borderRadius: 5,
                                                paddingLeft: 10
                                            }}
                                            placeholder="Email"
                                            onChangeText={newText => onchangeemail(val.id, newText)}
                                            defaultValue={val.email}
                                            placeholderTextColor="gray"
                                        />
                                        <TouchableOpacity onPress={() => removemember(val)} style={{
                                            backgroundColor: Primarycolor(),
                                            justifyContent: "center",
                                            alignItems: "center",
                                            height: 25,
                                            width: 25,
                                            borderRadius: 25,
                                            marginLeft: 5,
                                            marginTop: 5
                                        }}>
                                            <FontAwesome name="minus" color={"white"} size={20} />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        )
                    })}

                    <View style={{ flexDirection: "row" }}>
                        <View style={styles.leftside2}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={styles.iconcheck}>
                                    <FontAwesome name="check" color={"white"} size={10} />
                                </View>
                                <Text style={{ color: "white", fontSize: 10 }}>Total = {total}%</Text>
                            </View>

                        </View>
                        <View style={styles.rightside2}>
                            <View style={{ flexDirection: "row" }}>

                                <TouchableOpacity style={styles.addsplitbutton} onPress={addnewmember}>
                                    <FontAwesome5 name={"plus"} color={Primarycolor()} style={{ marginRight: 5 }} />
                                    <Text style={{ color: Primarycolor(), fontSize: 10 }}>New Member</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.savebtn} onPress={savesplits}>
                                    <Text style={{ color: "white", fontSize: 7 }}>SAVE AND CLOSE</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>
                </View>
            </ScrollView>





            <View style={styles.bottomCenter}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <FontAwesome5 name="home" color={"white"} size={20} />
                </TouchableOpacity>


            </View>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    savebtn: {
        backgroundColor: Primarycolor(),
        marginLeft: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 5,
        borderRadius: 2,
        paddingVertical: 5
    },
    addsplitbutton: {
        marginTop: 5,
        flexDirection: "row"
    },
    iconcheck: {
        backgroundColor: "#99b83c",
        height: 15,
        width: 15,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
        marginRight: 5

    },
    counterview: {
        flexDirection: "row",
        backgroundColor: Secondarycolor(),
        width: "90%",
        padding: 5,
        borderRadius: 5
    },
    rightside: {
        borderWidth: 1,
        borderColor: Semisecondarycolor(),
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        width: "60%"
    },
    leftside: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Semisecondarycolor(),
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        width: "40%"
    },
    rightside2: {
        borderWidth: 1,
        borderColor: Semisecondarycolor(),
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderRightWidth: 0,
        width: "60%",
        borderBottomWidth: 0,
    },
    leftside2: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderColor: Semisecondarycolor(),
        paddingVertical: 5,
        paddingHorizontal: 8,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        width: "40%"
    },
    pickerview: {
        backgroundColor: Primarycolor(),
        padding: 10,
        borderRadius: 5,
        flexDirection: "row"
    },
    trackpicker: {
        color: "white",
        width: "60%",

    },
    addsplitview: {
        marginHorizontal: "3%",
        backgroundColor: Viewcolor(),
        marginTop: 20,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        paddingBottom: 5,
        marginBottom: 100
    },

    paypalbtn: {
        borderWidth: 1,
        borderColor: "gray",
        marginTop: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 8,
        flexDirection: "row"
    },
    connectview: {
        backgroundColor: Viewcolor(),
        marginHorizontal: "3%",
        borderRadius: 5,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20
    },
    statementsview: {
        backgroundColor: Viewcolor(),
        marginHorizontal: "3%",
        borderRadius: 5,
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 5
    },

    bottomCenter: {
        backgroundColor: Secondarycolor(),
        paddingHorizontal: "5%",
        borderTopLeftRadius: 5,
        width: deviceWidth,
        height: 100,
        paddingTop: 15,
        flexDirection: "row",
        position: "absolute",
        top: "90%"
    },

    fixedview: {
        paddingHorizontal: "5%",
        paddingTop: "3%",
        paddingBottom: "5%",
        backgroundColor: "#0b0b0b"
    }
})


export default Editplit;