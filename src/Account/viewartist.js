import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome5';
import { Primarycolor, Secondarycolor } from "../Utils/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "../Components/fontawesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { LinearGradient } from 'expo-linear-gradient';
import Spinner from "react-native-loading-spinner-overlay/lib";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
import { Getuserdetails } from "../Utils/getuserdetails";


var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

const Viewartist = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const user = Getuserdetails();
    const [data, setdata] = useState(route.params.data);
    const [graphdata, setgraphdata] = useState(route.params.data.streamshistory);
    const [focused, setfocused] = useState('total');
    const [nothing, setnothing] = useState(false);
    const [streamstoshow, setstreamstoshow] = useState(route.params.data?.streamshistory?.reduce((a, b) => a + b, 0));
    const [editby, seteditby] = useState('Lifetime');
    const [showpickermenu, setshowpickermenu] = useState(false);

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


                <TouchableOpacity
                    onPress={() => navigation.navigate("searchsong", {
                        data: data
                    })}
                    style={{
                        position: "absolute",
                        padding: 10,
                        right: "1%",
                        zIndex: 1
                    }}>
                    <Icon name="search" color={"white"} size={20} />
                </TouchableOpacity>

                {data.profilepic_url ? <Image
                    source={{ uri: data.profilepic_url }}
                    style={{
                        height: 280,
                        width: deviceWidth
                    }}
                /> :
                    <View style={{ marginTop: 20, marginHorizontal: "5%", justifyContent: "center", alignItems: "center" }}>
                        <View style={{ width: "16%" }} />
                        <TouchableOpacity
                            style={styles.user}
                        />
                    </View>
                }
                <LinearGradient
                    // Background Linear Gradient
                    colors={['rgba(0,0,0,0.8)', 'transparent']}
                // style={styles.background}
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
                        <Text style={{ color: "white", fontWeight: "bold" }}>{data?.name} </Text>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <Icon name="headphones-alt" color="white" style={{ marginTop: 5 }} />
                            <Text style={{ color: "white", marginLeft: 5 }}>{data?.totalstreams.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate("Music")} style={{
                        flexDirection: "row", marginTop: 25,
                        position: "absolute",
                        right: "5%"
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
                        right: 10

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
                                setgraphdata(data.streamshistory)
                                setnothing(!nothing)
                                setstreamstoshow(data.totalstreams?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
                                seteditby("Lifetime")
                            }}
                            style={{ marginRight: 20 }}>
                            <Text style={{ color: focused == 'total' ? Primarycolor() : "white" }}>Total</Text>
                        </TouchableOpacity >
                        <TouchableOpacity
                            onPress={() => {
                                setfocused("spotify")
                                setgraphdata(data.spotifystreams)
                                setnothing(!nothing)
                                seteditby("Lifetime")
                                setstreamstoshow(data.spotifystreams?.reduce((a, b) => parseInt(a) + parseInt(b), 0))
                            }}
                            style={{ marginRight: 20, flexDirection: "row" }}>
                            <FontAwesome name="spotify" color={focused == 'spotify' ? Primarycolor() : "white"} size={15} style={{ marginTop: 3, marginRight: 3 }} />
                            <Text style={{ color: focused == 'spotify' ? Primarycolor() : "white" }}>Spotify</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                setfocused("apple")
                                setgraphdata(data.applestreams)
                                setnothing(!nothing)
                                seteditby("Lifetime")
                                setstreamstoshow(data.applestreams?.reduce((a, b) => parseInt(a) + parseInt(b), 0))
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
        height: 230,
        width: 230,
        borderRadius: 280
    }
})

export default Viewartist;