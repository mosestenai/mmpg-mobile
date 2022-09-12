import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, TextInput } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation } from "@react-navigation/native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import Entypo from "@expo/vector-icons/Entypo";
import { Ionicons } from "../Components/ioniicons";
import { MaterialCommunityIcons } from "../Components/materialcommunity";
import { Picker } from '@react-native-picker/picker';
import { FontAwesome } from "../Components/fontawesome";



var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width
const Addsplit = () => {

    const navigation = useNavigation();
    const [track, settrack] = useState('');
    const [firstp, setfirstp] = useState(50);
    const [secondp, setsecondp] = useState(25);
    const [thirdp, setthirdp] = useState(25);
    const [total, settotal] = useState(firstp + secondp + thirdp);

    const [name, setname] = useState('');
    const [email1, setemail1] = useState('');
    const [email2, setemail2] = useState('');
    const [hint, sethint] = useState(false);

    var trackoptions = ["Select Track", "track1", "track2", "track3"]

    const donothing = () => {
        sethint(!hint)
        settotal(firstp + secondp + thirdp)
    }


    return (
        <SafeAreaView style={{ backgroundColor: "black", height: deviceHeight }}>
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

            <View style={styles.addsplitview}>
                <View style={styles.pickerview}>
                    <Picker
                        style={styles.trackpicker}
                        dropdownIconColor={"white"}
                        selectedValue={track}
                        onValueChange={(itemValue, itemIndex) =>
                            settrack(itemValue)
                        }>
                        {trackoptions.map((item, index) => {
                            return (<Picker.Item label={item} value={item} key={index} />)
                        })}

                    </Picker>
                    <Text style={{ color: "white", position: "absolute", right: 10, marginTop: 15 }}>{track !== 'Select Track' ? track : null}</Text>
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
                            <Text style={{ color: "white", marginLeft: 5, marginTop: 5 }}>{firstp}%</Text>
                            <View style={{ marginLeft: 30, marginTop: -7 }}>
                                <TouchableOpacity onPress={() => {
                                    setfirstp(firstp + 5)
                                    donothing()
                                }} style={{ paddingTop: 5 }}>
                                    <Entypo name="triangle-up" color={"white"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    settotal(firstp + secondp + thirdp)
                                    setfirstp(firstp - 5)
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
                            onChangeText={newText => setname(newText)}
                            defaultValue={name}
                            placeholderTextColor="gray"
                        />
                    </View>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.leftside}>
                        <View style={styles.counterview}>
                            <Text style={{ color: "white", marginLeft: 5, marginTop: 5 }}>{secondp}%</Text>
                            <View style={{ marginLeft: 30, marginTop: -7 }}>
                                <TouchableOpacity onPress={() => {
                                    setsecondp(secondp + 5)
                                    settotal(firstp + secondp + thirdp)
                                }} style={{ paddingTop: 5 }}>
                                    <Entypo name="triangle-up" color={"white"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    setsecondp(secondp - 5)
                                    settotal(firstp + secondp + thirdp)
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
                                onChangeText={newText => setemail1(newText)}
                                defaultValue={email1}
                                placeholderTextColor="gray"
                            />
                            <TouchableOpacity style={{
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
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.leftside}>
                        <View style={styles.counterview}>
                            <Text style={{ color: "white", marginLeft: 5, marginTop: 5 }}>{thirdp}%</Text>
                            <View style={{ marginLeft: 30, marginTop: -7 }}>
                                <TouchableOpacity onPress={() => {
                                    setthirdp(thirdp + 5)
                                    settotal(firstp + secondp + thirdp)
                                }} style={{ paddingTop: 5 }}>
                                    <Entypo name="triangle-up" color={"white"} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => {
                                    settotal(firstp + secondp + thirdp)
                                    setthirdp(thirdp - 5)
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
                                placeholder="Artist Name"
                                onChangeText={newText => setemail2(newText)}
                                defaultValue={email2}
                                placeholderTextColor="gray"
                            />
                            <TouchableOpacity style={{
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
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.leftside2}>
                        <View style={{ flexDirection: "row" }}>
                            <View style={styles.iconcheck}>
                                <FontAwesome name="check" color={"white"} size={10} />
                            </View>
                            <Text style={{ color: "white", fontSize: 10 }}>Totall = {total}%</Text>
                        </View>

                    </View>
                    <View style={styles.rightside2}>
                        <View style={{ flexDirection: "row" }}>

                            <TouchableOpacity style={styles.addsplitbutton} onPress={() => navigation.navigate('authentication', { screen: 'addsplit' })}>
                                <FontAwesome5 name={"plus"} color={Primarycolor()} style={{ marginRight: 5 }} />
                                <Text style={{ color: Primarycolor(), fontSize: 10 }}>New Member</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.savebtn}>
                                <Text style={{ color: "white", fontSize: 7 }}>SAVE AND CLOSE</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
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
        borderBottomWidth:0,
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
        borderBottomWidth:0,
        width: "40%"
    },
    pickerview: {
        backgroundColor: Primarycolor(),
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
        borderBottomLeftRadius:10,
        borderBottomRightRadius:10,
        paddingBottom:5
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


export default Addsplit;