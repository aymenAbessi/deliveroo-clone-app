import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { MapPinIcon } from "react-native-heroicons/outline";
import { StarIcon } from "react-native-heroicons/solid";

import React from 'react'
import { urlFor } from '../sanity';
import { useNavigation } from '@react-navigation/native';


const RestaurantCard = ({
    id,title,imgUrl,rating,genre,address,short_description,dishes,long,lat
}) => {

  const navigation=useNavigation()
 const  showRestaurent =()=>{
  navigation.navigate('restaurent',{
    id,title,imgUrl,rating,genre,address,short_description,dishes,long,lat
  })
 }
  return (
    <TouchableOpacity  onPress={showRestaurent} className="bg-white mr-3 max-w-xs shadow">
       <Image 
        source={{
          uri: urlFor(imgUrl).url()
        }}
        className='h-36 w-64 self-center rounded-sm'
      />

      <View className="px-3 pb-4">
      <Text className='font-bold pt-2 text-lg'>{title}</Text>
        <View className='flex-row items-center  space-x-1'>
              
                <StarIcon color="green" size={22} opacity={0.5}/>
                <Text className="text-xs text-gray-500">
                    <Text className='text-green-500'>{rating}</Text> . {genre}
                    
                    </Text>
        </View>



       



        <View className="flex-row space-x-1 items-center">
            <MapPinIcon color="gray" size={22} opacity={0.4}/>
           
            <Text className="text-xs  text-gray-500">Nearby .{address}</Text>
        </View>
      </View>
     
    </TouchableOpacity>
  )
}

export default RestaurantCard

const styles = StyleSheet.create({})