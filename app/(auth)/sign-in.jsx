import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Video, ResizeMode } from 'expo-av';
import { Button } from '@rneui/themed';
import * as WebBrowser from 'expo-web-browser'
import { useWarmUpBrowser } from '../hooks/useWarmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';
 
WebBrowser.maybeCompleteAuthSession();

export default function SignIn() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } = 
        await startOAuthFlow();

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signin or signUp for next steps such as MFA
      }
    } catch (err) {
      console.log("OAauth error", err);
    }
  }, []);

  return (
    <View style={{flex: 1, }}>
      <Video 
        style={styles.video}
        source={{
          uri:'https://cdn.pixabay.com/video/2020/05/03/37956-415950506_large.mp4',
        }}
        shouldPlay
        resizeMode='cover'
        isLooping={true}
      />
      <View style={{
        display: 'flex',
        alignItems: 'center',
        paddingTop: 100,
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#0000005c',
      }}>
        <Text 
          style={{
            fontFamily: 'Montserrat-Bold',
            color: '#fff',
            fontSize: 35
          }}
          >Smart Pill</Text>
          <Text style={{
            fontFamily: 'Montserrat-Regular',
            color: '#fff',
            fontSize: 17,
            textAlign: 'center',
            marginTop: 15
          }}>Empower Your Mind, Not the Scroll – Break the Cycle of Endless Content and Focus on What Matters.</Text>
          
          <Button
            onPress={onPress}
            title="Log in with Google"
            buttonStyle={{
              borderColor: '#fff',
            }}
            type="outline"
            titleStyle={{ color: '#fff' }}
            containerStyle={{
              width: 200,
              marginHorizontal: 50,
              marginVertical: 10,
            }}
            />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  video: {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
})
