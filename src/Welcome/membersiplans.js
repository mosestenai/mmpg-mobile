import React, { useState, useRef } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, StatusBar, Image, ScrollView, Dimensions, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import Icon from '@expo/vector-icons/FontAwesome';
import { Primarycolor } from '../Utils/color';
import { BallIndicator, PacmanIndicator } from 'react-native-indicators';
import { images } from './assetsurls';
import {sendEmail} from './sendmail';
import { useNavigation } from '@react-navigation/native';


StatusBar.setHidden(true)
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const primarycolor = Primarycolor();



const Membershipplans = () => {

    const url = images.getstartedvideo.uri;
    const navigation = useNavigation();

    const scrollViewRef = useRef();
    const viewref = useRef();
    const [showmembershipbutton, setshowmembershipbutton] = useState(false);


    const image = require('./../../assets/images/member.png')

    //send email for bespoke plan
    const send = () => {
        
            sendEmail(
                'admin@mmpg.com',
                'Bespoke plan request',
                'Requesting to get bespoke plan ',
                { cc: 'admin@mmpg.com; info@mmpg.com;' }
            ).then(() => {
                console.log('Your message was successfully sent!');
            });
        

    }


    return (
        <View style={styles.container}>
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <ScrollView ref={scrollViewRef}
                    onContentSizeChange={() => scrollViewRef.current.scrollTo({ x: 2, y: 2, animated: true })}
                    horizontal={true}>
                    <View style={styles.loginContainer}>
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
                                    <TouchableOpacity 
                                    onPress={()=>navigation.replace("default")}
                                    style={{
                                        backgroundColor: Primarycolor(),
                                        alignSelf: "flex-end",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "40%",
                                        paddingVertical: 10,
                                        borderRadius: 5
                                    }}>
                                        <Text style={{ color: "white", fontWeight: "bold" }}>
                                            Continue
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.bottomCenter}>
                            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                <Icon name='dot-circle-o' color={"white"} style={{ marginRight: 5 }} />
                                <Icon name='dot-circle-o' color={"gray"} style={{ marginRight: 5 }} />
                                <Icon name='dot-circle-o' color={"gray"} style={{ marginRight: 0 }} />
                            </View>

                            <View style={{ flexDirection: "row", marginTop: 7, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "gray", fontSize: 7 }}>By creating an account i agree to the </Text>
                                <TouchableOpacity><Text style={{ color: "white", fontSize: 7 }}>Terms & Conditions </Text></TouchableOpacity>
                                <Text style={{ color: "gray", fontSize: 7 }}>and</Text>
                                <TouchableOpacity><Text style={{ color: "white", fontSize: 7 }}> Privacy Policy </Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.loginContainer}>
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
                                    <TouchableOpacity style={{
                                        backgroundColor: Primarycolor(),
                                        alignSelf: "flex-end",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        width: "40%",
                                        paddingVertical: 10,
                                        borderRadius: 5
                                    }}>
                                        <Text style={{ color: "white", fontWeight: "bold" }}>
                                            Continue
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.bottomCenter}>
                            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                <Icon name='dot-circle-o' color={"gray"} style={{ marginRight: 5 }} />
                                <Icon name='dot-circle-o' color={"white"} style={{ marginRight: 5 }} />
                                <Icon name='dot-circle-o' color={"gray"} style={{ marginRight: 0 }} />
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 7, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "gray", fontSize: 7 }}>By creating an account i agree to the </Text>
                                <TouchableOpacity><Text style={{ color: "white", fontSize: 7 }}>Terms & Conditions </Text></TouchableOpacity>
                                <Text style={{ color: "gray", fontSize: 7 }}>and</Text>
                                <TouchableOpacity><Text style={{ color: "white", fontSize: 7 }}> Privacy Policy </Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.loginContainer}>
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
                                <TouchableOpacity 
                                onPress={send}
                                style={{
                                    justifyContent: "center",
                                    marginTop: 70,
                                    alignItems: "center",
                                    borderWidth: 1,
                                    borderColor: "gray",
                                    borderRadius: 5,
                                    paddingHorizontal: 10,
                                    paddingVertical: 5
                                }}>
                                    <Text style={{ color: "white" }}>
                                        Contact Us
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.bottomCenter}>
                            <View style={{ justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
                                <Icon name='dot-circle-o' color={"gray"} style={{ marginRight: 5 }} />
                                <Icon name='dot-circle-o' color={"gray"} style={{ marginRight: 5 }} />
                                <Icon name='dot-circle-o' color={"white"} style={{ marginRight: 0 }} />
                            </View>
                            <View style={{ flexDirection: "row", marginTop: 7, justifyContent: "center", alignItems: "center" }}>
                                <Text style={{ color: "gray", fontSize: 7 }}>By creating an account i agree to the </Text>
                                <TouchableOpacity><Text style={{ color: "white", fontSize: 7 }}>Terms & Conditions </Text></TouchableOpacity>
                                <Text style={{ color: "gray", fontSize: 7 }}>and</Text>
                                <TouchableOpacity><Text style={{ color: "white", fontSize: 7 }}> Privacy Policy </Text></TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({

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
        backgroundColor: 'transparent',
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
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 30
    }
});

export default Membershipplans;