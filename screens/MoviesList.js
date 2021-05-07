import React, { useEffect, useState } from 'react'
import { StyleSheet, FlatList, SafeAreaView, Text } from 'react-native'

import MovieCard from '../components/MovieCard'
import Movie from '../models/Movie'
import OMBdAPI from '../services/OMBdAPI'

const MoviesList = () => {
	const [movies, setMovies] = useState([])

	// useEffect(() => {
	// 	OMBdAPI.getMovieByName('avatar')
	// 		.then(res => setMovies([
	// 			...movies,
	// 			new Movie(res.data.imdbID, res.data.Title, res.data.imdbRating, res.data.Poster)
	// 		]))
	// 	OMBdAPI.getMovieByName('baby_driver')
	// 		.then(res => setMovies([
	// 			...movies,
	// 			new Movie(res.data.imdbID, res.data.Title, res.data.imdbRating, res.data.Poster)
	// 		]))
	// }, [])

	const renderMovie = ({ item }) => {
		return <MovieCard title={item.title} rating={item.rating} />
	}
	return (
		<SafeAreaView>
			{ movies.length ?
				<FlatList
					data={movies}
					renderItem={renderMovie}
					keyExtractor={item => item.id}
				/>
				:
				<Text style={styles.noMovies}>
					No movies yet...
				</Text>
			}
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	noMovies: {
		fontSize: 18,
		textAlign: 'center',
		marginTop: 50
	}
})

export default MoviesList