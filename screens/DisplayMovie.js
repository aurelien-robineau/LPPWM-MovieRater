import React, { useState, useEffect } from 'react'
import { View, Text } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const DisplayMovie = ({ route }) => {
	const [movie, setMovie] = useState(null)
	
	useEffect(() => {
		loadMovie()
	}, [])

	const loadMovie = async () => {
		try {
			const value = await AsyncStorage.getItem('@movies')
			movies = value ? JSON.parse(value) : []
		} catch(e) {
			movies = []
		}

		setMovie(movies.filter(mov => mov.id === route.params.id)[0] ?? null)
	}

	return movie && (
		<View>
			<Text>{movie.title}</Text>
		</View>
	)
}

export default DisplayMovie