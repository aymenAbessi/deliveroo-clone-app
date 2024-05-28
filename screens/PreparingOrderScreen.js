import { SafeAreaView, eaView, Text } from 'react-native'
import * as Animatable from 'react-native-animatable';
import React, { useEffect } from 'react'
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';

const PreparingOrderScreen = () => {

    const navigation=useNavigation()
    useEffect(()=>{
            setTimeout(()=>{
                    navigation.navigate('delivery')
            },4000)
    },[])

  return (
    <SafeAreaView className="bg-white flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/delivery-boy.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-80 w-full"
      />

      <Animatable.Text
       animation="slideInUp"
       iterationCount={1}
       className="text-lg text-[#00ccbb] text-center font-bold my-10"
      >
        Delivery boy is coming 
      </Animatable.Text>
      <Progress.Circle size={60} indeterminate={true} color='#00ccbb'/>
    </SafeAreaView>
  )
}

export default PreparingOrderScreen