import React from 'react';

function BookShelf(props){

    const handleChange = (e) => {
        const {id,shelf,onUpdateShelfHandler} = props;
        const newShelf = e.target.value;
        
        onUpdateShelfHandler({id},shelf,newShelf);
    }


    return(
        <div className="book-shelf-changer">

            <select defaultValue={props.shelf} onChange = {handleChange}>
                <option disabled >Move to...</option>
                <option value = '' ></option>
                <option value = 'currentlyReading'>Currently Reading</option>
                <option value = 'wantToRead'>Want to Read</option>
                <option value = 'read'>Read</option>
                <option value = 'none'>None</option>
            </select> 

        </div>
    );
}
export default BookShelf;