import React from 'react';
import Book from './Book';

function Shelf(props){

    const {books,name, onUpdateShelf} = props;
    
    const onUpdateShelfHandler = (bookObj,oldShelf,newShelf) => 
        onUpdateShelf(bookObj,oldShelf,newShelf);
     

    return(

        <div className="bookshelf">   

            <h2 className="bookshelf-title">{name}</h2>

            <div className="bookshelf-books">
                
                <ol className="books-grid">
                    
                    {books.length>0 && (books.map(bookObj => (
                        <li key = {bookObj.id}>
                            <Book book = {bookObj} onUpdateShelfHandle =
                            {onUpdateShelfHandler} />
                        </li> )
                    ))}

                </ol>

            </div>

        </div>
    );

}




export default Shelf;