import React, { useState } from 'react'
import { StyleSheet, View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native'
import { Icon } from 'react-native-elements'
import * as DocumentPicker from 'expo-document-picker';

import CustomButton from '../components/CustomButton'

const CreateMovie = () => {
	const [title, setTitle] = useState(null)
	const [poster, setPoster] = useState(null)
	const [summary, setSummary] = useState(null)
	const [comments, setComments] = useState(null)
	const [rating, setRating] = useState(null)
	const [imdbLink, setImdbLink] = useState(null)

	const selectPoster = async () => {
		const res = await DocumentPicker.getDocumentAsync({
			type: '*/*',
		})

		console.log(res)
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
			</View>

			<View>
				<Text style={styles.label}>Poster image</Text>
				<TouchableOpacity
					style={styles.fileInputButton}
					onPress={selectPoster}
				>
					<Icon name="description" color="black"/>
				</TouchableOpacity>
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
				<Text style={styles.label}>IMDB link</Text>
				<TextInput
					style={styles.input}
					onChangeText={setImdbLink}
					value={imdbLink}
				/>
			</View>

			<View style={styles.createButtonContainer}>
				<CustomButton
					label="Create"
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