import AsyncStorage from '@react-native-async-storage/async-storage'

export default class Movie {
	constructor(title, posterURI, summary, comments, rating, imdbLink, id = null) {
		this.id        = id ?? null
		this.title     = title
		this.posterURI = posterURI
		this.summary   = summary
		this.comments  = comments
		this.rating    = rating
		this.imdbLink  = imdbLink
	}

	static createFromJSON(JSON) {
		return new Movie(
			JSON.title,
			JSON.posterURI,
			JSON.summary,
			JSON.comments,
			JSON.rating,
			JSON.imdbLink,
			JSON.id
		)
	}

	async save () {
		const value = await AsyncStorage.getItem('@movies')
		const movies = value ? JSON.parse(value) : []

		if (this.id === null) {
			const lastId = (await Movie.getLastId()) + 1
			this.id = lastId
			await Movie.setLastId(lastId)
		}

		movies.push(this)
		await AsyncStorage.setItem('@movies', JSON.stringify(movies))
	}

	static async getById(id) {
		const value = await AsyncStorage.getItem('@movies')
		const movies = value ? JSON.parse(value) : []

		const JSONMovie = movies.filter(movie => movie.id === id)[0] ?? null

		if (JSONMovie) {
			return Movie.createFromJSON(JSONMovie)
		}

		return null
	}

	static async getAll() {
		try {
			const value = await AsyncStorage.getItem('@movies')
			if (value) {
				return JSON.parse(value).map(movie => Movie.createFromJSON(movie))
			}
		} catch(e) {
			return []
		}

		return []
	}

	static async getLastId() {
		return (await AsyncStorage.getItem('@lastMovieId')) ?? null
	}

	static async setLastId(id) {
		await AsyncStorage.setItem('@lastMovieId', id)
	}
}