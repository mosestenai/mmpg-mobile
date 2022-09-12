import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Alert, Linking, Image } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation } from "@react-navigation/native";
import { Primarycolor, Secondarycolor, Semisecondarycolor } from "../Utils/color";
import { FontAwesome } from "../Components/fontawesome";
import { MaterialCommunityIcons } from "../Components/materialcommunity";
import * as Updates from "expo-updates";
import * as SQLite from 'expo-sqlite';
import axios from "axios";
import { checkpaymentstatusurl, Fetchtracksurl } from "../Utils/urls";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { BallIndicator } from "react-native-indicators";
import { Getuserdetails } from "../Utils/getuserdetails";

const db = SQLite.openDatabase('db.Userdbs') // returns Database object




var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width
const Uploader = () => {

    const navigation = useNavigation();
    const [paid, setpaid] = useState(false);
    const user = Getuserdetails();
    const [loading, setloading] = useState(true);
    const [responsestatus, setresponsestatus] = useState(false);
    const [linkview, setlinkview] = useState(false);
    const [test, settest] = useState('');
    const [songs, setsongs] = useState([]);
    useEffect(() => {

        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    checkpayment(_array[0].token)
                    fetchtracks(_array[0].token)
                },
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction

    }, []);



    const checkpayment = (e) => {
        axios.post(checkpaymentstatusurl, {
            token: e,
            status: "true"
        }).then(function (response) {
            setloading(false)
            setresponsestatus(true)
            if (!response.data.message) {
                if (response.data.expires.length > 3) {
                    setpaid(true)
                } else {
                    setpaid(false)
                }
            } else {
                setlinkview(true)
            }
            // 
        }).catch(function (error) {
            setloading(false)
            //if(error.response.status === 401 || error.response.status === 400){}

        });
    }

    const startupload = () => {
        if (!responsestatus) {
            Alert.alert(
                "Error",
                "There was an error try again later",
                [
                    { text: "OK" }
                ]
            );
        } else {
            if (paid) {
                navigation.navigate('authentication', { screen: 'step1' })
            } else {
                setlinkview(true)
            }
        }
    }

    const fetchtracks = (e) => {
        axios.post(Fetchtracksurl, {
            token: e,
        }).then(function (response) {
            // setloading(false)
            if (!response.data.message) {
                setsongs(response.data)
            } else {
                // Alert.alert(
                //     "Error",
                //     response.data.message,
                //     [
                //         { text: "OK" }
                //     ]
                // );
            }
            // 
        }).catch(function (error) {
            // setloading(false)
            // //if(error.response.status === 401 || error.response.status === 400){}
            // Alert.alert(
            //     "Error",
            //     "there was an error fetching tracks",
            //     [
            //         { text: "OK" }
            //     ]
            // );
        });
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
            {linkview &&
                <Spinner
                    visible={true}
                    color='blue'
                    size={40}
                    customIndicator={
                        <View style={{
                            backgroundColor: "white",
                            padding: 15
                        }}>
                            <Text style={{ fontWeight: "bold" }}>Pending payment status!!</Text>
                            <TouchableOpacity
                                onPress={() =>  Linking.openURL('https://mmpg.eazistey.co.ke/' + user.token)}
                                style={{ backgroundColor: Primarycolor(), padding: 10, marginTop: 5, borderRadius: 5 }}

                            >
                                <Text style={{ color: "white" }}>PROCEED TO PAYMENT</Text>
                            </TouchableOpacity>
                        </View>}
                />}
            <View style={styles.fixedview}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "10%" }}>
                    <FontAwesome5 name="angle-left" color={"gray"} size={25} />
                </TouchableOpacity>
                <View style={{ position: "absolute", right: 0, marginTop: "5%", paddingRight: 30 }}>
                    <Text style={{ alignSelf: "center", color: "white", fontSize: 20 }}>Uploader</Text>
                </View>

            </View>
            <View style={{ paddingTop: 20, paddingBottom: 20 }}>
                <Text style={{ fontWeight: "bold", fontSize: 15, color: "white", alignSelf: "center" }}> Welcome back to the Uploader</Text>
            </View>
            <View style={styles.middleview}>
                <Text style={styles.releasetext}>Create a new release</Text>
                <View style={{ marginVertical: 20 }}>
                    <Text style={styles.contenttext}>Start the process of getting your music out to the world!</Text>
                    <Text style={styles.contenttext}>Make sure you have everything you need to start.</Text>
                </View>
                <TouchableOpacity
                    onPress={startupload}
                    style={styles.startbutton}>
                    <Text style={{ color: "white", fontWeight: "bold" }}>Start</Text>
                </TouchableOpacity>

            </View>
            <View style={{ marginHorizontal: "3%", paddingTop: 10 }}>
                <Text style={{ fontWeight: "bold", color: "white", fontSize: 10 }}>Your releases</Text>
                <Text style={{ fontSize: 5, color: "gray", marginTop: 5 }}>Below are your in progress and submitted releases. Once we have approved them, they will move from here to your Catalogue.</Text>
                <ScrollView>
                    <View style={{ marginBottom: 500 }}>


                        {Array.isArray(songs) && songs.map((val, key) => {

                            return (val.status === 'REJECTED' &&
                                <View style={styles.releasesviews} key={key}>
                                    <View style={{ flexDirection: "row" }} >
                                        <View style={styles.dot} />
                                        <View style={{ marginLeft: 10, width: "70%" }}>
                                            <Text style={styles.querytext}>Queried</Text>
                                            <Text style={styles.querymessage}>Something needs to be amended before we can approve your track. Please check your</Text>
                                            <Text style={styles.querymessage}>notifications panel in your dashboard to make the changes before resubmitting.</Text>
                                        </View>
                                        <Text style={styles.numbertext}>(1)</Text>
                                        <TouchableOpacity style={styles.arrowdown}><FontAwesome size={25} name="angle-down" color="gray" /></TouchableOpacity>
                                    </View>
                                    <View style={styles.line} />
                                    <View style={{ flexDirection: "row", marginTop: 5 }}>
                                        <View style={styles.songcover}>
                                            <Image
                                                source={{ uri: val.url }}
                                                style={{
                                                    height: "100%",
                                                    width: "100%",
                                                }}
                                            />
                                        </View>
                                        <Text style={styles.songname}></Text>
                                        <Text style={styles.releasedatetext}>Release date:{`\n`}{val.date}</Text>
                                        <TouchableOpacity style={styles.modifytext} onPress={() => navigation.navigate('authentication', { screen: 'step1',params:{data:val} })}>
                                            <Text style={{ color: Primarycolor(), fontWeight: "bold", fontSize: 10 }}>Modify</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.deletebtn}>
                                            <MaterialCommunityIcons name="delete-forever" color={"white"} size={25} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            )
                        })}



                        {/* <View style={styles.releasesviews}>
                            <View style={{ flexDirection: "row" }}>
                                <View style={styles.dot2} />
                                <View style={{ marginLeft: 10, width: "70%" }}>
                                    <Text style={styles.querytext}>Draft</Text>
                                    <Text style={styles.querymessage}>Your release is being built and has not yet been submitted.</Text>
                                </View>
                                <Text style={styles.numbertext}>(1)</Text>
                                <TouchableOpacity style={styles.arrowdown}><FontAwesome size={25} name="angle-down" color="gray" /></TouchableOpacity>
                            </View>
                            <View style={styles.line} />
                            <View style={{ flexDirection: "row", marginTop: 5 }}>
                                <View style={styles.songcover}>
                                </View>
                                <Text style={styles.songname}>Song</Text>
                                <Text style={styles.releasedatetext}>Draft</Text>
                                <TouchableOpacity style={styles.modifytext}>
                                    <Text style={{ color: Primarycolor(), fontWeight: "bold", fontSize: 10 }}>Continue</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.deletebtn}>
                                    <MaterialCommunityIcons name="delete-forever" color={"white"} size={25} />
                                </TouchableOpacity>
                            </View>
                        </View> */}

                    </View>

                </ScrollView>

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
    deletebtn: {
        marginTop: 10,
    },
    modifytext: {
        marginTop: 15,
        width: "15%"
    },
    releasedatetext: {
        color: "gray",
        fontSize: 10,
        marginTop: 10,
        width: "25%"
    },
    songname: {
        color: "white",
        marginLeft: 10,
        marginTop: 15,
        fontSize: 13,
        width: "30%"
    },
    songcover: {
        height: 50,
        width: 50,
        borderRadius: 5
    },
    line: {
        backgroundColor: "gray",
        height: 1,
        marginTop: 5
    },
    querymessage: {
        fontSize: 5,
        color: "gray"
    },
    arrowdown: {
        marginLeft: 20
    },
    numbertext: {
        fontWeight: "bold",
        fontSize: 15,
        color: "gray",
        marginLeft: "1%"
    },
    querytext: {
        color: "gray",
        fontWeight: "bold"
    },
    dot: {
        height: 10,
        width: 10,
        borderRadius: 10,
        backgroundColor: "#ff914d",
        marginTop: 5
    },
    dot2: {
        height: 10,
        width: 10,
        borderRadius: 10,
        backgroundColor: Semisecondarycolor(),
        marginTop: 5
    },
    releasesviews: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: Secondarycolor(),
        marginVertical: 10
    },
    startbutton: {
        backgroundColor: Primarycolor(),
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        borderRadius: 5,
        marginHorizontal: "30%",
        marginBottom: 15
    },
    contenttext: {
        color: "gray",
        alignSelf: "center",
        fontSize: 10
    },
    releasetext: {
        color: "white",
        alignSelf: "center",
        marginTop: 20,
        fontWeight: "bold"
    },
    middleview: {
        backgroundColor: Secondarycolor(),
        marginHorizontal: "3%",
        borderRadius: 5
    },
    imageview: {
        height: deviceHeight / 2
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
        paddingVertical: "5%",
        flexDirection: "row",
        backgroundColor: Secondarycolor()
    }
})


export default Uploader;