import React, { Component } from 'react'
import * as BooksAPI from './BooksAPI'
import BookDisplay from './BookDisplay'
import Search from './Search'
import { Switch, Link, Route } from 'react-router-dom'

class BookShelf extends Component {
	state = {
		books: []
	}

	componentDidMount() {
		this.getAllBooks()
	}

	updateList = (book, shelf) => {
		BooksAPI.update({id: book.id}, shelf).then((shelfList) => {
			this.getAllBooks(); 
		})
	}

	getAllBooks = () => {
		BooksAPI.getAll().then((books) => {
			this.setState({ books })
		}).catch(err => {return ['promise failed']})
	}

	render() {
		const { books } = this.state; 

		function style(image) {
			return {
				width: 128,
				height: 193, 
				backgroundImage: `url(${image})` 
			}
		}		


		return (
			<div>
				<Switch>
					<Route exact path='/' render={() => (
						<div className="bookshelf">
							<h2 className="bookshelf-title">Currently Reading</h2>
							<div className="bookshelf-books">
								<ol className="books-grid">
									{books.map( book => 
										{ return book.shelf === 'currentlyReading' && (
											<BookDisplay key={book.title} update={this.updateList} book={book} style={style(book.imageLinks.smallThumbnail)}/>
										)}
									)}
								</ol>
							</div>
							<h2 className="bookshelf-title">Want to Read</h2>
							<div className="bookshelf-books">
								<ol className="books-grid">
									{books.map( book => 
										{ return book.shelf === 'wantToRead' && (
											<BookDisplay key={book.title} update={this.updateList} book={book} style={style(book.imageLinks.smallThumbnail)}/>
										)}
									)}
								</ol>
							</div>
							<h2 className='bookshelf-title'>Read</h2>
							<div className="bookshelf-books">
								<ol className="books-grid">
									{books.map( book => 
										{ return book.shelf === 'read' && (
											<BookDisplay key={book.title} update={this.updateList} book={book} style={style(book.imageLinks.smallThumbnail)}/>
										)}
									)}
								</ol>
							</div>
							<div className='open-search'>
								<Link to='/search'>Add a Book</Link>
							</div>
						</div>	
					)} />
				<Route exact path='/search' render={() => (
					<Search books={books} updateList={this.updateList}/>
				)} />
			</Switch>
			
		</div>
		)
	}
}

export default BookShelf
