import React from 'react';
import "../js/r2m_play_blanks_droppable";

class SentenceBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
        this.renderSentence = this.renderSentence.bind(this);
    }

    handleDrop(e, id) {
        this.props.onDrop(e, id);
    }

    renderSentence(){
        this.props.sentence.map((word, i) => {
            if (word.type === "word") {
                return (
                    <div className={"wordBox"} data-testid={"word"} key={i}>
                        {word.text}
                    </div>
                );
            }
            let bgcolor;

            if (this.props.marked) {
                bgcolor = word.text === word.displayed ? "lightgreen" : "#F77";
            }

            return (
                <Droppable
                    bgcolor={bgcolor}
                    groupName={word.id}
                    key={i}
                    ndx={i}
                    onDrop={this.handleDrop}
                >
                    {word.placed ? word.displayed : " "}
                </Droppable>
            );
        });
    }


    render() {

        return (

            <div>
                <div>{this.renderSentence()}</div>
            </div>

        );
    }
}
window.SentenceBox = SentenceBox;
