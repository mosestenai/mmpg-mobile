import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, SafeAreaView, TouchableOpacity, Dimensions, StyleSheet, Alert, Image, RefreshControl } from "react-native";
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
    const [sumlocations, setsumlocations] = useState([56, 56, 66, 77, 78]);
    const [locations, setlocations] = useState([]);
    const [graphdata, setgraphdata] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    const [screendata, setscreendata] = useState('');
    const [defaultid, setdefaultid] = useState(12);
    const [defaultsort, setdefaultsort] = useState({
        month: "All",
        id: 12
    });

    //locations
    const [australia, setaustralia] = useState('');
    const [europe, seteurope] = useState('');
    const [canada, setcanada] = useState('');
    const [uk, setuk] = useState('');
    const [us, setus] = useState('');
    const [nothing, setnothing] = useState(false);
    const [refreshing, setRefreshing] = useState(false);
    const [showcalender, setshowcalender] = useState(false);


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

    // console.log(graphdata)

    // const calculate = (val, all) => {
    //     var result = all.map(function (x) {
    //         return parseInt(x, 10);
    //     });
    //     var gh = (val / result.reduce((partialSum, a) => partialSum + a,)) * 10
    //     return gh;
    // }

    const fetchartists = (e) => {
        axios.post(Getartistsdataurl, {
            token: e.token,
        }).then(function (response) {
            setloading(false)
            if (!response.data.message) {
                setartists(response.data)
                if (e.type === 'Artist') {
                    // var result = response.data[0].locationroyalty.map(function (x) {
                    //     return parseInt(x, 10);
                    // });
                    // var gh = result.reduce((partialSum, a) => partialSum + a,);
                    setsumlocations(response.data[0].locationroyalty)
                    setgraphdata(response.data[0].royaltyhistory)
                    setaustralia(response.data[0].locationroyalty[0])
                    seteurope(response.data[0].locationroyalty[1])
                    setcanada(response.data[0].locationroyalty[2])
                    setuk(response.data[0].locationroyalty[3])
                    setus(response.data[0].locationroyalty[4])
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
                // var result = response.data.locationroyalty.map(function (x) {
                //     return parseInt(x, 10);
                // });
                // var gh = result.reduce((partialSum, a) => partialSum + a,);
                setsumlocations(response.data.locationroyalty)
                setlabeldata(response.data)
                setgraphdata(response.data.royaltyhistory)
                setaustralia(response.data.locationroyalty[0])
                seteurope(response.data.locationroyalty[1])
                setcanada(response.data.locationroyalty[2])
                setuk(response.data.locationroyalty[3])
                setus(response.data.locationroyalty[4])
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
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'jun', 'jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                data: graphdata
                            },
                        ],
                    }}
                    width={deviceWidth - 30} // from react-native
                    height={220}
                    verticalLabelRotation={-60}
                    withInnerLines={true}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    withDots={false}
                    withOuterLines={false}


                    // yAxisLabel={'Rs'}
                    chartConfig={{
                        backgroundColor: Primarycolor(),
                        backgroundGradientFrom: Secondarycolor(),
                        backgroundGradientTo: Secondarycolor(),
                        // linejoinType: "bevel",
                        decimalPlaces: 0, // optional, defaults to 2dp
                        //color: (opacity = 255) => `rgba(0, 0, 0, ${opacity})`,
                        color: (opacity = 255) => Primarycolor(),
                        labelColor: (opacity = 255) => "white",
                        style: {
                            borderRadius: 16,
                            borderBottomLeftRadius: 5,
                        },
                        propsForBackgroundLines: {
                            stroke: "white",
                        },
                        linejoinType: "bevel",




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

    //  //calculate percentage
    //  const calculate2 = (val) => {
    //     var gh = Math.round((val / sumlocations) * 100)
    //     return gh;
    // }

    // const locationarray = [
    //     { x: `Australia(${calculate2(australia)}%)`, y: australia },
    //     { x: `Europe(${calculate2(europe)}%)`, y: europe},
    //     { x: `Canada(${calculate2(canada)}%)`, y:canada},
    //     { x: `Uk(${calculate2(uk)}%)`, y: uk },
    //     { x: `USA(${calculate2(us)}%)`, y: us }
    // ]

    // const finallocationarray = locationarray.sort(function (a, b) {
    //     return parseFloat(a.y) - parseFloat(b.y);
    // });


    //calculate whole value to be under 10
    const calculate = (val, all) => {
        var result = all?.map(function (x) {
            return parseInt(x, 10);
        });

        var gh = (val / result?.reduce((partialSum, a) => partialSum + a,)) * 10
        return gh;
    }

    //calculate percentage
    const calculate2 = (val, all) => {
        var result = all?.map(function (x) {
            return parseInt(x, 10);
        });

        var gh = Math.round((val / result?.reduce((partialSum, a) => partialSum + a,)) * 100)
        return gh;
    }

    const locationarray = [
        { x: `Australia(${calculate2(australia, sumlocations)}%)`, y: calculate(australia, sumlocations) },
        { x: `Europe(${calculate2(europe, sumlocations)}%)`, y: calculate(europe, sumlocations) },
        { x: `Canada(${calculate2(canada, sumlocations)}%)`, y: calculate(canada, sumlocations) },
        { x: `Uk(${calculate2(uk, sumlocations)}%)`, y: calculate(uk, sumlocations) },
        { x: `USA(${calculate2(us, sumlocations)}%)`, y: calculate(us, sumlocations) }
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

    const onrefresh = () => {
        fetchtracks(user);
        fetchartists(user)
        user.type == 'Label' && fetchlabeldata(user)
    }

    const months = [
        {
            month: "jan",
            id: 0
        },
        {
            month: "feb",
            id: 1
        },
        {
            month: "mar",
            id: 2
        },
        {
            month: "apr",
            id: 3
        },
        {
            month: "may",
            id: 4
        },
        {
            month: "jun",
            id: 5
        },
        {
            month: "july",
            id: 6
        },
        {
            month: "Aug",
            id: 7
        },
        {
            month: "sep",
            id: 8
        },
        {
            month: "oct",
            id: 9
        },
        {
            month: "nov",
            id: 10
        },
        {
            month: "dec",
            id: 11
        },
        {
            month: "All",
            id: 12
        },
    ]



    return (
        <SafeAreaView style={{
            backgroundColor: "black",
            height: deviceHeight
        }}>
            {showcalender ? <Spinner
                visible={true}
                color='red'
                size={70}
                customIndicator={
                    <View style={{ width: "80%", backgroundColor: Secondarycolor() }}>
                        <Text style={{ color: "gray", padding: 5 }}>Sort criteria</Text>
                        {months.map((val, key) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setdefaultid(val.id)
                                    setdefaultsort(val)
                                    setshowcalender(false)
                                }} key={key}
                                    style={{
                                        padding: 10,
                                        backgroundColor: defaultid === val.id ? Primarycolor() : Secondarycolor()
                                    }}>
                                    <Text style={{ color: "white" }}>{val.month}</Text>
                                </TouchableOpacity>
                            )
                        })}

                    </View>}
            /> : null}
            {loading &&
                <Spinner
                    visible={true}
                    color='red'
                    size={30}
                    customIndicator={<BallIndicator color={Primarycolor()} />}

                />}
            <View style={styles.topview}>
                <Text style={{ color: "gray" }}>
                    {defaultid === 12 ? year : defaultsort?.month}
                </Text>
                <TouchableOpacity style={styles.calenderview} onPress={() => {graphdata?.length > 0  && setshowcalender(true) }}>
                    <MaterialCommunityIcons name="calendar" color={"gray"} size={25} />
                </TouchableOpacity>
            </View>
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onrefresh}
                    color='#4a43eb'
                    tintColor="#4a43eb"
                />
            }>
                <View style={{ paddingBottom: 200 }}>

                    <View style={styles.royaltyview}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 15, marginBottom: 10 }}>Royalties Balance Due</Text>
                        <View style={{ flexDirection: "row" }}>
                            <FontAwesome5 name="dollar-sign" color={"white"} style={{ marginTop: 15 }} />
                            <Text style={{
                                marginLeft: 5,
                                fontSize: 25,
                                color: "white"
                            }}>
                                {screendata?.totalroyalty?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                {/* {user?.type === 'Artist' ? artists[0]?.totalroyalty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : labeldata?.totalroyalty?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                            </Text>
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
                        <View style={{
                            position: "absolute",
                            right: 20,
                            zIndex: 1,
                            justifyContent: "center",
                            alignItems: "center",
                            bottom: 60
                        }}>
                            <Text style={{ color: "white", fontSize: 8 }}>TOTAL</Text>
                            <Text style={{
                                marginLeft: 5,
                                fontSize: 8,
                                color: "white"
                            }}>
                                {defaultid === 12 ? screendata?.totalroyalty?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : graphdata[defaultid]}
                                {/* {user?.type === 'Artist' ? artists[0]?.totalroyalty.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : labeldata?.totalroyalty?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} */}
                            </Text>
                        </View>
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
                            <Text style={styles.digitalmoney}>
                                ${screendata?.spotifyroyalty?.reduce((partialSum, a) => partialSum + a, 0)}
                                {/* ${user.type === 'Artist' ? artists[0]?.spotifyroyalty.reduce((partialSum, a) => partialSum + a, 0) : labeldata?.spotifyroyalty?.reduce((partialSum, a) => partialSum + a, 0)} */}
                            </Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.servicediv}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>Apple music</Text>
                            <Text style={styles.digitalmoney}>
                                ${screendata?.appleroyalty?.reduce((partialSum, a) => partialSum + a, 0)}
                                {/* ${user.type === 'Artist' ? artists[0]?.appleroyalty.reduce((partialSum, a) => partialSum + a, 0) : labeldata?.appleroyalty?.reduce((partialSum, a) => partialSum + a, 0)} */}
                            </Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.servicediv}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>YouTube</Text>
                            <Text style={styles.digitalmoney}>
                                ${screendata?.youtuberoyalty?.reduce((partialSum, a) => partialSum + a, 0)}
                                {/* ${user.type === 'Artist' ? artists[0]?.youtuberoyalty.reduce((partialSum, a) => partialSum + a, 0) : labeldata?.youtuberoyalty?.reduce((partialSum, a) => partialSum + a, 0)} */}
                            </Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.servicediv}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>Facebook(Video)</Text>
                            <Text style={styles.digitalmoney}>
                                ${screendata?.facebookroyalty?.reduce((partialSum, a) => partialSum + a, 0)}
                                {/* ${user.type === 'Artist' ? artists[0]?.facebookroyalty.reduce((partialSum, a) => partialSum + a, 0) : labeldata?.facebookroyalty?.reduce((partialSum, a) => partialSum + a, 0)} */}
                            </Text>
                        </View>
                        <View style={styles.line} />
                        <View style={styles.servicediv}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 13 }}>Amazon Music</Text>
                            <Text style={styles.digitalmoney}>
                                ${screendata?.amazonroyalty?.reduce((partialSum, a) => partialSum + a, 0)}
                                {/* ${user.type === 'Artist' ? artists[0]?.amazonroyalty?.reduce((partialSum, a) => partialSum + a, 0) : labeldata?.amazonroyalty?.reduce((partialSum, a) => partialSum + a, 0)} */}
                            </Text>
                        </View>

                    </View>

                    <View style={{ backgroundColor: Secondarycolor(), borderRadius: 10, marginHorizontal: "3%", marginTop: 20 }}>
                        <TouchableOpacity style={{ padding: 0, position: "absolute", right: 10, top: 5 }}>
                            <MaterialCommunityIcons name={"menu-open"} color="gray" size={25} />
                        </TouchableOpacity>
                        <Text style={{ color: "gray", fontSize: 10, marginLeft: 10, marginTop: 10, marginBottom: 10 }}>Top Locations</Text>
                        <View style={styles.line} />

                        <View style={{ flexDirection: "row", }}>
                            <VictoryPie
                                padAngle={({ datum }) => datum.y}
                                innerRadius={25}
                                colorScale={["#000062", "#62006e", "#a2006e", "#d81665", "#ff5757"]}
                                data={finallocationarray}
                                height={200}
                                width={235}
                                style={{
                                    labels: {
                                        fill: "silver",
                                        fontSize: 8
                                    }

                                }}
                            />
                            <View style={{
                                position: "absolute",
                                right: 10,
                                top: 60
                            }}>
                                <View style={{
                                    flexDirection: "row",
                                }}><TouchableOpacity style={{
                                    height: 10,
                                    width: 10,
                                    backgroundColor: "#ff5757",
                                    borderRadius: 10,
                                    marginRight: 5,
                                    marginTop: 3
                                }} /><Text style={{ color: "gray", fontSize: 10 }}>High</Text></View>
                                <View style={{
                                    flexDirection: "row",
                                    marginTop: 2
                                }}><TouchableOpacity style={{
                                    height: 10,
                                    width: 10,
                                    backgroundColor: "#a2006e",
                                    borderRadius: 10,
                                    marginRight: 5,
                                    marginTop: 3
                                }} /><Text style={{ color: "gray", fontSize: 10 }}>Medium</Text></View>
                                <View style={{
                                    flexDirection: "row",
                                    marginTop: 2
                                }}><TouchableOpacity style={{
                                    height: 10,
                                    width: 10,
                                    backgroundColor: "#080960",
                                    borderRadius: 10,
                                    marginRight: 5,
                                    marginTop: 3
                                }} /><Text style={{ color: "gray", fontSize: 10 }}>Low</Text></View>

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