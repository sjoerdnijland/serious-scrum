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
                <a href="/page/introduction-to-the-road-to-mastery" target="_blank"><div className={itemClassName}>Introduction to the Road to Mastery</div></a>
                <a href="/page/our-guides"  target="_blank"><div className={itemClassName}>Our Guides</div></a>
                <a href="/r2m/basecamp" target="_blank"><div className={itemClassName} id={'down-the-rabbit-hole'}>Basecamp</div></a>
                <a href="/r2m/training-the-guides" target="_blank"><div className={itemClassName} id={'down-the-rabbit-hole'}>Training the Guides</div></a>
                <a href="/r2m/agile" target="_blank"><div className={itemClassName} id={'down-the-rabbit-hole'}>Agile 101</div></a>
                <a href="/r2m/coaching" target="_blank"><div className={itemClassName} id={'down-the-rabbit-hole'}>Coaching 101</div></a>
                <a href="/r2m/selfmanaging" target="_blank"><div className={itemClassName} id={'down-the-rabbit-hole'}>Self-Management</div></a>
                <a href="/page/the-catalog"  target="_blank"><div className={itemClassName}>R2M Activity Catalog</div></a>

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