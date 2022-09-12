import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome5';
import { Primarycolor, Secondarycolor } from "../Utils/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "../Components/fontawesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { VictoryPie } from 'victory-native';
//import { VictoryPie } from "victory-pie";
import {
    PieChart,
    LineChart,
    BarChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';



var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

const graphicColor = [Primarycolor(), '#787885', '#212121']; // Colors
// const wantedGraphicData = [{ y: 10 }, { y: 50 }, { y: 40 }]; // Data that we want to display
const wantedGraphicData = [{ x: 'Liquid', y: 35 }, { x: 'Iced', y: 90 }, { x: 'Total', y: 55 }];
// const defaultGraphicData = [{ y: 0 }, { y: 0 }, { y: 100 }];
const defaultGraphicData = [{ x: 'Liquid', y: 0 }, { x: 'Iced', y: 0 }, { x: 'Total', y: 100 }]; // Data used to make the animate prop work


const Viewsong = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const [screendata, setscreendata] = useState(route.params.data);
    const [graphdata, setgraphdata] = useState(route.params.data?.streamshistory);
    const [focused, setfocused] = useState('total');
    const [nothing, setnothing] = useState(false);

    //locations
    const australia = route.params.data?.locationstreams[0]
    const europe = route.params.data?.locationstreams[1]
    const canada = route.params.data?.locationstreams[2]
    const uk = route.params.data?.locationstreams[3]
    const us = route.params.data?.locationstreams[4]
    const streams = route.params.data?.locationstreams
    
    const widthAndHeight = 250
    const series = [123, 321, 123, 789, 537]
    const sliceColor = ['#F44336', '#2196F3', '#FFEB3B', '#4CAF50', '#FF9800']

    const [graphicData, setGraphicData] = useState(defaultGraphicData);

    useEffect(() => {
        setGraphicData(wantedGraphicData); // Setting the data that we want to display
    }, []);






    const MyBezierLineChart = () => {
        return (
            <>
                <LineChart
                    data={{
                        labels: ['Ja', 'Fe', 'Ma', 'Ap', 'Ma', 'jun', 'jul', 'Au', 'Sep', 'Oc', 'Nov', 'De'],
                        datasets: [
                            {
                                data: graphdata,
                            },
                        ],
                    }}
                    width={deviceWidth - 20} // from react-native
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
                        marginHorizontal: "3%",
                        borderBottomLeftRadius: 5
                    }}

                />
            </>
        );
    };

    const calculate = (val, all) => {
        var result = all.map(function (x) { 
            return parseInt(x, 10); 
          });
          
        var gh = Math.round((val / result.reduce((partialSum, a) => partialSum + a,)) * 10)
        return gh;
    }

    const locationarray = [
        { x: "Australia", y: calculate(australia, streams) },
        { x: "Europe", y: calculate(europe, streams) },
        { x: "Canada", y: calculate(canada, streams) },
        { x: "Uk", y: calculate(uk, streams) },
        { x: "USA", y: calculate(us, streams) }
    ]
    const finallocationarray = locationarray.sort(function (a, b) {
        return parseFloat(a.y) - parseFloat(b.y);
    });

    

    return (
        <SafeAreaView style={{ backgroundColor: "black", height: deviceHeight }}>
            <View style={{ paddingBottom: 20 }}>
                <View style={{ flexDirection: "row", marginTop: 20, marginHorizontal: "5%" }}>
                    <View style={{ width: "16%" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="angle-left" color="white" size={25} />
                        </TouchableOpacity>
                    </View>
                    <Image
                        source={{ uri: screendata.url }}
                        style={{
                            height: 200,
                            width: 200,
                            borderRadius: 200
                        }}
                    />

                </View>
                <View style={{ flexDirection: "row", marginHorizontal: "5%" }}>
                    <View style={{ width: "70%" }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>{screendata?.artist}/{screendata?.title} </Text>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <Icon name="headphones-alt" color="gray" style={{ marginTop: 5 }} />
                            <Text style={{ color: "gray", marginLeft: 5 }}>{screendata.totalstreams?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Music")} style={{ flexDirection: "row", marginTop: 25 }}>
                        <Text style={{ color: "gray", fontSize: 10 }}>CATALOGUE</Text>
                        <Icon name="long-arrow-alt-right" color="gray" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>

                </View>
            </View>

            <ScrollView>

                <View style={{ marginBottom: 100, marginTop: 15 }}>
                    <View style={styles.headerscroll}>
                        <TouchableOpacity
                            onPress={() => {
                                setfocused("total")
                                setgraphdata(screendata.streamshistory)
                                setnothing(!nothing)
                            }}
                            style={{ marginRight: 20 }}>
                            <Text style={{ color: focused == 'total' ? Primarycolor() : "white" }}>Total</Text>
                        </TouchableOpacity >
                        <TouchableOpacity
                            onPress={() => {
                                setfocused("spotify")
                                setgraphdata(screendata.spotifystreams)
                                setnothing(!nothing)
                            }}
                            style={{ marginRight: 20, flexDirection: "row" }}>
                            <FontAwesome name="spotify" color={focused == 'spotify' ? Primarycolor() : "white"} size={15} style={{ marginTop: 3, marginRight: 3 }} />
                            <Text style={{ color: focused == 'spotify' ? Primarycolor() : "white" }}>Spotify</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setfocused("apple")
                                setgraphdata(screendata.applestreams)
                                setnothing(!nothing)
                            }}
                            style={{ marginRight: 0, flexDirection: "row" }}>
                            <Icon name="apple-alt" color={focused == 'apple' ? Primarycolor() : "white"} style={{ marginTop: 3, marginRight: 3 }} />
                            <Text style={{ color: focused == 'apple' ? Primarycolor() : "white" }}>Music</Text>
                        </TouchableOpacity>

                    </View>
                    <MyBezierLineChart />
                    <View style={{ alignSelf: "center", flexDirection: "row" }}>
                        <Icon name="headphones-alt" color={Primarycolor()} style={{ marginTop: 0 }} />
                        <Text style={{ color: "gray", marginLeft: 5, fontSize: 10 }}>Streams</Text>
                    </View>
                    <View style={{ backgroundColor: Secondarycolor(), borderRadius: 10, marginHorizontal: "3%", flexDirection: "row", marginTop: 20 }}>

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
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 12 }}>LOCATIONS</Text>
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
                            <View style={{ flexDirection: "row", marginTop: 90 }}>
                                <Icon name="headphones-alt" color={"gray"} style={{ marginTop: 0 }} />
                                <Text style={{ color: "gray", marginLeft: 5, fontSize: 10 }}>Streams</Text>
                            </View>
                        </View>


                    </View>

                </View>


            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    songname: {
        fontSize: 8,
        color: "gray",
        alignSelf: "center"
    },
    musicview: {
        backgroundColor: Secondarycolor(),
        height: 100,
        width: deviceWidth / 3,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 5
    },
    artistname: {
        color: "white",
        fontWeight: "bold",
        marginLeft: 10,
        marginTop: 15,
        width: "70%"
    },
    artistphoto: {
        backgroundColor: Secondarycolor(),
        height: 50,
        width: 50,
        justifyContent: "center",
        margin: 3,
        alignItems: "center",
        borderRadius: 5
    },
    artistlink: {
        backgroundColor: Primarycolor(),
        flexDirection: "row",
        marginRight: "3.3%",
        marginLeft: "3%",
        borderRadius: 10,
        marginTop: 10
    },
    headerscroll: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Secondarycolor(),
        marginLeft: "3%",
        marginRight: "3.3%",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        paddingTop: 10,
        paddingBottom: 10
    },
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        padding: 10,
    },
    header: {
        fontSize: 18,
        padding: 5,
        marginTop: 16,
        color: "gray"
    },
    imagef: {
        height: 60,
        width: 60,
        alignSelf: "center",
        marginTop: 20,
    },
    requestbtn: {
        alignSelf: "center",
        backgroundColor: Primarycolor(),
        justifyContent: "center",
        alignItems: "center",
        width: "40%",
        marginTop: 30,
        paddingVertical: 7,
        borderRadius: 5
    },
    message: {
        color: "gray",
        fontSize: 10,
        alignSelf: "center"
    },
    promote: {
        marginTop: 10,
        fontSize: 20,
        fontWeight: "bold",
        color: "white",
        alignSelf: "center"
    },
    sliderview: {
        height: deviceHeight / 3,
        backgroundColor: Secondarycolor(),
        marginTop: 20,
        borderRadius: 10,
        padding: 10
    },
    user: {
        backgroundColor: Secondarycolor(),
        height: 200,
        width: 200,
        borderRadius: 200
    }
})

export default Viewsong;