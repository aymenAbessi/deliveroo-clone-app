import { StyleSheet, Text, Safe, SafeAreaView, View, Image, TextInput, ScrollView, FlatList } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import { ChevronDownIcon,UserIcon,AdjustmentsVerticalIcon,MagnifyingGlassIcon } from "react-native-heroicons/outline";
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import client from '../sanity';

export default function HomeScreen() {
    const navigation=useNavigation()

    const[featuredCategory,setFeaturedCategory]=useState([])

    useEffect(()=>{
          client.fetch(`
         
           
          *[_type == 'featured'  ] {
        
            ...,
     restaurants [] -> {
    ...,
       dishes[] -> 
  
   }
             
            }
          `).then(data=>setFeaturedCategory(data))
    },[])

    useLayoutEffect(()=>{
            navigation.setOptions({
             headerShown:false  
            })
    },[])
  return (
   
        <>
        
          {/* header  */}
       
       
       <View className="flex-row pb-4 pt-5 mx-4 items-center space-x-2">
      <Image
      source={{
          uri:"https://scontent.ftun10-1.fna.fbcdn.net/v/t39.30808-1/299120429_808207113641866_9085189592573504998_n.jpg?stp=dst-jpg_s320x320&_nc_cat=106&ccb=1-7&_nc_sid=7206a8&_nc_ohc=DOyC3jz7fGsAX-SrhVc&_nc_ht=scontent.ftun10-1.fna&oh=00_AT_W3fwtYxVDbfUGwIP9ezuGdfq-rN-ba_4KhtTAXl7n9g&oe=634B96CE"
    
      }}
      className='h-7 w-7 bg-gray-300 p-4 rounded-full'
      />
         <View className='flex-1'>
      <Text className='font-bold text-gray-400 text-xs'>Deliver now !</Text>
      <Text className='font-bold text-xl'>Current location
      <ChevronDownIcon size={24} color='#00ccbb'/>
      </Text>
   

      </View>
              <UserIcon size={34} color='#00ccbb'/>
      </View>
      
         

  {/* search  */}

      <View className='flex-row items-center pb-2 mx-4 space-x-2'>
          <View className='flex-row space-x-2 flex-1 bg-gray-200 p-3'>
                  <MagnifyingGlassIcon color='#00ccbb'/>
                  <TextInput placeholder='Resturants and Cuisines' keyboardType='default'/>
          </View>
          <AdjustmentsVerticalIcon  color='#00ccbb' />
      </View>

          <ScrollView className='bg-gray-200' >
            {/* categorie */}
          
            <Categories/>
            {/* feautures row */}

            {featuredCategory.map(category=>
                 { 
                  
                  return <FeaturedRow
                  key={category._id}
                  id={category._id}
                      title={category.name}
                      description={category.short_description}
                  />}
              )}


          
      

        </ScrollView>
     
        </>
   
  )
}

