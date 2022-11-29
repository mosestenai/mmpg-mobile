import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Image, TextInput, Alert } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome5';
import { Primarycolor, Secondarycolor } from "../Utils/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "../Components/fontawesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Fetchtracksurl } from "../Utils/urls";
import axios from "axios";
import Spinner from "react-native-loading-spinner-overlay/lib";
import { BallIndicator } from "react-native-indicators";
import { UserProps } from "victory-core";
import * as SQLite from 'expo-sqlite';
import { Getuserdetails } from "../Utils/getuserdetails";


const db = SQLite.openDatabase('db.Userdbs') // returns Database object



var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get('window').width;

const Searchsong = () => {

    const navigation = useNavigation();
    const user = Getuserdetails();
    const route = useRoute();
    const [data, setdata] = useState(route.params.data);
    const [hint, sethint] = useState('');
    const [songs, setsongs] = useState([]);
    const [loading, setloading] = useState(true);


    useEffect(() => {
        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    fetchtracks(_array[0].token);
                },
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction

    }, []);


    const fetchtracks = (e) => {
        axios.post(Fetchtracksurl, {
            artist: route.params.data.name,
            token: e
        }).then(function (response) {
            if (!response.data.message) {
                setsongs(response.data)
                setloading(false)
            } else {
                setloading(false)
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


    const search = () => {
        setloading(true)
        axios.post(Fetchtracksurl, {
            token: user.token,
            hint: hint
        }).then(function (response) {
            if (!response.data.message) {
                setsongs(response.data)
                setloading(false)
            } else {
                setloading(false)
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
        <SafeAreaView style={{ height: deviceHeight, backgroundColor: "black" }}>
            {loading &&
                <Spinner
                    visible={true}
                    color='red'
                    size={30}
                    customIndicator={<BallIndicator color={Primarycolor()} />}

                />}
            <View>
                <View style={styles.headerdiv}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 5 }}>
                        <Icon name="angle-left" color="white" size={25} />
                    </TouchableOpacity>
                    <TextInput
                        style={{
                            height: 40,
                            marginLeft: 20,
                            marginTop: -5,
                            color: "white",
                            width: "80%",
                            justifyContent: "center",
                            alignItems: "center"
                        }}
                        placeholder="Artists/Tracks"
                        onChangeText={newText => sethint(newText)}
                        onSubmitEditing={search}
                        defaultValue={hint}
                        placeholderTextColor="gray"

                    />
                    <TouchableOpacity
                        onPress={search}
                        style={{
                            position: "absolute",
                            padding: 10,
                            right: "1%"
                        }}>
                        <Icon name="search" color={"gray"} size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            
            <ScrollView>
                <View style={styles.songscontainer}>
                    {songs?.map((val, key) => {

                        return (
                            <View key={key} style={styles.songview}>
                                <Image
                                    source={{ uri: val.url }}
                                    style={{
                                        height: 50,
                                        width: 50,
                                    }}
                                />

                                <View style={{ marginLeft: 10, width: "70%" }}>
                                    <Text style={{ color: "gray" }}>{val.title}/ {val.artist}</Text>
                                    <View style={{ flexDirection: "row" }}>
                                        <Icon name="headphones-alt" color="gray" style={{ marginTop: 5 }} />
                                        <Text style={{ color: "gray", marginLeft: 5 }}>{val.totalstreams?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity style={{ 
                                    marginTop: 10,
                                    position:"absolute",
                                    right:20
                                 }} onPress={() => navigation.navigate("Viewsong", {
                                    data: val
                                })}>
                                    <Icon name="angle-right" color="white" size={20} />
                                </TouchableOpacity>
                            </View>
                        )
                    })}

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    songimage: {
        height: 50,
        width: 50,
        backgroundColor: Secondarycolor(),
        margin: 3,
        justifyContent: "center",
        alignItems: "center"
    },
    songview: {
        backgroundColor: "black",
        flexDirection: "row",
        borderRadius: 5,
        marginBottom: 10
    },
    songscontainer: {
        marginTop: 20,
        backgroundColor: Secondarycolor(),
        padding: 10,
        marginHorizontal: "3%",
        borderRadius: 5
    },
    headerdiv: {
        paddingTop: 10,
        paddingHorizontal: "5%",
        flexDirection: "row",
        backgroundColor: Secondarycolor(),
        paddingBottom: 10
    }
})

export default Searchsong;
