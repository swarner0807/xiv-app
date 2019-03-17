import React from 'react'

class Results extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            firstOnly: false,
            lastOnly: false
        };

        this.firstOnly = this.firstOnly.bind(this);
        this.lastOnly = this.lastOnly.bind(this);
    }
    firstOnly () {
        let firstOnly = !this.state.firstOnly;
        this.setState({firstOnly: firstOnly});
    }
    lastOnly () {
        let lastOnly = !this.state.lastOnly;
        this.setState({lastOnly: lastOnly});
    }
    filterNames (list, first) {
        let names = [];
        let idx = first ? 0 : 1;
        const results = list;
        for (let i = 0; i < results.length; i++) {
            if (results[i].split(" ")[idx].toLowerCase().includes(this.props.searchTerm.toLowerCase())) {
                names.push(results[i]);
            }
        }
        return names;
    }
    render() {
        let content = <h2>Search A Name</h2>;
        if (this.props.Results) {
            let names = this.props.Results.map(function(model) {return model.Name});
            if (this.state.firstOnly) {
                names = this.filterNames(names, true);
            } else if (this.state.lastOnly) {
                names = this.filterNames(names, false);
            }
            content =
                <div>
                    First Only: <input onChange={this.firstOnly} type={"checkbox"}/>
                    Last Only: <input onChange={this.lastOnly} type={"checkbox"}/>
                    <h2>Matching Names: {this.props.Pagination.ResultsTotal}</h2>
                    <ul>
                        {names.map(function(name, index){
                            return <li key={ index }>{name}</li>;
                        })}
                    </ul>
                </div>
        }
        return (
            <div className={'content'}>
                {content}
            </div>
        );
    }
}

export default Results