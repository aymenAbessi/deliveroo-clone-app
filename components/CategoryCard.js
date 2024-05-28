import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { urlFor } from '../sanity'

const CategoryCard = ({title,imgUrl}) => {
  return (
    <TouchableOpacity className="relative mr-2">
      <Image 
        source={{
          uri:urlFor(imgUrl).url()
        }}
        className='h-24 w-24 rounded'
      />
      <Text className='absolute bottom-4 left-1 text-white font-bold'>{title}</Text>
    </TouchableOpacity>
  )
}

export default CategoryCard

const styles = StyleSheet.create({})