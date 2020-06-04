import React from 'react';

class Banner extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        let bannerClassName = "banner";

        return (
            <a href={this.props.url} target="_blank">
                <div className={bannerClassName}>
                    {this.props.bannerText}
                </div>
            </a>

        );
    }
}
window.Banner = Banner;
