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
		this.setState({query})
		this.searchBooks(this.state.query); 
	}

	searchBooks = (name) => {
		BooksAPI.search(name).then(books => {
			books.length > 0 ? this.setState({books}) : this.setState({books: []})
		}).catch(err => this.setState({books: []}))
	}

	updateList = (book, shelf) => {
		BooksAPI.update({id: book.id}, shelf).then((shelfList) => {
			console.log(shelfList)
		})
	}


	render() {
		console.log(this.state.query)
		console.log(this.state.books)

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
								<BookDisplay update={this.updateList} book={book} key={index} style={book.imageLinks && (style(book.imageLinks.smallThumbnail))}/>
							)
						})}
					</ol>
				</div>
			</div>
		)
	}
}

export default Search
