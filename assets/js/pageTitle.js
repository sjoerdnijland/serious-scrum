import React from 'react';

class PageTitle extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "pageTitle";

        let href = "/";

        if(this.props.r2m){
            href += "r2m/chapter/";
        }

        href += this.props.seriesslug;

        return (

            <div className={containerClassName}>
                <a href={href}><p className={"author"}>{this.props.series}</p></a>
                <h1>{this.props.title}</h1>
                <p>{this.props.introduction}</p>
            </div>

        );
    }
}
window.PageTitle = PageTitle;
