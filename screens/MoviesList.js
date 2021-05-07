import React, { useState } from 'react'
import { StyleSheet, FlatList, SafeAreaView, Text, TouchableOpacity, View, StatusBar, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'

import MovieCard from '../components/MovieCard'
import Movie from '../models/Movie'

const MoviesList = ({ navigation }) => {
	const [movies, setMovies] = useState([])

	const renderMovie = ({ item }) => {
		return <MovieCard title={item.title} rating={item.rating} />
	}
	return (
		<SafeAreaView style={styles.container}>
			{ movies.length ?
				<FlatList
					data={movies}
					renderItem={renderMovie}
					keyExtractor={item => item.id}
				/>
				:
				<View style={styles.noMoviesContainer}>
					<Text style={styles.noMoviesText}>
						No movies yet...
					</Text>
					<TouchableOpacity
						style={styles.noMoviesButton}
						onPress={() => navigation.navigate('CreateMovie')}
					>
						<Text style={styles.noMoviesButtonText}>Create one</Text>
					</TouchableOpacity>
				</View>
			}
			<TouchableOpacity
					style={styles.addMovieButtonContainer}
					onPress={() => navigation.navigate('CreateMovie')}
			>
				<Icon containerStyle={styles.addMovieButton} name="add" size={30} color="white" />
			</TouchableOpacity>
		</SafeAreaView>
	)
}

const styles = StyleSheet.create({
	container: {
		minHeight: Dimensions.get('window').height - StatusBar.currentHeight
	},

	noMoviesContainer: {
		display: 'flex',
		alignItems: 'center',
		marginTop: 50
	},

	noMoviesText: {
		fontSize: 18
	},

	noMoviesButton: {
		backgroundColor: 'black',
		paddingHorizontal: 25,
		paddingVertical: 15,
		width: '70%',
		marginTop: 20,
		borderRadius: 5
	},

	noMoviesButtonText: {
		fontSize: 18,
		color: 'white',
		textAlign: 'center'
	},

	addMovieButtonContainer: {
		position: 'absolute',
		right: 25,
		bottom: 30
	},

	addMovieButton: {
		backgroundColor: 'black',
		padding: 15,
		borderRadius: 30
	}
})

export default MoviesList