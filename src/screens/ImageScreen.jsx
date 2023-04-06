import { ActivityIndicator, Button, Image, Platform, View } from "react-native";


import * as ImagePicker from 'expo-image-picker';
import {app, storage} from '../config/firebase'
import { useEffect } from "react";
import { useState } from "react";




export default function ImageScreen() {
    if(!app.length){
        
    }
    const [image, setImage] = useState("");
    const [uploading, setUploading] = useState(false);
    
  
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');

                }
            }
        })();
    }, []);
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.canceled) {
            setImage(result.uri);
        }
    };

    const uploadImage = async () => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function () {
                reject(new TypeError('Network request failed'));
            };
            xhr.responseType = 'blob';
            xhr.open('GET', image, true);
            xhr.send(null);
        });

        const ref = storage.ref().child('images/' + new Date().getTime());
        const snapshot = ref.put(blob)

        snapshot.on(firebase.storage.TaskEvent.STATE_CHANGED, () => {
            setUploading(true);
        },
            (error) => {
                setUploading(false)
                console.log(error);
                blob.close()
                return
            },
            () => {
                snapshot.snapshot.ref.getDownloadURL().then((url) => {
                    setUploading(false)
                    console.log("download url: ", url);
                    blob.close();
                    return url;
                });
            }
        );
    };
    return (
        <View>
            <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />
            <Button title="choose picture" onPress={pickImage} />
            {!uploading ? (
            <Button title="upload" onPress={uploadImage} />
            ) :(
                <ActivityIndicator size="large" color="black"/>
            )}
        </View>
    )
}