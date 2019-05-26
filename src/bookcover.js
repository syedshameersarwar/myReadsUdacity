import React from 'react';

function BookCover(props){
    
    const {thumbnailURL} = props;

    return(
        <div className="book-cover" style={
         { width: 128, height: 193, backgroundImage:
         `url('${thumbnailURL}')`  }} />     
    );
}


export default BookCover;
