import { TouchableOpacity, Text, View, Image } from 'react-native'
import Currency from 'react-currency-formatter';
import React, { useState } from 'react'
import { urlFor } from '../sanity';
import { MinusCircleIcon ,PlusCircleIcon} from 'react-native-heroicons/solid'
import { useDispatch, useSelector } from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItemsWithId } from '../features/basketSlice';


const DishRow = ({
    id,
    name,
    description,
    price,
    image
}) => {
  
    const[isPressed,setIsPressed]=useState(false)
    const dispatch =useDispatch()
    const items=useSelector((state)=>selectBasketItemsWithId(state,id))

    const addItemToBasket =()=>{
                dispatch(addToBasket({  id,
                    name,
                    description,
                    price,
                    image}))
    }

    const removeItemFromBasket=()=>{
        if(!items.length>0) return
        dispatch(removeFromBasket({
            id
        }))
    }

  return (<>
     <TouchableOpacity onPress={()=>setIsPressed(!isPressed)} key={id} className={`bg-white p-4 border-gray-200 ${isPressed && "border-b-0"}`}>
     
        <View className="flex-row">
           <View className="flex-1 pr-2">
                <Text className="text-lg mb-1">{name}</Text>
                    <Text className="text-gray-500">{description}</Text>
                    <Text className="text-gray-400 mt-2">
                        <Currency quantity={price} currency="TND"/>
                    </Text>
           </View>
     
      <View >
            <Image 
                source={{
                    uri:urlFor(image).url()
                }}
                className="h-20 w-20 bg-gray-300 p-4"
            />
      </View>
      </View>
    </TouchableOpacity>
    {isPressed && (
        <View className="bg-white px-4">
            <View className="flex-row items-center pb-3 space-x-2">
                <TouchableOpacity disabled={!items.length} onPress={removeItemFromBasket}>
                    <MinusCircleIcon  size={40} color={items.length>0 ? "#00ccbb" :"gray"}/> 
                </TouchableOpacity>
                    <Text>{items.length}</Text>
                <TouchableOpacity onPress={addItemToBasket}>
                    <PlusCircleIcon size={40} color="#00ccbb"/> 
                </TouchableOpacity>
            </View>
        </View>
    )}
    </>
 
  )
}

export default DishRow