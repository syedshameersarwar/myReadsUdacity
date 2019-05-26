import React,{Component} from 'react';
import * as BooksAPI from './BooksAPI';
import Book from './Book'
import SearchInput from './searchinput';


class Search extends Component{


    constructor(props){
        super(props);
        this.state = {
            searchedBooks:[],
            error:false
        };
    }


    static shelfizedBooks = (booksArray,existingBooks) => {
        const modifiedBooksArray = [];

        for(let book of booksArray){
            let found = false;
            for(let existingBook of existingBooks)
                if (book.id === existingBook.id){
                    book.shelf = existingBook.shelf;
                    found = true;
                    break;
                }
            
            if(!found)
                book.shelf = 'none';
                        
            modifiedBooksArray.push(book);    
        }

        return modifiedBooksArray;
    }


    handleQuery = (query) => {
        if (query === '')
            return;
        
        const {existingBooks} = this.props;

        BooksAPI.search(query.trim())
            .then(booksArray => {
                const {error} = booksArray;
                
                if(error){
                    this.setState({
                        error:true
                    });
                    return;
                }

                const modifiedBooksArray = 
                                Search.shelfizedBooks(booksArray,existingBooks)

                this.setState(prevStat => ({searchedBooks:modifiedBooksArray,
                    error:prevStat.error?false:prevStat.error}));

            });
    }


    shelfHandler = (bookObj,oldShelf,newShelf) => {
        const {onUpdateShelf} = this.props;
        onUpdateShelf(bookObj,oldShelf,newShelf);
    }


    render(){
        const {existingBooks} = this.props;
        const {searchedBooks,error} = this.state;

        const modifiedSearchBooks = 
                        Search.shelfizedBooks(searchedBooks,existingBooks)
        

        return(
            <div className = 'search-books'> 

                <SearchInput searchHandler = {this.handleQuery} />
                {!error? (
                <div className="search-books-results">
                    
                    <ol className="books-grid">
                        {modifiedSearchBooks.length>0 && 
                        (modifiedSearchBooks.map(bookObj => (
                            <li key = {bookObj.id}>
                                <Book  book = {bookObj} onUpdateShelfHandle =
                                 {this.shelfHandler} />
                             </li>)
                        ))}
                    </ol>

                </div>):(
                    <div className="search-books-results">

                        <h2 className="bookshelf-title"
                            style = {{textAlign:'center',color:'red'}}>
                            No relevant books found
                        </h2>

                    </div>
                )
                }
            </div>
        );
    }
}


export default Search;