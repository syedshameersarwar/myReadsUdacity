import React,{Component} from 'react';
import {Route,Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Shelf from './shelf';
import Search from './search';
import './App.css';


class App extends Component{
  

    constructor(props){
        super(props);
        this.state = {
          books:[],
          currentlyReading:[],
          read:[],
          wantToRead:[]
        };
    }


    static categorizeBooks = (books) => {

      const currentlyReading = books.filter(bookObj =>
                    (bookObj.shelf === 'currentlyReading'));
      const wantToRead = books.filter(bookObj => 
                    (bookObj.shelf === 'wantToRead'));
      const read = books.filter(bookObj => 
                    (bookObj.shelf === 'read'));
  
      return {currentlyReading,wantToRead,read};
    }


    fetchBooks = () => {
        BooksAPI.getAll()
          .then(books => {
                const {currentlyReading,wantToRead,read} = 
                                          App.categorizeBooks(books);
                this.setState({
                    books:books,
                    currentlyReading:currentlyReading,
                    wantToRead:wantToRead,
                    read:read
                });
            }     
         );
    }

  
    componentDidMount() {
        this.fetchBooks();     
    }


    updateShelfLocal = (bookObj,oldShelf,newShelf) => {

        if (newShelf === 'none'){
          this.setState((prevState) => ({
                [oldShelf]:prevState[oldShelf].filter(book =>
                                               book.id !== bookObj.id)
            }));
        }
        else {
            const [extractBook] = this.state[oldShelf].filter(book =>
                                               book.id === bookObj.id);
            extractBook.shelf = newShelf;

            this.setState((prevState) => ({
                [newShelf]:[...prevState[newShelf],extractBook],
                [oldShelf]:prevState[oldShelf].filter(book => 
                                                  book.id !== bookObj.id)
            }));
        }
      this.updateShelfOnly(bookObj,newShelf);
    }


    updateShelfOnly = (bookObj,shelf) => {
      BooksAPI.update(bookObj,shelf)
          .then(res => console.log(res));
    }
  
    
    updateShelfRemote = (bookObj,oldShelf,newShelf) => {  
        this.updateShelfOnly(bookObj,newShelf);
        
        BooksAPI.get(bookObj.id)
          .then(extractBook => {
            extractBook.shelf = newShelf;
            
            this.setState(prevState => {
              const newBooks = prevState.books.filter(book =>
                    book.id !== bookObj.id).concat(extractBook);
              
                    const {currentlyReading,wantToRead,read} =
                                    App.categorizeBooks(newBooks);
                    return ({
                      books:newBooks,
                      currentlyReading:currentlyReading,
                      wantToRead:wantToRead,
                      read:read
                    });
            });
          });
    } 


    render(){
        
        const {books,currentlyReading,wantToRead,read} = this.state;
    

        return(
            <div className = 'App'>

              <Route exact path = '/' render = {() =>(
                <div className='list-books'>

                  <div className="list-books-title">
                      <h1>MyReads</h1>
                  </div> 
                  
                  <div className="list-books-content">

                    <div>
                      <Shelf books = {currentlyReading} 
                       name = 'Currently Reading'
                       onUpdateShelf = {this.updateShelfLocal} />

                      <Shelf books = {wantToRead} 
                       name = 'Want to Read'
                       onUpdateShelf = {this.updateShelfLocal} />

                      <Shelf books = {read} 
                       name = 'Read'
                       onUpdateShelf = {this.updateShelfLocal} />
                     </div>
                     
                  </div>

                  <div className="open-search">
                      <Link className="open-search" to = '/search'>
                        <button>
                          Add Book
                        </button>
                      </Link>
                  </div>

                 </div>
                )
              } />


              <Route path = '/search' render = {() => 
                <Search onUpdateShelf = {this.updateShelfRemote} 
                 existingBooks = {books} />
              } />

            </div>
        );
    }


}


export default App;
