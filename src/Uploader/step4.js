import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image,Alert } from "react-native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "../Components/fontawesome5";
import SwitchToggle from "react-native-switch-toggle";
import { Picker } from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { Getuserdetails } from "../Utils/getuserdetails";
import * as SQLite from 'expo-sqlite';
import { Getartistdetailsurl } from "../Utils/urls";
import axios from "axios";

const db = SQLite.openDatabase('db.Userdbs') // returns Database object


var devicewidth = Dimensions.get('window').width;
var deviceheight = Dimensions.get('window').height;



const Step4 = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const user = Getuserdetails();
    const [releasetitle, setreleasetitle] = useState(route.params.releasetitle);
    const [upc, setupc] = useState('');
    const [genre, setgenre] = useState('Choose a primary genre');
    const [copyrightyear, setcopyrightyear] = useState('');
    const [copyrightholder, setcopyrightholder] = useState('');
    const [on, seton] = useState(false);
    const [labelname, setlabelname] = useState('');
    const [label, setlabel] = useState([]);
    const [showgenremenu, setshowgenremenu] = useState(false);
    const [nothing, setnothing] = useState(false);
    const [error, seterror] = useState('');
    const [gottendata, setgottendata] = useState(false);


    useEffect(() => {

        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    getartists(_array[0].token)
                },
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
    }, []);

    const getartists = (e) => {
       
        axios.post(Getartistdetailsurl, {
            token: e
        }).then(function (response) {
            if (!response.data.message) {
                if (response.data[0]?.labelname.length > 1) {
                    setlabel(response.data[0].labelname)
                    setlabelname(response.data[0].labelname)
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

    const gotonextpage = () => {

        if (user.type === 'Label' && !labelname) {
            Alert.alert(
                "Error",
                'Enter a primary artist to continue',
                [
                    { text: "OK" }
                ]
            );
        } else if(!copyrightyear){
            Alert.alert(
                "Error",
                'Specify copyright year',
                [
                    { text: "OK" }
                ]
            );
        }else if(!copyrightholder){
            Alert.alert(
                "Error",
                'Enter copyright holder',
                [
                    { text: "OK" }
                ]
            );
        }
        else if(!genre){
            Alert.alert(
                "Error",
                'Specify a genre',
                [
                    { text: "OK" }
                ]
            );
        }  
        else {
            navigation.navigate("step5", {
                releasetitle: route.params.releasetitle,
                coverimage: route.params.coverimage,
                audiofile: route.params.audiofile,
                primaryartist: route.params.primaryartist,
                labelname: labelname,
                copyrightyear: copyrightyear,
                copyrightholder: copyrightholder,
                upc: upc,
                genre:genre
            })

        }
    }

    const genres = [
        "Alternative",
        "Afrobeats",
        "Ambient H",
        "Anime",
        "Audio Books",
        "Big Band",
        "Blues",
        "Bollywood",
        "Brazilian",
        "Children’s Music",
        "Christian & Gospel",
        "Classical",
        "Classical Crossover",
        "Comedy",
        "Country",
        "Dance",
        "Devotional & Spiritual",
        "Electronic",
        "Folk",
        "Ghazals",
        "Heavy Metal",
        "High Classical",
        "Hip Hop / Rap",
        "Indian Classical",
        "Indian Folk",
        "Indian Pop",
        "Instrumental",
        "Jazz",
        "Karaoke",
        "Latin",
        "New Age",
    ]



    const pushlabel = () => {
        label.length < 1 &&

            setlabel([labelname])
        setnothing(!nothing)
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
                    <Text style={{ color: "white", fontSize: 15 }}>Step 4</Text>
                </View>
            </View>
            <ScrollView>
                {showgenremenu ? <Spinner
                    visible={true}
                    color='red'
                    size={70}
                    customIndicator={
                        <View style={{ width: "80%", height: "80%", backgroundColor: Secondarycolor() }}>
                            <Text style={{ color: "gray", padding: 5 }}>Choose Genre</Text>
                            <ScrollView>
                                {genres.map((val, key) => {
                                    return (
                                        <TouchableOpacity key={key}
                                            onPress={() => {
                                                setgenre(val)
                                                setshowgenremenu(false)
                                            }}
                                            style={{
                                                padding: 10,
                                                backgroundColor: genre === val ? Primarycolor() : Secondarycolor()
                                            }}>
                                            <Text style={{ color: "white" }}>{val}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View>}
                /> : null}
                <View style={styles.contentview}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Release Information</Text>
                        <Text style={{ fontSize: 8, color: "gray", marginTop: 5 }}>
                            Add information about your release{`\n`}{`\n`}
                            This is where you’ll add technical details for your release, such as language,
                            copyright information and genre.
                        </Text>
                    </View>
                    <View>
                        <View style={styles.progressview} />
                        <Text style={{ color: "white", position: "absolute", right: 0, fontSize: 13 }}>69%</Text>
                    </View>
                    <View style={styles.linehr} />
                    <View style={{ marginTop: 10 }}>
                        <View style={{ height: 0 }} />
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={{ color: "white", fontWeight: "bold", marginTop: 15 }}>Title</Text>
                            <FontAwesome5 name={"star-of-life"} color={"#f9535e"} style={{ marginTop: 15, marginLeft: 5 }} />
                        </View>
                        <TextInput
                            style={styles.fulltextinput}
                            placeholder="Name your release"
                            placeholderTextColor={"gray"}
                            value={releasetitle}
                        //onChangeText={newText => setreleasetitle(newText)}

                        />
                    </View>
                   {user?.type === 'Label' && <View style={{ flexDirection: "row", marginTop: 10 }}>
                        <Text style={{ color: "white", fontWeight: "bold", marginTop: 15 }}>Release Label</Text>
                        <FontAwesome5 name={"star-of-life"} color={"#f9535e"} style={{ marginTop: 15, marginLeft: 5 }} />
                    </View>}
                    <View>
                    {user?.type === 'Label' && <View style={styles.addsplitview}>
                            <View style={styles.pickerview}>
                                <Picker
                                    style={styles.trackpicker}
                                    dropdownIconColor={"white"}
                                    selectedValue={labelname}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setlabelname(itemValue)
                                    }>
                                    {Array.isArray(label)&& label?.map((item, index) => {
                                        return (<Picker.Item label={item} value={item} key={index} />)
                                    })}
                                </Picker>
                            </View>
                            <TextInput
                                placeholder="Create Label name"
                                placeholderTextColor={"gray"}
                                style={styles.artistinput}
                                value={labelname}
                                onChangeText={newText =>
                                    !gottendata && setlabelname(newText)}
                                onSubmitEditing={pushlabel}
                            />
                        </View>}
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={{ color: "white", fontWeight: "bold", marginTop: 15 }}>Copyright Holder</Text>
                            <FontAwesome5 name={"star-of-life"} color={"#f9535e"} style={{ marginTop: 15, marginLeft: 5 }} />
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TextInput
                                onChangeText={newText => setcopyrightyear(newText)}
                                defaultValue={copyrightyear}
                                placeholder="Y Y Y Y"
                                style={styles.leftinput}
                                placeholderTextColor="gray"
                                keyboardType="numeric"
                            />
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                <Image source={require('./../../assets/images/pimage.png')} style={{ height: 20, width: 20 }} />
                            </View>
                            <TextInput
                                onChangeText={newText => setcopyrightholder(newText)}
                                defaultValue={copyrightholder}
                                placeholder="Who owns the sound recording"
                                style={styles.rightinput}
                                placeholderTextColor="gray"
                            />

                        </View>

                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={{ color: "white", fontWeight: "bold", marginTop: 0 }}>UPC</Text>
                            <Text style={{ color: "gray", fontSize: 13 }}>(optional)</Text>
                        </View>
                        <TextInput
                            style={styles.fulltextinput}
                            placeholder="Don't have one? MMPG will provide a UPC for you"
                            placeholderTextColor={"gray"}
                            onChangeText={newText => setupc(newText)}
                            defaultValue={upc}
                        />
                        <Text style={{ color: "gray", fontSize: 8 }}>Universal Product Code</Text>
                        <View style={styles.hrg} />
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={{ color: "white", fontWeight: "bold", marginTop: 0 }}>Genre</Text>
                            <FontAwesome5 name={"star-of-life"} color={"#f9535e"} style={{ marginTop: 0, marginLeft: 5 }} />
                        </View>
                        <TouchableOpacity style={styles.fulltextinput} onPress={() => setshowgenremenu(true)}>
                            <Text style={{ color: "gray" }}>{genre}</Text>
                        </TouchableOpacity>

                    </View>

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
    rightinput: {
        backgroundColor: Viewcolor(),
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "55%",
        color: "gray",
        color:"white",
        fontSize: 13
    },
    leftinput: {
        backgroundColor: Viewcolor(),
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "40%",
        color:"white",
        fontSize: 13
    },
    fulltextinput: {
        backgroundColor: Viewcolor(),
        marginTop: 10,
        paddingVertical: 10,
        color: "white",
        paddingHorizontal: 10,
        fontSize: 13
    },
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
    hrg: {
        height: 1,
        backgroundColor: Secondarycolor(),
        marginVertical: 10
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
        width: "59%",
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

export default Step4;