import { View, Text, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native-stack'
import { Image } from 'react-native';
import { TextInput } from 'react-native';
import Colors from '../../Utils/Colors';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ScrollView } from 'react-native';
import { s3bucket } from '../../Utils/S3BucketConfig';
import { useUser } from '@clerk/clerk-expo'
import { supabase } from '../../Utils/supabaseConfig';


const PreviewScreen = () => {
  const { user } = useUser();
  const params = useRoute().params;
  const navigation = useNavigation();
  const [description, setDescription] = useState();

  useEffect(() => {
    console.log(params);
  }, []);

  const publishHandler = async () => {
    try {
      const videoUrl = await UploadFileToAws(params.video, 'video');
      const thumbnailUrl = await UploadFileToAws(params.thumbnail, 'image');
      console.log("Video URL:", videoUrl, "Thumbnail URL:", thumbnailUrl);
  
      await UploadToSupabase(videoUrl, thumbnailUrl);
    } catch (error) {
      console.error('Error in publishHandler:', error);
    }
  };
  
  const UploadToSupabase = async (videoUrl, thumbnail) => {
    try {
      const { data, error } = await supabase
        .from('PostList')
        .insert({
          created_at: new Date().toISOString(), // Ensure valid timestamp format
          videoUrl: videoUrl, // Use parameter value
          thumbnail: thumbnail, // Thumbnail URL
          emailRef: user?.primaryEmailAddress?.emailAddress,
          description: description, // Use description state
        });
  
      if (error) {
        console.error('Error inserting data into Supabase:', error);
      } else {
        console.log('Data inserted successfully:', data);
      }
    } catch (error) {
      console.error('Error in UploadToSupabase:', error);
    }
  };

  const UploadFileToAws = async (file, type) => {
    const fileType = file.split('.').pop(); // Extract file extension
    const params = {
      Bucket: 'smart-pill-app',
      Key: `smartpill-${Date.now()}.${fileType}`, // Unique file name
      Body: await fetch(file).then((resp) => resp.blob()),
      ACL: 'public-read',
      ContentType: type === 'video' ? `video/${fileType}` : `image/${fileType}`,
    };

    try {
      const data = await s3bucket.upload(params).promise();
      console.log('File uploaded successfully:', data.Location);
      return data.Location; // Return the file URL
    } catch (error) {
      console.error('Error uploading to AWS:', error);
      throw error; // Handle the error
    }
  };

  return (
    <KeyboardAvoidingView  style={{
      padding: 20,
      backgroundColor: Colors.WHITE,
      flex: '1'
    }}>
      <ScrollView style={{padding: 20}}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{display: 'flex', flexDirection: 'row', gap: 10, alignItems: 'center'}}>
          <AntDesign name="back" size={24} color="black" />
          <Text style={{fontFamily: 'Montserrat-Regular'}}>Back</Text>
        </TouchableOpacity>
        <View style={{

        }}>

        </View>
        <View style={{
          alignItems: 'center',
          marginTop: 105,
        }}>
          <Text style={{
            fontFamily: 'Montserrat-Bold',
            fontSize: 20,
          }}>Add Details</Text>
          <Image 
            source={{uri:params?.thumbnail}} 
            style={{
              width: 200,
              height: 300,
              borderRadius: 15,
              marginTop: 15
            }}
          />
          <TextInput 
            numberOfLines={3}
            placeholder='Description'
            onChangeText={(value) => setDescription(value)}
            style={{
              borderWidth: 1,
              width: '100%',
              borderRadius: 10,
              marginTop: 25,
              paddingHorizontal: 20,
              borderColor: Colors.BACKGROUND_TRANSP,
            }}
          />
          <TouchableOpacity 
            onPress={publishHandler}
            style={{
              backgroundColor: Colors.BLACK,
              padding: 10,
              paddingHorizontal: 25,
              borderRadius: 99,
              marginTop: 20
            }}
          >
            <Text style={{color: Colors.WHITE}}>Publish</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default PreviewScreen