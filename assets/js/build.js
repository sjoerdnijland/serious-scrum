import React from 'react';

class Build extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        var ContainerClassName = "build row _mt10";

        return (
            <div className={ContainerClassName}>
                <div className="one-half-fixed column _pl40">
                    build: 1.1.6
                </div>
                <div className="one-half-fixed column right _pr40">
                    :)
                </div>
            </div>

        );
    }
}
window.Build = Build;