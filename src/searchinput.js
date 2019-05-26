import React,{Component} from 'react';
import {Link} from 'react-router-dom';

class SearchInput extends Component{

    constructor(props){
        super(props);
        this.state = {
            inputValue:''
        };
    }


    updateQuery = (e) => {
        const newQuery = e.target.value;
        
        this.setState({
            inputValue:newQuery
        });

        this.props.searchHandler(newQuery);
    }


    render(){
        return(
            <div className = 'search-books-bar'>
                <Link to = '/' className = 'close-search'>
                    Go Home
                </Link>
                
                <div className = 'search-books-input-wrapper'>
                    <input placeholder = 'Search Books' value = {this.state.inputValue}
                     type = 'text' onChange = {this.updateQuery} />
                 </div>
             </div>
        );
    }
}

export default SearchInput;