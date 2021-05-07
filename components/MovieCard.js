import React from 'react'
import { StyleSheet, View, Text } from 'react-native'

const MovieCard = ({ title, rating, image }) => {
  return (
		<View style={styles.card}>
			<Text style={styles.title}>{ title }</Text>
			<Text style={styles.rating}>{ rating }</Text>
		</View>
  )
}

const styles = StyleSheet.create({
	card: {
		padding: 10,
		backgroundColor: 'white',
		marginHorizontal: 10,
		marginVertical: 5,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.22,
		shadowRadius: 2.22,

		elevation: 3,
	},

	title: {
		fontSize: 18
	},

	rating: {
		fontSize: 16
	}
})

export default MovieCard