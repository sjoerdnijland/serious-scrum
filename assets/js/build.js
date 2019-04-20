import React from 'react';

class Build extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "build row";

        return (
            <div className={ContainerClassName}>
                <div className="one-half-fixed column _pl80">
                    build: 1.2.8
                </div>
                <div className="one-half-fixed column right _pr40">
                    :)
                </div>
            </div>

        );
    }
}
window.Build = Build;