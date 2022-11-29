import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, Image, Alert, Share, Linking } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Primarycolor, Secondarycolor } from "../Utils/color";
import { Feather } from "../Components/feather";
import { Fontisto } from "../Components/fontisto";
import { Ionicons } from "../Components/ioniicons";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { BallIndicator } from "react-native-indicators";
import * as Clipboard from 'expo-clipboard';
import axios from "axios";
import { deletesongurl } from "../Utils/urls";
import { Getuserdetails } from "../Utils/getuserdetails";
import * as WebBrowser from 'expo-web-browser';
import { LinearGradient } from 'expo-linear-gradient';

var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width
const Viewmusic = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [confirmpopup, setconfirmpopup] = useState(false);
    const [loading, setloading] = useState(false);
    const [result, setResult] = useState('');
    const smartlink = route.params.smartlink;
    const user = Getuserdetails();

    //handling share 
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'mmpgmusic smartlink|.' + route.params.artist + '/' + route.params.title + ' ' + smartlink,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };




    //copy link to clipboard
    const copyToClipboard = async () => {
        await Clipboard.setStringAsync(smartlink);
        alert("Link copied to clipboard")
    };

    //open link
    const openlink = async () => {
        let result = await WebBrowser.openBrowserAsync(smartlink);
        setResult(result);
        // Linking.openURL(smartlink)
    }

    const requesttakedown = () => {
        setconfirmpopup(false)
        setloading(true)
        axios.post(deletesongurl, {
            token: user.token,
            id: route.params.id
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                Alert.alert(
                    "Success",
                    response.data.success,
                    [
                        { text: "OK" }
                    ]
                );
                navigation.navigate("Home")
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
                            <Text style={{ fontWeight: "bold", color: Primarycolor() }}>Are you sure you want to take down  this music? this action cannot be undone</Text>
                            <View style={{ marginTop: 10, flexDirection: "row" }}>
                                <TouchableOpacity onPress={() => setconfirmpopup(false)} style={{
                                    backgroundColor: Primarycolor(),
                                    padding: 10,
                                    borderRadius: 5,
                                    margin: 10
                                }}>
                                    <Text style={{ color: "white" }}>Cancel</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={requesttakedown} style={{
                                    backgroundColor: Primarycolor(),
                                    padding: 10,
                                    borderRadius: 5,
                                    margin: 10
                                }}>
                                    <Text style={{ color: "white" }}>Ok,Takedown</Text>
                                </TouchableOpacity>
                            </View>
                        </View>}

                />}
            <View style={styles.fixedview}>
                <TouchableOpacity onPress={() => navigation.goBack()} 
                style={{ 
                    width: "10%",
                    position:"absolute" ,
                    top:5,
                    left:10
                    }}>
                    <FontAwesome5 name="angle-left" color={"white"} size={25} />
                </TouchableOpacity>
                <View style={{ width: "100%" }}>
                    <Text style={{ alignSelf: "center", color: "white" }}>{route.params.artist}/{route.params.title}</Text>
                </View>

            </View>
            <View style={styles.imageview}>
                <Image
                    source={{ uri: route.params.url }}
                    style={{
                        height: "100%",
                        width: deviceWidth,
                    }}
                />
            </View>
            <LinearGradient
                colors={['rgba(0,0,0,0.8)', 'transparent']}
            />
            <LinearGradient
                // Button Linear Gradient
                colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)', 'black']}
                style={{
                    position: "absolute",
                    width: deviceWidth,
                    paddingTop:290
                }}>
                <View style={styles.contentview}>
                    <TouchableOpacity>
                        <Text style={{ color: Primarycolor() }}>SMARTLINK</Text>
                    </TouchableOpacity>
                    <Text style={styles.sharemusictext}>Share your music {`\n`}with the world</Text>
                    <View style={{ flexDirection: "row", marginTop: 25 }}>
                        <TouchableOpacity style={styles.buttonshare} onPress={onShare}>
                            <Ionicons name="ios-arrow-redo-outline" color={"white"} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonshare} onPress={copyToClipboard}>
                            <Ionicons name={"copy-outline"} color={"white"} size={25} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonshare2} onPress={openlink}>
                            <Fontisto name="world-o" color={"white"} size={25} />
                        </TouchableOpacity>
                    </View>
                </View>
            </LinearGradient>



            <View style={styles.bottomCenter}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <FontAwesome5 name="home" color={"white"} size={20} />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => setconfirmpopup(true)} style={{
                    backgroundColor: "#e8005e",
                    marginLeft: "65%",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingHorizontal: 10,
                    height: 30,
                    borderRadius: 5
                }}>
                    <Text style={{ color: "white" }}>Takedown</Text>
                </TouchableOpacity>
            </View>


        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    imageview: {
        height: 320
    },
    bottomCenter: {
        backgroundColor: Secondarycolor(),
        paddingHorizontal: "5%",
        borderTopLeftRadius: 5,
        height: 60,
        paddingTop: 15,
        width:"100%",
        flexDirection: "row",
        position: "absolute",
        bottom: 0
    },
    buttonshare: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "white",
        width: "32%",
        height: 45,
        marginRight: 5
    },
    buttonshare2: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: "white",
        width: "32%",
        height: 45
    },
    sharemusictext: {
        color: "white",
        fontWeight: "bold",
        fontSize: 25
    },
    contentview: {
        marginHorizontal: "5%"
    },
    fixedview: {
        paddingHorizontal: "5%",
        paddingVertical: "5%",
        flexDirection: "row",
        position: "absolute",
        zIndex: 1
    }
})


export default Viewmusic;