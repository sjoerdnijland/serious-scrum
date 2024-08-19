import React from 'react';

class Editorial extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let containerClassName = "editorialContainer ";
        const itemClassName = "editorialItem _ml40";

        if(!this.props.active){
            containerClassName += " hideMenu";
        }

        const titleClassname = "editorialMenuTitle";

        if(!this.props.expanded){
            containerClassName += " closed";
        }

        return (
            <div className={containerClassName}>
                <div className={titleClassname}>Editorial</div>
                <a href="/page/about-serious-scrum" target="_blank"><div className={itemClassName}>About Serious Scrum</div></a>
                <a href="/page/brand-guidelines" target="_blank"><div className={itemClassName}>Brand Guidelines</div></a>
                </div>
        );
    }
}
window.Editorial = Editorial;