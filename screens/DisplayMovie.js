import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, Image } from 'react-native'

import RatingView from '../components/RatingView'
import Movie from '../models/Movie'

const DisplayMovie = ({ route }) => {
	const [movie, setMovie] = useState(null)
	
	useEffect(() => {
		loadMovie()
	}, [])

	const loadMovie = async () => {
		setMovie(await Movie.getById(route.params.id))
	}

	return movie && (
		<View>
			<Image style={styles.poster} source={{ uri: movie.posterURI }} />

			<View style={styles.container}>
				<View style={styles.ratingWrapper}>
					<RatingView iconSize={35} value={movie.rating} />
				</View>

				<Text style={styles.value}>{ movie.summary }</Text>

				<Text style={styles.label}>My comments</Text>
				<Text style={styles.value}>{ movie.comments }</Text>

				<Text style={styles.label}>IMDB link</Text>
				<Text style={styles.value}>{ movie.imdbLink }</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 10
	},

	ratingWrapper: {
		maxWidth: '60%',
		marginTop: 10
	},

	poster: {
		width: '100%',
		height: 225
	},

	label: {
		fontSize: 20,
		marginTop: 20
	},

	value: {
		fontSize: 18,
		marginTop: 5
	}
})

export default DisplayMovie