import React from 'react';

class Mastery extends React.Component {
    constructor(props) {
        super(props);
        this.setLabel = this.setLabel.bind(this);
    }

    setLabel(event){
        let { id } = event.target;
        this.props.functions.setLabel(id);
        this.props.functions.toggleLibraryPages('contentPages');
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
                <div className={titleClassname}>Road to Mastery</div>
                <a href="https://www.patreon.com/join/seriousscrum/checkout?rid=5198722" target="_blank"><div className={itemClassName}>Sign Up!</div></a>
                <a href="/Road-to-Mastery-E-Book" target="_blank"><div className={itemClassName}>Get the E-Book!</div></a>
                <a href="/introduction-to-the-road-to-mastery" target="_blank"><div className={itemClassName}>Introduction to the Road to Mastery</div></a>
                <a href="/r2m/down-the-rabbit-hole" target="_blank"><div className={itemClassName} id={'down-the-rabbit-hole'}>Part I: Down the Rabbit Hole</div></a>
                <a href="/r2m/the-key-to-wonderland" target="_blank"><div className={itemClassName} id={'down-the-rabbit-hole'}>Part II: The Key to Wonderland</div></a>
                <a href="/about-sjoerd-nijland"  target="_blank"><div className={itemClassName}>About Sjoerd Nijland</div></a>

            </div>

        );
    }
}
window.Mastery = Mastery;

/*
<div className={itemClassName} id={'key-to-wonderland'} onClick={this.setLabel}>Part II: The Key to Wonderland</div>
                <div className={itemClassName} id={'a-mad-party'} onClick={this.setLabel}>Part III: A Mad Party</div>
                <div className={itemClassName} id={'nonsense'} onClick={this.setLabel}>Part IV: Nonesense!</div>
                <div className={itemClassName} id={'alices-evidence'} onClick={this.setLabel}>Part IV: Alice's Evidence</div>
 */