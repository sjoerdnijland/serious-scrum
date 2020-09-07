import React from 'react';

class PageTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "pageTitle";

        return (

            <div className={containerClassName}>
                <p className={"author"}>{this.props.author}</p>
                <h1>{this.props.title}</h1>
                <p>{this.props.introduction}</p>
            </div>

        );
    }
}
window.PageTitle = PageTitle;
