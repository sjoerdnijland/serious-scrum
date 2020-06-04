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
                <a href="https://medium.com/serious-scrum/how-to-add-a-post-to-serious-scrum-b749e37c0589" target="_blank"><div className={itemClassName}>How to Submit and Publish</div></a>
                <a href="https://sjoerd-nijland.gitbook.io/serious-scrum/#writing-for-serious-scrum" target="_blank"><div className={itemClassName}>Review and Curation</div></a>
                <a href="/invite" target="_blank"><div className={itemClassName}>Join our Slack Community</div></a>
                <a href="https://sjoerd-nijland.gitbook.io/serious-scrum/" target="_blank"><div className={itemClassName}>About Serious Scrum</div></a>
                <a href="https://sjoerd-nijland.gitbook.io/serious-scrum/#our-values" target="_blank"><div className={itemClassName}>Community and Brand Guidelines</div></a>
            </div>

        );
    }
}
window.Editorial = Editorial;