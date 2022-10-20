import React, { useState, useRef } from 'react'
import { View, StyleSheet, Text, ScrollView, Dimensions, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';
import { Primarycolor, Semisecondarycolor, Secondarycolor } from '../Utils/color';
import { images } from './../Welcome/assetsurls';
import { sendEmail } from './../Welcome/sendmail';
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Getuserdetails } from '../Utils/getuserdetails';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import { BallIndicator } from 'react-native-indicators';
import axios from 'axios';
import * as Updates from "expo-updates";
import * as SQLite from 'expo-sqlite';
import { cancelanddeleteurl } from '../Utils/urls';

const db = SQLite.openDatabase('db.Userdbs') // returns Database object
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const primarycolor = Primarycolor();



const Redirect = () => {

    const url = images.getstartedvideo.uri;
    const navigation = useNavigation();
    const user = Getuserdetails();
    const [loading, setloading] = useState(false);
    const [confirmpopup, setconfirmpopup] = useState(false);
    const scrollViewRef = useRef();
    const viewref = useRef();
    const [showmembershipbutton, setshowmembershipbutton] = useState(false);


    const image = require('./../../assets/images/member.png')

    const cancelmembership = () => {
        setconfirmpopup(false)
        setloading(true)
        axios.post(cancelanddeleteurl, {
            token: user.token,
            action: 'CANCEL'
        }).then(function (response) {
            if (!response.data.message) {
                handleLogout();
            } else {
                setloading(false)
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

    const handleLogout = () => {
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('UPDATE User set type=? where email=?',
                ["", user.email], // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (tx, results) => {
                    if (results.rowsAffected > 0) {
                        setloading(false)
                        // setError(json.success);
                        Alert.alert(
                            "Success",
                            "Membership cancelled successfully",
                            [
                                { text: "OK" }
                            ]
                        );
                        setTimeout(() => {
                            Updates.reloadAsync();
                        }, 3000);
                    } else {
                        setloading(false)
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

    };


    return (
        <SafeAreaView style={{ backgroundColor: "black", height: deviceHeight }}>
            {loading &&
                <Spinner
                    visible={true}
                    color='blue'
                    size={40}
                    customIndicator={<BallIndicator color={Primarycolor()} />}
                />}
            {confirmpopup &&
                <Spinner
                    visible={true}
                    color='red'
                    size={30}
                    customIndicator={
                        <View style={{ backgroundColor: "white", padding: 15 }}>
                            <Text style={{ fontWeight: "bold", color: Primarycolor() }}>Are you sure you want to cancel your membership? this action cannot be undone</Text>
                            <View style={{ marginTop: 10, flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => setconfirmpopup(false)} style={{
                                    backgroundColor: Primarycolor(),
                                    padding: 10,
                                    borderRadius: 5,
                                    margin: 10
                                }}>
                                    <Text style={{ color: "white" }}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={cancelmembership} style={{
                                    backgroundColor: Primarycolor(),
                                    padding: 10,
                                    borderRadius: 5,
                                    margin: 10
                                }}>
                                    <Text style={{ color: "white" }}>Ok,Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}

                />}
            {/* <View style={styles.fixedview}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: "10%" }}>
                    <FontAwesome5 name="angle-left" color={"white"} size={25} />
                </TouchableOpacity>

            </View> */}
            <ScrollView ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollTo({ x: 2, y: 2, animated: true })}
                horizontal={true}>
                <ScrollView>
                    {user?.type == 'Artist' && <View style={styles.loginContainer}>
                        <View style={{
                            backgroundColor: "black",
                            marginTop: 30,
                            width: "90%",
                            marginHorizontal: "5%"
                        }}>
                            <View style={{
                                borderWidth: 1,
                                borderColor: Primarycolor(),
                                borderRadius: 5,
                                padding: 10
                            }}>
                                <View style={{ alignSelf: "flex-end", justifyContent: "center", alignItems: "center" }}>
                                    <Text style={{ color: "white", fontSize: 10 }}> Most Popular</Text>
                                    <Icon name="star" color="orange" />
                                </View>
                                <View style={{
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                    <Text style={{
                                        color: "white"
                                        , fontWeight: "bold",
                                        fontSize: 20
                                    }}>Artist or Producer</Text>
                                    <Text style={{ color: "gray", fontSize: 10 }}>1 Artist or Producer</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 20, width: "90%", marginHorizontal: "5%" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color={Primarycolor()} style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Release Unlimited Music</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color={Primarycolor()} style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Copyright Protection</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color={Primarycolor()} style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Split Earnings with Producers</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color={Primarycolor()} style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Make Money From Youtube Content ID</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color={Primarycolor()} style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Get Your Music on Tiktok, Instagram & Facebook</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color={Primarycolor()} style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Custom ISRC Codes</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color={Primarycolor()} style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Custom Pre-Order & Release Dates</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color={Primarycolor()} style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Smartlink</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color={Primarycolor()} style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Analytic Reports</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color={Primarycolor()} style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Access To Funding</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color={Primarycolor()} style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Dedicated Client Support Team</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color={Primarycolor()} style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Cancel Your Membership Anytime</Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontSize: 23, color: "white", fontWeight: "400" }}>
                                        $16.99/yr
                                    </Text>
                                    <View>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 10, marginTop: 15 }}>
                                            Membership Status: Active
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('authentication', {
                                                screen: 'started'
                                            })}
                                            style={{
                                                backgroundColor: "white",
                                                position: "absolute",
                                                right: 10,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "40%",
                                                paddingVertical: 10,
                                                borderRadius: 5
                                            }}>
                                            <Text style={{ color: Primarycolor(), fontWeight: "bold" }}>
                                                Update
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>}
                </ScrollView>
                <ScrollView>
                    {user?.type == 'Label' && <View style={styles.loginContainer}>
                        <View style={{
                            backgroundColor: "black",
                            marginTop: 30,
                            width: "90%",
                            marginHorizontal: "5%"
                        }}>
                            <View style={{
                                borderWidth: 1,
                                borderColor: "#9cbc3c",
                                borderRadius: 5,
                                padding: 10
                            }}>

                                <View style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    marginTop: 10,
                                    marginBottom: 10
                                }}>
                                    <Text style={{
                                        color: "white"
                                        , fontWeight: "bold",
                                        fontSize: 20
                                    }}>Label</Text>
                                    <Text style={{ color: "gray", fontSize: 10 }}>10 Artists</Text>
                                </View>
                            </View>
                            <View style={{ marginTop: 20, width: "90%", marginHorizontal: "5%" }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color="#9cbc3c" style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Release Unlimited Music</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color="#9cbc3c" style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Custom Label</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color="#9cbc3c" style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Split Earnings with Contributors</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color="#9cbc3c" style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Make Money From Youtube Content ID</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color="#9cbc3c" style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Get Your Music on Tiktok, Instagram & Facebook</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color="#9cbc3c" style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Custom ISRC Codes</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color="#9cbc3c" style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Custom Pre-Order & Release Dates</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color="#9cbc3c" style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Smartlink</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color="#9cbc3c" style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Analytic Reports</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color="#9cbc3c" style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Dedicated Client Support Team</Text>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Icon name="check" color="#9cbc3c" style={{ marginTop: 5 }} />
                                    <Text style={styles.planstext}>Cancel Your Membership Anytime</Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <Text style={{ fontSize: 23, color: "white", fontWeight: "400" }}>
                                        $69.99/yr
                                    </Text>
                                    <View>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 10, marginTop: 15 }}>
                                            Membership Status: Active
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate('authentication', {
                                                screen: 'started'
                                            })}
                                            style={{
                                                backgroundColor: "white",
                                                position: "absolute",
                                                right: 10,
                                                justifyContent: "center",
                                                alignItems: "center",
                                                width: "40%",
                                                paddingVertical: 10,
                                                borderRadius: 5
                                            }}>
                                            <Text style={{ color: Primarycolor(), fontWeight: "bold" }}>
                                                Update
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                    }
                </ScrollView>
                {user?.type == 'Bespoke' && <View style={styles.loginContainer}>
                    <View style={{
                        backgroundColor: "black",
                        marginTop: 30,
                        width: "90%",
                        marginHorizontal: "5%"
                    }}>
                        <View style={{
                            borderWidth: 1,
                            borderColor: "#7243d1",
                            borderRadius: 5,
                            padding: 10
                        }}>

                            <View style={{
                                justifyContent: "center",
                                alignItems: "center",
                                marginTop: 10,
                                marginBottom: 20
                            }}>
                                <Text style={{
                                    color: "white"
                                    , fontWeight: "bold",
                                    fontSize: 20
                                }}>Bespoke Label</Text>
                                <Text style={{ color: "gray", fontSize: 10 }}>Perfect for Labels with a Large Catalogue of Artists</Text>
                            </View>
                        </View>
                        <View style={{ marginTop: 30, width: "95%", marginBottom: 40, justifyContent: "center", alignItems: "center" }}>
                            <Text style={{ color: "gray", fontSize: 10 }}>
                                This Package Includes Unlimited Releases, Unlimited Artists,
                            </Text>
                            <Text style={{ color: "gray", fontSize: 10 }}>
                                All Services Included from our "Label Package"
                            </Text>
                            <Text style={{ color: "gray", fontSize: 10 }}>
                                Plus a Dedicated Account Manager and More
                            </Text>
                        </View>
                    </View>
                </View>}
            </ScrollView>
            <View style={styles.bottomCenter}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <FontAwesome5 name="home" color={"white"} size={20} />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fixedview: {
        paddingHorizontal: "5%",
        paddingVertical: "5%",
        flexDirection: "row",
        backgroundColor: Secondarycolor()
    },
    image: {
        flex: 1,
        // justifyContent: "center"
    },
    planstext: {
        color: "gray",
        marginLeft: 10,
        fontWeight: "100",
        fontSize: 10,
        paddingVertical: 5
    },

    loginbtn: {
        backgroundColor: primarycolor,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 30,
        paddingVertical: 10,
        borderRadius: 5,
        width: "95%"

    },
    inputviews: {
        marginTop: 10,
        borderWidth: 1,
        borderColor: "gray",
        borderRadius: 5,
        paddingLeft: 5,
        flexDirection: "row",
        width: "95%"

    },
    joinbtn: {
        justifyContent: "center",
        backgroundColor: "#00ace9",
        alignItems: "center",
        width: "45%",
        paddingVertical: 10,
        borderRadius: 5
    },
    signinbtn: {
        marginLeft: 10,
        justifyContent: "center",
        backgroundColor: "black",
        borderColor: "#00ace9",
        borderWidth: 1,
        alignItems: "center",
        width: "45%",
        paddingVertical: 10,
        borderRadius: 5
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    loginContainer: {
        height: deviceHeight,
        width: deviceWidth
    },
    SecondContainer: {
        marginLeft: "5%",
        paddingTop: deviceHeight / 1.5,
        height: deviceHeight,
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
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
});

export default Redirect;




// import React, { useState, useEffect } from "react";
// import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, StyleSheet, Dimensions, Alert, Image, TextInput, RefreshControl } from "react-native";
// import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
// import { FontAwesome5 } from "../Components/fontawesome5";
// import { useNavigation } from "@react-navigation/native";
// import axios from "axios";
// import { Getuserdetails } from "../Utils/getuserdetails";
// import { Fetchtracksurl } from "../Utils/urls";
// import * as SQLite from 'expo-sqlite';
// import Spinner from "react-native-loading-spinner-overlay/lib";
// import { BallIndicator } from "react-native-indicators";

// const db = SQLite.openDatabase('db.Userdbs') // returns Database object


// const deviceHeight = Dimensions.get('window').height;
// const deviceWidth = Dimensions.get('window').width;

// const Redirect = () => {

//     const navigation = useNavigation();
//     const user = Getuserdetails();
//     const [songs, setsongs] = useState([]);
//     const [loading, setloading] = useState(true)
//     const [hint, sethint] = useState('');
//     const [counter, setcounter] = useState('');
//     const [refreshing, setRefreshing] = useState(false);



//     return (
//         <SafeAreaView style={{ backgroundColor: "black", height: deviceHeight }}>
//             <View style={{
//                 flex: 1,
//                 justifyContent: "center",
//                 alignItems: "center"
//             }}>
//                 <TouchableOpacity onPress={() => navigation.navigate('authentication', {
//                     screen: 'started'
//                 })}
//                 style={{
//                     backgroundColor:Primarycolor(),
//                     padding:10,
//                     borderRadius:5
//                 }}
//                 >
//                     <Text style={{color:"white"}}>UPGRADE MEMBERSHIP</Text>
//                 </TouchableOpacity>
//             </View>

//         </SafeAreaView >
//     )
// }


// export default Redirect;