import React from 'react';

function BookDetail(props){
    
    const {title,authors} = props;

    return(
        <div>
            <div  className="book-title">{title}</div>

            <div className="book-authors">
                {(authors && authors.length> 0)?
                (authors.join(', ')):'Unknown Author'}
            </div>
        </div>
    );
}


export default BookDetail;