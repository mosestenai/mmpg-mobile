import React, { useState, useRef } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, StatusBar, Image, ScrollView, Dimensions, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import { Primarycolor } from '../Utils/color';
import { useNavigation } from '@react-navigation/native';
import { images } from './assetsurls';
import { useFonts } from 'expo-font';


StatusBar.setHidden(true)
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const primarycolor = Primarycolor();



const Started = () => {

   

    const scrollViewRef = useRef();
    const [showmembershipbutton, setshowmembershipbutton] = useState(false);
    const [showthis, setshowthis] = useState(true);
    const url = images.getstartedvideo.uri;

    const navigation = useNavigation();

    const image = require("./../../assets/images/Join.png")

    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <ScrollView ref={scrollViewRef}>
                    <View style={styles.loginContainer}>
                        <Image
                            source={require("./../../assets/images/icon.png")}
                            style={{ height: 30, width: 30, marginLeft: "5%", marginTop: 20 }}
                        />
                        <View style={{
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "50%"
                        }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>LET'S GET YOU</Text>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>STARTED!</Text>
                            <Text style={{ marginTop: 20, color: "white", fontSize: 10 }}>You Are One Step Away</Text>
                            <Text style={{ color: "white", fontSize: 10 }}>From Greatness</Text>
                            <Text style={{ fontWeight: "bold", marginTop: deviceHeight / 5, color: "white", fontSize: 10 }}>LEARN MORE</Text>

                        </View>
                        <View style={styles.bottomCenter}>
                            <View style={{ justifyContent: "center", alignItems: "center" }}>
                                {showmembershipbutton ?
                                    <TouchableOpacity onPress={() => navigation.navigate("membershipplans")}
                                        style={styles.loginbtn}>
                                        <Text style={{ color: "white", fontWeight: "bold" }}>Membership Plans</Text>
                                    </TouchableOpacity> :
                                    <TouchableOpacity onPress={() => setshowmembershipbutton(true)}>
                                        <Image
                                            source={require("./../../assets/images/icon.png")}
                                            style={{ height: 30, width: 30, marginTop: 20 }}
                                        />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        flex: 1,
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



