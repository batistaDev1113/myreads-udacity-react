import React, {Component} from 'react';
import ShelfMover from './ShelfMover';

class Book extends Component {

    state = {
        shelfPicker: this.props.book.shelf || "none"
    }

    render = () => {
        const bookAuthors = this.props.book.authors && this.props.book.authors.join(' | ');

        // Create thumbnail url
        let imgUrl = (this.props.book.imageLinks && `url(${this.props.book.imageLinks.thumbnail})`);

        return (
            <div className="book">
                <div className="book-top">
                    <button className="book-cover-button" onClick={(e) => this.props.onUpdateQuickView(e, this.props.book)}>
                        <div
                            className="book-cover"
                            style={{
                            width: 128,
                            height: 193,
                            backgroundImage: imgUrl
                        }}></div>
                    </button>
                    <ShelfMover book={this.props.book} onChangeShelf={this.props.onChangeShelf} />
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{bookAuthors}</div>
            </div>
        )
    }
}

export default Book;