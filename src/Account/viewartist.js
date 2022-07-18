import React from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome5';
import { Primarycolor, Secondarycolor } from "../Utils/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "../Components/fontawesome";
import { useNavigation } from "@react-navigation/native";
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';


var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

const Viewartist = () => {
    const navigation = useNavigation();

    const MyBezierLineChart = () => {
        return (
            <>
                <LineChart
                    data={{
                        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
                        datasets: [
                            {
                                data: [
                                    100, 300, 200, 700, 100,

                                    // Math.random() * 100,
                                    // Math.random() * 100,
                                    // Math.random() * 100,
                                    // Math.random() * 100,
                                    // Math.random() * 100,
                                    // Math.random() * 100,
                                    // Math.random() * 100,
                                ],
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

    return (
        <SafeAreaView style={{ backgroundColor: "black", height: deviceHeight }}>
            <View style={{ paddingBottom: 20 }}>
                <View style={{ flexDirection: "row", marginTop: 20, marginHorizontal: "5%" }}>
                    <View style={{ width: "16%" }}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Icon name="angle-left" color="white" size={25} />
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity
                        style={styles.user}
                    />
                    <TouchableOpacity
                    onPress={()=>navigation.navigate("searchsong")}
                    style={{
                        marginLeft: "8%"
                    }}>
                        <Icon name="search" color={"gray"} size={20} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: "row", marginHorizontal: "5%" }}>
                    <View style={{ width: "70%" }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>TEST USER </Text>
                        <TouchableOpacity style={{ flexDirection: "row" }}>
                            <Icon name="headphones-alt" color="gray" style={{ marginTop: 5 }} />
                            <Text style={{ color: "gray", marginLeft: 5 }}>50K</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ flexDirection: "row", marginTop: 25 }}>
                        <Text style={{ color: "gray", fontSize: 10 }}>CATALOGUE</Text>
                        <Icon name="long-arrow-alt-right" color="gray" style={{ marginLeft: 5 }} />
                    </TouchableOpacity>

                </View>
            </View>

            <ScrollView>

                <View style={{ marginBottom: 100, marginTop: 15 }}>
                    <View style={styles.headerscroll}>
                        <TouchableOpacity style={{ marginRight: 20 }}>
                            <Text style={{ color: Primarycolor() }}>Total</Text>
                        </TouchableOpacity >
                        <TouchableOpacity style={{ marginRight: 20, flexDirection: "row" }}>
                            <FontAwesome name="spotify" color={"white"} size={15} style={{ marginTop: 3, marginRight: 3 }} />
                            <Text style={{ color: "white" }}>Spotity</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ marginRight: 0, flexDirection: "row" }}>
                            <Icon name="apple-alt" color="white" style={{ marginTop: 3, marginRight: 3 }} />
                            <Text style={{ color: "white" }}>Music</Text>
                        </TouchableOpacity>

                    </View>
                    <MyBezierLineChart />
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
        height: 200,
        width: 200,
        borderRadius: 200
    }
})

export default Viewartist;