import React, { useState, useEffect } from 'react'
import { View, StyleSheet, KeyboardAvoidingView, Text, StatusBar, Image, ScrollView, Dimensions, TouchableOpacity, TextInput, ImageBackground } from 'react-native';
import { Video, AVPlaybackStatus } from 'expo-av';
import Icon from '@expo/vector-icons/FontAwesome5';
import { Primarycolor } from '../Utils/color';
import { useNavigation } from '@react-navigation/native';
import { BallIndicator, PacmanIndicator } from 'react-native-indicators';
import { images } from './assetsurls';
import { useFonts } from 'expo-font';
import * as SQLite from 'expo-sqlite';
import Swiper from 'react-native-swiper'
import { Getuserdetails } from './../Utils/getuserdetails';

const db = SQLite.openDatabase('db.Userdbs') // returns Database object


StatusBar.setHidden(true)
var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;
const primarycolor = Primarycolor();



export default function Homescreen() {
  const user = Getuserdetails();
  const videourl = images.firstvideo.uri;
  const [showdash, setshowdash] = useState(user ? true : false);

  const navigation = useNavigation();
  const [userexists, setuserexists] = useState(false);


  const [loaded] = useFonts({
    Montserrat: require('./../../assets/fonts/wiz3.ttf'),
  });

  if (!loaded) {
    return null;
  }


  return (
    user ?
      <View>
        {navigation.navigate("started")}
      </View>
      :
      <View style={styles.container}>
        {/* <ImageBackground source={image} resizeMode="cover" style={styles.image}> */}
        <Video
          source={videourl}
          style={styles.backgroundVideo}
          rate={1}
          shouldPlay={true}
          isLooping={true}
          volume={1}
          muted={true}
          resizeMode="cover"
        />

        <KeyboardAvoidingView behavior='padding' style={styles.container}>
          <Swiper showsButtons={false} loop={false} horizontal={false} showsVerticalScrollIndicator={false} showsPagination={false}>
            <View style={styles.loginContainer}>
              <Image
                source={require('./../../assets/images/png/whitelogo1.png')}
                style={{ height: 50, width: 50 }}
              />
              <Text style={{ color: "white", fontFamily: 'Montserrat' }}>RELEASE UNLIMITED MUSIC</Text>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>FROM YOUR PHONE</Text>
              <Text style={{ marginTop: 20, color: "white", fontSize: 10 }}>WHEREVER YOU GO</Text>
              <View style={styles.bottomCenter}>
                <View style={{ justifyContent: "center", alignItems: "center" }}>
                  <Icon name="angle-up" color="white" />
                </View>
                <Text style={{ color: "white" }}>Swipe up</Text>
              </View>
            </View>
            <View style={styles.SecondContainer}>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>YOUR</Text>
              <Text style={{ color: "white", fontWeight: "bold", fontSize: 25 }}>MUSIC..</Text>
              <Text style={{ fontSize: 28, color: "white", fontFamily: 'Montserrat' }}>TAKE CONTROL!</Text>
              <Text style={{ fontSize: 10, color: "white", fontWeight: "bold" }}>EMPOWERING CREATORS WORLDWIDE.</Text>
              <View style={{ flexDirection: "row", marginTop: 10 }}>
                <TouchableOpacity onPress={() => navigation.navigate("register", {
                  url: videourl
                })} style={styles.joinbtn}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>Join</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => navigation.navigate("login")}
                  style={styles.signinbtn}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Swiper>

          {/* </ImageBackground> */}
        </KeyboardAvoidingView>
      </View>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
    // justifyContent: "center"
  },
  loginContainer3: {
    marginTop: deviceHeight / 3,
    paddingLeft: 20,
    backgroundColor: "black",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30
  },
  loginbtn: {
    backgroundColor: primarycolor,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
    paddingVertical: 10,
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
  joinbtn: {
    justifyContent: "center",
    backgroundColor: "#00ace9",
    alignItems: "center",
    width: "47%",
    paddingVertical: 10,
    borderRadius: 5
  },
  signinbtn: {
    marginLeft: 10,
    justifyContent: "center",
    backgroundColor: "black",
    borderColor: "#00ace9",
    borderWidth: 1,
    alignItems: "center",
    width: "45%",
    paddingVertical: 10,
    borderRadius: 5
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  loginContainer: {
    alignItems: 'center',
    paddingTop: "60%",
    height: deviceHeight,
    justifyContent: 'center',
  },
  SecondContainer: {
    marginLeft: "5%",
    position: "absolute",
    bottom: 2
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loginContainer2: {
    marginTop: deviceHeight / 2,
    paddingLeft: 20,
    backgroundColor: "black",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 30
  },
  bottomCenter: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 30
  }
});
