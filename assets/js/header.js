import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const functions = this.props.functions;

        const ContainerClassName = "header row";
        const src = "images/serious-scrum-logo.svg";

        return (
            <div className={ContainerClassName} onClick={this.props.functions.scrollToTop}>
                <div className=" logo">
                    <img   src={src}/>
                </div>
                <div className="headerOptions _pr10 _pt20">
                    <CategoryMenu functions={functions} expanded={this.props.expanded}/>
                    <Login user={this.props.user}/>
                    <SocialMenu type="header"/>
                    <Search functions={functions} value={this.props.search} type="desktop"/>
                    <PublishButton functions={functions} user={this.props.user}/>
                </div>
            </div>

        );
    }
}
window.Header = Header;