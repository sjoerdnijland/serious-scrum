import React from 'react';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        var ContainerClassName = "content row _pt20 _pb20 _pl40";

        return (
            <div className={ContainerClassName}>
                <div className="row _ml40">
                    <div className="one-half column">
                        <WhySoSerious/>
                    </div>
                    <div className="one-half column">
                        <DoD/>
                    </div>
                </div>
            </div>
        );
    }
}
window.Content = Content;