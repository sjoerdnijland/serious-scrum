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
        const LogoClassName = "_mt20 _ml80";
        const src = "images/serious-scrum-logo.svg";

        return (
            <div className={ContainerClassName}>
                <div className="one-half column">
                    <img className={LogoClassName} src={src}/>
                </div>
                <div className="one-half column home right _pr80">
                    <h1> a <i>home</i>  for serious scrum practitioners. </h1>

                </div>
            </div>

        );
    }
}
window.Header = Header;