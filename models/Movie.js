export default class Movie {
	static lastId = 0

	constructor(title, posterURI, summary, comments, rating, imdbLink) {
		this.id        = Movie.lastId++
		this.title     = title
		this.posterURI = posterURI
		this.summary   = summary
		this.comments  = comments
		this.rating    = rating
		this.imdbLink  = imdbLink
	}
}