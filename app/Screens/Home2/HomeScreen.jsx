import { View, Text, Image, StyleSheet, SafeAreaView, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-expo';
import { supabase } from '../../Utils/supabaseConfig';
import LessonItemButton from './LessonItemButton';

const HomeScreen = () => {
  const { user } = useUser();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      updateProfileImage();
      fetchLessons();
    }
  }, [user]);

  const updateProfileImage = async () => {
    try {
      const { error } = await supabase
        .from('users')
        .update({ profileImage: user?.imageUrl })
        .eq('email', user?.primaryEmailAddress?.emailAddress)
        .is('profileImage', null);
      if (error) console.error('Error updating profile image:', error);
    } catch (error) {
      console.error('Error in updateProfileImage:', error);
    }
  };

  const fetchLessons = async () => {
    try {
      const { data, error } = await supabase.from('lessons').select('id, title, body');
      if (error) {
        console.error('Error fetching lessons:', error);
      } else {
        setLessons(data || []);
        console.log(data);
      }
    } catch (error) {
      console.error('Error in fetchLessons:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderLessonItem = ({ item }) => {
    console.log('Rendering lesson item:', item); // Log each lesson item
    return <LessonItemButton lessonId={item.id} lessonTitle={item.title} />;
  };
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerTextContainer}>
          <Text style={styles.title}>Welcome,</Text>
          <Text style={styles.subtitle}>{user?.firstName || 'Learner'}</Text>
        </View>
        <Image source={{ uri: user?.imageUrl }} style={styles.profileImage} />
      </View>

      <View style={styles.content}>
        {loading ? (
          <ActivityIndicator size="large" color="#6c63ff" />
        ) : (
          <FlatList
            data={lessons}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderLessonItem}
            contentContainerStyle={styles.lessonList}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  headerTextContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    color: '#333',
    fontFamily: 'Montserrat-Bold',
  },
  subtitle: {
    fontSize: 16,
    color: '#6c63ff',
    fontFamily: 'Montserrat-Medium',
    marginTop: 2,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#6c63ff',
  },
  content: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  lessonList: {
    paddingVertical: 10,
  },
});

export default HomeScreen;
