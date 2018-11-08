import React from 'react';
import * as BooksAPI from './BooksAPI';
import './App.css';
import {Route} from 'react-router-dom';
import Search from './components/Search';
import Bookshelves from './components/Bookshelves';
import * as Utilities from './components/Utilities';


class BooksApp extends React.Component {
  state = {
    booksArray: [],
    newBook: true
  }

  componentDidMount = () => {
    if (this.state.newBook) {
      this.shelfRefresh();
    }
  }

  shelfRefresh = () => {
    // Get the books currently on the bookshelves and update the state with the
    // returned, sorted list
    BooksAPI
      .getAll()
      .then((list) => {
        this.setState({
          books: Utilities.sortBooks(list),
          newBook: false
        });
      });
  }

  bookAdded = () => {
    this.setState({"newBook": true});
  }

  changeShelf = (book, shelf) => {
    // Make the call to the service to update the shelf for the selected book to the
    // newly selected shelf
    BooksAPI
      .update(book, shelf)
      .then(response => {
        // Update the state of the book. Start with a copy of the list of books.
        let newList = this
          .state
          .books
          .slice(0);
        // Look for the book in the list. It might not be there yet.
        const books = newList.filter(listBook => listBook.id === book.id);
        if (books.length) {
          // Update the book that's already on the shelf
          books[0].shelf = shelf;
        } else {
          // Add the book to the shelf and sort the list of books again
          newList.push(book);
          newList = Utilities.sortBooks(newList);
        }
        // Update the state with the newList
        this.setState({books: newList});
      })
  }

  render = () => {
    return (
      <div className="app">
        <Route
          exact
          path='/'
          render={(() => (<Bookshelves
          books={this.state.books}
          onChangeShelf={this.changeShelf}
          onRefreshAllBooks={this.shelfRefresh}/>))}/>

        <Route
          exact
          path='/search'
          render={(() => (<Search selectedBooks={this.state.books} onChangeShelf={this.changeShelf} />))}/>

      </div>
    )
  }
}

export default BooksApp