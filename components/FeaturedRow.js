import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from './RestaurantCard';
import client from '../sanity';


const FeaturedRow = ({title,description,id}) => {

  const [restaurants,setRestaurants]=useState([])

 

useEffect(()=>{
    client.fetch(`
    *[_type == 'featured' && _id==$id ] {
        
      ...,
restaurants [] -> {
...,
 dishes[] -> ,
 type -> {name}

}
 }
    `,{id:id}).then((data)=>{
      setRestaurants(data[0].restaurants)
    })
},[id])


  return (
        <View>    
              <View className="flex-row items-center justify-between mt-4 mx-4">
              <Text className="font-bold text-lg">{title}</Text>
              <ArrowRightIcon color="#00ccbb" />
            </View>

            <Text className="text-xs text-gray-500 px-4 mb-2">{description}</Text>

            <ScrollView
              horizontal
              contentContainerStyle={{
                paddingHorizontal:15
              }}
              showsHorizontalScrollIndicator={false}
            >


            {/* Restuarant card */}

            {restaurants.map(r=> <RestaurantCard  key={r._id} id={r._id} title={r.name} imgUrl={r.image} rating ={r.rating} genre={r.type?.name} address={r.address} short_description={r.short_description} dishes={[r.dishes]} long={r.long} lat={r.lat}/>
             )}

           
            </ScrollView>
        </View>

  )
}

export default FeaturedRow

const styles = StyleSheet.create({})