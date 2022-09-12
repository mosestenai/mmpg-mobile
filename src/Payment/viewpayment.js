import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, StyleSheet, Alert, Image } from "react-native";
import { FontAwesome5 } from "../Components/fontawesome5";
import { MaterialCommunityIcons } from "../Components/materialcommunity";
import { Primarycolor, Secondarycolor, Semisecondarycolor, Viewcolor } from "../Utils/color";
import Foundation from "@expo/vector-icons/Foundation";
import { useNavigation } from "@react-navigation/native";
import { LineChart } from 'react-native-chart-kit';
import { VictoryPie } from 'victory-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import { Fetchlabeldataurl, Fetchtracksurl, Getartistsdataurl } from "../Utils/urls";
import Spinner from 'react-native-loading-spinner-overlay';
import { BallIndicator } from 'react-native-indicators';
import axios from "axios";
import { Getuserdetails } from "../Utils/getuserdetails";
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.Userdbs') // returns Database object



var deviceHeight = Dimensions.get('window').height
var deviceWidth = Dimensions.get('window').width


const Viewpayment = () => {

    const navigation = useNavigation();
    const user = Getuserdetails();
    const [songs, setsongs] = useState([]);
    const [artists, setartists] = useState([]);
    const [loading, setloading] = useState(true);
    const [labeldata, setlabeldata] = useState('');
    const [sumlocations, setsumlocations] = useState('');
    const [locations, setlocations] = useState([]);
    const [graphdata, setgraphdata] = useState([56, 56, 66, 77, 78]);
    const [screendata, setscreendata] = useState('');

    //locations
    const [australia, setaustralia] = useState('');
    const [europe, seteurope] = useState('');
    const [canada, setcanada] = useState('');
    const [uk, setuk] = useState('');
    const [us, setus] = useState('');
    const [nothing, setnothing] = useState(false);


    var currentdate = new Date();
    const year = currentdate.getFullYear();


    useEffect(() => {

        db.transaction(tx => {
            // sending 4 arguments in executeSql
            tx.executeSql('SELECT * FROM User', null, // passing sql query and parameters:null
                // success callback which sends two things Transaction object and ResultSet Object
                (txObj, { rows: { _array } }) => {
                    fetchtracks(_array[0]);
                    fetchartists(_array[0])
                    _array[0].type == 'Label' && fetchlabeldata(_array[0])

                },
                (txObj, error) => console.log('Error ', error)
            ) // end executeSQL
        }) // end transaction

    }, [])


    const fetchtracks = (e) => {

        axios.post(Fetchtracksurl, {
            token: e.token,
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                setsongs(response.data)
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

    const calculate = (val, all) => {
        var result = all.map(function (x) {
            return parseInt(x, 10);
        });
        var gh = Math.round((val / result.reduce((partialSum, a) => partialSum + a,)) * 10)
        return gh;
    }

    const fetchartists = (e) => {

        axios.post(Getartistsdataurl, {
            token: e.token,
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                setartists(response.data)
                if (e.type === 'Artist') {
                    setgraphdata(response.data[0].royaltyhistory)
                    setsumlocations(response.data[0].locationroyalty.reduce((partialSum, a) => partialSum + a,))
                    setaustralia(calculate(response.data[0].locationroyalty[0], response.data[0].locationroyalty))
                    seteurope(calculate(response.data[0].locationroyalty[1], response.data[0].locationroyalty))
                    setcanada(calculate(response.data[0].locationroyalty[2], response.data[0].locationroyalty))
                    setuk(calculate(response.data[0].locationroyalty[3], response.data[0].locationroyalty))
                    setus(calculate(response.data[0].locationroyalty[4], response.data[0].locationroyalty))
                    setscreendata(response.data[0])
                }

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
                "there was an error fetching artists",
                [
                    { text: "OK" }
                ]
            );
        });
    }

    const fetchlabeldata = (e) => {

        axios.post(Fetchlabeldataurl, {
            token: e.token,
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                setlabeldata(response.data)
                setgraphdata(response.data.royaltyhistory)
                setsumlocations(response.data.locationroyalty.reduce((partialSum, a) => partialSum + a,))
                setaustralia(calculate(response.data.locationroyalty[0], response.data.locationroyalty))
                seteurope(calculate(response.data.locationroyalty[1], response.data.locationroyalty))
                setcanada(calculate(response.data.locationroyalty[2], response.data.locationroyalty))
                setuk(calculate(response.data.locationroyalty[3], response.data.locationroyalty))
                setus(calculate(response.data.locationroyalty[4], response.data.locationroyalty))
                setscreendata(response.data)

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
                "there was an error fetching label info",
                [
                    { text: "OK" }
                ]
            );
        });
    }


    const MyBezierLineChart = () => {
        return (
            <>
                <LineChart
                    data={{
                        labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Ma', 'jun', 'jul', 'Au', 'Sep', 'Oc', 'Nov', 'De'],
                        datasets: [
                            {
                                data: graphdata
                            },
                        ],
                    }}
                    width={deviceWidth - 30} // from react-native
                    height={220}
                    // yAxisLabel={'Rs'}
                    chartConfig={{
                        backgroundColor: Primarycolor(),
                        backgroundGradientFrom: Secondarycolor(),
                        backgroundGradientTo: Secondarycolor(),
                        linejoinType: "bevel",
                        decimalPlaces: 1, // optional, defaults to 2dp
                        //color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                        color: (opacity = 255) => Primarycolor(),
                        style: {
                            borderRadius: 16,
                            borderBottomLeftRadius: 5
                        },
                    }}
                    bezier
                    style={{
                        marginVertical: 0,
                        marginHorizontal: "0%",
                        borderBottomLeftRadius: 5
                    }}

                />
            </>
        );
    };

    const locationarray = [
        { x: "Australia", y: australia },
        { x: "Europe", y: europe },
        { x: "Canada", y: canada },
        { x: "Uk", y: uk },
        { x: "USA", y: us }
    ]

    const finallocationarray = locationarray.sort(function (a, b) {
        return parseFloat(a.y) - parseFloat(b.y);
    });



    function sortByProperty(property) {
        return function (a, b) {
            if (a[property] > b[property])
                return 1;
            else if (a[property] < b[property])
                return -1;

            return 0;
        }
    }

    const shuffleartists = () => {

        const finalartistsarray = artists.sort(function (a, b) {
            return parseFloat(a.totalroyalty) - parseFloat(b.totalroyalty);
        });

        setartists(finalartistsarray.reverse());
        setnothing(!nothing);

    }

    const shuffletracks = () => {

        const finalsongsarray = songs.sort(function (a, b) {
            return parseFloat(a.totalroyalty) - parseFloat(b.totalroyalty);
        });

        setsongs(finalsongsarray.reverse());
        setnothing(!nothing);

    }



    return (
        <SafeAreaView style={{
            backgroundColor: "black",
            height: deviceHeight
        }}>
            {loading &&
                <Spinner
                    visible={true}
                    color='red'
                    size={30}
                    customIndicator={<BallIndicator color={Primarycolor()} />}

                />}
            <View style={styles.topview}>
                <Text style={{ color: "gray" }}>{year}</Text>
                <TouchableOpacity style={styles.calenderview}>
                    <MaterialCommunityIcons name="calendar" color={"gray"} size={25} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <View style={{ paddingBottom: 200 }}>

                    <View style={styles.royaltyview}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, marginBottom: 10 }}>Royalties Balance Due</Text>
                        <View style={{ flexDirection: "row" }}>
                            <FontAwesome5 name="dollar-sign" color={"white"} style={{ marginTop: 15 }} />
                            <Text style={{
                                marginLeft: 5,
                                fontSize: 25,
                                color: "white"
                            }}>{user?.type === 'Artist' ? artists[0]?.totalroyalty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : labeldata?.totalroyalty?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </View>
                        <View style={{ flexDirection: "row" }}>
                            <Foundation name="info" color={"white"} size={15} />
                            <Text style={{
                                marginLeft: 5,
                                fontSize: 10,
                                color: "gray"
                            }}>minimum payout threshold $25.</Text>
                        </View>
                        <View style={{ flexDirection: "row", marginTop: 10 }}>
                            <Text style={{
                                marginLeft: 5,
                                fontSize: 10,
                                color: "gray",
                            }}>Total Credited</Text>
                            <TouchableOpacity style={{ marginLeft: 5 }}>
                                <Text style={{ color: Primarycolor(), fontSize: 10 }}>-{screendata?.amountpaid}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.redirectbtn} onPress={() => navigation.navigate('authentication', { screen: 'paymentdetails', params: { songs: songs } })}>
                                <FontAwesome5 name="arrow-circle-right" color="white" size={15} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{ marginTop: 20, backgroundColor: Secondarycolor(), marginHorizontal: "3%", borderRadius: 10 }}>
                        <Text style={{ color: "gray", fontSize: 10, marginLeft: 10, marginTop: 10 }}>Royalty History</Text>
                        {!loading && artists[0]?.royaltyhistory && <MyBezierLineChart />}
                        <View style={{ alignSelf: "center", flexDirection: "row" }}>
                            <FontAwesome5 name="coins" color={Primarycolor()} />
                            <Text style={{ color: "gray", fontWeight: "bold", fontSize: 10, marginLeft: 5 }}>
                                Royalties
                            </Text>
                        </View>
                    </View>

                    <View style={styles.servicesview}>
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity onPress={shuffletracks} style={{ padding: 0, position: "absolute", right: 0, top: -5, paddingHorizontal: 10 }}>
                                <MaterialCommunityIcons name={"menu-open"} color="gray" size={25} />
                            </TouchableOpacity>
                            <Text style={{ color: "gray", fontWeight: "bold", fontSize: 10 }}>Top Releases</Text>
                        </View>
                        <View style={styles.line} />
                        {songs?.map((val, key) => {
                            var num = val?.totalroyalty;
                            var commas = num.toLocaleString("en-US");
                            var commas = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                            return (
                                <View style={styles.servicediv} key={key}>
                                    <View style={styles.trackimage}>
                                        <Image
                                            source={{ uri: val.url }}
                                            style={{
                                                height: 40,
                                                width: 40,
                                            }}
                                        />
                                    </View>
                                    <View style={styles.contentdiv}>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>{val.title}</Text>
                                        <Text style={{ color: "white", fontSize: 10 }}>${commas}</Text>
                                    </View>
                                    <View style={styles.line} />
                                </View>
                            )
                        })}




                    </View>


                    <View style={styles.servicesview}>
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity onPress={shuffleartists} style={{ padding: 0, position: "absolute", right: 0, top: -5, paddingHorizontal: 10 }}>
                                <MaterialCommunityIcons name={"menu-open"} color="gray" size={25} />
                            </TouchableOpacity>
                            <Text style={{ color: "gray", fontWeight: "bold", fontSize: 10 }}>Top Artists</Text>
                        </View>
                        <View style={styles.line} />
                        {artists?.map((val, key) => {

                            var num = val?.totalroyalty;
                            var commas = num.toLocaleString("en-US");
                            var commas = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

                            return (
                                <View style={styles.servicediv} key={key}>
                                    {val.profilepic_url ? <Image
                                        source={{ uri: val.profilepic_url }}
                                        style={{
                                            height: 40,
                                            width: 40,
                                            borderRadius: 40,
                                        }}
                                    /> :
                                        <View style={styles.artistimage} />}
                                    <View style={styles.contentdiv}>
                                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>{val?.name}</Text>
                                        <Text style={{ color: "white", fontSize: 10 }}>${commas}</Text>
                                    </View>
                                    <View style={styles.line} />
                                </View>
                            )
                        })}

                    </View>

                    <View style={styles.servicesview}>
                        <View style={{ marginBottom: 10 }}>
                            <TouchableOpacity onPress={() => {

                            }} style={{ padding: 0, position: "absolute", right: 0, top: -5 }}>
                                <MaterialCommunityIcons name={"menu-open"} color="gray" size={25} />
                            </TouchableOpacity>
                            <Text style={{ color: "gray", fontWeight: "bold", fontSize: 10 }}>Top Digital Services</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.servicediv}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>Spotify</Text>
                            <Text style={styles.digitalmoney}> ${user.type === 'Artist' ? artists[0]?.spotifyroyalty.reduce((partialSum, a) => partialSum + a, 0) : labeldata?.spotifyroyalty?.reduce((partialSum, a) => partialSum + a, 0)}</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.servicediv}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>Apple music</Text>
                            <Text style={styles.digitalmoney}>${user.type === 'Artist' ? artists[0]?.appleroyalty.reduce((partialSum, a) => partialSum + a, 0) : labeldata?.appleroyalty?.reduce((partialSum, a) => partialSum + a, 0)}</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.servicediv}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>YouTube</Text>
                            <Text style={styles.digitalmoney}>${user.type === 'Artist' ? artists[0]?.youtuberoyalty.reduce((partialSum, a) => partialSum + a, 0) : labeldata?.youtuberoyalty?.reduce((partialSum, a) => partialSum + a, 0)}</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.servicediv}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>Facebook(Video)</Text>
                            <Text style={styles.digitalmoney}>${user.type === 'Artist' ? artists[0]?.facebookroyalty.reduce((partialSum, a) => partialSum + a, 0) : labeldata?.facebookroyalty?.reduce((partialSum, a) => partialSum + a, 0)}</Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.servicediv}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>Amazon Music</Text>
                            <Text style={styles.digitalmoney}>${user.type === 'Artist' ? artists[0]?.amazonroyalty?.reduce((partialSum, a) => partialSum + a, 0) : labeldata?.amazonroyalty?.reduce((partialSum, a) => partialSum + a, 0)}</Text>
                        </View>

                    </View>

                    <View style={{ backgroundColor: Secondarycolor(), borderRadius: 10, marginHorizontal: "3%", marginTop: 20 }}>
                        <TouchableOpacity style={{ padding: 0, position: "absolute", right: 10 }}>
                            <MaterialCommunityIcons name={"menu-open"} color="gray" size={25} />
                        </TouchableOpacity>
                        <Text style={{ color: "gray", fontSize: 10, marginLeft: 10, marginTop: 10, marginBottom: 10 }}>Top Locations</Text>
                        <View style={styles.line} />

                        <View style={{ flexDirection: "row", }}>
                            <VictoryPie
                                padAngle={({ datum }) => datum.y}
                                innerRadius={25}
                                colorScale={["#000062", "#d81665", "#d81665", "#a2006e", "#ff5757"]}
                                data={finallocationarray}
                                height={200}
                                width={200}
                                style={{
                                    labels: {
                                        fill: "silver",
                                        fontSize: 8
                                    }

                                }}
                            />
                            <View>
                                <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}></Text>
                                <View style={{
                                    flexDirection: "row",
                                    marginTop: 10
                                }}><TouchableOpacity style={{
                                    height: 15,
                                    width: 15,
                                    backgroundColor: "#ff5757",
                                    borderRadius: 15,
                                    marginRight: 5,
                                    marginTop: 3
                                }} /><Text style={{ color: "gray" }}>High</Text></View>
                                <View style={{
                                    flexDirection: "row",
                                    marginTop: 2
                                }}><TouchableOpacity style={{
                                    height: 15,
                                    width: 15,
                                    backgroundColor: "#a2006e",
                                    borderRadius: 15,
                                    marginRight: 5,
                                    marginTop: 3
                                }} /><Text style={{ color: "gray" }}>Medium</Text></View>
                                <View style={{
                                    flexDirection: "row",
                                    marginTop: 2
                                }}><TouchableOpacity style={{
                                    height: 15,
                                    width: 15,
                                    backgroundColor: "#080960",
                                    borderRadius: 15,
                                    marginRight: 5,
                                    marginTop: 3
                                }} /><Text style={{ color: "gray" }}>Low</Text></View>

                            </View>
                        </View>


                    </View>


                </View>

            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    digitalmoney: {
        padding: 0,
        position: "absolute",
        right: 0,
        color: "white",
        fontSize: 10
    },
    contentdiv: {
        marginLeft: 20
    },
    trackimage: {
        height: 40,
        width: 40,
        backgroundColor: Semisecondarycolor()
    },
    artistimage: {
        height: 40,
        width: 40,
        borderRadius: 40,
        backgroundColor: Semisecondarycolor()
    },
    servicediv: {
        marginVertical: 10,
        flexDirection: "row"
    },
    line: {
        height: 1,
        backgroundColor: Semisecondarycolor(),
    },
    servicesview: {
        backgroundColor: Secondarycolor(),
        marginHorizontal: "5%",
        paddingHorizontal: 20,
        marginTop: 40,
        borderRadius: 5,
        paddingVertical: 10
    },
    redirectbtn: {
        position: "absolute",
        right: 3
    },
    royaltyview: {
        backgroundColor: Secondarycolor(),
        marginHorizontal: "5%",
        paddingHorizontal: 20,
        marginTop: 40,
        borderRadius: 5,
        paddingVertical: 10
    },
    calenderview: {
        position: "absolute",
        right: 10
    },
    topview: {
        position: "relative",
        paddingHorizontal: "5%",
        paddingVertical: "5%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Viewcolor()
    }
})
export default Viewpayment;