import React, { useState, useRef } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, StatusBar, Image, ScrollView, Dimensions, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Primarycolor } from '../Utils/color';
import { useNavigation } from '@react-navigation/native';
import { images } from './assetsurls';
import { useFonts } from 'expo-font';
import Swiper from 'react-native-swiper'
import { Getuserdetails } from '../Utils/getuserdetails';


StatusBar.setHidden(true)
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const primarycolor = Primarycolor();



const Started = () => {



    const [showthis, setshowthis] = useState(true);
    const url = images.getstartedvideo.uri;

    const [showfirst, setshowfirst] = useState(true);
    const [touchY, settouchY] = useState('');
    const [second, setsecond] = useState(true);
    const [third, setthird] = useState(false);
    const [fourth, setfourth] = useState(false);
    const [fifth, setfifth] = useState(false);

    const navigation = useNavigation();

    const image2 = require("./../../assets/images/fix.png")
    const image3 = require("./../../assets/images/png/join2.png")
    const image4 = require("./../../assets/images/test4.png")

    const image = require("./../../assets/images/png/started3.png")

    const swipeup = () => {
        if (second) {
            setsecond(false)
            setthird(true)
        }
        if (third) {
            setsecond(false)
            setthird(false)
            setfourth(true)
        }
        if (fourth) {
            setsecond(false)
            setthird(false)
            setfourth(false)
            setfifth(true)
        }
        if (fifth) {
            // setfirst(true)
            // setsecond(false)
            // setthird(false)
            // setfourth(false)
            // setfifth(false)
        }
    }

    const swipedown = () => {
      
        if (second) {
            // setfirst(true)
            // setsecond(false)

        }
        if (third) {

            setsecond(true)
            setthird(false)

        }
        if (fourth) {

            setthird(true)
            setfourth(false)

        }
        if (fifth) {
            setfourth(true)
            setfifth(false)
        }
    }


    return (
        <View style={styles.container}
            onTouchStart={e => settouchY(e.nativeEvent.pageY)}
            onTouchEnd={e => {
                if (touchY - e.nativeEvent.pageY > 20) { swipeup() }
                if (touchY - e.nativeEvent.pageY < 20) { swipedown() }

            }}
        >
            {second ? <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <View style={styles.loginContainer}>
                    {/* <Image
                        source={require("./../../assets/images/png/whitelogo1.png")}
                        style={{ height: 30, width: 30, marginLeft: "5%", marginTop: 20 }}
                    /> */}
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: "85%"
                    }}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>LET'S GET YOU</Text>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>STARTED!</Text>
                        <Text style={{ marginTop: 20, color: "white", fontSize: 10 }}>You Are One Step Away</Text>
                        <Text style={{ color: "white", fontSize: 10 }}>From Greatness</Text>
                        <Text style={{ fontWeight: "bold", marginTop: 30, color: "white", fontSize: 10 }}>LEARN MORE</Text>

                    </View>
                    <View style={{
                        position: "absolute",
                        bottom: 5,
                        width: "100%"
                    }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate("membershipplans")}
                                style={styles.loginbtn}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Membership Plans</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground> : null}

            {third ? <ImageBackground source={image3} resizeMode="cover" style={styles.image}>
                <View style={styles.loginContainer}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 50
                    }}>
                        <Text style={{ fontSize: 20, color: "white", fontFamily: 'Montserrat' }}>PLACEMENT</Text>
                        <Text style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 25
                        }}>OPPORTUNITIES </Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Montserrat', color: "white" }}>with</Text>
                        <Text style={{ fontSize: 10, marginTop: 10, color: "white" }}> Top Industry Professionals</Text>
                        <Text style={{ fontSize: 10, color: "white" }}> Develop Your Audience.</Text>
                        <Text style={{ fontSize: 10, color: "white" }}> Boost Your Profits.</Text>
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        width: "100%",
                        top: deviceHeight / 2,
                        zIndex: 2
                    }}>
                        <Text style={{
                            color: "white", fontSize: 18,
                            fontWeight: "bold",
                        }}>IT'S MORE</Text>
                        <Text style={{ fontSize: 18, fontFamily: 'Montserrat', color: "white" }}>THAN JUST MUSIC</Text>
                        <Text style={{ color: "white", fontSize: 10, marginTop: 20 }}>Get Discovered</Text>
                    </View>
                   
                    <View style={{
                        position: "absolute",
                        bottom: 5,
                        width: "100%"
                    }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate("membershipplans")}
                                style={styles.loginbtn}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Membership Plans</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground> : null}
            {fourth ? <ImageBackground source={image4} resizeMode="cover" style={styles.image}>
                <View style={styles.loginContainer}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: deviceHeight / 3.5
                    }}>
                        <Text style={{ fontSize: 18, color: "white", fontFamily: 'Montserrat' }}>YOU KEEP THE</Text>
                        <Text style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 25
                        }}>LION'S SHARE </Text>
                        <Text style={{ fontSize: 8, marginTop: 10, color: "white" }}>  What's the catch? Do I Keep 100% of my Royalties?</Text>
                        <Text style={{ fontSize: 8, color: "white" }}> We don't do "Hidden Fees" or "Add Ons"</Text>
                        <Text style={{ fontSize: 8, color: "white" }}> We don't believe in Unrealistic prices for a Genuine Service.</Text>
                        <Text style={{ fontSize: 8, color: "white" }}>With MMPG you keep 80% of your Royalties and Maintain 100% Ownership.</Text>
                        <Text style={{ fontSize: 8, color: "white" }}>  It's that Simple.</Text>

                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        width: "100%",
                        top: deviceHeight / 1.5,
                        zIndex: 2
                    }}>
                        <Text style={{ fontSize: 8, color: "white" }}>We're more than just a</Text>
                        <Text style={{ color: "white", fontSize: 8 }}>"Music Distributor"</Text>
                    </View>

                    <View style={{
                        position: "absolute",
                        bottom: 5,
                        width: "100%"
                    }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate("membershipplans")}
                                style={styles.loginbtn}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Membership Plans</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground> : null}
            {fifth ? <ImageBackground source={image2} resizeMode="cover" style={styles.image}>
                <View style={styles.loginContainer}>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        marginTop: 50
                    }}>
                        <Text style={{ fontSize: 20, color: "white", fontFamily: 'Montserrat' }}>EMPOWERING</Text>
                        <Text style={{
                            color: "white",
                            fontWeight: "bold",
                            fontSize: 25
                        }}>CREATORS LIKE YOU</Text>
                        <Text style={{ fontSize: 12, marginTop: 5, color: "white" }}>MMPG BELIEVES IN POTENTIAL</Text>
                        <Text style={{ fontSize: 12, marginTop: 5, color: "white" }}> Got What It Takes?</Text>
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        width: "100%",
                        top: deviceHeight / 2
                    }}>
                        <Text style={{ color: "white", fontSize: 10 }}>LET'S HEAR IT!</Text>
                    </View>
                    <View style={{
                        justifyContent: "center",
                        alignItems: "center",
                        position: "absolute",
                        width: "100%",
                        top: deviceHeight / 1.3
                    }}>
                        <Text style={{ color: "white", fontSize: 10 }}>Your Journey Starts Here</Text>
                    </View>
                    <View style={{
                        position: "absolute",
                        bottom: 5,
                        width: "100%"
                    }}>
                        <View style={{ justifyContent: "center", alignItems: "center" }}>
                            <TouchableOpacity onPress={() => navigation.navigate("membershipplans")}
                                style={styles.loginbtn}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Membership Plans</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground> : null}

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: deviceHeight
    },
    image: {
        flex: 1,
        height: deviceHeight
        // justifyContent: "center"
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
        backgroundColor: 'transparent',
    },
    loginContainer: {
        height: deviceHeight,
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
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    }
});

export default Started;



