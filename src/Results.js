import React from 'react';

class Results extends React.Component {
    render = () => {
        const query = this.props.state.query;
        const loading = this.props.state.loading;
        const records = this.props.state.records;
        if(query.length === 0){
            return <div></div>;

        }else if(loading){
                return (<div>Loading...</div>);
        }else if(records.length === 0){
            return <div>No records found</div>;
        }else {
            let data = localStorage.getItem("formResponses");
            data = JSON.parse(data);
            console.log(data);
            return <div>{data}</div>;
        }


    }
}
export default Results;