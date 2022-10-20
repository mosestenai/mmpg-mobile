import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image, Alert } from "react-native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { TabRouter, useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { BallIndicator } from "react-native-indicators";
import { FontAwesome } from "../Components/fontawesome";
import Checkbox from 'expo-checkbox';
import axios from "axios";
import { Postsongurl, Uploadreleasecoverimageurl, Uploadsongurl } from "../Utils/urls";
import { Getuserdetails } from "../Utils/getuserdetails";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.Userdbs') // returns Database object
//import { Calendar } from 'react-native-plain-calendar';

var devicewidth = Dimensions.get('window').width;
var deviceheight = Dimensions.get('window').height;



const Step6 = () => {
    const navigation = useNavigation();
    const [isSelected, setSelection] = useState(false);
    const [selected2, setselected2] = useState(false);
    const route = useRoute();
    const ref = React.useRef();
    const details = Getuserdetails();

    const [releasedate, setreleasedate] = useState('');
    const [preorderdate, setpreorderdate] = useState('');
    const [showsimpleplan, setshowsimpleplan] = useState(false);
    const [showcustomplan, setshowcustomplan] = useState(false);
    const [plan, setplan] = useState("");
    const [error, seterror] = useState('');
    const [loading, setloading] = useState(false);

    //tracks lengths
    const audioslength = route.params.tracks.length;
    const [updatedaudiolength, setupdatedaudiolength] = useState(0);
    const [showcustomreleasedate, setshowcustomreleasedate] = useState(true);
    const [nothing, setnothing] = useState(false);
    function onSelected({ selected, selectedStart, selectedEnd }) {
        // Your code
    }





    var currentdate = new Date();
  
    var year = currentdate.getFullYear();
    var month = (currentdate.getMonth() + 1).toString().length > 1 ? (currentdate.getMonth() + 1) : "0" + (currentdate.getMonth() + 1)
    var day = currentdate.getDate().toString().length > 1 ? currentdate.getDate() : "0" + currentdate.getDate();
    var daydate = (parseInt(day) + 14);
    var safedate = year + "-" + month + "-" + daydate;
   

    const uploadeverything = () => {
        if (plan === 'custom' && !preorderdate || !releasedate) {
            Alert.alert(
                "Error",
                'Choose a preorder date and a release date to continue',
                [
                    { text: "OK" }
                ]
            );
        } else if (plan === "simple" && !releasedate) {
            Alert.alert(
                "Error",
                'Choose a release date to continue',
                [
                    { text: "OK" }
                ]
            );
        } else if (!isSelected || !selected2) {
            Alert.alert(
                "Error",
                'Agree to our terms of service to continue',
                [
                    { text: "OK" }
                ]
            );
        } else {
            setloading(true)
            uploadimage();

        }
    }



    const uploadsong = (e) => {

        route.params.tracks.forEach(element => {
            axios.post(Postsongurl, {
                tracktitle: element.tracktitle,
                trackadvice: element.advice,
                trackcopyrightholder: element.copyrightholder,
                trackcopyrightyear: element.copyrightyear,
                trackisrc: element.isrc,
                tracklanguage: element.language,
                tracklyrics: element.lyrics,
                primaryartists: element.primaryartist,
                featuredartists: element.featuredartist,
                releasetitle: route.params.releasetitle,
                labelname: route.params.labelname ? route.params.labelname : "",
                releasecopyrightholder: route.params.copyrightholder,
                releasecopyrightyear: route.params.copyrightyear,
                releaseupc: route.params.upc,
                releasegenre: route.params.genre,
                preorderdate: preorderdate,
                releasedate: releasedate,
                releaseplan: plan,
                writers: element.writers,
                contributors: element.contributors,
                imageurl: e,
                token: details.token
            }).then(function (response) {
                if (!response.data.message) {
                    if (response.data.id) {
                        uploadaudio(element.trackuri, element.trackfilename, response.data.id)
                    } else {
                        setloading(false)
                        Alert.alert(
                            "Error",
                            'There was an internal error contact admin',
                            [
                                { text: "OK" }
                            ]
                        );
                    }
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
                console.log(error)
                setloading(false)
                Alert.alert(
                    "Error",
                    "There was an error try again later",
                    [
                        { text: "OK" }
                    ]
                );
                //if(error.response.status === 401 || error.response.status === 400){}
            });
        });


    }

    const uploadimage = async () => {
        let formData = new FormData();
        let localUri = route.params.coverimage.uri;
        let filename = localUri.split('/').pop();
        formData.append(
            "file", {
            uri: route.params.coverimage.uri,
            name: filename,
            type: route.params.coverimage.type + '/jpg'
        }
        );

        let response = await fetch(Uploadreleasecoverimageurl, {
            method: 'post',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data;"
            },
        });
        const json = await response.json();
        if (!json.message) {
            if (json.url) {
                uploadsong(json.url)
            } else {

                Alert.alert(
                    "Error",
                    'There was an internal error uploading cover image',
                    [
                        { text: "OK" }
                    ]
                );
            }

        } else {
            Alert.alert(
                "Error",
                'There was an error uploading cover image',
                [
                    { text: "OK" }
                ]
            );
        }
    }

   

    const uploadaudio = async (uri, name, id) => {
        let formData = new FormData();

        formData.append(
            "file", {
            uri: uri,
            name: name,
            type: "audio/x-wav"
        }
        );

        let response = await fetch(Uploadsongurl + "?id=" + id, {
            method: 'post',
            body: formData,
            headers: {
                "Content-Type": "multipart/form-data;"
            },
        });
        const json = await response.json();
        if (!json.message) {
            setloading(false)
            if (json.success) {
                setupdatedaudiolength(parseInt(updatedaudiolength) + 1)
                setnothing(!nothing)
                if (updatedaudiolength === (parseInt(audioslength) - 1)) {
                    Alert.alert(
                        "Success",
                        'Sumitted successfully pending approval',
                        [
                            { text: "OK" }
                        ]
                    )
                    setTimeout(() => {
                        navigation.navigate("Music")
                    }, 3000);
                }


            } else {
                Alert.alert(
                    "Error",
                    'There was an error uploading your track',
                    [
                        { text: "OK" }
                    ]
                );
            }

        } else {
            Alert.alert(
                "Error",
                'There was an error uploading your tracks',
                [
                    { text: "OK" }
                ]
            );
        }
    }




    const saveforlater = () => {
        db.transaction(tx => {

            tx.executeSql('INSERT INTO Tracks (title,imgurl) values (?,?)', [route.params.releasetitle, route.params.coverimage.uri],
                (txObj, resultSet) => {
                    Alert.alert(
                        "Success",
                        'Saved successfully',
                        [
                            { text: "OK" }
                        ]
                    );
                    setTimeout(() => {
                        navigation.navigate("Home")
                    }, 3000);
                },
                (txObj, error) => {
                    Alert.alert(
                        "Error",
                        error + 'Contact admin',
                        [
                            { text: "OK" }
                        ]
                    );
                })
        }) // end transaction

    }


    return (
        <SafeAreaView style={{ height: deviceheight, backgroundColor: "black" }}>
            <View style={styles.fixedview}>
                <TouchableOpacity style={styles.savelater} onPress={saveforlater}>
                    <SimpleLineIcons name="logout" color="white" size={25} />
                    <Text style={{ color: "white", marginLeft: 5, marginTop: 3 }}>Save for Later</Text>
                </TouchableOpacity>
                <View style={{
                    position: "absolute",
                    right: 10,
                    top: 10
                }}>
                    <Text style={{ color: "white", fontSize: 15 }}>Step 6</Text>
                </View>
            </View>
            <ScrollView ref={ref}>
                <View style={styles.contentview}>
                    <View style={{ marginTop: 20 }}>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={{ color: "white", fontWeight: "bold", marginTop: 15 }}>Release Plan</Text>
                            <FontAwesome5 name={"star-of-life"} color={"#f9535e"} style={{ marginTop: 15, marginLeft: 5 }} />
                        </View>
                        <Text style={{ fontSize: 8, color: "gray", marginTop: 5 }}>
                            Create a plan for when you want your music out there{`\n`}{`\n`}
                            Choose the dates that will support your marketing and promotion plans

                        </Text>
                    </View>
                    <View>
                        <View style={styles.progressview} />
                        <Text style={{ color: "white", position: "absolute", right: 0, fontSize: 13 }}>100%</Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 20 }}>
                        <TouchableOpacity style={styles.leftplan} onPress={() => {
                            setshowcustomplan(false)
                            setshowsimpleplan(true)
                            ref.current.scrollToEnd();
                            setplan("simple")
                        }}>
                            <FontAwesome name="calendar-check-o" color={"white"} size={20} />
                            <Text style={{ color: "white", marginTop: 10, fontWeight: "bold" }}>SIMPLE</Text>
                            <Text style={{ color: "white", marginTop: 10, fontSize: 10 }}>If you don’t require a pre-order</Text>
                            <Text style={{ color: "white", fontSize: 10 }}>date for your release, this is the</Text>
                            <Text style={{ color: "white", fontSize: 10 }}>plan for you.</Text>
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <FontAwesome5 name={"check"} color={"white"} style={{ marginTop: 3 }} />
                                <Text style={{ color: "white", fontWeight: "bold", marginLeft: 5 }}> Release date</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.rightplan} onPress={() => {
                            setshowcustomplan(true)
                            setshowsimpleplan(false)
                            ref.current.scrollToEnd();
                            setplan("custom")
                        }}>
                            <FontAwesome name="calendar-check-o" color={"white"} size={20} />
                            <Text style={{ color: "white", marginTop: 10, fontWeight: "bold" }}>CUSTOM</Text>
                            <Text style={{ color: "white", marginTop: 10, fontSize: 10 }}>Plan your release and pre-order</Text>
                            <Text style={{ color: "white", fontSize: 10 }}>dates around your marketing</Text>
                            <Text style={{ color: "white", fontSize: 10 }}>and promotions.</Text>
                            <View>
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <FontAwesome5 name={"check"} color={"white"} style={{ marginTop: 3 }} />
                                <Text style={{ color: "white", fontWeight: "bold", marginLeft: 5 }}> Release date</Text>
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 0 }}>
                                <FontAwesome5 name={"check"} color={"white"} style={{ marginTop: 3 }} />
                                <Text style={{ color: "white", fontWeight: "bold", marginLeft: 5 }}> Pre-order plan</Text>
                            </View>
                            </View>
                           
                        </TouchableOpacity>

                    </View>
                    <View style={styles.termsview}>

                        <Text style={{ color: "white", fontWeight: "bold" }}>Terms & Conditions</Text>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Checkbox
                                value={isSelected}
                                onValueChange={setSelection}
                                color={Primarycolor()}

                            />
                            <Text style={{ color: "gray", fontSize: 10, marginLeft: 5 }}>
                                I confirm that this submission has been checked, is correct, and I
                                understand that it may not be possible to amend once the product has
                                been sent to services
                            </Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Checkbox
                                value={selected2}
                                onValueChange={setselected2}
                                color={Primarycolor()}

                            />
                            <Text style={{ color: "gray", fontSize: 10, marginLeft: 5 }}>
                                I confirm that I have all the necessary rights to submit this product for
                                distribution
                            </Text>
                        </View>
                    </View>

                    {showsimpleplan ?
                        <View style={styles.simpleplanview}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontWeight: "bold", color: "gray", marginRight: 5 }}>Release Plan:</Text>
                                <Text style={{ fontWeight: "bold", color: "white" }}>Simple</Text>
                            </View>
                            <TouchableOpacity style={{ marginVertical: 20 }} onPress={() => {
                                ref.current.scrollTo(0);
                            }}>
                                <Text style={{ fontWeight: "bold", color: Primarycolor(), fontSize: 10 }}>CHANGE PLAN</Text>
                            </TouchableOpacity>
                            <View style={{ backgroundColor: Viewcolor(), padding: 10 }}>
                                <Text style={{ color: "white" }}>1. Choose a release date</Text>
                                <Text style={{ marginTop: 10, fontSize: 10, color: "gray", marginBottom: 10 }}>We require a 14 working day lead time in order to guarantee release
                                    dates to allow time for us to review and deliver your release, and for it to
                                    be processed by the digital services once delivered.</Text>
                                <Calendar
                                    minDate={safedate}
                                    scrollEnabled={true}
                                    onDayPress={day => {
                                        setreleasedate(day.dateString)
                                    }}
                                    markedDates={{
                                        [releasedate]: { selected: true, marked: true, selectedColor: Primarycolor() },
                                    }}
                                    style={{ backgroundColor: Viewcolor() }}
                                    theme={{
                                        calendarBackground: Viewcolor(),
                                        textDisabledColor: 'red',
                                        dayTextColor: "white",
                                        todayTextColor: Primarycolor(),

                                    }}

                                />
                                <TouchableOpacity style={styles.confirmbtn} onPress={() => {
                                    ref.current.scrollTo(0);
                                }}>
                                    <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>Confirm Date</Text>
                                </TouchableOpacity>
                            </View>

                        </View> : null}
                    {showcustomplan ?
                        <View style={styles.customdiv}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ fontWeight: "bold", color: "gray", marginRight: 5 }}>Release Plan:</Text>
                                <Text style={{ fontWeight: "bold", color: "white" }}>Custom</Text>
                            </View>
                            <TouchableOpacity style={{ marginVertical: 20 }} onPress={() => {
                                ref.current.scrollTo(0);
                            }}>
                                <Text style={{ fontWeight: "bold", color: Primarycolor(), fontSize: 10 }}>CHANGE PLAN</Text>
                            </TouchableOpacity>
                            {showcustomreleasedate ? <View style={{ backgroundColor: Viewcolor(), padding: 10 }}>
                                <Text style={{ color: "white" }}>1. Choose a release date</Text>
                                <Text style={{ marginTop: 10, fontSize: 10, color: "gray", marginBottom: 10 }}>We require a 14 working day lead time in order to guarantee release
                                    dates to allow time for us to review and deliver your release, and for it to
                                    be processed by the digital services once delivered.</Text>
                                <Calendar
                                    minDate={safedate}
                                    scrollEnabled={true}
                                    onDayPress={day => {
                                        setreleasedate(day.dateString)
                                    }}
                                    markedDates={{
                                        [releasedate]: { selected: true, marked: true, selectedColor: Primarycolor() },
                                    }}
                                    style={{ backgroundColor: Viewcolor(), }}
                                    theme={{
                                        calendarBackground: Viewcolor(),
                                        textDisabledColor: 'red',
                                        dayTextColor: "white",
                                        todayTextColor: Primarycolor(),
                                    }}

                                />
                                <TouchableOpacity style={styles.confirmbtn} onPress={() => setshowcustomreleasedate(false)}>
                                    <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>Confirm Date</Text>
                                </TouchableOpacity>
                            </View> :
                                <View style={{ backgroundColor: Viewcolor(), padding: 10 }}>
                                    <Text style={{ color: "white" }}>2. Choose a Pre-order date</Text>
                                    <Text style={{ marginTop: 10, fontSize: 10, color: "gray", marginBottom: 10 }}>You can add a pre-order date to your release (14 working day lead time
                                        needed) to go live on iTunes & Amazon. Fans that pre-order the release
                                        will have it in their library from release day.
                                    </Text>
                                    <Calendar
                                        minDate={safedate}
                                        scrollEnabled={true}
                                        onDayPress={day => {
                                            setpreorderdate(day.dateString)
                                        }}
                                        markedDates={{
                                            [releasedate]: { selected: true, marked: true, selectedColor: Primarycolor() },
                                            [preorderdate]: { selected: true, marked: true, selectedColor: Primarycolor() },
                                        }}
                                        style={{ backgroundColor: Viewcolor() }}
                                        theme={{
                                            calendarBackground: Viewcolor(),
                                            textDisabledColor: 'red',
                                            dayTextColor: "white",
                                            todayTextColor: Primarycolor(),
                                        }}

                                    />
                                    <TouchableOpacity style={styles.confirmbtn} onPress={() => {
                                        ref.current.scrollTo(0);
                                    }}>
                                        <Text style={{ color: "white", fontSize: 10, fontWeight: "bold" }}>Confirm Date</Text>
                                    </TouchableOpacity>
                                </View>}
                        </View> : null}



                </View>
            </ScrollView>
            <View style={styles.bottomnav}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <FontAwesome5 name="home" color={"white"} size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={uploadeverything}
                    style={{
                        backgroundColor: plan === "simple" ? !releasedate || !selected2 || !isSelected ? Semisecondarycolor() : Primarycolor() : !releasedate || !preorderdate || !selected2 || !isSelected ? Semisecondarycolor() : Primarycolor(),
                        position: "absolute",
                        right: 10,
                        justifyContent: "center",
                        alignItems: "center",
                        paddingVertical: 10,
                        paddingHorizontal: 20,
                        top: 5,
                        borderRadius: 5
                    }}>
                    {loading ? <BallIndicator color='white' size={10} /> : <Text style={{ fontWeight: "bold", color: "white" }}>Submit</Text>}
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    confirmbtn: {
        backgroundColor: Primarycolor(),
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 5,
        width: "25%"
    },
    customdiv: {
        paddingTop: 60,
        paddingBottom: 50
    },
    simpleplanview: {
        paddingTop: 60,
        paddingBottom: 50
    },
    termsview: {
        backgroundColor: Viewcolor(),
        marginTop: 30,
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    leftplan: {
        backgroundColor: Primarycolor(),
        width: "49%",
        marginRight: "2%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 20,
        borderRadius: 10
    },
    rightplan: {
        width: "49%",
        borderWidth: 2,
        borderColor: Primarycolor(),
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        paddingVertical: 20,
    },
    progressview: {
        height: 5,
        borderRadius: 5,
        width: "88%",
        backgroundColor: Primarycolor(),
        marginTop: 10
    },
    contentview: {
        marginHorizontal: "2%",
        paddingBottom: 0
    },
    buttonsdiv: {
        position: "absolute",
        right: 10,
        flexDirection: "row"
    },
    nextbutton: {
        backgroundColor: Primarycolor(),
        width: 100,
        justifyContent:"center",
        alignItems:"center",
        top: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    previousbutton: {
        backgroundColor: Primarycolor(),
        width: 100,
        justifyContent:"center",
        alignItems:"center",
        top: 10,
        paddingVertical: 5,
        borderRadius: 5,
        marginRight: 5
    },
    bottomnav: {
        position: "absolute",
        bottom: 0,
        backgroundColor: Secondarycolor(),
        paddingHorizontal: 10,
        paddingVertical: 15,
        width: devicewidth,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    fixedview: {
        backgroundColor: Secondarycolor()
    },
    savelater: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10
    }
})

export default Step6;