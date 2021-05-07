import React, { useEffect, useState } from 'react'
import { FlatList } from 'react-native'

import MovieCard from '../components/MovieCard'
import Movie from '../models/Movie'
import OMBdAPI from '../services/OMBdAPI'

const MoviesList = () => {
	const [movies, setMovies] = useState([])

	useEffect(() => {
		OMBdAPI.getMovieByName('avatar')
			.then(res => setMovies([
				...movies,
				new Movie(res.Title, res.imdbRating, res.poster)
			]))
		OMBdAPI.getMovieByName('baby_driver')
			.then(res => setMovies([
				...movies,
				new Movie(res.Title, res.imdbRating, res.poster)
			]))
	}, [])

	const renderMovie = ({ movie }) => (
		<MovieCard title={movie.title} rating={movie.rating} />
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