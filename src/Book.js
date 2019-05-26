import React from 'react';
import BookCover from './bookcover';
import BookShelf from './bookshelf';
import BookDetail from './bookdetails';


function Book(props){
    
    
    const {book,onUpdateShelfHandle} = props;
    const {authors,id,imageLinks,shelf,title} = book;
    const {thumbnail} = imageLinks || 
        ({thumbnail:
            'https://d2ofpir5gh0cbr.cloudfront.net/files/2017-11/carousel-01.jpg'});
    

    const shelfHandler = (bookObj,oldShelf,newShelf) =>
            onUpdateShelfHandle(bookObj,oldShelf,newShelf);


    return(
        <div  className="book">

            <div className="book-top">
                <BookCover thumbnailURL={thumbnail} />
            
                <BookShelf id = {id} shelf = {shelf} 
                onUpdateShelfHandler ={shelfHandler}
                />
            </div>

            <BookDetail authors = {authors} title = {title} />

        </div>
    ); 
}

export default Book;