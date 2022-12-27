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

        let ContainerClassName = "header row";

        const src = "/images/serious-scrum-logo.svg";

        return (
            <div id={'r2m_header'} className={ContainerClassName} >
                <a href={"/"}><div className=" logo">
                    <img src={src}/>
                </div>
                </a>
                <div className="headerOptions _pr10 _pt20">
                    <CategoryMenu functions={functions} expanded={this.props.expanded} site="serious"/>
                    <Login user={this.props.user}/>
                    <SocialMenu type="header"/>
                    <Search functions={functions} value={this.props.search} type="desktop"/>
                    <PublishButton functions={functions} user={this.props.user}/>
                    <div className={'headerMenuItem'}>
                        <a href={'/r2m'} target={'_blank'}>Road to Mastery</a>
                    </div>
                    <div className={'headerMenuItem'}>
                        <a href={'https://scrumfeedback.com'} target={'_blank'}>Scrum Guide Feedback</a>
                    </div>
                </div>
            </div>

        );
    }
}
window.Header = Header;