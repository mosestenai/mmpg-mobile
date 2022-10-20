import React, { useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, TextInput, Alert } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { useNavigation } from "@react-navigation/native";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import { BallIndicator, PacmanIndicator } from 'react-native-indicators';
import { Sendmessageurl } from "../Utils/urls";
import axios from 'axios';
import { Getuserdetails } from "../Utils/getuserdetails";



var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const primarycolor = Primarycolor();

const Help = () => {

    const navigation = useNavigation();
    const user = Getuserdetails();
    const [message, setmessage] = useState('');
    const [loading, setloading] = useState(false);



    //Send message
    const sendmessage = () => {
        setloading(true);
        if ((!message)) {
            setloading(false)
            Alert.alert(
                "Error",
                "Enter a message to send",
                [
                    { text: "OK" }
                ]
            );
        } else {
            axios.post(Sendmessageurl, {
                message: message,
                token: user.token
            }).then(function (response) {
                setloading(false)
                if (!response.data.message) {
                    setmessage(null)
                    Alert.alert(
                        "Success",
                        "Message sent.We'll get back to  you",
                        [
                            { text: "OK" }
                        ]
                    );
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
    }



    return (
        <View style={{
            backgroundColor: "black",
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
        }}>
            <View style={{
                backgroundColor: Viewcolor(),
                width: "90%",
                paddingBottom: 50,
                borderRadius: 10,
            }}>
                <View style={{ padding: 20 }}>
                    <Text style={{
                        fontWeight: "bold",
                        color: "white"
                    }}>How can we help?</Text>
                </View>
                <View style={{ marginTop: 30 }}>
                    <Text style={{ color: "gray", fontSize: 10, marginHorizontal: 20 }}>Message</Text>
                    <TextInput
                        onChangeText={newText => setmessage(newText)}
                        multiline={true}
                        placeholder="Your question"
                       
                        maxLength={5000}
                        style={{
                            backgroundColor: "white",
                            height: 150,
                            marginHorizontal: 20,
                            textAlignVertical:"top"
                        }}
                    />
                    <View>
                        <Text style={{
                            fontSize: 10,
                            color: "gray",
                            position: "absolute",
                            right: 20
                        }}>5000 character(s) left</Text>
                    </View>

                </View>
                <View style={{ marginTop: 20, }}>
                    <View style={{
                        flexDirection: "row",
                        position: "absolute",
                        right: 20
                    }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{
                                justifyContent: "center",
                                alignItems: "center",
                                paddingVertical: 5,
                                marginHorizontal: 10
                            }}>
                            <Text style={{ color: "gray" }}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={sendmessage} style={{
                            justifyContent: "center",
                            alignItems: "center",
                            paddingVertical: 5,
                            backgroundColor: Primarycolor(),
                            paddingHorizontal: 10,
                            borderRadius: 5
                        }}>
                           {loading ? <BallIndicator color='white' size={20} /> :  <Text style={{ color: "white" }}>Send message</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.bottomCenter}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <FontAwesome5 name="home" color={"white"} size={20} />
                </TouchableOpacity>

            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    bottomCenter: {
        backgroundColor: Secondarycolor(),
        paddingHorizontal: "5%",
        width: deviceWidth,
        borderTopLeftRadius: 5,
        height: 60,
        paddingTop: 15,
        flexDirection: "row",
        position: "absolute",
        bottom: 0
    },
});

export default Help;