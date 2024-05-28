import {SafeAreaView , Text, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { selectRestaurant } from '../features/restaurantSlice'
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { XCircleIcon } from 'react-native-heroicons/solid'
import { urlFor } from '../sanity'
import Currency from 'react-currency-formatter';


const BasketScreen = () => {

    const navigation =useNavigation()
    const restaurant =useSelector(selectRestaurant)
    const items=useSelector(selectBasketItems)
    const totalBasket=useSelector(selectBasketTotal)
    const dispatch=useDispatch()
    const [groupedItemsInBasket,setGroupedItemsInBasket]=useState([])

    useEffect(()=>{

      const groupedItems=items.reduce((results,item)=>{
        (results[item.id]=results[item.id]  || []).push(item)
        return results
      },{})

      setGroupedItemsInBasket(groupedItems)

    },[items])

  return (
    <SafeAreaView className="mt-8 flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xs">
          <View>
              <Text className="text-lg font-bold text-center">Basket</Text>
              <Text className="text-center text-gray-400">{restaurant.title}</Text>
          </View>
          <TouchableOpacity onPress={navigation.goBack} className="rounded-full bg-gray-100 absolute top-3 right-5">
              <XCircleIcon color="#00ccbb" height={50} width={50}/>
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image source={{
            uri:"https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-1/299120429_808207113641866_9085189592573504998_n.jpg?stp=dst-jpg_s320x320&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_ohc=DOyC3jz7fGsAX-SrhVc&_nc_ht=scontent.ftun10-1.fna&oh=00_AT_W3fwtYxVDbfUGwIP9ezuGdfq-rN-ba_4KhtTAXl7n9g&oe=634B96CE"
          }} className="h-7 w-7 rounded-full p-5 bg-gray-300"/>
          <Text className="flex-1">Deliver in 55-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
         
          {Object.entries(groupedItemsInBasket).map(([key,items])=>{

            return <View key={key} className="flex-row py-2 px-5 items-center space-x-3 bg-white">
                <Text className="text-[#00ccbb]">{items.length} x</Text>
                <Image source={{
                  uri:urlFor(items[0].image).url()

                }} className="rounded-full w-12 h-12"/>
                <Text className="flex-1">{items[0].name}</Text>
                <Text>
                  <Currency quantity={items[0]?.price} currency="TND"/>
                </Text>
                <TouchableOpacity onPress={()=>dispatch(removeFromBasket({id:key}))}>
                  <Text className="text-[#00ccbb] text-xs"  >
                    Remove
                  </Text>
                </TouchableOpacity>
            </View>
          })}
        </ScrollView>
        <View className="mt-5 bg-white space-y-4 p-5">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
            <Currency quantity={totalBasket} currency="TND"/>

            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery fee</Text>
            <Text className="text-gray-400">
            <Currency quantity={7} currency="TND"/>
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text >Order Total</Text>
            <Text className="font-extrabold">
            <Currency quantity={7+totalBasket} currency="TND"/>
            </Text>
          </View>

          <TouchableOpacity onPress={()=>navigation.navigate("preparingOrderScreen")} className="bg-[#00ccbb] p-4 rounded-lg">
            <Text className="text-center font-bold text-white text-lg">Place Order</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen