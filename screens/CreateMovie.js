import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import { Icon } from 'react-native-elements'
import * as DocumentPicker from 'expo-document-picker';

import CustomButton from '../components/CustomButton'
import Movie from '../models/Movie'
import RatingInput from '../components/RatingInput';

const URL_REGEX = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[\-;:&=\+\$,\w]+@)?[A-Za-z0-9\.\-]+|(?:www\.|[\-;:&=\+\$,\w]+@)[A-Za-z0-9\.\-]+)((?:\/[\+~%\/\.\w\-_]*)?\??(?:[\-\+=&;%@\.\w_]*)#?(?:[\.\!\/\\\w]*))?)/

const CreateMovie = ({ navigation, route }) => {
	const movie = route.params?.movie ?? null

	const [title, setTitle] = useState(movie?.title ?? null)
	const [poster, setPoster] = useState(movie?.posterURI ?? null)
	const [summary, setSummary] = useState(movie?.summary ?? null)
	const [comments, setComments] = useState(movie?.comments ?? null)
	const [rating, setRating] = useState(movie?.rating ?? 0)
	const [imdbLink, setImdbLink] = useState(movie?.imdbLink ?? null)
	const [errors, setErrors] = useState({})

	const selectPoster = async () => {
		const res = await DocumentPicker.getDocumentAsync({
			type: 'image/*',
		})

		if (res.type === 'success') {
			setPoster(res.uri)
			removeError('poster')
		}
		else if (res.type !== 'cancel') {
			addErrors({ poster: "Can't load the image" })
		}
	}

	const saveMovie = async () => {
		const err = getFormErrors()

		if (Object.keys(err).length) {
			setErrors(getFormErrors())
			return
		}

		let newMovie = null
		if (!movie) {
			newMovie = new Movie(
				title,
				poster,
				summary,
				comments,
				rating,
				imdbLink
			)
		}
		else {
			movie.title = title
			movie.poster = poster
			movie.summary = summary
			movie.comments = comments
			movie.rating = rating
			movie.imdbLink = imdbLink
			newMovie = movie
		}

		await newMovie.save()
		navigation.navigate('DisplayMovie', { name: newMovie.title, id : newMovie.id })
	}

	const addErrors = (err) => {
		setErrors({...errors, ...err})
	}

	const removeError = (key) => {
		let newErrors = errors
		delete newErrors[key]

		setErrors(newErrors)
	}

	const getFormErrors = () => {
		const errors = {}
		const requiredData = { title, poster, summary, rating }
		
		for (let key in requiredData) {
			if (!requiredData[key])
				errors[key] = 'This field is required'
		}

		if (imdbLink && !imdbLink.match(URL_REGEX))
			errors.imdbLink = 'Invalid link'

		return errors
	}

	return (
		<ScrollView style={styles.container}>
			<View style={styles.formGroup}>
				<Text style={styles.label}>Title</Text>
				<TextInput
					style={styles.input}
					onChangeText={setTitle}
					value={title}
				/>
				{errors.title && <Text style={styles.inputError}>{ errors.title }</Text>}
			</View>

			<View>
				<Text style={styles.label}>Poster image</Text>
				{poster ?
					<TouchableOpacity onPress={selectPoster}>
						<Image style={styles.poster} source={{ uri: poster }} />
					</TouchableOpacity>
					:
					<TouchableOpacity
						style={styles.fileInputButton}
						onPress={selectPoster}
					>
						<Icon name="description" color="black"/>
					</TouchableOpacity>
				}
				{errors.poster &&
					<Text style={styles.inputError}>{errors.poster}</Text>
				}
			</View>

			<View style={styles.formGroup}>
				<Text style={styles.label}>Summary</Text>
				<TextInput
					style={styles.input}
					onChangeText={setSummary}
					value={summary}
					numberOfLines={5}
					multiline
				/>
				{errors.summary && <Text style={styles.inputError}>{ errors.summary }</Text>}
			</View>

			<View style={styles.formGroup}>
				<Text style={styles.label}>Comments</Text>
				<TextInput
					style={styles.input}
					onChangeText={setComments}
					value={comments}
					numberOfLines={3}
					multiline
				/>
			</View>

			<View style={styles.formGroup}>
				<Text style={styles.label}>Rating</Text>
				<RatingInput iconSize={45} onChange={setRating} value={rating}/>
				{errors.rating && <Text style={styles.inputError}>{ errors.rating }</Text>}
			</View>

			<View style={styles.formGroup}>
				<Text style={styles.label}>IMDB link</Text>
				<TextInput
					style={styles.input}
					onChangeText={setImdbLink}
					value={imdbLink}
				/>
				{errors.imdbLink && <Text style={styles.inputError}>{ errors.imdbLink }</Text>}
			</View>

			<View style={styles.createButtonContainer}>
				<CustomButton
					label="Create"
					onPress={saveMovie}
				/>
			</View>
		</ScrollView>
	)
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25
	},

	formGroup: {
		marginTop: 15
	},

	label: {
		fontSize: 20,
		marginBottom: 5
	},

	input: {
		backgroundColor: 'white',
		color: 'black',
		paddingHorizontal: 20,
		paddingVertical: 18,
		fontSize: 18,
		marginBottom: 10
	},

	inputError: {
		fontSize: 16,
		color: 'red'
	},

	poster: {
		height: 200,
		width: '100%'
	},

	fileInputButton: {
		paddingHorizontal: 30,
		paddingVertical: 20,
		backgroundColor: 'white'
	},

	createButtonContainer: {
		flex: 1,
		alignItems: 'center',
		marginBottom: 35
	}
})

export default CreateMovie