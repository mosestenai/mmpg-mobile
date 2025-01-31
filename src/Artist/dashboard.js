import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView, SafeAreaView, Image, Alert } from "react-native";
import { Primarycolor, Secondarycolor } from "../Utils/color";
import Icon from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from "@react-navigation/native";
import { Getuserdetails } from './../Utils/getuserdetails';
import { Getdashboarddetailsurl, readnotificationurl, syncdataurl, Uploadprofilepicurl } from "../Utils/urls";
import { BallIndicator } from "react-native-indicators";
import * as ImagePicker from 'expo-image-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Updates from "expo-updates";
import * as SQLite from 'expo-sqlite';
import useInterval from 'use-interval'
import axios from "axios";

const db = SQLite.openDatabase('db.Userdbs') // returns Database object


var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

var currentdate = new Date();
const year = currentdate.getFullYear();
const months = ["Jan", "Feb", "Mar", "Apr", "May", "June", "july", "Aug", "Sep", "Oct", "Nov", "Dec"]
const month = currentdate.getMonth()
var day = currentdate.getDate().toString().length > 1 ? currentdate.getDate() : "0" + currentdate.getDate();


var time = currentdate.getHours() + ":" + currentdate.getMinutes();
var date = currentdate.getDate() + "/" + (currentdate.getMonth() + 1) + "/" + currentdate.getFullYear();
const hours = currentdate.getHours().toString().length > 1 ? currentdate.getHours() : "0" + currentdate.getHours()


