import './SearchBar.css'
import React from 'react'


export class SearchBar extends React.Component {
    constructor(props) {
        super(props)
        this.search = this.search.bind(this)
        this.handleNameChange = this.handleNameChange.bind(this)
    }
    
    search() {
        this.props.onSearch(this.state.term)
    }

    handleNameChange(e) {
        this.setState({term: e.target.value})
    }
    
    render() {
        return (
        <div className="SearchBar">
            <input 
                placeholder="Enter A Song, Album, or Artist"
                onChange = {this.handleNameChange} />
            <button 
                className="SearchButton"
                onClick={this.search} >
                SEARCH
            </button>
        </div>
        )
    }
}

export default SearchBar