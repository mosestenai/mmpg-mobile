import React, { useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, StatusBar, Image, ScrollView, Dimensions, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import Icon from '@expo/vector-icons/FontAwesome5';
import { Primarycolor } from './../Utils/color';
import { useNavigation } from '@react-navigation/native';
import { BallIndicator, PacmanIndicator } from 'react-native-indicators';

StatusBar.setHidden(true)
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const primarycolor = Primarycolor();

export default function Loginscreen() {

    const navigation = useNavigation();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');

    const [passstatus, setpassstatus] = useState(true);
    const [passiconname, setpassiconname] = useState('eye-slash');

    const image = require('./../../assets/test.png')


    return (
        <View style={styles.container}>

            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <ScrollView>
                    <View style={{ height: deviceHeight, marginTop: 5 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}
                            style={{ marginLeft: "5%" }}>
                            <Icon name="angle-left" color="white" size={25} />
                        </TouchableOpacity>
                        <View style={styles.loginContainer}>
                            <Text style={{ fontWeight: "bold", color: "white" }}>Sign in</Text>
                            <View style={styles.inputviews}>
                                <Icon name="envelope" color="gray" size={20} style={{ marginTop: 10, }} />
                                <TextInput
                                    style={{
                                        height: 40,
                                        marginLeft: 20,
                                        color: "white"
                                    }}
                                    placeholder="Email"
                                    onChangeText={newText => setemail(newText)}
                                    defaultValue={email}
                                    placeholderTextColor="gray"

                                />
                            </View>
                            <View style={styles.inputviews}>
                                <Icon name="lock" color="gray" size={20} style={{ marginTop: 10, }} />
                                <TextInput
                                    style={{
                                        height: 40,
                                        marginLeft: 20,
                                        width: "77%",
                                        color: "white"
                                    }}
                                    placeholder="Password"
                                    onChangeText={newText => setpassword(newText)}
                                    defaultValue={password}
                                    secureTextEntry={passstatus}
                                    placeholderTextColor="gray"
                                />
                                <TouchableOpacity onPress={() => {
                                    passiconname == "eye" ? setpassiconname("eye-slash") : setpassiconname("eye")
                                    passstatus ? setpassstatus(false) : setpassstatus(true)

                                }}>
                                    <Icon name={passiconname} style={{ color: "gray", marginTop: 10 }} size={20} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate("resetpassword")}
                                style={{ alignSelf: "flex-end", marginRight: "5%" }}>
                                <Text style={{ color: Primarycolor() }}>Forgot password</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.loginbtn}>
                                <Text style={{ color: "white", fontWeight: "bold" }}>Sign In</Text>
                            </TouchableOpacity>
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
    loginContainer: {
        marginTop: deviceHeight / 2,
        paddingLeft: 20,
        backgroundColor: "black",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingTop: 30
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

});
