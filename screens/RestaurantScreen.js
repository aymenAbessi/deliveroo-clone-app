import { ScrollView, llView, Text, Image, View, TouchableOpacity } from 'react-native'
import React, { useEffect, useLayoutEffect } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { urlFor } from '../sanity'
import { ArrowLeftIcon ,
  ChevronRightIcon,
  MapPinIcon,
  
} from 'react-native-heroicons/outline'

import { QuestionMarkCircleIcon,StarIcon } from 'react-native-heroicons/solid'
import DishRow from '../components/DishRow'
import BasketIcon from '../components/BasketIcon'
import { useDispatch } from 'react-redux'
import { setRestaurant } from '../features/restaurantSlice'

const RestaurantScreen = () => {

    const {params:{
        id,title,imgUrl,rating,genre,address,short_description,dishes,long,lat}} =useRoute()
    const navigation=useNavigation()
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(setRestaurant({
          id,title,imgUrl,rating,genre,address,short_description,dishes,long,lat
        }))
    },[dispatch])
    

   
    useLayoutEffect(()=>{
        navigation.setOptions({
         headerShown:false
        })
    },[])
  return (
    <>
     <BasketIcon/>
    <ScrollView >
   
      <View className="relative">
     
        <Image 
          source={{
            uri: urlFor(imgUrl).url()
          }}
         className='w-full h-56 bg-gray-400 p-4'
        />
        <TouchableOpacity onPress={navigation.goBack} className="absolute top-14 left-4 bg-white rounded-full">
          <ArrowLeftIcon size={30} color="#00ccbb" />
        </TouchableOpacity>
      </View>

      <View className="bg-white">

            <View className="px-4 pt-4">
                <Text className="text-3xl font-bold">{title}</Text>
                <View className="flex-row my-1 space-x-2">
                      <View className='flex-row items-center flex-wrap  space-x-1'>
                            <StarIcon color="green" size={22} opacity={0.5}/>
                            <Text className="text-xs text-gray-500"><Text className='text-green-500'>{rating}</Text> . {genre}</Text>
                           
                              <MapPinIcon color="gray" size={22}/>
                              <Text className="text-xs  text-gray-500">Nearby .{address}</Text>
                            
                      </View>
                </View>

                <Text className="text-gray-500 pb-2 mt-4">{short_description}</Text>
            </View>
            <TouchableOpacity className="flex-row items-center space-x-2 p-4 border-y border-gray-200">
              <QuestionMarkCircleIcon size={20} opacity={0.6} color="gray"/>
              <Text className="pl-2 flex-1 text-md font-bold"> Have a food allergy ?</Text>
              <ChevronRightIcon color="#00ccbb"/>
            </TouchableOpacity>
      </View>
      <View className="pb-36">
     
          <Text className="text-xl pt-6 ml-3 px-4 font-bold">
              Menu
          </Text>
          {/** dishes */}
          {dishes[0].map((d)=> <DishRow
                key={d._id}
                id={d._id}
                name={d.name}
                description={d.short_description}
                price={d.price}
                image={d.image}
          
          />)}
      </View>
    </ScrollView>
    </>
  )
}

export default RestaurantScreen