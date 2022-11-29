import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, TextInput, Alert, Modal } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation } from "@react-navigation/native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import { Feather } from "../Components/feather";
import { Fontisto } from "../Components/fontisto";
import { Ionicons } from "../Components/ioniicons";
import { Getuserdetails } from "../Utils/getuserdetails";
import axios from "axios";
import { Changepasswordurl, syncdataurl, updatepaypalemail } from "../Utils/urls";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { BallIndicator } from "react-native-indicators";
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('db.Userdbs') // returns Database object



var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width
const Details = () => {

    const navigation = useNavigation();
    const user = Getuserdetails();
    const [opassword, setopassword] = useState('');
    const [npassword, setnpassword] = useState('');
    const [cpassword, setcpassword] = useState('');
    const [loading, setloading] = useState(false);
    const [email, setemail] = useState('');
   
    const [emailspinner, setemailspinner] = useState(false);

    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    useEffect(() => {

        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    syncdata(_array[0].token);
                },
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction

    }, []);

    const syncdata = (e) => {
        axios.post(syncdataurl, {
            token: e,
        }).then(function (response) {
            if (!response.data.message) {
                if (response.data.type) {
                    setemail(response.data.paypal_email)
                } else {
                }
            } else {
            }
            // 
        }).catch(function (error) {
        });
    }


    const handlechangepassword = () => {
        setloading(true)
        if (npassword != cpassword) {
            setloading(false)
            Alert.alert(
                "Error",
                "The two passwords do not match",
                [
                    { text: "OK" }
                ]
            );

        } else if (!npassword | !cpassword | !opassword) {
            setloading(false)
            Alert.alert(
                "Error",
                "Fill all fields",
                [
                    { text: "OK" }
                ]
            );
        } else {
            axios.post(Changepasswordurl, {
                token: user.token,
                password: cpassword,

            }).then(function (response) {
                setloading(false)
                if (!response.data.message) {

                    setloading(false)
                    Alert.alert(
                        "Success",
                        "Password changed successfully",
                        [
                            { text: "OK" }
                        ]
                    );
                    setcpassword("")
                    setopassword("")
                    setnpassword("")


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
                    "Sorry there was an error try again later",
                    [
                        { text: "OK" }
                    ]
                );
                //if(error.response.status === 401 || error.response.status === 400){}

            });

        }
    }

    const updateemail = () => {
        setloading(true)
        if (!email) {
            setloading(false)
            Alert.alert(
                "Error",
                "Enter an email",
                [
                    { text: "OK" }
                ]
            );

        }
        else {
            setemailspinner(false)
            axios.post(updatepaypalemail, {
                token: user.token,
                email: email,

            }).then(function (response) {
                setloading(false)
                if (!response.data.message) {

                    setloading(false)
                    Alert.alert(
                        "Success",
                        "Email updated successfully",
                        [
                            { text: "OK" }
                        ]
                    );
                    syncdata(user.token)
                    setemail("")
                    

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
                    "Sorry there was an error try again later",
                    [
                        { text: "OK" }
                    ]
                );
                //if(error.response.status === 401 || error.response.status === 400){}

            });

        }
    }

    return (
        <SafeAreaView style={{ backgroundColor: "black", height: deviceHeight }}>
            {loading &&
                <Spinner
                    visible={true}
                    color='red'
                    size={30}
                    customIndicator={<BallIndicator color={Primarycolor()} />}

                />}
            <Modal
                animationType="slide"
                transparent={true}
                visible={emailspinner}
                onRequestClose={() => { setemailspinner(false) }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <TextInput
                            style={{ width: "90%" }}
                            placeholder="Paypal email"
                            // onSubmitEditing={handleLogin}
                            multiline={true}
                            value={email}
                            defaultValue={email}
                            placeholderTextColor='silver'
                            onChangeText={newText => setemail(newText)}
                        />
                        <View style={{
                            flexDirection: "row",
                            marginTop: 20

                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    setemailspinner(false)
                                }}
                                style={{
                                    marginTop: 5,
                                    backgroundColor: Primarycolor(),
                                    padding: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "40%",
                                    borderRadius: 10
                                }}
                            >
                                <Text style={{ color: "white" }}>Cancel</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                onPress={() => updateemail()}
                                style={{
                                    marginTop: 5,
                                    backgroundColor: Primarycolor(),
                                    padding: 10,
                                    alignItems: "center",
                                    justifyContent: "center",
                                    width: "40%",
                                    marginLeft: "20%",
                                    borderRadius: 10
                                }} >
                                <Text style={{ color: "white" }}>Update</Text>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal>
            <View style={styles.fixedview}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "10%" }}>
                    <FontAwesome5 name="angle-left" color={"white"} size={25} />
                </TouchableOpacity>
                <View style={{ width: "80%" }}>
                    <Text style={{ alignSelf: "center", color: "white", fontWeight: "bold" }}>Account</Text>
                </View>

            </View>
            <ScrollView>
                <View style={{ marginTop: 30, paddingBottom: 100 }}>
                    <View style={styles.detailsview}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Account Details</Text>
                        <View style={{ marginTop: 20 }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.detailhead}>Full Name</Text>
                                <Text style={styles.detailcontent}>{user?.username}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.detailhead}>Contact Number</Text>
                                <Text style={styles.detailcontent}></Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.detailhead}>Email</Text>
                                <Text style={styles.detailcontent}>{user?.email}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={styles.detailhead}>Country</Text>
                                <Text style={styles.detailcontent}></Text>
                            </View>
                            <View style={{ height: 15 }} />
                            <View style={{ height: 1, backgroundColor: Semisecondarycolor() }} />
                        </View>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Password</Text>
                        <Text style={{ fontSize: 8, color: "gray" }}>
                            If you wish to change your secure account password, please enter your current{`/n`}
                            password and then the new one below.
                        </Text>
                        <View style={{ height: 5 }} />
                        <TextInput
                            style={styles.passinputs}
                            placeholder="Enter your Old Password"
                            onChangeText={newText => setopassword(newText)}
                            defaultValue={opassword}
                            placeholderTextColor="gray"
                        />
                        <TextInput
                            style={styles.passinputs}
                            placeholder="Enter your New Password"
                            onChangeText={newText => setnpassword(newText)}
                            defaultValue={npassword}
                            placeholderTextColor="gray"
                        />
                        <TextInput
                            style={styles.passinputs}
                            placeholder="Reenter your New Password"
                            onChangeText={newText => setcpassword(newText)}
                            defaultValue={cpassword}
                            placeholderTextColor="gray"
                        />
                        <TouchableOpacity onPress={handlechangepassword} style={{ flexDirection: "row", alignSelf: "flex-end", paddingTop: 5 }}>
                            <Text style={{ color: Primarycolor(), fontSize: 10, marginRight: 5 }}>Update Account Details</Text>
                            <FontAwesome5 name={"angle-right"} size={14} color={Primarycolor()} />
                        </TouchableOpacity>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <View style={styles.detailsview}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>Payment Details</Text>
                            <Text style={{ fontSize: 8, color: "gray" }}>To get paid, connect your PayPal account </Text>
                            <View style={{ marginTop: 20 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.detailhead}>Account</Text>
                                    <Text style={styles.detailcontent}>{email}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.detailhead}>Payee Name</Text>
                                    <Text style={styles.detailcontent}>{user?.username}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.detailhead}>Payment Currency</Text>
                                    <Text style={styles.detailcontent}>United States (USD)</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.detailhead}>Country</Text>
                                    <Text style={styles.detailcontent}></Text>
                                </View>
                                <TouchableOpacity onPress={() => setemailspinner(true)} style={{ flexDirection: "row", alignSelf: "flex-end", paddingTop: 5 }}>
                                    <Text style={{ color: Primarycolor(), fontSize: 10, marginRight: 5 }}>Update Payment Details</Text>
                                    <FontAwesome5 name={"angle-right"} size={14} color={Primarycolor()} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    <View style={{ marginTop: 20 }}>
                        <View style={styles.detailsview}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>Subscriptions</Text>
                            <Text style={{ fontSize: 8, color: "gray" }}>View, manage or cancel your subscriptions.  </Text>
                            <View style={{ marginTop: 20 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.detailhead}>Type</Text>
                                    <Text style={styles.detailcontent}>{user.type === 'Artist' ? "Artist/producer" : "Label"} </Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.detailhead}>Amount</Text>
                                    <Text style={styles.detailcontent}>{user.type === 'Artist' ? "$16.99/yr" : "$69.99/yr"}</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.detailhead}>Status</Text>
                                    <Text style={styles.detailcontent}>Active</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.detailhead}>Last Payment</Text>
                                    <Text style={styles.detailcontent}>Jan 8, 2022</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.detailhead}>Next Payment due</Text>
                                    <Text style={styles.detailcontent}>Jan 8, 2022</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={styles.detailhead}>Payment Method</Text>
                                    <Text style={styles.detailcontent}>paypal</Text>
                                </View>
                                <TouchableOpacity onPress={() => navigation.navigate('authentication', { screen: 'membershipsettings' })} style={{ flexDirection: "row", alignSelf: "flex-end", paddingTop: 5 }}>
                                    <Text style={{ color: Primarycolor(), fontSize: 10, marginRight: 5 }}>View Details</Text>
                                    <FontAwesome5 name={"angle-right"} size={14} color={Primarycolor()} />
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
    centeredView: {
        flex: 1,
        justifyContent: "center",

        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 5,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    passinputs: {
        height: 30,
        marginLeft: 0,
        color: "white",
        borderBottomColor: Semisecondarycolor(),
        borderWidth: 1,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderTopWidth: 0
    },
    detailhead: {
        color: "gray",
        fontWeight: "bold",
        fontSize: 13,
        width: "50%"
    },
    detailcontent: {
        marginLeft: 40,
        color: "gray",
        fontSize: 10
    },
    detailsview: {
        backgroundColor: Viewcolor(),
        marginHorizontal: "5%",
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10
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


export default Details;