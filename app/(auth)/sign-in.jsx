import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Link } from 'expo-router'
import { images} from '../../constants'
import { FormField } from '../../components'
import { CustomButton } from '../../components'
import {getCurrentUser, signIn} from '../../lib/appwrite'
import { useGlobalContext } from '../../context/GlobalProvider'
import { router } from 'expo-router'


const SignIn = () => {
  const { setUser, setIsLogged } = useGlobalContext();
  const [form, setForm] = useState({
    email: "",
    password: ""
  })

 const [isSubmitting, setIsSubmitting] = useState(false)

 const submit = async () => {
  if (!form.email || !form.password) {
    Alert.alert('Error', 'Please fill in all the fields');
    return;  // Add return to avoid further execution
  }

  setIsSubmitting(true);
  
  try {
    // Check if a session already exists
    const currentUser = await getCurrentUser();
    
    if (currentUser) {
      // If the user is already logged in, no need to create a new session
      setUser(currentUser);
      setIsLogged(true);
      router.replace('/home');
    } else {
      // If no session exists, proceed with sign-in
      await signIn(form.email, form.password);

      const result = await getCurrentUser();
      setUser(result);
      setIsLogged(true);

      router.replace('/home');
    }
  } catch (error) {
    Alert.alert('Error', error.message);
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[85vh]
        px-4 my-6">
            <Image source={images.logo} 
            resizeMode="contain"
            className="w-[115px] h-[35px]"
            />

            <Text className="text-2xl text-white
            text-semibold mt-10 font-psemibold">Log in to Aora</Text>
            <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form,
              email: e
            })}
            otherStyles="mt-7"
            keyboardType="email-address"
            />
             <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form,
              password: e
            })}
            otherStyles="mt-7"
            />

            <CustomButton 
            title="Sign-in"
            handlePress={submit}
            containerStyles="mt-7"
            isLoading= {isSubmitting}

            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-gray-100 font-pregular">
                ei ole kasutajat
              </Text>
              <Link href="/sign-up" className='text-lg font-psemibold text-secondary'>Sign-up</Link>
            </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn