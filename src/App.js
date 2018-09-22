import React from 'react'
import { Route } from 'react-router-dom' 
import './App.css'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
	render() {
		return (
			<div className="app">
				<Route path='/' render={() => (
					<BookShelf />  
				)}/>
			</div>
		)
	}
}

export default BooksApp
