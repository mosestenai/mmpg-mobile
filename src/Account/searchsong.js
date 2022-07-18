import React from "react";
import { View, Text, SafeAreaView, ScrollView, Dimensions, TouchableOpacity, StyleSheet, Image } from "react-native";
import Icon from '@expo/vector-icons/FontAwesome5';
import { Primarycolor, Secondarycolor } from "../Utils/color";
import AntDesign from "@expo/vector-icons/AntDesign";
import { FontAwesome } from "../Components/fontawesome";
import { useNavigation } from "@react-navigation/native";

var deviceHeight = Dimensions.get("window").height;
var deviceWidth = Dimensions.get('window').width;

const Searchsong = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ height: deviceHeight, backgroundColor: "black" }}>
            <View>
                <View style={styles.headerdiv}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 5 }}>
                        <Icon name="angle-left" color="white" size={25} />
                    </TouchableOpacity>
                    <View style={{ marginLeft: 15, width: "65%" }}>
                        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>Test user</Text>
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
                <View style={styles.songscontainer}>
                    <View style={styles.songview}>
                        <View style={styles.songimage}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>1</Text>
                        </View>
                        <View style={{ marginLeft: 10, width: "70%" }}>
                            <Text style={{ color: "gray" }}>Song/ Artist</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Icon name="headphones-alt" color="gray" style={{ marginTop: 5 }} />
                                <Text style={{ color: "gray", marginLeft: 5 }}>50,000</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ marginTop: 10 }}>
                            <Icon name="angle-right" color="white" size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.songview}>
                        <View style={styles.songimage}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>2</Text>
                        </View>
                        <View style={{ marginLeft: 10, width: "70%" }}>
                            <Text style={{ color: "gray" }}>Song/ Artist</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Icon name="headphones-alt" color="gray" style={{ marginTop: 5 }} />
                                <Text style={{ color: "gray", marginLeft: 5 }}>50,000</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ marginTop: 10 }}>
                            <Icon name="angle-right" color="white" size={20} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.songview}>
                        <View style={styles.songimage}>
                            <Text style={{ color: "white", fontWeight: "bold" }}>3</Text>
                        </View>
                        <View style={{ marginLeft: 10, width: "70%" }}>
                            <Text style={{ color: "gray" }}>Song/ Artist</Text>
                            <View style={{ flexDirection: "row" }}>
                                <Icon name="headphones-alt" color="gray" style={{ marginTop: 5 }} />
                                <Text style={{ color: "gray", marginLeft: 5 }}>50,000</Text>
                            </View>
                        </View>
                        <TouchableOpacity style={{ marginTop: 10 }}>
                            <Icon name="angle-right" color="white" size={20} />
                        </TouchableOpacity>
                    </View>

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
        marginBottom:10
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
