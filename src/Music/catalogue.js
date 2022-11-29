import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Alert, Image, TextInput, RefreshControl } from "react-native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { Getuserdetails } from "../Utils/getuserdetails";
import { Fetchtracksurl } from "../Utils/urls";
import * as SQLite from 'expo-sqlite';
import Spinner from "react-native-loading-spinner-overlay/lib";
import { BallIndicator } from "react-native-indicators";
import useInterval from 'use-interval'

const db = SQLite.openDatabase('db.Userdbs') // returns Database object


const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

const Catalogue = () => {

    const navigation = useNavigation();
    const user = Getuserdetails();
    const [songs, setsongs] = useState([]);
    const [loading, setloading] = useState(true)
    const [hint, sethint] = useState('');
    const [counter, setcounter] = useState('');
    const [refreshing, setRefreshing] = useState(false);
    const [showsortpopup, setshowsortpopup] = useState(false);
    const [sort, setsort] = useState('ALL');
    const [sortedsongs, setsortedsongs] = useState([]);
    const [nothing, setnothing] = useState(false);




    useEffect(() => {
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    fetchtracks(_array[0].token)
                },
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
    }, []);

    // useInterval(() => {
    //     fetchtracks(user.token);
    // }, 5000);



    const fetchtracks = (e) => {
        axios.post(Fetchtracksurl, {
            token: e,
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                setsongs(response.data)
                setsortedsongs(response.data)
                // if (sort === "ALL") {
                //     setsortedsongs(response.data)
                // } else {
                //     response.data.forEach(element => {
                       
                //         if (element.status === sort) {
                //             songs.push(element)
                //         }
                //     });
                //     setsortedsongs(songs)
                // }

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

    

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "july", "Aug", "Sep", "Oct", "Nov", "Dec"]


    const search = () => {
        setloading(true)
        axios.post(Fetchtracksurl, {
            token: user.token,
            hint: hint
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

    const options = [
        "ALL",
        "APPROVED",
        "PENDING",
        "REJECTED"
    ]

   

    const onsort = (e) => {
        if (e === "ALL") {
            setsortedsongs(songs)
        } else {
            songs.forEach(element => {
                if (element.status === e) {
                    sortedsongs.push(element)
                }
            });

        }
        setnothing(!nothing)
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
            {showsortpopup ? <Spinner
                visible={true}
                color='red'
                size={70}
                customIndicator={
                    <View style={{ width: "80%", height: "30%", backgroundColor: Secondarycolor() }}>
                        <Text style={{ color: "gray", padding: 5 }}>Filter by</Text>
                        <ScrollView>
                            {options.map((val, key) => {
                                return (
                                    <TouchableOpacity key={key}
                                        onPress={() => {
                                            setsort(val)
                                            setshowsortpopup(false)
                                            onsort(val)
                                        }}
                                        style={{
                                            padding: 10,
                                            backgroundColor: sort === val ? Primarycolor() : Secondarycolor()
                                        }}>
                                        <Text style={{ color: "white" }}>{val}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>}
            /> : null}
            <View style={styles.fixedview}>
                <TouchableOpacity onPress={search} style={{ width: "10%" }}>
                    <FontAwesome5 name="search" size={20} color="gray" />
                </TouchableOpacity>
                <TextInput
                    style={{
                        height: 40,
                        marginLeft: 20,
                        marginTop: -10,
                        color: "white",
                        width: "70%",
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    placeholder="Artists/Tracks"
                    onChangeText={newText => sethint(newText)}
                    onSubmitEditing={search}
                    defaultValue={hint}
                    placeholderTextColor="gray"

                />
                <TouchableOpacity style={{ width: "10%", position: "absolute", right: 5, top: 15 }} onPress={() => {
                    setsortedsongs([])
                    setshowsortpopup(true)
                }}>
                    <FontAwesome5 name="sliders-h" size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={search}
                    color='#4a43eb'
                    tintColor="#4a43eb"
                />
            }>
                <View style={{ paddingBottom: 100 }}>
                    {sortedsongs.map((val, key) => {
                        return (
                            val.status === 'APPROVED' ?
                                <View style={styles.trackview} key={key}>
                                    <View style={{ width: "80%" }}>
                                        <View style={{ flexDirection: "row" }}>
                                            <TouchableOpacity style={styles.coverimage}>
                                                <Image
                                                    source={{ uri: val.url }}
                                                    style={{
                                                        height: "100%",
                                                        width: "100%",
                                                    }}
                                                />
                                            </TouchableOpacity>
                                            <View style={styles.coverdetails}>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={{ fontWeight: "bold", color: "gray", fontSize: 12 }}>NO</Text>
                                                    <Text style={{ marginLeft: 5, color: "gray", fontSize: 10, marginTop: 3 }}>{val.title}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={{ fontWeight: "bold", color: "gray", fontSize: 12 }}>ISRC</Text>
                                                    <Text style={{ marginLeft: 5, color: "gray", fontSize: 10, marginTop: 3 }}>{val.isrc}</Text>
                                                </View>
                                                <View style={{ flexDirection: "row" }}>
                                                    <Text style={{ fontWeight: "bold", color: "gray", fontSize: 12 }}>Release Date</Text>
                                                    <Text style={{ marginLeft: 5, color: "gray", fontSize: 10, marginTop: 3 }}>{val.date}</Text>
                                                </View>

                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.approvedbtn}>
                                            <Text style={styles.approvedbtntext}>Approved</Text>
                                        </TouchableOpacity>
                                        <Text style={{ marginTop: 10, color: "gray" }}>{val.title}/{val.artist}</Text>
                                    </View>

                                    <View >
                                        <View>
                                            <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{val.date.substring(0, 4)}</Text>
                                            <Text style={{ alignSelf: "flex-end", color: "gray", fontSize: 10 }}>{val.date.substring(8, 10)} {
                                                val.date.substring(5, 6) === "0" ? months[val.date.substring(6, 7)] :
                                                    months[val.date.substring(5, 7)]
                                            }</Text>
                                        </View>
                                        <TouchableOpacity style={styles.releasebtn} onPress={() => navigation.navigate('authentication', {
                                            screen: 'viewmusic',
                                            params: { artist: val.artist, title: val.title, id: val.id, url: val.url, smartlink: val.smartlink }
                                        })}>
                                            <FontAwesome5 name="arrow-circle-right" color="white" size={15} />
                                        </TouchableOpacity>
                                    </View>
                                </View> : val.status === 'PENDING' ?
                                    <View style={styles.trackview} key={key}>
                                        <View style={{ width: "80%" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <TouchableOpacity style={styles.coverimage}>
                                                    <Image
                                                        source={{ uri: val.url }}
                                                        style={{
                                                            height: "100%",
                                                            width: "100%",
                                                        }}
                                                    />
                                                </TouchableOpacity>

                                            </View>
                                            <TouchableOpacity style={styles.pendingbtn}>
                                                <Text style={styles.approvedbtntext}>Pending</Text>
                                            </TouchableOpacity>
                                            <Text style={{ marginTop: 10, color: "gray", fontSize: 13 }}>{val.title}/{val.artist}</Text>
                                        </View>

                                        <View>
                                            <View>
                                                <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{val.date.substring(0, 4)}</Text>
                                                <Text style={{ alignSelf: "flex-end", color: "gray", fontSize: 10 }}>{val.date.substring(8, 10)} {
                                                    val.date.substring(5, 6) === "0" ? months[val.date.substring(6, 7)] :
                                                        months[val.date.substring(5, 7)]
                                                }</Text>
                                            </View>
                                        </View>
                                    </View> :
                                    <View style={styles.trackview} key={key}>
                                        <View style={{ width: "80%" }}>
                                            <View style={{ flexDirection: "row" }}>
                                                <TouchableOpacity style={styles.coverimage}>
                                                    <Image
                                                        source={{ uri: val.url }}
                                                        style={{
                                                            height: "100%",
                                                            width: "100%",
                                                        }}
                                                    />
                                                </TouchableOpacity>

                                            </View>
                                            <TouchableOpacity style={styles.rejectedbtn}>
                                                <Text style={styles.approvedbtntext}>Rejected</Text>
                                            </TouchableOpacity>
                                            <Text style={{ marginTop: 10, color: "gray" }}>{val.title}/{val.artist}</Text>
                                        </View>

                                        <View>
                                            <View>
                                                <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>{val.date.substring(0, 4)}</Text>
                                                <Text style={{ alignSelf: "flex-end", color: "gray", fontSize: 10 }}>{val.date.substring(8, 10)} {
                                                    val.date.substring(5, 6) === "0" ? months[val.date.substring(6, 7)] :
                                                        months[val.date.substring(5, 7)]
                                                }</Text>
                                            </View>
                                            <TouchableOpacity style={styles.releasebtn} onPress={() => navigation.navigate('authentication', { screen: 'uploader' })}>
                                                <Text style={{ color: Primarycolor(), fontWeight: "bold", fontSize: 12 }}>Modify</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                        )
                    })}
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    rejectedbtn: {
        backgroundColor: "#e8005e",
        alignItems: "center",
        justifyContent: "center",
        width: "40%",
        marginTop: 20,
        borderRadius: 15,
        paddingVertical: 5
    },
    pendingbtn: {
        backgroundColor: "#ffbd59",
        alignItems: "center",
        justifyContent: "center",
        width: "40%",
        marginTop: 20,
        borderRadius: 15,
        paddingVertical: 5
    },
    releasebtn: {
        marginTop: 100,
        alignSelf: "flex-end",
    },
    approvedbtntext: {
        color: "white"
    },
    approvedbtn: {
        backgroundColor: Primarycolor(),
        alignItems: "center",
        justifyContent: "center",
        width: "40%",
        marginTop: 20,
        borderRadius: 15,
        paddingVertical: 5
    },
    coverdetails: {
        marginLeft: 10,
        paddingTop:30
    },
    coverimage: {
        backgroundColor: "gray",
        height: 80,
        width: 80,
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center"
    },
    fixedview: {
        backgroundColor: Secondarycolor(),
        flexDirection: "row",
        paddingTop: 20,
        paddingHorizontal: "5%",
        width: deviceWidth,
        paddingBottom: 20
    },
    trackview: {
        backgroundColor: Viewcolor(),
        flexDirection: "row",
        marginTop: 20,
        marginHorizontal: "3%",
        borderRadius: 10,
        padding: 10
    }
})

export default Catalogue;