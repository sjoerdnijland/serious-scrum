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
                <a href="/page/invite" target="_blank"><div className={itemClassName}>Join our Slack Community</div></a>
                <a href="/page/our-editorial" target="_blank"><div className={itemClassName}>Our Editorial</div></a>
                <a href="/page/our-review-process" target="_blank"><div className={itemClassName}>Our Review Process</div></a>
                <a href="/page/how-to-submit" target="_blank"><div className={itemClassName}>How to submit</div></a>
                <a href="/page/how-to-publish" target="_blank"><div className={itemClassName}>How to publish</div></a>
                <a href="/page/brand-guidelines" target="_blank"><div className={itemClassName}>Brand Guidelines</div></a>
                <a href="/page/our-sponsors" target="_blank"><div className={itemClassName}>Our Sponsors</div></a>
                <a href="/page/profit-and-promotion" target="_blank"><div className={itemClassName}>Profit and Promotion</div></a>
                 </div>

        );
    }
}
window.Editorial = Editorial;