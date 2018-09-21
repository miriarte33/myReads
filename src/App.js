import React from 'react'
import { Route, Link } from 'react-router-dom' 
import './App.css'
import Search from './Search'
import BookShelf from './BookShelf'

class BooksApp extends React.Component {
	render() {
		return (
			<div className="app">
				<Route exact path='/search' render={() => (
					<Search />
				)} />
				<Route exact path='/' render={() => (
					<BookShelf />  
				)}/>
				<div className='open-search'>
					<Link to='/search'>Add a Book</Link>
				</div>
			</div>
		)
	}
}

export default BooksApp
