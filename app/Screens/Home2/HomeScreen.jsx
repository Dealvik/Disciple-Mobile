import { View, Text, Image, StyleSheet,SafeAreaView, TouchableOpacity, TouchableHighlight } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { supabase } from '../../Utils/supabaseConfig';
import LessonItemButton from './LessonItemButton';

const HomeScreen = () => {
  const { user } = useUser();
  const [videoList, setVideoList] = useState([]);

  useEffect(() => {
    user && updateProfileImage();
    GetLatestVideoList();
  }, [user]);

  const updateProfileImage = async () => {
    const { data, error } = await supabase
      .from('users')
      .update({ profileImage: user?.imageUrl })
      .eq('email', user?.primaryEmailAddress?.emailAddress)
      .is('profileImage', null)
      .select();
  };

  const GetLatestVideoList = async () => {
    const { data, error } = await supabase
      .from('PostList')
      .select('*, users!PostList_emailRef_fkey(username, profileImage)')
      .range(0, 9);

    if (error) {
      console.error('Error fetching videos:', error);
    } else {
      console.log('Fetched videos:', data);
      setVideoList(data);
    }
  };


  return (
    <SafeAreaView>
      <View style={{ padding: 50, paddingTop: 50 }}>
        <View style={styles.header}>
          <Text style={styles.title}>Smart Pill</Text>
          <Image
            source={{ uri: user?.imageUrl }}
            style={styles.profileImage}
          />
        </View>
        <View>
          <LessonItemButton lesson={"Chemistry 101"} />
          <LessonItemButton lesson={"Robotics 101"} />
          <LessonItemButton lesson={"World War II History"} />
          <LessonItemButton lesson={"Arts and Entertainment"} />
          <LessonItemButton lesson={"Computers & Electronics"} />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontFamily: 'Montserrat-Bold',
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 99,
  },
});

export default HomeScreen;
