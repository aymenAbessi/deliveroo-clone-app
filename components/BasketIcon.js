import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import Currency from 'react-currency-formatter';
import { useSelector } from 'react-redux'
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice'
import { useNavigation } from '@react-navigation/native'

const BasketIcon = () => {
    const items=useSelector(selectBasketItems)
    const navigation=useNavigation()
    const basketTotal=useSelector(selectBasketTotal)

    if(!items.length>0) return null
    
  return (
    <View className="absolute bottom-9 z-50 w-full" style={{bottom:9}} >
      <TouchableOpacity onPress={()=>navigation.navigate('basket')} className="mx-5 bg-[#00ccbb]  flex-row p-4 rounded-lg items-center space-x-1">
        <Text className="text-white font-extrabold text-lg py-1 px-2 bg-[#01a296]">{items.length}</Text>
        <Text className="flex-1 text-lg text-white text-center font-extrabold">View Basket</Text>
        <Text className="text-lg font-extrabold text-white">
            <Currency quantity={basketTotal} currency="TND"/> 
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon