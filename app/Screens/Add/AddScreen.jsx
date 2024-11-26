import { Image, View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../Utils/Colors'
import * as ImagePicker from 'expo-image-picker';
import * as VideoThumbnails from 'expo-video-thumbnails';
import { useNavigation } from '@react-navigation/native';


const AddScreen = () => {

  const navigation = useNavigation();
  /* 
    Used to select video file from phone
  */
  const SelectVideoFile = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      GenerateVideoThumbnail(result.assets[0].uri);
    }
  };

  // used to genertate the thumbnail
  const GenerateVideoThumbnail = async (videoUri) => {
    try {
      const { uri } = await VideoThumbnails.getThumbnailAsync(
        videoUri,
        {
          time: 10000,
        }
      );
      navigation.navigate('preview-screen', {
        video: videoUri,
        thumbnail: uri
      })
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <View style={{
      padding: 20,
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      flex: 1,
    }}>
      <Image source={require('./../../../assets/images/cards.png')} 
        style={{
          width: 140,
          height: 140
        }}
      />
      <Text style={{
        fontFamily: 'Poppins-Regular',
        fontSize: 20,
        marginTop: 20,
      }}>Start Uploading Your Videos</Text>
      <Text style={{
        textAlign: 'center',
        marginTop: 13,
      }}>Lets start to upload your videos to benefit the community</Text>
      
      <TouchableOpacity 
        onPress={SelectVideoFile}
        style={{
          backgroundColor: Colors.BLACK,
          padding: 10,
          paddingHorizontal: 25,
          borderRadius: 99,
          marginTop: 20
        }}
      >
        <Text style={{color: Colors.WHITE}}>Select Video File</Text>
      </TouchableOpacity>
    </View>
  )
}

export default AddScreen