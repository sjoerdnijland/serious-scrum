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
                <div className="one-half column home _pl80 _pr80">

                </div>
            </div>

        );
    }
}
window.Header = Header;