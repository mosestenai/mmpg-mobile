import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image, Alert } from "react-native";
import { Primarycolor, Secondarycolor, Semisecondarycolor } from "../Utils/color";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "../Components/fontawesome5";
import * as DocumentPicker from 'expo-document-picker';
import { MaterialCommunityIcons } from "../Components/materialcommunity";
import * as SQLite from 'expo-sqlite';
import { UserProps } from "victory-core";
import { Getuserdetails } from "../Utils/getuserdetails";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Getsavedsongs } from "../Utils/getsavedsongs";

const db = SQLite.openDatabase('db.Userdbs') // returns Database object

var devicewidth = Dimensions.get('window').width;
var deviceheight = Dimensions.get('window').height;


const Step2 = () => {
    const savedsongs = Getsavedsongs()
    const navigation = useNavigation();
    const route = useRoute();
    const [audios, setaudios] = useState([]);
    const [showaudios, setshowaudios] = useState(false);
    const [nothing, setnothing] = useState(false);
    const user = Getuserdetails();


    useEffect(() => {
        const checkdraft = async () => {
            try {
                const value = await AsyncStorage.getItem('songssaved')
                if (value !== null) {
                    const gh = JSON.parse(value);
                    gh?.forEach(element => {
                        if (element.releasetitle === route?.params?.releasetitle && element.audiofile) {
                            setaudios(element.audiofile)
                            setshowaudios(!showaudios)
                        }
                    });
                }
            } catch (e) {
                console.log(e)
            }
        }
        checkdraft()

    }, []);



    const pickDocument = async () => {
        let result = await DocumentPicker.getDocumentAsync({});
        if (result.uri.split('.').pop() !== "wav") {
            Alert.alert(
                "Error",
                'Invalid format.Only wav audio formats are allowed',
                [
                    { text: "OK" }
                ]
            );
        } else {
            // console.log(result)
            // const index = audios.indexOf(result.name);
            var index = audios.findIndex(obj => obj?.name == result.name);

            if (index > -1) { // only splice array when item is found
                Alert.alert(
                    "Error",
                    'File already added',
                    [
                        { text: "OK" }
                    ]
                );
            } else {

                const result2 = {
                    trackuri: result.uri,
                    trackfilename: result.name
                }
                audios.push(result2)
                setshowaudios(true)
                donothig();
            }

        }
    };

    const donothig = () => {
        setnothing(!nothing)
    }




    const deleteaudio = (val) => {
        const index = audios.indexOf(val);
        donothig()
        if (index > -1) { // only splice array when item is found
            audios.splice(index, 1); // 2nd parameter means remove one item only
        }
    }


    const gotonextpage = () => {

        if (audios.length < 1) {
            Alert.alert(
                "Error",
                'select an audio to continue',
                [
                    { text: "OK" }
                ]
            );
        } else {
            navigation.navigate("step3", {
                releasetitle: route.params.releasetitle,
                coverimage: route.params.coverimage,
                audiofile: audios
            })

        }

    }


    const saveforlater = () => {
        if (!audios) {
            Alert.alert(
                "Error",
                'No data to be saved',
                [
                    { text: "OK" }
                ]
            );
        } else {
            let obj = {
                releasetitle: route.params.releasetitle,
                coverimage: route.params.coverimage,
                audiofile: audios
            };
            const gh = [];
            savedsongs.forEach(element => {
                if (element.releasetitle !== route.params.releasetitle) {
                    gh.push(element)
                }
            });
            gh.push(obj)

            AsyncStorage.setItem("songssaved", JSON.stringify(gh));
            Alert.alert(
                "Success",
                'Saved successfully',
                [
                    { text: "OK" }
                ]
            );
            navigation.navigate("Home")
        }
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
                    <Text style={{ color: "white", fontSize: 15 }}>Step 2</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.contentview}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Audio Files</Text>
                        <Text style={{ fontSize: 8, color: "gray", marginTop: 5 }}>
                            Please ensure the audio file is a stereo WAV that is at least 16-bit / 44.1 kHz;
                            we accept up to 24-bit / 96 kHz and recommend uploading your highest
                            quality files.{`\n`}{`\n`}
                            The upload process will begin when you add files to your release.{`\n`}{`\n`}
                            All metadata associated with those tracks will be retained and grayed out
                            during this upload.

                        </Text>
                    </View>
                    <View>
                        <View style={styles.progressview} />
                        <Text style={{ color: "white", position: "absolute", right: 0, fontSize: 13 }}>33%</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <TouchableOpacity style={styles.browse2button} onPress={pickDocument}>
                            <FontAwesome5 name={"plus"} color={"white"} style={{ marginRight: 5, marginLeft: 5, marginTop: 2 }} />
                            <Text style={{ color: "white", fontSize: 12 }}>BROWSE TRACKS</Text>
                        </TouchableOpacity>
                        <View style={styles.linehr} />
                        <View style={{ height: 20 }} />
                        <Text style={{ color: "white", fontWeight: "bold" }}>Your Files</Text>
                        <Text style={{ color: "gray", fontSize: 8 }}>Review your audio files below. You can change their order and other details later.</Text>

                    </View>
                    {showaudios ?
                        <View style={styles.audiosview}>
                            {audios.map((val, key) => {

                                return (
                                    <View style={styles.audioview} key={key}>
                                        <FontAwesome5 name={"music"} style={{ color: Primarycolor() }} />
                                        <Text style={{ color: Semisecondarycolor(), fontSize: 12, marginLeft: 10 }}>{val?.trackfilename.substring(0, 10)}</Text>
                                        <View style={{ flexDirection: "row", position: "absolute", right: 5 }}>
                                            <Text style={{ color: "green", fontSize: 10, marginTop: 5 }}>Uploaded</Text>
                                            <TouchableOpacity onPress={() => deleteaudio(val)}>
                                                <MaterialCommunityIcons name="delete-forever" color={"white"} size={25} />
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                )
                            })}

                        </View>
                        : <View style={styles.dropimageview}>
                            <TouchableOpacity onPress={pickDocument}>
                                <Image
                                    source={require('./../../assets/images/wav.png')}
                                    style={{ height: 50, width: 50 }}
                                />
                            </TouchableOpacity>
                        </View>}
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
                    <TouchableOpacity onPress={gotonextpage} style={styles.nextbutton}>
                        <Text style={{ color: "white" }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    audioview: {
        borderWidth: 1,
        borderColor: Secondarycolor(),
        padding: 10,
        flexDirection: "row"
    },
    audiosview: {
        borderWidth: 1,
        borderColor: Secondarycolor(),
        paddingBottom: 30
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
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Secondarycolor(),
        marginTop: 20,
        borderStyle: "dotted",
        borderWidth: 1,
        borderColor: Semisecondarycolor(),
        paddingVertical: 20
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
        width: "23%",
        backgroundColor: Primarycolor(),
        marginTop: 10
    },
    contentview: {
        marginHorizontal: "10%"
    },
    buttonsdiv: {
        position: "absolute",
        right: 10,
        flexDirection: "row"
    },
    nextbutton: {
        backgroundColor: Primarycolor(),
        width: 100,
        justifyContent: "center",
        alignItems: "center",
        top: 10,
        paddingVertical: 5,
        borderRadius: 5,
    },
    previousbutton: {
        backgroundColor: Primarycolor(),
        width: 100,
        justifyContent: "center",
        alignItems: "center",
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

export default Step2;