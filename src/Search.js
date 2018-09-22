import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import BookDisplay from './BookDisplay'
import * as BooksAPI from './BooksAPI'

class Search extends Component {
	state = {
		query: '', 
		books: []
	}

	updateQuery = query => {
		this.searchBooks(query); 
	}

	searchBooks = (name) => {
		this.setState({query: name})
		BooksAPI.search(name).then(books => {
			books.map(book => {
				return this.props.books.map(propsBook => {
					if (book.title === propsBook.title && book.authors[0] === propsBook.authors[0])
						return book.shelf = propsBook.shelf
					return null 
				})
			})
			if (name === this.state.query) {// ensures we dont replace contents of old response
				books.length > 0 ? this.setState({books}) : this.setState({books: []})
			}
		}).catch(err => this.setState({books: []}))
	}

	render() {
		function style(image) {
			return {
				width: 128,
				height: 193,
				backgroundImage: `url(${image})`
			}
		}

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link to='/' className='close-search'>Close</Link>
					<div className="search-books-input-wrapper">
						<input 
							type="text" 
							value={this.state.query} 
							onChange={event => this.updateQuery(event.target.value)} 
							placeholder="Search by title or author"/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.books.map((book, index) => {
							return this.state.query && (
								<BookDisplay update={this.props.updateList} book={book} key={index} style={book.imageLinks && (style(book.imageLinks.smallThumbnail))}/>
							)
						})}
					</ol>
				</div>
			</div>
		)
	}
}

export default Search
