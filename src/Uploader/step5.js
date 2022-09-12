import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image } from "react-native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "../Components/fontawesome5";
import SwitchToggle from "react-native-switch-toggle";
import { Picker } from '@react-native-picker/picker';
import Spinner from 'react-native-loading-spinner-overlay';
import { MaterialCommunityIcons } from "../Components/materialcommunity";
import { Getuserdetails } from "../Utils/getuserdetails";
import { Audio } from 'expo-av';
import * as SQLite from 'expo-sqlite';
import axios from 'axios';
import { Getartistdetailsurl } from "../Utils/urls";
import { BallIndicator } from "react-native-indicators";

const db = SQLite.openDatabase('db.Userdbs') // returns Database object


var devicewidth = Dimensions.get('window').width;
var deviceheight = Dimensions.get('window').height;



const Step5 = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const user = Getuserdetails();
    const [tracktitle, settracktitle] = useState('');
    const [releasetitle, setreleasetitle] = useState('');
    const [tracks, settracks] = useState(route.params.audiofile);
    const [isrc, setisrc] = useState('');
    const [primaryartist, setprimaryartist] = useState(route.params.primaryartist && route.params.primaryartist);
    const [featuredartist, setfeaturedartist] = useState(route.params.primaryartist && route.params.primaryartist);
    const [primaryartists, setprimaryartists] = useState([route.params.primaryartist && route.params.primaryartist]);
    const [featuredartists, setfeaturedartists] = useState([route.params.primaryartist && route.params.primaryartist]);
    const [partist, setpartist] = useState('');
    const [copyrightyear, setcopyrightyear] = useState('');
    const [copyrightholder, setcopyrightholder] = useState('');
    const [contributors, setcontributors] = useState('');
    const [writer, setwriter] = useState('');
    const [role, setrole] = useState('');
    const [artists, setartists] = useState([]);
    const [showaddlyrics, setshowaddlyrics] = useState(false);
    const [lyrics, setlyrics] = useState('');
    const [editmusic, seteditmusic] = useState(false);
    const [musicstatus, setmusicstatus] = useState(false);
    const [donothing, setdonothing] = useState(false);
    const [tracktoedit, settracktoedit] = useState('');
    const [edittrack, setedittrack] = useState(false);
    const [loading, setloading] = useState(true);


    const [advice, setadvice] = useState('Choose');
    const [language, setlanguage] = useState('Choose');

    const [showlanguagemenu, setshowlanguagemenu] = useState(false);
    const [showadvicemenu, setshowadvicemenu] = useState(false);

    const [sound, setSound] = React.useState();


    useEffect(() => {

        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                  _array[0].type === 'Label'&& getartists(_array[0].token)
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
                    response.data.forEach(element => {
                        primaryartists.push(element.name)
                        featuredartists.push(element.name)
                    });
                    // setartists(response.data)
                    // setprimaryartists(response.data)
                    // setfeaturedartists(response.data)
                    // artists.push(response.data[0].name)
                    // setartist(response.data[0].name)
                    // setnothing(!nothing)
                    // setgottendata(true)
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



    // const images = {
    //     audio: {
    //         uri: require(musicurl)
    //     }
    // }

    async function playSound(e) {
        console.log('Loading Sound');
        const { sound } = await Audio.Sound.createAsync(
            { uri: e },
            { shouldPlay: musicstatus }
        );
        setSound(sound);

        console.log('Playing Sound');
        await sound.playAsync();
    }

    React.useEffect(() => {
        return sound
            ? () => {
                console.log('Unloading Sound');
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    const onpushprimaryartists = () => {

    }

    const onpushfeaturedartists = () => {

    }
    const onpushwriters = () => {

    }





    var roles = ["Select", "role1", "role1", "role1"]



    const advices = [
        "Explicit",
        "Non-Explicit"
    ]

    const languages = [
        " Afrikanns",
        "Albanian",
        "Arabic",
        "Armenian",
        "Basque",
        "Bengali",
        "Bulgarian",
        "Catalan",
        "Cambodian",
        "Chinese(Mandarin)",
        "Croation",
        "Czech",
        "Danish",
        "Dutch",
        "English",
        "Estonian",
        "Fiji",
        "Finnish",
        "French",
        "Georgian",
        "Latin",
        "Latvian",
        "Lithuanian",
        "Macedonian",
        "Malay",
        "Malayalam",
        "Maltese",
        "Maori",
        "Marathi",
        "Mongolian",
        "Nepali"
    ]


    const gotonextpage = () => {
        navigation.navigate("step6", {
            releasetitle: route.params.releasetitle,
            coverimage: route.params.coverimage,
            primaryartist: route.params.primaryartist,
            labelname: route.params.labelname,
            copyrightyear: route.params.copyrightyear,
            copyrightholder: route.params.copyrightholder,
            upc: route.params.upc,
            genre: route.params.genre,
            tracks: tracks
        })
    }

    const onsaveandclose = () => {
        const obj = {
            tracktitle: tracktitle,
            language: language,
            advice: advice,
            copyrightholder: copyrightholder,
            copyrightyear: copyrightyear,
            contributors: contributors,
            isrc: isrc,
            writers: writer,
            lyrics: lyrics,
            trackuri: tracktoedit.trackuri,
            trackfilename: tracktoedit.trackfilename,
            primaryartist: primaryartist,
            featuredartist: primaryartist,
        }
        const index = tracks.indexOf(tracktoedit);

        if (index > -1) { // only splice array when item is found
            tracks.splice(index, 1); // 2nd parameter means remove one item only
            tracks.push(obj)
            settracktoedit('')
            setedittrack(false)
            seteditmusic(false)
        }
    }


    


    return (
        <SafeAreaView style={{ height: deviceheight, backgroundColor: "black" }}>
            {loading &&
                <Spinner
                    visible={true}
                    color='blue'
                    size={40}
                    customIndicator={<BallIndicator color={Primarycolor()} />}
                />}
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
                    <Text style={{ color: "white", fontSize: 15 }}>Step 5</Text>
                </View>
            </View>
            <ScrollView>
                {showlanguagemenu ? <Spinner
                    visible={true}
                    color='red'
                    size={70}
                    customIndicator={
                        <View style={{ width: "80%", height: "80%", backgroundColor: Secondarycolor() }}>
                            <Text style={{ color: "gray", padding: 5 }}>Choose language</Text>
                            <ScrollView>
                                {languages.map((val, key) => {
                                    return (
                                        <TouchableOpacity key={key}
                                            onPress={() => {
                                                setlanguage(val)
                                                setshowlanguagemenu(false)
                                            }}
                                            style={{
                                                padding: 10,
                                                backgroundColor: language === val ? Primarycolor() : Secondarycolor()
                                            }}>
                                            <Text style={{ color: "white" }}>{val}</Text>
                                        </TouchableOpacity>
                                    )
                                })}
                            </ScrollView>
                        </View>}
                /> : null}
                {showadvicemenu ? <Spinner
                    visible={true}
                    color='red'
                    size={70}
                    customIndicator={
                        <View style={{ width: "80%", backgroundColor: Secondarycolor() }}>
                            <Text style={{ color: "gray", padding: 5 }}>Parental Advisory</Text>
                            {advices.map((val, key) => {
                                return (
                                    <TouchableOpacity key={key}
                                        onPress={() => {
                                            setadvice(val)
                                            setshowadvicemenu(false)
                                        }}
                                        style={{
                                            padding: 10,
                                            backgroundColor: advice === val ? Primarycolor() : Secondarycolor()
                                        }}>
                                        <Text style={{ color: "white" }}>{val}</Text>
                                    </TouchableOpacity>
                                )
                            })}

                        </View>}
                /> : null}
                <View style={styles.contentview}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Track Information</Text>
                        <Text style={{ fontSize: 8, color: "gray", marginTop: 5 }}>
                            Add information to each of your tracks{`\n`}{`\n`}
                            This is where you'll add details for individual tracks, such as title, track artists
                            and contributors.

                        </Text>
                    </View>
                    <View>
                        <View style={styles.progressview} />
                        <Text style={{ color: "white", position: "absolute", right: 0, fontSize: 13 }}>90%</Text>
                    </View>
                    <View style={styles.linehr} />
                    {edittrack ?
                        <View>
                            <View style={{ flexDirection: "row", padding: 10 }}>
                                <Text style={{ color: "gray", width: "30%" }}>Title </Text>
                                <Text style={{ color: "gray", width: "30%" }}>Artists</Text>
                                <Text style={{ color: "gray", width: "30%" }}>Length</Text>
                            </View>
                            <View style={{ padding: 10 }}>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: "gray", width: "30%", fontSize: 12 }}>{tracktoedit.tracktitle} </Text>
                                    <Text style={{ color: "gray", width: "30%", fontSize: 10 }}>{tracktoedit.primaryartist}</Text>
                                    <Text style={{ color: "gray", width: "30%", fontSize: 10 }}>3:00</Text>
                                    {musicstatus ? <TouchableOpacity
                                        style={{
                                            padding: 10, marginTop: -20
                                        }}
                                        onPress={() => {
                                            setmusicstatus(false)
                                            setdonothing(!donothing)
                                            setSound(false)
                                        }}>
                                        <FontAwesome5 name={"pause"} color={"gray"} size={30} />
                                    </TouchableOpacity> :
                                        <TouchableOpacity style={{
                                            padding: 10, marginTop: -20
                                        }} onPress={() => {
                                            playSound(tracktoedit?.trackuri)
                                            setmusicstatus(true)
                                        }}>
                                            <FontAwesome5 name={"caret-right"} color={"gray"} size={30} />
                                        </TouchableOpacity>}
                                </View>


                            </View>

                        </View> : <View>
                            <View style={{ flexDirection: "row", padding: 10 }}>
                                <Text style={{ color: "gray", width: "30%" }}>Title </Text>
                                <Text style={{ color: "gray", width: "30%" }}>Artists</Text>
                            </View>
                            <View style={{ padding: 10 }}>
                                {tracks.map((val, key) => {
                                    return (
                                        <View key={key} style={{ flexDirection: "row", margin: 5 }}>
                                            <Text style={{ color: "gray", width: "30%", fontSize: 12 }}>{val.tracktitle} </Text>
                                            <Text style={{ color: "gray", width: "30%", fontSize: 10 }}>{val.primaryartist}</Text>
                                            <TouchableOpacity
                                                onPress={() => {
                                                    settracktoedit(val)
                                                    setedittrack(true)
                                                    seteditmusic(true)
                                                }}
                                                style={{ flexDirection: "row" }}>
                                                <Text style={{ fontWeight: "bold", color: Primarycolor() }}>Edit track info</Text>
                                                <FontAwesome5 name="pen" style={{ color: Primarycolor(), marginLeft: 3 }} />
                                            </TouchableOpacity>
                                            <TouchableOpacity style={{ marginTop: -5 }}>
                                                <MaterialCommunityIcons name="delete-forever" size={30} color="white" />
                                            </TouchableOpacity>

                                        </View>
                                    )
                                })}
                            </View>
                        </View>

                    }
                    {editmusic && <View>
                        <View style={{ marginTop: 10 }}>
                            <View style={{ height: 0 }} />
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <Text style={{ color: "white", fontWeight: "bold", marginTop: 15 }}>Track Details</Text>
                            </View>
                            <Text style={{ color: "gray" }}>Enter the details for your track here</Text>

                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={{ color: "white", fontWeight: "bold", marginTop: 15 }}>Track Title</Text>
                            <FontAwesome5 name={"star-of-life"} color={"#f9535e"} style={{ marginTop: 15, marginLeft: 5 }} />
                        </View>
                        <TextInput
                            style={styles.fulltextinput}
                            placeholder="Name your release"
                            placeholderTextColor={"gray"}
                            onChangeText={newText => settracktitle(newText)}
                            defaultValue={tracktoedit ? tracktoedit?.releasename : tracktitle}
                        />

                        <View>
                            <View style={{ flexDirection: "row" }}>

                                <View style={{ width: "48%" }}>
                                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                                        <Text style={{ color: "white", fontWeight: "bold", marginTop: 15 }}>Language</Text>
                                        <FontAwesome5 name={"star-of-life"} color={"#f9535e"} style={{ marginTop: 15, marginLeft: 5 }} />
                                    </View>
                                    <TouchableOpacity style={styles.choosebtn} onPress={() => setshowlanguagemenu(true)}>
                                        <Text style={{ color: "gray", fontSize: 10 }}>{language}</Text>
                                    </TouchableOpacity>
                                </View>
                                <View style={{ width: "48%", marginLeft: "2%" }}>
                                    <View style={{ flexDirection: "row", marginTop: 10 }}>
                                        <Text style={{ color: "white", fontWeight: "bold", marginTop: 15 }}>Parental Advisory</Text>
                                        <FontAwesome5 name={"star-of-life"} color={"#f9535e"} style={{ marginTop: 15, marginLeft: 5 }} />
                                    </View>
                                    <TouchableOpacity style={styles.choosebtn} onPress={() => setshowadvicemenu(true)}>
                                        <Text style={{ color: "gray", fontSize: 10 }}>{advice}</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>

                            <View style={{ flexDirection: "row", marginTop: 3 }}>
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
                                <Text style={{ color: "white", fontWeight: "bold", marginTop: 0 }}>ISRC</Text>
                                <Text style={{ color: "gray", fontSize: 13 }}>(optional)</Text>
                            </View>
                            <TextInput
                                style={styles.fulltextinput}
                                placeholder="Don't have one? MMPG will provide an ISRC for you"
                                placeholderTextColor={"gray"}
                                onChangeText={newText => setisrc(newText)}
                                defaultValue={isrc}
                            />
                            <Text style={{ color: "gray", fontSize: 8 }}>International Standard Recording Code</Text>
                            <View style={styles.hrg} />
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <Text style={{ color: "white", fontWeight: "bold", marginTop: 0 }}>Primary Artist</Text>
                                <FontAwesome5 name={"star-of-life"} color={"#f9535e"} style={{ marginTop: 0, marginLeft: 5 }} />
                            </View>
                            <View style={styles.addsplitview}>
                                <View style={styles.pickerview}>
                                    <Picker
                                        style={styles.trackpicker}
                                        dropdownIconColor={"white"}
                                        selectedValue={primaryartist}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setprimaryartist(itemValue)
                                        }>
                                        {primaryartists.map((item, index) => {
                                            return (<Picker.Item label={item} value={item} key={index} />)
                                        })}
                                    </Picker>
                                </View>
                                <TextInput
                                    placeholder="Artist name"
                                    placeholderTextColor={"gray"}
                                    style={styles.artistinput}
                                    value={primaryartist}
                                    onChangeText={newText => {
                                        !route.params.primaryartist &&
                                            setprimaryartist(newText)
                                    }}
                                />
                            </View>
                            <View style={styles.hrg} />
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <Text style={{ color: "white", fontWeight: "bold", marginTop: 0 }}>Featured Artists</Text>
                            </View>
                            <Text style={{ color: "white", fontWeight: "bold", marginTop: 0 }}>Role</Text>
                            <View style={styles.addsplitview}>
                                <View style={styles.pickerview}>
                                    <Picker
                                        style={styles.trackpicker}
                                        dropdownIconColor={"white"}
                                        selectedValue={featuredartist}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setfeaturedartist(itemValue)
                                        }>
                                        {featuredartists.map((item, index) => {
                                            return (<Picker.Item label={item} value={item} key={index} />)
                                        })}
                                    </Picker>
                                </View>
                                <TextInput
                                    placeholder="Please enter name"
                                    placeholderTextColor={"gray"}
                                    style={styles.artistinput}
                                    value={featuredartist}
                                    onChangeText={newText => {
                                        !route.params.primaryartist &&
                                            setfeaturedartist(newText)
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={styles.addartistbutton}>
                                <FontAwesome5 name={"plus"} color={Primarycolor()} />
                                <Text style={styles.addtext2}>ADD ANOTHER ARTIST</Text>
                            </TouchableOpacity>
                            <View style={styles.hrg} />
                            <Text style={{ color: "white", fontWeight: "bold", marginTop: 0 }}>Additional Contributors</Text>
                            <Text style={{ fontSize: 8, color: "gray", marginTop: 5 }}>
                                Additional contributors are those who have made some contribution to your
                                release but are not primary or featuring artists. You can credit producers,
                                engineers & remixers here.
                            </Text>
                            <TextInput
                                style={styles.fulltextinput}
                                placeholder="Please contributors names"
                                placeholderTextColor={"gray"}
                                onChangeText={newText => setcontributors(newText)}
                                defaultValue={contributors}
                            />
                            {/* <TouchableOpacity style={styles.addartistbutton}>
                                <FontAwesome5 name={"plus"} color={Primarycolor()} />
                                <Text style={styles.addtext2}>ADD ANOTHER CONTRIBUTOR</Text>
                            </TouchableOpacity> */}
                            <View style={styles.hrg} />
                            <Text style={{ color: "white", fontWeight: "bold", marginTop: 0 }}>Songwriters</Text>
                            <Text style={{ fontSize: 8, color: "gray", marginTop: 5 }}>
                                Songwriter credits must be full (first and last) names as opposed to stage names
                            </Text>
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <Text style={{ color: "white", fontWeight: "bold", marginTop: 0, fontSize: 11 }}>Writer</Text>
                                <FontAwesome5 name={"star-of-life"} color={"#f9535e"} style={{ marginTop: 0, marginLeft: 5 }} />
                            </View>
                            <TextInput
                                style={styles.fulltextinput}
                                placeholder="Please enter writers names"
                                placeholderTextColor={"gray"}
                                onChangeText={newText => setwriter(newText)}
                                defaultValue={writer}
                            />
                            {/* <TouchableOpacity style={styles.addartistbutton}>
                                <FontAwesome5 name={"plus"} color={Primarycolor()} />
                                <Text style={styles.addtext2}>ADD ANOTHER WRITER</Text>
                            </TouchableOpacity> */}
                            <View style={styles.hrg} />
                            <View style={{ flexDirection: "row", marginTop: 10 }}>
                                <MaterialCommunityIcons name={"playlist-music"} color={Primarycolor()} size={20} />
                                <Text style={{ color: "white", fontWeight: "bold", marginTop: 0, marginLeft: 5 }}>Lyrics</Text>
                                <MaterialCommunityIcons name={"new-box"} color={"#1ed760"} size={25} style={{ color: "green" }} />
                                <Text style={{ color: "gray", fontSize: 13 }}>(optional)</Text>
                            </View>
                            <Text style={{ fontSize: 10, color: "gray", marginTop: 2 }}>
                                Lyrics uploaded with your release will be delivered to selected
                                platforms. Please keep the following in mind as you upload your
                                release:{`\n`}{`\n`}
                                If you
                                'd like to include lyrics with your release, please ensure they
                                have been added before submitting your release.

                            </Text>
                            <TouchableOpacity style={styles.addartistbutton} onPress={() => setshowaddlyrics(true)}>
                                <FontAwesome5 name={"plus"} color={Primarycolor()} />
                                <Text style={styles.addtext2}>ADD LYRICS TO THIS TRACK</Text>
                            </TouchableOpacity>
                            {showaddlyrics ?
                                <View>
                                    <View style={{ flexDirection: "row" }}>
                                        <TextInput
                                            placeholder="Type Lyrics here"
                                            placeholderTextColor={"gray"}
                                            multiline={true}
                                            style={{ width: "50%", color: "white" }}
                                            onChangeText={newText => setlyrics(newText)}
                                            defaultValue={lyrics}
                                        />
                                        <View style={styles.lyricsoverview}>
                                            <Text style={{ color: "white", fontWeight: "bold" }}>Overview</Text>
                                            <Text style={{ fontSize: 8, color: "gray", marginTop: 5 }}>
                                                To ensure lyrics are delivered and shown
                                                correctly on digital music services, it is
                                                important to follow the below guidelines.{`\n`}{`\n`}
                                                Lyrics must match the audio, including
                                                everything integral to the vocals. This
                                                includes but is not limited to: spoken
                                                phrases, emphases, and spoken content,
                                                where applicable.
                                            </Text>
                                            <View style={styles.hrg} />
                                            <Text style={{ color: "white", fontWeight: "bold" }}>Formatting</Text>
                                            <Text style={{ fontSize: 8, color: "gray", marginTop: 5 }}>
                                                All lyric lines should be single spaced,
                                                and double spaces should be used to
                                                separate each section break.{`\n`}{`\n`}
                                                Common section breaks are:{`\n`}
                                                {'\u2B24'} A defined chorus, verse or hook{`\n`}
                                                {'\u2B24'} Change in the artists delivery (singing
                                                to spoken word){`\n`}
                                                {'\u2B24'} Change in tempo{`\n`}
                                                {'\u2B24'} Changes in beat/rhythm{`\n`}{`\n`}
                                                The following grammatical rules should
                                                be followed:{`\n`}
                                                {'\u2B24'} Lyric lines must begin with a leading
                                                capital{`\n`}
                                                {'\u2B24'} Nouns should be capitalized{`\n`}
                                                {'\u2B24'} Yelling or Screaming should be
                                                indicated
                                                {`\n`}
                                            </Text>
                                        </View>
                                    </View>
                                    <View style={styles.hrg} />


                                </View> : null}
                            <View style={{ marginTop: 20 }}>
                                {showaddlyrics ? <TouchableOpacity style={styles.cancelbutton} onPress={() => setshowaddlyrics(false)}>
                                    <Text style={{ color: "white", fontSize: 10 }}>CANCEL</Text>
                                </TouchableOpacity> : null
                                }
                                <TouchableOpacity style={styles.savebutton} onPress={() => {
                                    onsaveandclose()
                                }}>
                                    <Text style={{ color: "white", fontSize: 10 }}>SAVE AND CLOSE</Text>
                                </TouchableOpacity>
                            </View>

                        </View>
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
                    <TouchableOpacity style={styles.nextbutton} onPress={gotonextpage}>
                        <Text style={{ color: "white" }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    cancelbutton: {
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
        position: "absolute",
        right: 5
    },
    savebutton: {
        backgroundColor: Primarycolor(),
        paddingHorizontal: 5,
        width: "40%",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    lyricsoverview: {
        width: "48%",
        marginLeft: "2%",
        backgroundColor: Viewcolor(),
        paddingVertical: 20,
        paddingHorizontal: 10
    },
    choosebtn: {
        backgroundColor: Viewcolor(),
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10
    },
    rightinput: {
        backgroundColor: Viewcolor(),
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "55%",
        color: "gray",
        fontSize: 13
    },
    leftinput: {
        backgroundColor: Viewcolor(),
        marginTop: 10,
        paddingVertical: 10,
        paddingHorizontal: 10,
        width: "40%",
        fontSize: 13,
        color: "white",
    },
    fulltextinput: {
        backgroundColor: Viewcolor(),
        color: "white",
        marginTop: 10,
        paddingVertical: 10,
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
        color: "gray",
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
        width: "80%",
        backgroundColor: Primarycolor(),
        marginTop: 10
    },
    contentview: {
        marginHorizontal: "5%",
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

export default Step5;