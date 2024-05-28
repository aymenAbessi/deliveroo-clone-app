import { View, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { XMarkIcon } from 'react-native-heroicons/outline'
import * as Progress from 'react-native-progress';
import MapView ,{Marker} from "react-native-maps"


const DeliveryScreen = () => {

    const navigate=useNavigation()
    const restaurant=useSelector(selectRestaurant)
  return (
    <View className="bg-[#00ccbb] flex-1">
        <SafeAreaView className="mt-7 z-50">
            <View className="flex-row justify-between p-4">
                <TouchableOpacity onPress={()=>navigate.navigate('home')}>
                    <XMarkIcon color="white" size={35}/>
                </TouchableOpacity>
                <Text className="font-light text-lg text-white">Order help</Text>
            </View>
            <View className="bg-white mx-5 rounded-md my-2 z-50 shadow-md p-6">
            <View className="flex-row justify-between">
                <View >
                    <Text className="text-lg text-gray-400">Estimeted Arrival</Text>
                    <Text className="text-4xl font-bold">45-55 Minutes</Text>
                   
                </View>
               
                </View>
            <Progress.Bar indeterminate={true} size={30} color="#00ccbb"/>
            <Text className="mt-3 text-gray-500">
                Your order is preparing from {restaurant.title}
            </Text>
            </View>
        </SafeAreaView>
        <MapView
        initialRegion={{
            latitude:restaurant.lat,
            longitude:restaurant.long,
            latitudeDelta:0.005,
            longitudeDelta:0.005

        }}
        mapType="mutedStandard"
        className="flex-1 z-0 -mt-10"
        >
            <Marker
                title={restaurant.title}
                coordinate={{
                    latitude:restaurant.lat,
                    longitude:restaurant.long
                }}
                description={restaurant.short_description}
                identifier="origin"
                pinColor='#00ccbb'
            />

        </MapView>








        <SafeAreaView className="flex-row bg-white items-center space-x-5 h-20">
           {/**img */}
            <View className="flex-1">
                <Text className="text-lg">
                    Aymen Abassi
                </Text>
                <Text className="text-gray-400">
                    Your rider
                </Text>
            </View>
            <Text className="text-[#00ccbb] text-lg mr-5 font-bold">Call</Text>
        </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen