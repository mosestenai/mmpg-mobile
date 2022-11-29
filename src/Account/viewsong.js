import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome5';
import { Primarycolor, Secondarycolor } from "../Utils/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "../Components/fontawesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { VictoryPie } from 'victory-native';
import { LinearGradient } from 'expo-linear-gradient';
import Spinner from "react-native-loading-spinner-overlay/lib";
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
    const [streamstoshow, setstreamstoshow] = useState(route.params.data?.streamshistory?.reduce((a, b) => a + b, 0));
    const [editby, seteditby] = useState('Lifetime');
    const [showpickermenu, setshowpickermenu] = useState(false);

    //locations
    const australia = route.params.data?.locationstreams[0]
    const europe = route.params.data?.locationstreams[1]
    const canada = route.params.data?.locationstreams[2]
    const uk = route.params.data?.locationstreams[3]
    const us = route.params.data?.locationstreams[4]
    const streams = route.params.data?.locationstreams
    const [locationnames, setlocationnames] = useState(route.params.data?.locationnames);

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
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'jun', 'jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                        datasets: [
                            {
                                data: graphdata,
                            },
                        ],
                    }}
                    width={deviceWidth - (deviceWidth > 400 ? 28 : 20)} // from react-native
                    height={220}
                    verticalLabelRotation={-60}
                    withInnerLines={true}
                    withVerticalLines={false}
                    withHorizontalLines={true}
                    withDots={false}
                    withOuterLines={false}
                    color={"white"}
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
                        marginHorizontal: "3%",
                        borderBottomLeftRadius: 5
                    }}

                />
            </>
        );
    };
    //calculate whole value to be under 10
    const calculate = (val, all) => {
        var result = all.map(function (x) {
            return parseInt(x, 10);
        });

        var gh = (val / result.reduce((partialSum, a) => partialSum + a,)) * 10
        return gh;
    }

    //calculate percentage
    const calculate2 = (val, all) => {
        var result = all.map(function (x) {
            return parseInt(x, 10);
        });

        var gh = Math.round((val / result.reduce((partialSum, a) => partialSum + a,)) * 100)
        return gh;
    }

    const locationarray = [
        { x: `(${calculate2(australia, streams)}%)`, y: calculate(australia, streams) },
        { x: `(${calculate2(europe, streams)}%)`, y: calculate(europe, streams) },
        { x: `(${calculate2(canada, streams)}%)`, y: calculate(canada, streams) },
        { x: `(${calculate2(uk, streams)}%)`, y: calculate(uk, streams) },
        { x: `(${calculate2(us, streams)}%)`, y: calculate(us, streams) }
    ]
    const finallocation = locationarray.sort(function (a, b) {
        return parseFloat(a.y) - parseFloat(b.y);
    });
    const finallocationarray = [
        {
            x: Array.isArray(locationnames) && locationnames[4] + finallocation[0]?.x,
            y: finallocation[0]?.x
        },
        {
            x: Array.isArray(locationnames) && locationnames[3] + finallocation[1]?.x,
            y: finallocation[1]?.x
        },
        {
            x: Array.isArray(locationnames) && locationnames[2] + finallocation[2]?.x,
            y: finallocation[2]?.x
        },
        {
            x: Array.isArray(locationnames) && locationnames[1] + finallocation[3]?.x,
            y: finallocation[3]?.x
        },
        {
            x: Array.isArray(locationnames) && locationnames[0] + finallocation[4]?.x,
            y: finallocation[4]?.x
        },
    ]



    const sorts = ["Last 28 days", "Last 90 days", "Lifetime"]

    const sort = (val) => {
        var currentdate = new Date();
        const month = currentdate.getMonth()


        if (val === 'Last 28 days') {
            setstreamstoshow(graphdata[month])
        } else if (val === "Last 90 days") {
            const thirdmonth = graphdata[month - 2]
            const secondmonth = graphdata[month - 1]
            const firstmonth = graphdata[month]

            const final = parseInt(thirdmonth) + parseInt(secondmonth) + parseInt(firstmonth);
            setstreamstoshow(final)
        } else {
            setstreamstoshow(graphdata.reduce((a, b) => a + b, 0))
        }

    }

    return (
        <SafeAreaView style={{ backgroundColor: "black", height: deviceHeight }}>
            {showpickermenu ? <Spinner
                visible={true}
                color='red'
                size={70}
                customIndicator={
                    <View style={{ width: "80%", backgroundColor: Secondarycolor() }}>
                        <Text style={{ color: "gray", padding: 5 }}>Sort criteria</Text>
                        <ScrollView>
                            {sorts.map((val, key) => {
                                return (
                                    <TouchableOpacity key={key}
                                        onPress={() => {
                                            seteditby(val)
                                            setshowpickermenu(false)
                                            sort(val)
                                        }}
                                        style={{
                                            padding: 10,
                                            backgroundColor: editby === val ? Primarycolor() : Secondarycolor()
                                        }}>
                                        <Text style={{ color: "white" }}>{val}</Text>
                                    </TouchableOpacity>
                                )
                            })}
                        </ScrollView>
                    </View>}
            /> : null}
            <View style={{ paddingBottom: 20 }}>
                <TouchableOpacity style={{
                    position: "absolute",
                    top: 10,
                    left: 10,
                    zIndex: 1
                }} onPress={() => navigation.goBack()}>
                    <Icon name="angle-left" color="white" size={25} />
                </TouchableOpacity>
                <Image
                    source={{ uri: screendata.url }}
                    style={{
                        height: 280,
                        width: deviceWidth
                    }}
                />

                <LinearGradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                />
                <LinearGradient
                    // Button Linear Gradient
                    colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.8)', 'black']}
                    style={{
                        flexDirection: "row",
                        paddingHorizontal: "5%",
                        position: "absolute",
                        height: 60,
                        width: deviceWidth,
                        top: 220,
                    }}>
                    <View style={{ width: "70%" }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>{screendata?.artist}/{screendata?.title} </Text>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <Icon name="headphones-alt" color="white" style={{ marginTop: 5 }} />
                            <Text style={{ color: "white", marginLeft: 5 }}>{screendata.totalstreams?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Music")} style={{
                        flexDirection: "row", marginTop: 25,
                        position: "absolute", right: "5%"
                    }}>
                        <Text style={{ color: "white", fontSize: 10 }}>CATALOGUE</Text>
                        <Icon name="long-arrow-alt-right" color="white" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>
                </LinearGradient>
            </View>

            <ScrollView>
                <View
                    style={{
                        flexDirection: "row",
                        alignSelf: "flex-end",
                        right: 10,

                    }}>
                    <Text style={{ color: Primarycolor(), fontSize: 12 }}>{editby}</Text>
                    <TouchableOpacity onPress={() => setshowpickermenu(true)} style={{
                        height: 20,
                        width: 20,
                        justifyContent: "center",
                        marginLeft: 5,
                        alignItems: "center",
                        borderRadius: 5,
                        borderWidth: 1,
                        borderColor: Primarycolor()
                    }}>
                        <Icon name="angle-down" color={Primarycolor()} />
                    </TouchableOpacity>
                </View>
                <View style={{ marginBottom: 100, marginTop: 5 }}>
                    <View style={styles.headerscroll}>
                        <TouchableOpacity
                            onPress={() => {
                                setfocused("total")
                                setgraphdata(screendata.streamshistory)
                                setnothing(!nothing)
                                setstreamstoshow(screendata.totalstreams?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                                seteditby("Lifetime")
                            }}
                            style={{ marginRight: 20 }}>
                            <Text style={{ color: focused == 'total' ? Primarycolor() : "white" }}>Total</Text>
                        </TouchableOpacity >
                        <TouchableOpacity
                            onPress={() => {
                                setfocused("spotify")
                                setgraphdata(screendata.spotifystreams)
                                setnothing(!nothing)
                                seteditby("Lifetime")
                                setstreamstoshow(screendata.spotifystreams?.reduce((a, b) => parseInt(a) + parseInt(b), 0))
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
                                seteditby("Lifetime")
                                setstreamstoshow(screendata.applestreams?.reduce((a, b) => parseInt(a) + parseInt(b), 0))
                            }}
                            style={{ marginRight: 0, flexDirection: "row" }}>
                            <Icon name="apple-alt" color={focused == 'apple' ? Primarycolor() : "white"} style={{ marginTop: 3, marginRight: 3 }} />
                            <Text style={{ color: focused == 'apple' ? Primarycolor() : "white" }}>Music</Text>
                        </TouchableOpacity>

                    </View>
                    <View>
                        <View style={{ position: "absolute", right: 20, bottom: 60, zIndex: 1 }}>
                            <Text style={{ color: "white", fontSize: 10 }}>TOTAL</Text>
                            <Text style={{ color: "white", fontSize: 8 }}>{streamstoshow}</Text>
                        </View>
                        <MyBezierLineChart />

                    </View>
                    <View style={{ alignSelf: "center", flexDirection: "row" }}>
                        <Icon name="headphones-alt" color={Primarycolor()} style={{ marginTop: 0 }} />
                        <Text style={{ color: "gray", marginLeft: 5, fontSize: 10 }}>Streams</Text>
                    </View>
                    <View style={{ backgroundColor: Secondarycolor(), borderRadius: 10, marginHorizontal: "3%", flexDirection: "row", marginTop: 20 }}>

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
                        <View style={{ position: "absolute", right: deviceWidth > 400 ? 20 : 10 }}>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: 10, marginTop: 15 }}>LOCATIONS</Text>
                            <View style={{
                                flexDirection: "row",
                                marginTop: 50
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
                            <View style={{ flexDirection: "row", marginTop: 60 }}>
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