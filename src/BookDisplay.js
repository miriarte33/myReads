import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookDisplay extends Component {
	static propTypes = {
		book: PropTypes.object.isRequired, 
		style: PropTypes.object, 
		update: PropTypes.func
	}

	state = {
		value: this.props.book.shelf ? this.props.book.shelf : 'none' 
	}

	updateBookShelf = event => {
		let book = this.props.book
		this.props.update(book, event.target.value)
	} 

	render() {
		const { book } = this.props 
		const { style } = this.props
		return (
			<li key={book.title}>
				<div className="book">
					<div className="book-top">
						<div className="book-cover" style={style}></div>
						<div className="book-shelf-changer">
							<select onChange={this.updateBookShelf} value={this.state.value}>
								<option value="move" disabled>Move to...</option>
								<option value="currentlyReading">Currently Reading</option>
								<option value="wantToRead">Want to Read</option>
								<option value="read">Read</option>
								<option value="none">None</option>
							</select>
						</div>
					</div>
					<div className="book-title">{book.title}</div>
					<div className="book-authors">{book.authors != null && (book.authors.map(author => <div key={author}>{author}</div>))}</div>
				</div>
			</li>
		)
	}
}

export default BookDisplay
