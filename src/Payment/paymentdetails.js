import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Alert } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import Entypo from "@expo/vector-icons/Entypo";
import { Ionicons } from "../Components/ioniicons";
import { MaterialCommunityIcons } from "../Components/materialcommunity";
import axios from "axios";
import { Fetchtracksurl, Fetchuserstatements, updatesplitsurl } from "../Utils/urls";
import { Getuserdetails } from "../Utils/getuserdetails";
import * as SQLite from 'expo-sqlite';
import Spinner from "react-native-loading-spinner-overlay/lib";
import { BallIndicator } from "react-native-indicators";
import useInterval from 'use-interval'

const db = SQLite.openDatabase('db.Userdbs') // returns Database object




var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width
const Paymentdetails = () => {

    const navigation = useNavigation();
    const user = Getuserdetails()
    const route = useRoute();
    const [loading, setloading] = useState(true);

    const [songs, setsongs] = useState([]);
    const [statements, setstatements] = useState([]);

    useEffect(() => {
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    getstatements(_array[0].token)
                },
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction

    }, []);

    useInterval(() => {
        fetchtracks(user.token);
    }, 5000);


    const getstatements = (e) => {
        axios.post(Fetchuserstatements, {
            token: e
        }).then(function (response) {
            if (!response.data.message) {
                setstatements(response.data)
                fetchtracks(e)
            } else {
                setloading(false)
                fetchtracks(e)
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
                "There was an error fetching your statements.Try again later",
                [
                    { text: "OK" }
                ]
            );

            //if(error.response.status === 401 || error.response.status === 400){}

        });
    }

    const fetchtracks = (e) => {
        axios.post(Fetchtracksurl, {
            token: e,
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                setsongs(response.data)
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
            //if(error.response.status === 401 || error.response.status === 400){}
            Alert.alert(
                "Error",
                "there was an error fetching tracks",
                [
                    { text: "OK" }
                ]
            );

        });
    }


    const deletesplit = (id) => {
        setloading(true)
        axios.post(updatesplitsurl, {
            token: user.token,
            id: id,
            action: "delete",
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                if (response.data.success) {
                    Alert.alert(
                        "Success",
                        response.data.success,
                        [
                            {
                                text: "OK"
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




    return (
        <SafeAreaView style={{ backgroundColor: "black", height: deviceHeight }}>
            {loading &&
                <Spinner
                    visible={true}
                    color='red'
                    size={30}
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

            <View style={styles.connectview}>
                <Text style={{ color: "white", fontWeight: "bold", }}>Splits</Text>
                <Text style={{ color: "gray", fontSize: 8 }}>All tracks with active royalty splits will appear here.</Text>
                <View style={styles.splitline} />
                <View style={{ height: 10 }} />
                {songs.map((val, key) => {

                    return (val.splits ?
                        <View style={styles.splitview} key={key}>
                            <View style={{ width: "60%" }}>
                                <Text style={{ color: "gray", fontSize: 10 }}>{val.title}/{val.artist}</Text>
                            </View>
                            <View style={{ flexDirection: "row" }}>
                                <TouchableOpacity style={styles.editbtn} onPress={() => navigation.navigate('authentication', {
                                    screen: 'editsplit',
                                    params: { song: val }
                                })}>
                                    <Text style={{ color: Primarycolor(), fontSize: 10 }}>Edit Split</Text>
                                    <Ionicons name={"md-pencil-sharp"} color={Primarycolor()} style={{ marginHorizontal: 5, marginTop: 2 }} size={10} />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deletebtn} onPress={() => deletesplit(val.id)}>
                                    <MaterialCommunityIcons name="delete-forever" color={"white"} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View> : null
                    )
                })}
                <View style={styles.splitline} />
                <TouchableOpacity style={styles.addsplitbutton} onPress={() => navigation.navigate('authentication', {
                    screen: 'addsplit',
                    params: { songs: songs }
                })}>
                    <FontAwesome5 name={"plus"} color={Primarycolor()} style={{ marginRight: 5 }} />
                    <Text style={{ color: Primarycolor(), fontSize: 10 }}>ADD SPLIT</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.statementsview}>
                <Text style={{ color: "white", fontWeight: "bold", }}>Statements</Text>
                <View style={styles.statetementheaders}>
                    <Text style={styles.headingtext}>Period</Text>
                    <Text style={styles.headingtext}>Balance Payments</Text>
                    <Text style={styles.headingtext}>Royalty Splits</Text>
                    <Text style={styles.headingtext}>Royalties</Text>
                </View>
                <View style={styles.splitline} />
                {statements.map((val, key) => {

                    return (
                        <View style={styles.statetementheaders} key={key}>
                            <Text style={styles.headingtext}>{val.date}</Text>
                            <Text style={styles.headingtext}></Text>
                            <Text style={styles.headingtext}></Text>
                            <Text style={styles.headingtext}>${val.amount}</Text>
                        </View>
                    )
                })}
                <View style={styles.statetementheaders}>
                    <Text style={{ width: "25%", fontWeight: "bold", fontSize: 8, color: "white" }}>TOTAL</Text>
                    <Text style={styles.headingtext}></Text>
                    <Text style={styles.headingtext}></Text>
                    <Text style={styles.headingtext}>$0.00</Text>
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
    headingtext: {
        width: "25%",
        color: "gray",
        fontSize: 7
    },
    statetementheaders: {
        flexDirection: "row"
    },
    addsplitbutton: {
        marginTop: 5,
        padding: 10,
        flexDirection: "row"
    },
    deletebtn: {
        marginTop: -10,
        marginLeft: 7,
        padding:5
    },
    editbtn: {
        flexDirection: "row",
    },
    splitview: {
        padding: 2,
        flexDirection: "row"
    },
    splitline: {
        marginTop: 10,
        backgroundColor: "#525659",
        height: 1
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


export default Paymentdetails;