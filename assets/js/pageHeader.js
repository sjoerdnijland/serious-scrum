import React from 'react';

class PageHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const functions = this.props.functions;

        const ContainerClassName = "header row";
        const src = "/images/serious-scrum-logo.svg";

        return (
            <div className={ContainerClassName} >
                <div className=" logo">
                    <a href={"/"}> <img src={src}/></a>
                </div>
                <div className="headerOptions _pr10 _pt20">
                    <Login user={this.props.user}/>
                    <SocialMenu type="header"/>
                </div>
            </div>

        );
    }
}
window.PageHeader = PageHeader;