import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useUser } from '@clerk/clerk-expo'
import { supabase } from '../../Utils/supabaseConfig';
import { Image } from 'react-native';
import { FlatList } from 'react-native';
import VideoThumnailItem from './VideoThumnailItem';

const HomeScreen = () => {
  const { user } = useUser();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    user&&updateProfileImage();
    GetLatestVideoList();
  }, [user])

  const updateProfileImage = async () => {
    const { data, error } = await supabase
      .from('users')
      .update({'profileImage':user?.imageUrl})
      .eq('email', user?.primaryEmailAddress?.emailAddress)
      .is('profileImage', null)
      .select();
    }

    const GetLatestVideoList = async () => {
      const { data, error } = await supabase
        .from('PostList')
        .select('*, users!PostList_emailRef_fkey(username, profileImage)') // Explicitly specify the relationship
        .range(0, 9);
    
      if (error) {
        console.error('Error fetching videos:', error);
      } else {
        console.log('Fetched videos:', data);
        setVideoList(data);
      }
    };
    
  return (
    <View style={{padding: 50, paddingTop: 50}}>
      <View style={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Text style={{
          fontSize: 30,
          fontFamily: 'Montserrat-Bold',
        }}>Smart Pill</Text>
        <Image 
          source={{uri:user?.imageUrl}} 
          style={{
            width: 50,
            height: 50,
            borderRadius: 99
          }}
        />
      </View>
      <View>
        <FlatList 
          data={videoList}
          numColumns={2}
          renderItem={({ item, index }) => (
            <VideoThumnailItem  video={item} />
          )} 
        />
      </View>
    </View>
  )
}

export default HomeScreen;