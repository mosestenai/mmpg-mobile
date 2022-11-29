import React, { useState } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, StatusBar, Image, ScrollView, Dimensions, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import Icon from '@expo/vector-icons/FontAwesome5';
import { Primarycolor } from './../Utils/color';
import { useNavigation } from '@react-navigation/native';
import { BallIndicator, PacmanIndicator } from 'react-native-indicators';
import { Loginuserurl } from '../Utils/urls';
import axios from "axios";
import * as SQLite from 'expo-sqlite';


const db = SQLite.openDatabase('db.Userdbs') // returns Database object

StatusBar.setHidden(true)
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const primarycolor = Primarycolor();

export default function Loginscreen() {

    const navigation = useNavigation();

    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [spinner, setspinner] = useState(false);
    const [error, seterror] = useState('');
    const [success, setsuccess] = useState('');
    const [display, setdisplay] = useState(false);

    const [passstatus, setpassstatus] = useState(true);
    const [passiconname, setpassiconname] = useState('eye-slash');

    const image = require('./../../assets/images/png/login.png')

    //login with data from api
    const handleLogin = () => {

        setspinner(true);
        if ((!email) | (!password)) {
            setspinner(false)
            seterror("Fill all fields")
        } else {
            seterror(null)
            axios.post(Loginuserurl, {
                email: email,
                password: password
            }).then(function (response) {
                setspinner(false)
                if (!response.data.message) {
                    const gh = Insertrecord(response.data.email, response.data.username, response.data.id, response.data.url, response.data.token, response.data.type);
                    if (gh === true) {
                        setsuccess("Login successful")
                        checktype(response.data.email)
                    } else {
                        seterror("There was an app error contact admin")
                        setspinner(false)
                    }

                } else {
                    seterror(response.data.message)
                }
                // 
            }).catch(function (error) {
                setspinner(false)
                seterror("Sorry an error occurred,try again later");
                //if(error.response.status === 401 || error.response.status === 400){}

            });
        }
    }


    const checktype = () => {
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    if (_array[0]?.type == 'Pending') {
                        navigation.navigate("started")
                        setspinner(false)
                    } else {
                        navigation.navigate("default")
                        setspinner(false)
                    }
                },
                // failure callback which sends two things Transaction object and Error
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction
    }


    //check and insert record to be used by biometrics
    const Insertrecord = (email, username, id, url, token, type) => {
        db.transaction(tx => {

            tx.executeSql('INSERT INTO User (email,username,unid,url,token,type) values (?,?,?,?,?,?)', [email, username, id, url, token, type],
                (txObj, resultSet) => { },
                (txObj, error) => {
                    Alert.alert(
                        "Error",
                        error + 'Contact admin',
                        [
                            { text: "OK" }
                        ]
                    );
                })
        }) // end transaction

        return (true);
    }

    const image2 = require('./../../assets/images/png/login.png')



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
                                    autoCapitalize='none'
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
                            {success ? <Text style={{ fontSize: 10, color: "green" }}>{success}</Text> : null}
                            {error ? <Text style={{ fontSize: 10, color: "red" }}>{error}</Text> : null}
                            <TouchableOpacity style={styles.loginbtn} onPress={handleLogin}>
                                {spinner ? <BallIndicator color='white' size={20} /> : <Text style={{ color: "white", fontWeight: "bold" }}>Sign In</Text>}
                            </TouchableOpacity>
                           
                        </View>


                    </View>
                </ScrollView>
            </ImageBackground>
        </View >
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
       position:"absolute",
       bottom:15,
       width:"95%",
       marginHorizontal:"5%",
    },
   
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

});

