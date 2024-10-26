import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '../../constants';

const Home = () => {
  return (
    <SafeAreaView className="bg-primary">
      <FlatList
        data={[{ id: 1 }, { id: 2 }, { id: 3 }]} // Sample data
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="mb-4">
            <Text className="text-3xl text-white">{item.id}</Text>
          </View>
          
        )}

        // List Header Component with the Welcome Back text and logo
        ListHeaderComponent={() => (
          <View className="my-6 px-4 space-y-6">
            <View className="justify-between items-start flex-row mb-6">
              <View>
                <Text className="font-mregular text-sm text-gray-100">
                  Welcome back
                </Text>
                <Text className="text-2xl font-mbold text-white">
                  Dave
                </Text>
              </View>

              <View className="mt-1.5">
                <Image
                  source={images.logoSmall}
                  className="w-9 h-10"
                  resizeMode='contain'
                />
              </View>
            </View>
          </View>
        )}
      />
      <View>
    </View>
    </SafeAreaView>
  );
};

export default Home;
