import React from 'react';

class R2MHeader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const functions = this.props.functions;

        let ContainerClassName = "r2m_header row";

        const src = "/images/serious-scrum-logo-darkblue-r2m.svg";

        let backstage = false;

        if(this.props.user.username != ""){
            backstage = true;
        }

        if(this.props.scrolled >= 80){
            ContainerClassName += " r2m_header_ocean";
        }

        return (
            <div className={ContainerClassName} >
               <div className=" logo"> <a href="/r2m">
                    <img src={src}/>  </a>
                </div>

                <div className="headerOptions _pr10 _pt20">
                    <CategoryMenu functions={functions} expanded={this.props.expanded} site="r2m"/>
                    <HeaderMenuItem functions={functions} name="Backstage" target="r2m/backstage" hidden={!backstage}/>
                    <HeaderMenuItem functions={functions} name="Contact" target="page/behind-the-road"/>
                    <JoinButton functions={functions} user={this.props.user}/>
                    <HeaderMenuItem functions={functions} name="Testimonials" target="r2m/testimonials"/>
                    <HeaderMenuItem functions={functions} name="Licenses" target="r2m/chapter/program"/>
                    <HeaderMenuItem functions={functions} name="Shop" target="https://road2mastery.gumroad.com/"/>
                    <HeaderMenuItem functions={functions} name="The Journey" target="page/the-road-to-mastery-r2m"/>
                </div>
            </div>

        );
    }
}
window.R2MHeader = R2MHeader;