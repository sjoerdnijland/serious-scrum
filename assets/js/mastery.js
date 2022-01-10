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
                <a href="https://www.seriousscrum.com/r2m/" target="_blank"><div className={itemClassName}>Road to Mastery Website</div></a>
                <a href="https://www.seriousscrum.com/page/the-road-to-mastery-r2m" target="_blank"><div className={itemClassName}>About the Road to Mastery</div></a>
                <a href="https://www.seriousscrum.com/r2m/playbook" target="_blank"><div className={itemClassName}>Playbook</div></a>
                <a href="https://www.seriousscrum.com/r2m/testimonials" target="_blank"><div className={itemClassName}>Testimonials</div></a>
                <a href="https://www.seriousscrum.com/r2m/join" target="_blank"><div className={itemClassName}>Join</div></a>

                <a href="/page/the-catalog"  target="_blank"><div className={itemClassName}>R2M Catalog</div></a>

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