const Artistdashboard = () => {

    const navigation = useNavigation();
    const user = Getuserdetails();
    const [loading, setloading] = useState(true);
    const [url, seturl] = useState(user.url);
    const [pending, setpending] = useState('');
    const [releases, setreleases] = useState('');
    const [notifications, setnotifications] = useState([]);
    const [unreadnotification, setunreadnotification] = useState('');
    const [bordercolor, setbordercolor] = useState(false);
    const [error, seterror] = useState('');
    const [profile, setProfile] = useState(null);
    const [progress, setprogress] = useState(false);

    useEffect(() => {

        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    getuserdashboarddetails(_array[0].token);
                    seturl(_array[0].url)
                },
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction

    }, []);

    useInterval(() => {
        getuserdashboarddetails(user.token);
        syncdata(user.token)
    }, 5000);

    const syncdata = (e) => {
        axios.post(syncdataurl, {
            token: e,
        }).then(function (response) {
            if (!response.data.message) {
                if (response.data.type) {
                    db.transaction(tx => {
                        tx.executeSql('UPDATE User set type=? where unid=?',
                            [response.data.type, user.unid], // passing sql query and parameters:null
                            // success callback which sends two things Transaction object and ResultSet Object
                            (tx, results) => {
                                if (results.rowsAffected > 0) {
                                }
                            },
                            (txObj, error) => console.log('Error ', error)
                        ) // end executeSQL
                    }) // end transaction

                } else {
                }
            } else {
            }
            // 
        }).catch(function (error) {
        });
    }



    const getuserdashboarddetails = (e) => {
        axios.post(Getdashboarddetailsurl, {
            token: e,
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                if (response.data.success) {

                    setpending(response.data.pending)
                    setreleases(response.data.releases)
                    setnotifications(response.data?.notifications)
                    var count = response.data?.notifications.reduce(function (n, val) {
                        return n + (val.status === "unread");
                    }, 0);
                    setunreadnotification(count)
                    // response.data?.notifications.forEach(element => {
                    //     if(element.status === 'unread'){
                    //         unreadnotification.push(element)
                    //     }
                    // });
                } else {
                    seterror("There was an internal error contact admin")
                }
            } else {
                seterror(response.data.message)
            }
            // 
        }).catch(function (error) {
            setloading(false)
            //if(error.response.status === 401 || error.response.status === 400){}
        });
    }






    //Updating profile photo
    const onProfileUpload = async (result) => {
        setprogress(true)
        seterror(null)
        // Create an object of formData
        let formData = new FormData();
        let localUri = result.uri;
        let filename = localUri.split('/').pop();
        console.log(localUri.split('/').pop())
        formData.append(
            "file", {
            uri: result.uri,
            name: filename,
            type: result.type + '/jpg'
        }
        );
        try {
            let response = await fetch(Uploadprofilepicurl + user.unid + '&table=users', {
                method: 'post',
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data;"
                },
            });
            const json = await response.json();
            if (!json.message) {
                db.transaction(tx => {
                    // sending 4 arguments in executeSql
                    tx.executeSql('UPDATE User set url=? where unid=?',
                        [json.url, user.unid], // passing sql query and parameters:null
                        // success callback which sends two things Transaction object and ResultSet Object
                        (tx, results) => {
                            if (results.rowsAffected > 0) {
                                // setError(json.success);
                                Alert.alert(
                                    "Success",
                                    "Pic updated successfully",
                                    [
                                        { text: "OK" }
                                    ]
                                );
                                setTimeout(() => {
                                    Updates.reloadAsync();
                                }, 3000);
                            } else {

                                Alert.alert(
                                    "Error",
                                    "Internal app error.contact admin",
                                    [
                                        { text: "OK" }
                                    ]
                                );
                            }
                        },
                        (txObj, error) => console.log('Error ', error)
                    ) // end executeSQL
                }) // end transaction

            } else {
                setprogress(false)
                Alert.alert(
                    "Error",
                    json.message,
                    [
                        { text: "OK" }
                    ]
                );
            }

        } catch (error) {
            setprogress(false)
            Alert.alert(
                "Error",
                error,
                [
                    { text: "OK" }
                ]
            );
        } finally {
            setprogress(false)
            //if(error.response.status === 401 || error.response.status === 400){}

        }
    }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setProfile(result);
            seturl(result.uri)
            onProfileUpload(result);
        }
    };

    const readmessage = (id) => {
        var index2 = notifications.findIndex(obj => obj?.unique == id);
        notifications[index2].status = "read";
        axios.post(readnotificationurl, {
            token: user.token,
            notifications: notifications
        }).then(function (response) {
            console.log(response.data)
            if (!response.data.message) {

            } else {

            }
            // 
        }).catch(function (error) {
        });
    }



    return (
        <View style={styles.contaner}>
            <View style={{
                marginTop: 40,
                flexDirection: "row",
                width: "90%",
                marginHorizontal: "5%"
            }}>

                <Text style={{ color: "white", fontSize: 20, width: "60%", marginTop: 10, fontWeight: "bold" }}>Dashboard</Text>
                <TouchableOpacity
                    onPress={() => navigation.navigate('authentication', { screen: 'uploader' })}
                    style={{
                        backgroundColor: Primarycolor(),
                        flexDirection: "row",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        borderRadius: 5,
                        position: "absolute",
                        right: "1%"
                    }}>
                    <Icon name="cloud-upload-alt" color="white" style={{ marginTop: 5 }}></Icon>
                    <Text style={{ color: "white", marginLeft: 5 }}>
                        Uploader
                    </Text>
                </TouchableOpacity>
            </View>
            <View style={{ marginTop: 50, marginHorizontal: "5%" }}>
                <Text style={{ color: "gray" }}>Hello, {user?.username}</Text>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "60%", marginTop: 10 }}>
                        <View style={{ flexDirection: "row" }}>
                            <TouchableOpacity style={styles.dateview}>
                                <Text style={{
                                     color: "white",
                                     fontWeight:"900",
                                     fontSize: 25
                                }} >{day}</Text>
                                <Text style={{
                                     color: "white",
                                     fontWeight: "bold",
                                     marginTop: -8,
                                     fontSize: 15
                                }} >{months[month]}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.pendingview}>
                                {loading ? <BallIndicator style={styles.pendingtext} size={10} color={"white"} /> : <Text style={styles.pendingnumber}>{pending ? pending : '0'}</Text>}
                                <Text style={styles.pendingtext}>Pending</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <TouchableOpacity style={styles.realeasesview}>
                                <Text style={styles.releasestext}>Releases</Text>
                                {loading ? <BallIndicator style={styles.releasesnumber} size={10} color={"white"} /> : <Text style={styles.releasesnumber}>{releases ? releases : "0"}</Text>}
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dateview}>
                                <Text style={styles.textin} >{year.toString().substring(0, 2)}</Text>
                                <Text style={styles.textin2} >{year.toString().substring(2, 4)}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {progress &&
                        <Spinner
                            visible={true}
                            color='blue'
                            size={70}
                            customIndicator={<BallIndicator color={Primarycolor()} />}
                        />}
                    {url ?
                        <TouchableOpacity onPress={pickImage} style={styles.profilepicimage}>
                            <Image
                                source={{ uri: url }}
                                style={{ width: "100%", height: "100%" }}
                            />
                        </TouchableOpacity> :
                        <TouchableOpacity onPress={pickImage} style={styles.profilepic}>
                            <Icon name="plus-circle" color="white" size={20} />
                        </TouchableOpacity>
                    }
                </View>
            </View>
            <View style={{ marginHorizontal: "5%", marginTop: 10 }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ width: "95%", flexDirection: "row" }}>
                        <Text style={{ fontSize: 20, color: "white", fontWeight: "bold" }}>Notifications</Text>
                        {notifications?.length > 0 && <View style={{
                            backgroundColor: "#e8005e",
                            height: 15,
                            width: 15,
                            borderRadius: 15,
                            justifyContent: "center", alignItems: "center"

                        }}>
                            <Text style={{ color: "white", fontSize: 10 }}>{unreadnotification}</Text>
                        </View>}
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                            notifications?.length > 0 && navigation.navigate("viewnotifications", {
                                notifications: notifications
                            })
                        }}>
                        <Icon name="angle-right" color="white" size={25} />
                    </TouchableOpacity>
                </View>
            </View>
            <ScrollView>
                <View style={{ marginHorizontal: "5%", marginTop: 10, paddingBottom: 100 }}>
                    <View style={styles.notificationscontainer}>
                        {Array.isArray(notifications) ? notifications.reverse().slice(0, 2)?.map((val, key) => {

                            return (
                                <TouchableOpacity
                                    key={key}
                                    onPress={() => {
                                        readmessage(val.unique)
                                        navigation.navigate("viewnotifications", {
                                            notifications: notifications
                                        })
                                    }}
                                    style={{
                                        width: "90%",
                                        marginBottom: 10,
                                        paddingTop:5,
                                        flexDirection: "row"
                                    }}>
                                    <View style={{
                                        marginLeft: "5%",
                                        marginTop: 20,
                                        padding: 5,

                                    }}>
                                        {val.status === 'unread' ?
                                            <Image
                                                source={require("./../../assets/images/png/bluelogo.png")}
                                                style={{
                                                    height: 35,
                                                    width: 35,
                                                    marginTop:-10
                                                }}
                                            /> :
                                            <Image
                                                source={require("./../../assets/images/png/roundlogo.png")}
                                                style={{
                                                    height: 35,
                                                    width: 35,
                                                    marginTop:-10
                                                }}
                                            />
                                        }
                                    </View>

                                    <View style={{
                                        marginLeft: 20,
                                        width: "85%",
                                        paddingTop: 10
                                    }}>
                                        <Text style={{ color: "gray", fontSize: 10, position: "absolute", right: "7%" }}>{val.date}</Text>
                                        <Text style={{ fontWeight: "bold", color: "white" }}>MMPG</Text>
                                        <Text style={{ color: "gray" }}>
                                            {val.message.substring(0, 20)}
                                        </Text>

                                    </View>
                                </TouchableOpacity>
                            )
                        }) :
                            <Text style={{ color: "white", fontSize: 10 }}>No notifications at the moment</Text>
                        }

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
    profilepicimage: {
        marginLeft: 5,
        marginTop: 10,
        width: "40%",
        height: 110,
        borderRadius: 5
    },
    pendingtext: {
        color: "white",
        marginTop: 10
    },
    pendingnumber: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25,
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 5
    },
    releasesnumber: {
        color: "white",
        fontSize: 25,
        paddingVertical: 5,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingRight: 0
    },
    releasestext: {
        color: "white",
        marginTop: 20,
        marginLeft: 10
    },
    realeasesview: {
        backgroundColor: "#1c1c1c",
        flexDirection: "row",
        width: "65%",
        borderRadius: 5,
        marginRight: 5,
        height: 50
    },
    pendingview: {
        backgroundColor: "#1c1c1c",
        flexDirection: "row",
        marginLeft: 10,
        width: "55%",
        borderRadius: 5,
        height: 50
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
        paddingVertical: 0,
        borderRadius: 5,
        height: 50
    },
    textin: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20
    },
    textin2: {
        color: "white",
        fontWeight: "bold",
        marginTop: -8,
        fontSize: 20
    }
})

export default Artistdashboard;