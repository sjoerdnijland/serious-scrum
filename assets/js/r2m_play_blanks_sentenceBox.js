import React from 'react';
import "../js/r2m_play_blanks_droppable";

class SentenceBox extends React.Component {
    constructor(props) {
        super(props);
        this.handleDrop = this.handleDrop.bind(this);
    }

    handleDrop(e, id) {
        this.props.onDrop(e, id);
    }

    render() {
        let mySentence = this.props.sentence.map((word, i) => {
            if (word.type === "word") {

                return (
                    <div className={"wordBox"} data-testid={"word"} key={i}>
                        {word.text}
                    </div>
                );
            }
            let bgcolor = "white";

            if (this.props.marked) {
                bgcolor = word.text === word.displayed ? "green" : "red";
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
        return (

            <div className={"block"}>
                <div className={"wordWrapper"}>{mySentence}</div>
            </div>

        );
    }
}
window.SentenceBox = SentenceBox;
