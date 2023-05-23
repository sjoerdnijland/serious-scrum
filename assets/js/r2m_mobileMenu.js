import React from 'react';

class R2MMobileMenu extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const functions = this.props.functions;

        let ContainerClassName = "r2m_mobileMenu row";

        return (
            <div className={ContainerClassName} >
                <HeaderMenuItem functions={functions} name="Photos" target="https://photos.app.goo.gl/aJk9hso1Cuh1AoVMA" />
                <HeaderMenuItem functions={functions} name="Playbook" target="https://xebia-academy.myshopify.com/products/scrum-master-playbook"/>
                <HeaderMenuItem functions={functions} name="Testimonials" target="r2m/testimonials" />
                <HeaderMenuItem functions={functions} name="Journey" target="page/the-road-to-mastery-r2m" />
            </div>

        );
    }
}
window.R2MMobileMenu = R2MMobileMenu;