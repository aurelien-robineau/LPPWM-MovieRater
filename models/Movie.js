export default class Movie {
	static lastId = 0

	constructor(title, posterURI, summary, comments, rating, imdbLink, id = null) {
		this.id        = id === null ? Movie.lastId++ : id
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
}