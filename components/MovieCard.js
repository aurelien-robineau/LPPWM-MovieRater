import React from 'react'
import { View, Text } from 'react-native'

const Movie = ({ title, image, rating}) => {
  return (
	  <View>
		  <Text>{ title }</Text>
		  <Text>{ rating }</Text>
	  </View>
  )
}

export default Movie