import React, { useState } from "react";
import { View, Text, SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, Dimensions, TextInput, Image, Alert } from "react-native";
import { Primarycolor, Secondarycolor, Semisecondarycolor } from "../Utils/color";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import EvilIcons from "@expo/vector-icons/EvilIcons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { FontAwesome5 } from "../Components/fontawesome5";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system'
import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('db.Userdbs') // returns Database object

var devicewidth = Dimensions.get('window').width;
var deviceheight = Dimensions.get('window').height;

export const getFileInfo = async (fileURI) => {
    const fileInfo = await FileSystem.getInfoAsync(fileURI)
    return fileInfo
}

export const isLessThanTheMB = (fileSize, smallerThanSizeMB) => {
    const isOk = fileSize / 1024 / 1024 < smallerThanSizeMB
    return isOk
}



const Step1 = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const [screendata, setscreendata] = useState(route?.params?.data);
    const [releasetitle, setreleasetitle] = useState(screendata?.title);
    const [error, seterror] = useState('');
    const [cover, setcover] = useState(null);
    const [url, seturl] = useState(screendata?.url || screendata?.imgurl);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing: true,
            // aspect: [4, 4],
            quality: 1,
        });


        if (result.cancelled) return

        const { uri, type } = result
        const fileInfo = await getFileInfo(result.uri)


        // const {width, height} = Image.resolveAssetSource(result.uri);
        // console.log(width)

        if (!fileInfo?.size) {
            Alert.alert(
                "Error",
                "Can't select this file as the size is unknown.",
                [
                    { text: "OK" }
                ]
            );
            return
        }
        if (result.height < 3000 || result.width < 3000) {
            Alert.alert(
                "Error",
                "Image too small.Must be at least 3000 * 3000 pixels",
                [
                    { text: "OK" }
                ]
            );
            return
        }

        if (type === 'image') {
            const isLt15MB = isLessThanTheMB(fileInfo.size, 15)
            if (!isLt15MB) {
                Alert.alert(
                    "Error",
                    "Image size must be smaller than 15MB!",
                    [
                        { text: "OK" }
                    ]
                );
                return
            }
        }
        if (result.uri.split('.').pop() !== "jpg") {
            Alert.alert(
                "Error",
                'Invalid format.Only jpeg images are allowed',
                [
                    { text: "OK" }
                ]
            );
        } else {
            if (!result.cancelled) {
                setcover(result)
                seturl(result.uri)

            }
        }
    };

    const checkfields = () => {
        if (!releasetitle) {
            Alert.alert(
                "Error",
                'Empty release title',
                [
                    { text: "OK" }
                ]
            );
        } else if (!url) {
            Alert.alert(
                "Error",
                'Choose a cover photo to continue',
                [
                    { text: "OK" }
                ]
            );
        }
        else {
            navigation.navigate("step2", {
                releasetitle: releasetitle,
                coverimage: cover
            })
        }
    }

    const saveforlater = () => {
        db.transaction(tx => {

            tx.executeSql('INSERT INTO Tracks (title,imgurl) values (?,?)', [releasetitle, url],
                (txObj, resultSet) => {
                    Alert.alert(
                        "Success",
                        'Saved successfully',
                        [
                            { text: "OK" }
                        ]
                    );
                    setTimeout(() => {
                        navigation.navigate("Home")
                    }, 3000);
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
        }) // end transaction

    }

    return (
        <SafeAreaView style={{ height: deviceheight, backgroundColor: "black" }}>
            <View style={styles.fixedview}>
                <TouchableOpacity style={styles.savelater} onPress={saveforlater}>
                    <SimpleLineIcons name="logout" color="white" size={25} />
                    <Text style={{ color: "white", marginLeft: 5, marginTop: 3 }}>Save for Later</Text>
                </TouchableOpacity>
                <View style={{
                    position: "absolute",
                    right: 10,
                    top: 10
                }}>
                    <Text style={{ color: "white", fontSize: 15 }}>Step 1</Text>
                </View>
            </View>
            <ScrollView>
                <View style={styles.contentview}>
                    <View style={{ marginTop: 20 }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>Basics</Text>
                        <Text style={{ fontSize: 10, color: "gray", marginTop: 5 }}>Let's start with some basic information about your release</Text>
                    </View>
                    <View>
                        <View style={styles.progressview} />
                        <Text style={{ color: "white", position: "absolute", right: 0, fontSize: 13 }}>21%</Text>
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ color: "white", fontWeight: "bold" }}>ReleaseTitle</Text>
                        <TextInput
                            style={styles.titleinput}
                            placeholder="Name your release"
                            onChangeText={newText => setreleasetitle(newText)}
                            defaultValue={releasetitle}
                            placeholderTextColor="gray"
                        />
                        <View style={styles.linehr} />
                        <View style={{ height: 20 }} />
                        <Text style={{ color: "white", fontWeight: "bold" }}>Add cover art</Text>
                        <Text style={{ color: "gray", fontSize: 8 }}>Add cover art to your release. Make sure your image is high quality, a square, and{`\n`}
                            void of:</Text>
                        <Text style={{ color: "gray", fontSize: 8 }}>
                            1. Blurriness/ Pixelation {`\n`}
                            2. Text that doesn't match your metadata{`\n`}
                            3. Uneven borders
                        </Text>
                    </View>
                    {url ?
                        <TouchableOpacity onPress={pickImage}>
                            <Image
                                source={{ uri: url }}
                                style={{
                                    marginTop: 20,
                                    borderWidth: 1,
                                    borderColor: Semisecondarycolor(),
                                    height: deviceheight / 5, marginRight: 20
                                }}
                            />
                        </TouchableOpacity>
                        : <View style={styles.dropimageview}>
                            <TouchableOpacity style={styles.browsebutton} onPress={pickImage}>
                                <EvilIcons name="image" color={Primarycolor()} size={30} />
                                <Text style={{ color: "gray", fontSize: 10 }}>Browse</Text>
                            </TouchableOpacity>
                            <Text style={{ color: "gray", marginTop: 10, fontSize: 8 }}>SQUARE (MIN 3000 X 3000 PIXELS)</Text>
                            <Text style={{ color: "gray", fontSize: 8 }}>JPEG FORMAT, MAX 15MB</Text>
                            <Text style={{ color: "gray", fontSize: 8 }}>RGB (DIGITAL COLOUR FORMAT)</Text>
                        </View>}
                </View>
            </ScrollView>
            <View style={styles.bottomnav}>
                <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <FontAwesome5 name="home" color={"white"} size={20} />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={checkfields}
                    style={styles.nextbutton}>
                    <Text style={{ color: "white" }}>Next</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    browsebutton: {
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
        borderTopWidth: 0,
        borderRightWidth: 0,
        borderLeftWidth: 0,
        borderColor: "gray"
    },
    dropimageview: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Secondarycolor(),
        marginTop: 20,
        borderStyle: "dotted",
        borderWidth: 1,
        borderColor: Semisecondarycolor(),
        paddingVertical: 20
    },
    linehr: {
        height: 1,
        backgroundColor: Secondarycolor(),
        marginTop: 30
    },
    titleinput: {
        height: 35,
        marginLeft: 0,
        color: "white",
        backgroundColor: Secondarycolor(),
        paddingHorizontal: 5,
    },
    progressview: {
        height: 5,
        borderRadius: 5,
        width: "11%",
        backgroundColor: Primarycolor(),
        marginTop: 10
    },
    contentview: {
        marginHorizontal: "10%"
    },
    nextbutton: {
        backgroundColor: Primarycolor(),
        position: "absolute",
        right: 10,
        paddingHorizontal: 35,
        top: 10,
        paddingVertical: 5,
        borderRadius: 5
    },
    bottomnav: {
        position: "absolute",
        bottom: 0,
        backgroundColor: Secondarycolor(),
        paddingHorizontal: 10,
        paddingVertical: 15,
        width: devicewidth,
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5
    },
    fixedview: {
        backgroundColor: Secondarycolor()
    },
    savelater: {
        flexDirection: "row",
        paddingVertical: 10,
        paddingHorizontal: 10
    }
})

export default Step1;