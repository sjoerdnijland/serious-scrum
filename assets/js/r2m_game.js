import React from 'react';

class R2MGame extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {


        let ContainerClassName = "r2m_game row";

        if(this.props.label != 'game-of-scrum'){
            ContainerClassName += " hidden";
        }

        const bannerClassName = "homeBanner";

        return (

                <div className={ContainerClassName}>
                    <div className={bannerClassName}>
                        <div>Road to Mastery</div>
                        <h1>The Game of Scrum</h1>
                        <div>
                            The way to play the game of Scrum<br/>
                        </div>

                    </div>
                </div>


        );
    }
}
window.R2MGame = R2MGame;