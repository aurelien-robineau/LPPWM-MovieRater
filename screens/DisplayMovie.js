import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import Movie from './../models/Movie';

const DisplayMovie = ({ route }) => {
	const [movie, setMovie] = useState(null)
	
	useEffect(() => {
		loadMovie()
	}, [])

	const loadMovie = async () => {
		let movies = []
		try {
			const value = await AsyncStorage.getItem('@movies')
			movies = value ? JSON.parse(value) : []
		} catch(e) {
			movies = []
		}

		const JSONMovie = movies.filter(mov => mov.id === route.params.id)[0] ?? null

		if (JSONMovie) {
			setMovie(Movie.createFromJSON(JSONMovie))
		}
	}

	return movie && (
		<View>
			<Image style={styles.poster} source={{ uri: movie.posterURI }}/>
		</View>
	)
}

const styles = StyleSheet.create({
	poster: {
		width: '100%',
		height: 225
	}
})

export default DisplayMovie