import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image, Alert } from "react-native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "../Components/fontawesome5";
import SwitchToggle from "react-native-switch-toggle";
import { Picker } from '@react-native-picker/picker';
import axios from "axios";
import { Getuserdetails } from "./../Utils/getuserdetails";
import { Getartistdetailsurl } from "../Utils/urls";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.Userdbs') // returns Database object

var devicewidth = Dimensions.get('window').width;
var deviceheight = Dimensions.get('window').height;



const Step3 = () => {

    const navigation = useNavigation();
    const [releasetitle, setreleasetitle] = useState('');
    const [on, seton] = useState(true);
    const [artist, setartist] = useState('');
    const [artists, setartists] = useState([]);
    const user = Getuserdetails();
    const [error, seterror] = useState('');
    const route = useRoute();
    const [nothing, setnothing] = useState(false);
    const [loading, setloading] = useState(true);
    const [gottendata, setgottendata] = useState(false);


    useEffect(() => {

        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                   _array[0].type === 'Artist' && getartists(_array[0].token)
                },
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
    }, []);

    const getartists = (e) => {
        axios.post(Getartistdetailsurl, {
            token: e
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                if (response.data[0].name) {
                    artists.push(response.data[0].name)
                    setartist(response.data[0].name)
                    setnothing(!nothing)
                    setgottendata(true)
                }

            } else {
                seterror(response.data.message)
            }
            // 
        }).catch(function (error) {
            console.log(error)
            //if(error.response.status === 401 || error.response.status === 400){}

        });
    }


    const pushartist = () => {
        artists.length < 1 &&

            setartists([artist])
        setnothing(!nothing)
    }

    const gotonextpage = () => {

        if (user.type === 'Artist' && !artist) {
            Alert.alert(
                "Error",
                'Enter a primary artist to continue',
                [
                    { text: "OK" }
                ]
            );
        } else {
            navigation.navigate("step4", {
                releasetitle: route.params.releasetitle,
                coverimage: route.params.coverimage,
                audiofile: route.params.audiofile,
                primaryartist: artist,
            })

        }
    }


    return (
        <SafeAreaView style={{ height: deviceheight, backgroundColor: "black" }}>
            <View style={styles.fixedview}>
                <TouchableOpacity style={styles.savelater}>
                    <SimpleLineIcons name="logout" color="white" size={25} />
                    <Text style={{ color: "white", marginLeft: 5, marginTop: 3 }}>Save for Later</Text>
                </TouchableOpacity>
                <View style={{
                    position: "absolute",
                    right: 10,
                    top: 10
                }}>
                    <Text style={{ color: "white", fontSize: 15 }}>Step 3</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.contentview}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Release Artists</Text>
                        <Text style={{ fontSize: 8, color: "gray", marginTop: 5 }}>
                            Add artist information for your release{`\n`}{`\n`}
                            This is where you’ll credit the primary and featuring artist(s) present on your
                            release. You should only credit artists here who feature on 50% or more of the
                            tracks on your release. You can add additional artist credits that are specific to
                            individual tracks on Step 5

                        </Text>
                    </View>

                    <View>
                        <View style={styles.progressview} />
                        <Text style={{ color: "white", position: "absolute", right: 0, fontSize: 13 }}>60%</Text>
                    </View>
                    <View style={styles.linehr} />
                    <View style={{ marginTop: 10 }}>
                        <View style={{ height: 20 }} />
                        <Text style={{ color: "white", fontWeight: "bold" }}>Primary Artists</Text>
                        <Text style={{ color: "gray", fontSize: 8 }}>Their names will appear on the release.{`\n`}
                            Choose Various Artists if you have 4 or more primary artists across your
                            release.
                        </Text>
                    </View>
                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ color: "white", fontWeight: "bold", marginTop: 15 }}>Various Artists</Text>
                        <View style={styles.dropimageview}>
                            <Text style={{ color: "white", marginTop: 5 }}>Yes</Text>
                            <SwitchToggle
                                switchOn={on}
                                onPress={() => {
                                    user.type === 'Label' ? seton(!on) :
                                        Alert.alert(
                                            "Error",
                                            'Cannot add another artist please upgrade your membership',
                                            [
                                                { text: "OK" }
                                            ]
                                        );
                                }}
                                containerStyle={{
                                    marginTop: 0,
                                    width: 50,
                                    height: 30,
                                    borderRadius: 25,
                                    marginHorizontal: 10,
                                    padding: 5,
                                }}
                                circleStyle={{
                                    width: 20,
                                    height: 20,
                                    borderRadius: 20,
                                }}
                                circleColorOff='white'
                                circleColorOn='black'
                                backgroundColorOn="white"
                                backgroundColorOff={Primarycolor()}
                            />
                            <Text style={{ color: "white", marginTop: 5 }}>No</Text>
                        </View>
                    </View>
                    <View style={styles.linehr} />
                    {user.type !== 'Label' && !loading &&
                        on ? <View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={{ color: "white", fontWeight: "bold", marginTop: 15 }}>Primary Artist</Text>
                            <FontAwesome5 name={"star-of-life"} color={"#f9535e"} style={{ marginTop: 15, marginLeft: 5 }} />
                        </View>
                        <View>
                            <Text style={{ color: "gray", fontSize: 8 }}> Their names will appear on the release</Text>
                            <View style={styles.addsplitview}>
                                <View style={styles.pickerview}>
                                    <Picker
                                        style={styles.trackpicker}
                                        dropdownIconColor={"white"}
                                        selectedValue={artist}
                                        onValueChange={(itemValue, itemIndex) => setartist(itemValue)
                                        }>
                                        {artists.map((item, index) => {
                                            return (<Picker.Item label={item} value={item} key={index} />)
                                        })}

                                    </Picker>
                                </View>
                                <TextInput
                                    placeholder="Artist name"
                                    placeholderTextColor={"gray"}
                                    onChangeText={newText =>
                                        !gottendata && setartist(newText)}
                                    onSubmitEditing={pushartist}
                                    style={styles.artistinput}
                                    value={artist}
                                />
                            </View>
                            <TouchableOpacity style={styles.addartistbutton}>
                                <FontAwesome5 name={"plus"} color={"gray"} />
                                <Text style={styles.addtext}>ADD ANOTHER ARTIST</Text>
                            </TouchableOpacity>

                            <View style={styles.linehr} />
                            <Text style={{ color: "white", fontWeight: "bold" }}>Featured Artists</Text>
                            <Text style={{ color: "gray", fontSize: 8 }}>Their names will appear on the release</Text>
                            <TouchableOpacity style={styles.addartistbutton}>
                                <FontAwesome5 name={"plus"} color={Primarycolor()} />
                                <Text style={styles.addtext2}>ADD ANOTHER ARTIST</Text>
                            </TouchableOpacity>
                        </View>
                    </View> : null}

                </View>
            </ScrollView>
            <View style={styles.bottomnav}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <FontAwesome5 name="home" color={"white"} size={20} />
                </TouchableOpacity>
                <View style={styles.buttonsdiv}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.previousbutton}>
                        <Text style={{ color: "white" }}>Previous</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.nextbutton} onPress={gotonextpage}>
                        <Text style={{ color: "white" }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    addtext2: {
        color: Primarycolor(),
        fontSize: 10,
        marginLeft: 5
    },
    addtext: {
        color: "gray",
        fontSize: 10,
        marginLeft: 5
    },
    addartistbutton: {
        flexDirection: "row",
        marginTop: 10
    },
    artistinput: {
        backgroundColor: Viewcolor(),
        marginLeft: 20,
        paddingHorizontal: 5,
        width: "55%",
        color: "gray"
    },
    trackpicker: {
        color: "white",
    },
    pickerview: {
        borderWidth: 2,
        borderColor: Viewcolor(),
        borderRadius: 5,
        width: "40%",
    },
    addsplitview: {
        flexDirection: "row",
        width: "100%",
        marginTop: 10
    },
    browse2button: {
        flexDirection: "row",
        backgroundColor: Primarycolor(),
        width: "50%",
        paddingVertical: 5,
        marginTop: 20
    },
    browsebutton: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: "gray"
    },
    dropimageview: {
        flexDirection: "row",
        backgroundColor: Secondarycolor(),
        borderStyle: "dotted",
        borderWidth: 1,
        borderColor: Semisecondarycolor(),
        paddingVertical: 10,
        paddingHorizontal: 15,
        marginLeft: 20
    },
    linehr: {
        height: 1,
        backgroundColor: Secondarycolor(),
        marginTop: 30
    },
    titleinput: {
        height: 35,
        marginLeft: 0,
        color: "white",
        backgroundColor: Secondarycolor(),
        paddingHorizontal: 5,
    },
    progressview: {
        height: 5,
        borderRadius: 5,
        width: "50%",
        backgroundColor: Primarycolor(),
        marginTop: 10
    },
    contentview: {
        marginHorizontal: "10%",
        paddingBottom: 200
    },
    buttonsdiv: {
        position: "absolute",
        right: 10,
        flexDirection: "row"
    },
    nextbutton: {
        backgroundColor: Primarycolor(),
        paddingHorizontal: 35,
        top: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    previousbutton: {
        backgroundColor: Primarycolor(),
        paddingHorizontal: 35,
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

export default Step3;