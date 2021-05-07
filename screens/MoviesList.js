import React, { useEffect } from 'react'
import { FlatList } from 'react-native'

import Movie from '../components/Movie'

const MoviesList = () => {
	const renderMovie = ({ movie }) => (
		<Movie title={movie.title} rating={movie.rating} />
	)

	return (
		<FlatList
			data={movies}
			renderItem={renderMovie}
			keyExtractor={movie => movie.imdbID}
		/>
	)
}

export default MoviesList