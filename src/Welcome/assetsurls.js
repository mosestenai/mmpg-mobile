// import { Asset } from "expo-asset";

// await Asset.fromModule(require('./../../assets/videos/Welcome.mp4')).downloadAsync();

const images = {
    firstvideo: {
        uri: require('./../../assets/videos/Welcome.mp4')
    },
    getstartedvideo: {
        uri: require('./../../assets/videos/Join.mp4')
    },
    membershipplan: {
        uri: require("./../../assets/videos/producer.mp4")
    }
}

export { images }; 