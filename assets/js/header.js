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
                    <Search functions={functions} value={this.props.search} type="desktop"/>
                    <SocialMenu type="header"/>

                    <PublishButton functions={functions} user={this.props.user}/>
                    <div className={'headerMenuItem'}>
                        <a href={'https://www.road2mastery.com'} target={'_blank'}>Road 2 Mastery</a>
                    </div>

                </div>
            </div>

        );
    }
}
window.Header = Header;
/*
<div className={'headerMenuItem'}>
    <a href={'https://scrumfeedback.com'} target={'_blank'}>Scrum Guide Feedback</a>
</div>
<Login user={this.props.user} type={'community'}/>
*/
