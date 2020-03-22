import React from 'react';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "header row";
        const src = "images/serious-scrum-logo.svg";

        return (
            <div className={ContainerClassName}>
                <div className="one-half column logo">
                    <img  src={src}/>
                </div>
                <div className="one-half column home _pl80 _pr80 _pt10">
                    <a href="https://app.gitbook.com/@sjoerd-nijland/s/serious-scrum/" target="_blank">Handbook</a> &nbsp; &nbsp; &nbsp;| &nbsp; &nbsp; &nbsp; <a href="/docs/Serious-Scrum-Road-To-Mastery-Training.pdf" target="_blank" >Road to Mastery Training</a>
                </div>
            </div>

        );
    }
}
window.Header = Header;