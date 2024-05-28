import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CategoryCard from './CategoryCard'
import client from '../sanity'

const Categories = () => {
  const [categories,setCategories]=useState([])
  useEffect(()=>{
    client.fetch(`
    *[_type == 'category'  ] {
      ...,
               
              }
    `).then(date=>{
      setCategories(date)
    })
},[])

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}
    contentContainerStyle={{
        paddingHorizontal:15,
        paddingTop:10
    }}
    >

      {categories.map(c=><CategoryCard key={c._id} imgUrl={c.image} title={c.name}/>
)}
    
     

    </ScrollView>
  )
}

export default Categories

const styles = StyleSheet.create({})