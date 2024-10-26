import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, ScrollView, Image } from "react-native";
import { Link } from "expo-router"
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, router } from "expo-router";

import { images } from '../constants';
import CustomButton from "../components/customButton";
import SignIn from "./(auth)/sign-in";
import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/clerk-expo'
import * as SecureStore from 'expo-secure-store';
import HomeScreen from "./Home/homeScreen";

const ExpoSecureStore = {
  setItem: (key, value) => SecureStore.setItemAsync(key, value),
  getItem: (key) => SecureStore.getItemAsync(key),
  removeItem: (key) => SecureStore.deleteItemAsync(key),
};


export default function App() {
    return (
        // <SafeAreaView className="bg-primary h-full">
        //     <ScrollView contentContainerStyle={{ height: '100%' }}>
        //         <View className="w-full justify-center items-center min-h-[85vh] px-4">
        //             <Image 
        //                 source={images.logo}
        //                 className="w-[130px] h-[84px]"
        //                 resizeMode="contain"
        //             />

        //             <Image 
        //                 source={images.cards}
        //                 className="max-w-[380px] w-full h-[380px]"
        //                 resizeMode="contain"
        //             />

        //             <View className="relative mt-5">
        //                 <Text className="text-3xl text-white font-bold text-center">
        //                     Unlock your brain with <Text className="text-secondary-200">Willple</Text>
        //                 </Text>

        //                 <Image 
        //                     source={images.path}
        //                     className={'w-[136px] h-[15px] absolute -bottom-2 -right-8'}
        //                     resizeMode="contain"
        //                 />
        //             </View>

        //             <Text className={"text-sm font-pregular text-gray-100 mt-7 text-center"}>
        //                 Empower Your Mind, Not the Scroll – Break the Cycle of Endless Content and Focus on What Matters.
        //             </Text>

        //             <CustomButton 
        //                 title="Continue"
        //                 handlePress={() => router.push('/sign-in')}
        //                 containerStyles="w-full mt-7"
        //             />
        //         </View>
        //     </ScrollView>

        //     <StatusBar backgroundColor="#161622" style="light"/>
        // </SafeAreaView>

        <ClerkProvider 
          publishableKey={process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY}
          tokenCache={ExpoSecureStore}  // Add ExpoSecureStore here
        >
            <View style={{ flex: 1 }}>
                <SignedIn>
                    <HomeScreen />
                </SignedIn>
                <SignedOut>
                    <SignIn />
                </SignedOut>
            </View>
        </ClerkProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
    }
})