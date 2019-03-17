import React from 'react'
import Results from './results'

class Body extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            searchResults: null
        };

        this.nameList = [];

        this.setName = this.setName.bind(this);
        this.fetchNames = this.fetchNames.bind(this);
    }
    fetchNames(pageNum) {
        const component = this;
        let request = 'https://xivapi.com/character/search?name=' + this.state.name + '&key=c584bb2fc7b74c22a1fc7e0e';
        if (Number(pageNum)) {
            request = request + '&page=' + pageNum
        }
        fetch(request).then(res => res.json())
            .then((response) => {
                if (response.Pagination) {
                    let currentPage = response.Pagination.Page;
                    let nextPage = response.Pagination.PageNext;
                    component.nameList = component.nameList.concat(response.Results);
                    if (currentPage === nextPage) {
                        component.setState({searchResults: {Pagination: response.Pagination, Results: component.nameList}});
                        component.nameList = [];
                    } else {
                        component.fetchNames(nextPage);
                    }
                }
            })
    }
    setName(event) {
        this.setState({name: event.target.value});
    }
    render() {
        return (
            <div className={'content'}>
                <h2>Enter a name:</h2>
                <input onChange={this.setName}/>
                <button onClick={this.fetchNames}>Click</button>
                <Results searchTerm={this.state.name} {...this.state.searchResults}/>
            </div>
        );
    }
}

export default Body