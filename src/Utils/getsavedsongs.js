
import React,{useEffect,useState} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";


export const Getsavedsongs= () =>{

    const [songs, setsongs] = useState([]);

    useEffect(() => {
        const checkdraft = async () => {
            try {
                const value = await AsyncStorage.getItem('songssaved')
                if (value !== null) {
                    const gh = JSON.parse(value);
                    setsongs(gh)
                }
            } catch (e) {
                console.log(e)
            }
        }
        checkdraft()
    }, []);

    return songs;
}

   