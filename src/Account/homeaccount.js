import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome5';
import { Primarycolor, Secondarycolor } from "../Utils/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "../Components/fontawesome";
import { useNavigation } from "@react-navigation/native";
import { Getuserdetails } from "../Utils/getuserdetails";
import * as ImagePicker from 'expo-image-picker';

import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import { checkpaymentstatusurl, Fetchlabeldataurl, Fetchtracksurl, Getartistsdataurl, Getdashboarddetailsurl, Makefundingrequesturl, Sendmessageurl, Uploadprofilepicurl } from "../Utils/urls";
import axios from "axios";
import * as SQLite from 'expo-sqlite';
import Spinner from "react-native-loading-spinner-overlay/lib";
import { BallIndicator } from "react-native-indicators";

const db = SQLite.openDatabase('db.Userdbs') // returns Database object




var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;


const Homeaccount = () => {

    const navigation = useNavigation();
    const user = Getuserdetails();
    const [songs, setsongs] = useState([]);
    const [artists, setartists] = useState([]);
    const [label, setlabel] = useState('');
    const [loading, setloading] = useState(true);
    const [graphdata, setgraphdata] = useState([56, 56, 66, 77, 78]);
    const [screendata, setscreendata] = useState('');
    const [focused, setfocused] = useState('total');
    const [nothing, setnothing] = useState(false);
    const [todotext, settodotext] = useState('');
    const [success, setsuccess] = useState('');
    const [url, seturl] = useState('');
    const [profile, setProfile] = useState('');
    const [fundingstatus, setfundingstatus] = useState('REQUEST');
    const [error, seterror] = useState('');


    useEffect(() => {

        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {

                    fetchartists(_array[0])
                    checkfundingstatus(_array[0].token)
                    getuserdashboarddetails(_array[0].token)
                    _array[0].type === 'Label' && fetchLabel(_array[0])
                },
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
    }, []);

    const checkfundingstatus = (e) => {
        axios.post(checkpaymentstatusurl, {
            token: e,
        }).then(function (response) {
            if (!response.data.message) {
                if (response.data.status) {
                    setfundingstatus(response.data.status)
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
            if (!response.data.message) {
                if (response.data.pending) {
                    settodotext(response.data.todotext)
                } else {
                    settodotext("We recommend that you push your music on a daily")
                }
            } else {
            }
            // 
        }).catch(function (error) {
            //if(error.response.status === 401 || error.response.status === 400){}

        });
    }

    //   useEffect(() => {
    //     fetchtracks();
    //   }, [input]);



    const fetchtracks = (e) => {

        axios.post(Fetchtracksurl, {
            token: e.token,
        }).then(function (response) {
            if (!response.data.message) {
                setsongs(response.data)
                setloading(false)
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

    const fetchartists = (e) => {

        axios.post(Getartistsdataurl, {
            token: e.token,
        }).then(function (response) {
            if (!response.data.message) {
                setartists(response.data)
                fetchtracks(e)
                e.type === 'Artist' && setgraphdata(response.data[0].streamshistory)
                e.type === 'Artist' && setscreendata(response.data[0])
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
                "there was an error fetching artists data",
                [
                    { text: "OK" }
                ]
            );
        });
    }




    const fetchLabel = (e) => {
        axios.post(Fetchlabeldataurl, {
            token: e.token,
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                setlabel(response.data)
                setscreendata(response.data)
                setgraphdata(response.data?.streamshistory)
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


    const MyBezierLineChart = () => {
        return (
            <>
                <LineChart
                    data={{
                        labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Ma', 'jun', 'jul', 'Au', 'Sep', 'Oc', 'Nov', 'De'],
                        datasets: [
                            {
                                data: graphdata,
                            },
                        ],
                    }}
                    width={deviceWidth - 20} // from react-native
                    height={220}
                    // yAxisLabel={'Rs'}
                    chartConfig={{
                        backgroundColor: Primarycolor(),
                        backgroundGradientFrom: Secondarycolor(),
                        backgroundGradientTo: Secondarycolor(),
                        linejoinType: "bevel",
                        decimalPlaces: 1, // optional, defaults to 2dp
                        //color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                        color: (opacity = 255) => Primarycolor(),
                        style: {
                            borderRadius: 16,
                            borderBottomLeftRadius: 5
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 0,
                        marginHorizontal: "3%",
                        borderBottomLeftRadius: 5
                    }}

                />
            </>
        );
    };


    //Updating profile photo
    const onProfileUpload = async (result, id) => {
        setloading(true)
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
            let response = await fetch(Uploadprofilepicurl + id + '&table=artists', {
                method: 'post',
                body: formData,
                headers: {
                    "Content-Type": "multipart/form-data;"
                },
            });
            const json = await response.json();
            if (!json.message) {
                setloading(false)
                fetchartists(user)
                Alert.alert(
                    "Success",
                    "Updated successfuly",
                    [
                        { text: "OK" }
                    ]
                );

            } else {
                setloading(false)
                Alert.alert(
                    "Error",
                    json.message,
                    [
                        { text: "OK" }
                    ]
                );
            }

        } catch (error) {
            setloading(false)
            Alert.alert(
                "Error",
                error,
                [
                    { text: "OK" }
                ]
            );
        } finally {
            setloading(false)
            //if(error.response.status === 401 || error.response.status === 400){}

        }
    }

    const pickImage = async (id) => {
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
            onProfileUpload(result, id);
        }
    };

    const makefundingrequest = () => {
        setloading(true)
        seterror(null)
        axios.post(Makefundingrequesturl, {
            token: user.token,
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                if (response.data.success) {
                    setsuccess(response.data.success)
                    setTimeout(() => {
                        setsuccess(null)
                    }, 3000);
                } else {
                    seterror("There was an internal error contact admin")
                }
            } else {
                seterror(response.data.message)
            }
            // 
        }).catch(function (error) {
            setloading(false)
            seterror("Sorry an error occurred,try again later");
            //if(error.response.status === 401 || error.response.status === 400){}

        });
    }

    //Send message
    const sendmessage = () => {
        setloading(true);

        axios.post(Sendmessageurl, {
            message: "Requesting for music publishing",
            token: user.token
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                db.transaction(tx => {
                    // sending 4 arguments in executeSql
                    tx.executeSql('UPDATE User set publish=? where unid=?',
                        ['requested', user.unid], // passing sql query and parameters:null
                        // success callback which sends two things Transaction object and ResultSet Object
                        (tx, results) => {
                            if (results.rowsAffected > 0) {
                                Alert.alert(
                                    "Success",
                                    "Request sent.We'll get back to  you",
                                    [
                                        { text: "OK" }
                                    ]
                                );
                            } else {
                            }
                        },
                        (txObj, error) => console.log('Error ', error)
                    ) // end executeSQL
                }) // end transaction

            } else {
                seterror(response.data.message)
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
                "Sorry an error occurred,try again later",
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
            <View style={{ paddingBottom: 20 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('Home', { screen: 'settings' })}
                    style={{
                        position: "absolute",
                        right: 10

                    }}>
                    <AntDesign name="setting" color={"gray"} size={20} />
                </TouchableOpacity>
                <View style={{ marginTop: 20, marginHorizontal: "5%", justifyContent: "center", alignItems: "center" }}>
                    <View style={{ width: "16%" }} />
                    {user.url ?
                        <Image
                            source={{ uri: user.url }}
                            style={{
                                height: 200,
                                width: 200,
                                borderRadius: 200
                            }}
                        /> :
                        <TouchableOpacity
                            style={styles.user}
                        />}

                </View>
                <View style={{ flexDirection: "row", marginHorizontal: "5%" }}>
                    <View style={{ width: "70%" }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>{user?.username} </Text>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <Icon name="headphones-alt" color="gray" style={{ marginTop: 5 }} />
                            <Text style={{ color: "gray", marginLeft: 5 }}>{screendata?.totalstreams?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Music")} style={{ flexDirection: "row", marginTop: 25 }}>
                        <Text style={{ color: "gray", fontSize: 10 }}>CATALOGUE</Text>
                        <Icon name="long-arrow-alt-right" color="gray" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>

                </View>
            </View>

            <ScrollView>
                <ScrollView horizontal={true} >
                    <View style={{ paddingHorizontal: "3%", width: deviceWidth, }}>
                        <View style={styles.sliderview}>
                            <Text style={{ color: Primarycolor(), fontWeight: "bold", alignSelf: "center", fontSize: 10 }}>THINGS TO DO:</Text>
                            <Text style={styles.promote}>Promote Your</Text>
                            <Text style={styles.promote}>Music!!!</Text>
                            <Icon name="volume-up" color="white" style={{ alignSelf: "center" }} size={30} />
                            <Text style={styles.message}>{todotext}</Text>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <FontAwesome name='dot-circle-o' color={"white"} style={{ marginRight: 5 }} />
                            <FontAwesome name='dot-circle-o' color={"gray"} style={{ marginRight: 5 }} />
                            <FontAwesome name='dot-circle-o' color={"gray"} style={{ marginRight: 0 }} />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: "3%", width: deviceWidth, }}>
                        <View style={styles.sliderview}>
                            <Text style={{ color: Primarycolor(), fontWeight: "bold", alignSelf: "center", fontSize: 10 }}>SONG WRITER/COMPOSER</Text>
                            <Text style={styles.promote}>Music Publishing</Text>
                            <Text style={styles.message}>Your music could be generating income from multiple </Text>
                            <Text style={styles.message}> types of royalties in addition to the money you may</Text>
                            <Text style={styles.message}>already be earning from distribution.</Text>
                            <TouchableOpacity style={{
                                alignSelf: "center",
                                backgroundColor: user?.publish === 'requested' ? "gray" : Primarycolor(),
                                justifyContent: "center",
                                alignItems: "center",
                                width: "40%",
                                marginTop: 30,
                                paddingVertical: 7,
                                borderRadius: 5
                            }} onPress={()=>{
                                user?.publish !== 'requested' && sendmessage()
                                }}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Request</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <FontAwesome name='dot-circle-o' color={"gray"} style={{ marginRight: 5 }} />
                            <FontAwesome name='dot-circle-o' color={"white"} style={{ marginRight: 5 }} />
                            <FontAwesome name='dot-circle-o' color={"gray"} style={{ marginRight: 0 }} />
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: "3%", width: deviceWidth, }}>
                        <View style={styles.sliderview}>
                            <Text style={{ color: Primarycolor(), fontWeight: "bold", alignSelf: "center", fontSize: 10 }}>ARTIST</Text>
                            <Text style={styles.promote}>Project Funding</Text>
                            <Image
                                source={require("./../../assets/images/funding.png")}
                                style={styles.imagef} />
                            {success ? <Text style={{ fontSize: 12, color: "green" }}>{success}</Text> : null}
                            {error ? <Text style={{ fontSize: 12, color: "red" }}>{error}</Text> : null}
                            <TouchableOpacity onPress={() => { fundingstatus == 'REQUEST' && makefundingrequest() }} style={{
                                alignSelf: "center",
                                backgroundColor: fundingstatus === 'ELIGIBLE' ? Primarycolor() : "silver",
                                justifyContent: "center",
                                alignItems: "center",
                                width: "40%",
                                marginTop: 10,
                                paddingVertical: 7,
                                borderRadius: 5
                            }}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>{fundingstatus}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                            <FontAwesome name='dot-circle-o' color={"gray"} style={{ marginRight: 5 }} />
                            <FontAwesome name='dot-circle-o' color={"gray"} style={{ marginRight: 5 }} />
                            <FontAwesome name='dot-circle-o' color={"white"} style={{ marginRight: 0 }} />
                        </View>
                    </View>
                </ScrollView>
                <View style={{ marginBottom: 100, marginTop: 15 }}>
                    <View style={styles.headerscroll}>
                        <TouchableOpacity
                            onPress={() => {
                                setfocused("total")
                                setgraphdata(screendata.streamshistory)
                                setnothing(!nothing)
                            }}
                            style={{ marginRight: 20 }}>
                            <Text style={{ color: focused == 'total' ? Primarycolor() : "white" }}>Total</Text>
                        </TouchableOpacity >
                        <TouchableOpacity
                            onPress={() => {
                                setfocused("spotify")
                                setgraphdata(screendata.spotifystreams)
                                setnothing(!nothing)
                            }}
                            style={{ marginRight: 20, flexDirection: "row" }}>
                            <FontAwesome name="spotify" color={focused == 'spotify' ? Primarycolor() : "white"} size={15} style={{ marginTop: 3, marginRight: 3 }} />
                            <Text style={{ color: focused == 'spotify' ? Primarycolor() : "white" }}>Spotify</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setfocused("apple")
                                setgraphdata(screendata.applestreams)
                                setnothing(!nothing)
                            }}
                            style={{ marginRight: 0, flexDirection: "row" }}>
                            <Icon name="apple-alt" color={focused == 'apple' ? Primarycolor() : "white"} style={{ marginTop: 3, marginRight: 3 }} />
                            <Text style={{ color: focused == 'apple' ? Primarycolor() : "white" }}>Music</Text>
                        </TouchableOpacity>

                    </View>
                    <MyBezierLineChart />
                    <View style={{ alignSelf: "center", flexDirection: "row" }}>
                        <Icon name="headphones-alt" color={Primarycolor()} style={{ marginTop: 0 }} />
                        <Text style={{ color: "gray", marginLeft: 5, fontSize: 10 }}>Streams</Text>
                    </View>
                    {artists.map((val, key) => {

                        return (
                            <View style={styles.artistlink} key={key}>
                                <TouchableOpacity style={styles.artistphoto} onPress={() => {
                                    pickImage(val.id)

                                }}>
                                    {val?.profilepic_url ?
                                        <Image
                                            source={{ uri: val.profilepic_url }}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                        /> :
                                        <Icon name="user" color="white" />}
                                </TouchableOpacity>
                                <Text style={styles.artistname}>{val.name}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate("viewartist", {
                                    data: val
                                })} style={{ marginTop: 13 }}>
                                    <Icon name="angle-right" color="white" size={25} />
                                </TouchableOpacity>
                            </View>)
                    })}
                    <ScrollView horizontal={true}>
                        {songs.map((val, key) => {
                            return (
                                val.status === 'APPROVED' &&
                                <TouchableOpacity style={{ padding: 10 }} key={key}>
                                    <TouchableOpacity style={styles.musicview}>
                                        <Image
                                            source={{ uri: val.url }}
                                            style={{
                                                height: "100%",
                                                width: "100%",
                                            }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.songname}>{val.title}/ {val.artist}</Text>
                                </TouchableOpacity>
                            )
                        })}
                    </ScrollView>
                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    songname: {
        fontSize: 8,
        color: "gray",
        alignSelf: "center"
    },
    musicview: {
        backgroundColor: Secondarycolor(),
        height: 100,
        width: deviceWidth / 3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    artistname: {
        color: "white",
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 15,
        width: "70%"
    },
    artistphoto: {
        backgroundColor: Secondarycolor(),
        height: 50,
        width: 50,
        justifyContent: "center",
        margin: 3,
        alignItems: "center",
        borderRadius: 5
    },
    artistlink: {
        backgroundColor: Primarycolor(),
        flexDirection: "row",
        marginRight: "3.3%",
        marginLeft: "3%",
        borderRadius: 10,
        marginTop: 10
    },
    headerscroll: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Secondarycolor(),
        marginLeft: "3%",
        marginRight: "3.3%",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingTop: 10,
        paddingBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    header: {
        fontSize: 18,
        padding: 5,
        marginTop: 16,
        color: "gray"
    },
    imagef: {
        height: 60,
        width: 60,
        alignSelf: "center",
        marginTop: 20,
    },
    requestbtn: {
        alignSelf: "center",
        backgroundColor: Primarycolor(),
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
        marginTop: 30,
        paddingVertical: 7,
        borderRadius: 5
    },
    message: {
        color: "gray",
        fontSize: 10,
        alignSelf: "center",
        textAlign: "center"
    },
    promote: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        alignSelf: "center"
    },
    sliderview: {
        height: deviceHeight / 3,
        backgroundColor: Secondarycolor(),
        marginTop: 20,
        borderRadius: 10,
        padding: 10
    },
    user: {
        backgroundColor: Secondarycolor(),
        height: 200,
        width: 200,
        borderRadius: 200
    }
})

export default Homeaccount;