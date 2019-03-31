import React from 'react'
import InfoOutlined from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';

class Results extends React.Component{
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
            if (this.props.firstOnly) {
                names = this.filterNames(names, true);
            } else if (this.props.lastOnly) {
                names = this.filterNames(names, false);
            }
            let infoText = 'The maximum number of results is 1000. If more matches exist only the first thousand will be displayed';
            content =
                <div>
                    <h2>Matching Names: {this.props.Pagination.ResultsTotal} <Tooltip title={infoText}><InfoOutlined fontSize={'small'}/></Tooltip></h2>
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