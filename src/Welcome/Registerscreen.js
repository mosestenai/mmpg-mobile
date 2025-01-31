import React, { useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, StatusBar, Image, ScrollView, Dimensions, TouchableOpacity, TextInput, ImageBackground, Alert } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import Icon from '@expo/vector-icons/FontAwesome5';
import { Primarycolor } from './../Utils/color';
import { BallIndicator, PacmanIndicator } from 'react-native-indicators';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Registeruserurl } from '../Utils/urls';
import axios from 'axios';
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.Userdbs') // returns Database object



StatusBar.setHidden(true)
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const primarycolor = Primarycolor();

const Registerscreen = () => {
    const route = useRoute();
    // const urls = route.params.url;
    // const url = './../../assets/videos/Welcome.mp4';


    const navigation = useNavigation();
    const [email, setemail] = useState('');
    const [cemail, setcemail] = useState('');
    const [password, setpassword] = useState('');
    const [username, setusername] = useState('');
    const [Loading, setLoading] = useState(false);
    const [isSelected, setSelection] = useState(false);
    const [success, setsuccess] = useState('');
    const [error, setError] = useState('');

    const [passstatus, setpassstatus] = useState(true);
    const [passiconname, setpassiconname] = useState('eye-slash');

    const image = require('./../../assets/images/png/register.png')



    //Students Register
    const Register = () => {
        setLoading(true)
        setError(null)

        const valemail = email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

        if (!username | !email | !password) {
            setLoading(false)
            setError("Fill all fields")
        }
        else if (cemail !== email) {
            setLoading(false)
            setError("Email addresses do not match")
        }
        else if (!valemail) {
            setLoading(false)
            setError("Invalid email address")
        }
        else {
            setError(null)
            axios.post(Registeruserurl, {
                username: username,
                email: email,
                password: password,
            }).then(function (response) {
                setLoading(false)
                if (!response.data.message) {
                    if (!response.data.success) {
                        setError("internal error.contact admin")
                    } else {
                        db.transaction(tx => {
                            // sending 4 arguments in executeSql
                            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                                // success callback which sends two things Transaction object and ResultSet Object
                                (txObj, { rows: { _array } }) => {
                                    if (!_array[0]?.email) {
                                        db.transaction(tx => {
                                            tx.executeSql('INSERT INTO User (email,username,unid,url,token) values (?,?,?,?,?)', [response.data.email, response.data.username, response.data.id, response.data.url, response.data.token],
                                                (txObj, resultSet) => {
                                                    if (resultSet.rowsAffected > 0) {
                                                        setsuccess("Registration successful")
                                                        navigation.navigate("started")

                                                    } else {
                                                        Alert.alert(
                                                            "Error",
                                                            'Contact admin',
                                                            [
                                                                { text: "OK" }
                                                            ]
                                                        );
                                                    }
                                                },
                                                (txObj, error) => {
                                                    Alert.alert(
                                                        "Error",
                                                        error + 'Contact admin',
                                                        [
                                                            { text: "OK" }
                                                        ]
                                                    );
                                                })
                                        })
                                    } else {
                                        Alert.alert(
                                            "Error",
                                            'Device already registered',
                                            [
                                                { text: "OK" }
                                            ]
                                        );
                                    }
                                },

                                // failure callback which sends two things Transaction object and Error
                                (txObj, error) => console.log('Error ', error)

                            ) // end executeSQL
                        }) // end transaction
                    }
                } else {
                    setError(response.data.message)
                }
                // 
            }).catch(function (error) {
                setLoading(false)
                setError("Sorry an error occurred,try again later");
                //if(error.response.status === 401 || error.response.status === 400){}

            });
        }
    }


    return (
        <View style={styles.container}>
            {/* <Video
                source={urls}
                style={styles.backgroundVideo}
                rate={1}
                shouldPlay={true}
                isLooping={true}
                volume={1}
                muted={true}
                resizeMode="cover"
            />

            <KeyboardAvoidingView behavior='padding' style={styles.container}> */}
            <ImageBackground source={image} resizeMode="cover" style={styles.image}>
                <ScrollView>
                    <View style={{ height: deviceHeight, marginTop: 5 }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginLeft: "5%" }}>
                            <Icon name="angle-left" color="white" size={25} />
                        </TouchableOpacity>
                        <View style={styles.loginContainer}>
                            <Text style={{ fontWeight: "bold", color: "white" }}>Create Account</Text>
                            <View style={styles.inputviews}>
                                <Icon name="user" color="gray" size={20} style={{ marginTop: 10, }} />
                                <TextInput
                                    style={{
                                        height: 40,
                                        marginLeft: 20,
                                        color: "white"
                                    }}
                                    placeholder="Full Name"
                                    onChangeText={newText => setusername(newText)}
                                    defaultValue={username}
                                    placeholderTextColor="gray"

                                />
                            </View>
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
                                    autoCapitalize='none'

                                />
                            </View>
                            <View style={styles.inputviews}>
                                <Icon name="envelope" color="gray" size={20} style={{ marginTop: 10, }} />
                                <TextInput
                                    style={{
                                        height: 40,
                                        marginLeft: 20,
                                        color: "white"
                                    }}
                                    placeholder="Confirm Email"
                                    onChangeText={newText => setcemail(newText)}
                                    defaultValue={cemail}
                                    placeholderTextColor="gray"
                                    autoCapitalize='none'


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
                            {success ? <Text style={{ fontSize: 10, color: "green" }}>{success}</Text> : null}
                            {error ? <Text style={{ fontSize: 10, color: "red" }}>{error}</Text> : null}
                            <TouchableOpacity
                                onPress={Register}
                                style={styles.loginbtn}>
                                {Loading ? <BallIndicator color='white' size={20} /> : <Text style={{ color: "white", fontWeight: "bold" }}>Create account</Text>}

                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </ImageBackground>
            {/* </KeyboardAvoidingView> */}
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
        height: 40,
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
        position: "absolute",
        bottom: 10,
        width: "95%",
        marginHorizontal: "5%",
    },
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

});

export default Registerscreen;
