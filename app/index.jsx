import { StatusBar } from "expo-status-bar";
import { Text, View, ScrollView, Image } from "react-native";
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";

import { images } from '../constants';
import CustomButton from "../components/customButton";

export default function App() {
    return (
        <SafeAreaView className="bg-primary h-full">
            <ScrollView contentContainerStyle={{ height: '100%' }}>
                <View className="w-full justify-center items-center min-h-[85vh] px-4">
                    <Image 
                        source={images.logo}
                        className="w-[130px] h-[84px]"
                        resizeMode="contain"
                    />

                    <Image 
                        source={images.cards}
                        className="max-w-[380px] w-full h-[380px]"
                        resizeMode="contain"
                    />

                    <View className="relative mt-5">
                        <Text className="text-3xl text-white font-bold text-center">
                            Unlock your brain with <Text className="text-secondary-200">Willple</Text>
                        </Text>

                        <Image 
                            source={images.path}
                            className={'w-[136px] h-[15px] absolute -bottom-2 -right-8'}
                            resizeMode="contain"
                        />
                    </View>

                    <Text className={"text-sm font-pregular text-gray-100 mt-7 text-center"}>
                        Empower Your Mind, Not the Scroll – Break the Cycle of Endless Content and Focus on What Matters.
                    </Text>

                    <CustomButton 
                        title="Continue"
                        handlePress={() => router.push('/home')}
                        containerStyles="w-full mt-7"
                    />
                </View>
            </ScrollView>

            <StatusBar backgroundColor="#161622" style="light"/>
        </SafeAreaView>
    );
}
