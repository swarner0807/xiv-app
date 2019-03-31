import React from 'react'
import Results from './results'
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';

class Body extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            searchResults: null,
            firstOnly: false,
            lastOnly: false
        };

        this.nameList = [];

        this.setName = this.setName.bind(this);
        this.fetchNames = this.fetchNames.bind(this);
        this.nameToggle = this.nameToggle.bind(this);
    }
    fetchNames(pageNum) {
        const component = this;
        let request = 'https://xivapi.com/character/search?name=' + this.state.name + '&key=c584bb2fc7b74c22a1fc7e0e';
        if (Number(pageNum)) {
            request = request + '&page=' + pageNum
        }
        fetch(request).then(res => res.json())
            .then((response) => {
                let nextPage = response.Pagination.PageNext;
                component.nameList = component.nameList.concat(response.Results);
                if (nextPage) {
                    for (let i = 2; i < response.Pagination.PageTotal + 1; i++) {
                        let request = 'https://xivapi.com/character/search?name=' + this.state.name + '&key=c584bb2fc7b74c22a1fc7e0e&page=' + i;
                        fetch(request).then(res => res.json())
                            .then((response) => {
                                component.nameList = component.nameList.concat(response.Results);
                                if (!response.Pagination.PageNext) {
                                    component.setState({searchResults: {Pagination: response.Pagination, Results: component.nameList}});
                                    component.nameList = [];
                                }
                            });
                    }
                } else {
                    component.setState({searchResults: {Pagination: response.Pagination, Results: component.nameList}});
                    component.nameList = [];
                }
            })
    }
    setName(event) {
        this.setState({name: event.target.value});
    }
    nameToggle (event, radio) {
        if (radio === 'firstOnly') {
            this.setState({firstOnly: true, lastOnly: false});
        } else if (radio === 'lastOnly') {
            this.setState({firstOnly: false, lastOnly: true});
        } else {
            this.setState({firstOnly: false, lastOnly: false});
        }
    }
    render() {
        const component = this;
        return (
            <div className={'content'}>
                <div>
                    <h2>Enter a name:</h2>
                    <Input
                        placeholder="Name"
                        onChange={this.setName}
                        onKeyPress={(ev) => {
                            if (ev.key === 'Enter') {
                                component.fetchNames();
                                ev.preventDefault();
                            }
                        }}
                    />
                    <Button style={{margin: '8px'}} variant="outlined" size="small" onClick={this.fetchNames}>Search</Button>
                </div>
                <RadioGroup defaultValue={"showAll"} onChange={this.nameToggle} style={{display: 'inline'}}>
                    <FormControlLabel value="showAll" control={<Radio color={"primary"}/>} label="Show All" />
                    <FormControlLabel value="firstOnly" control={<Radio color={"primary"}/>} label="First Only" />
                    <FormControlLabel value="lastOnly" control={<Radio color={"primary"}/>} label="Last Only" />
                </RadioGroup>
                <Results firstOnly={this.state.firstOnly} lastOnly={this.state.lastOnly} searchTerm={this.state.name} {...this.state.searchResults}/>
            </div>
        );
    }
}

export default Body