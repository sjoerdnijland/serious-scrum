import React from 'react';

class DoD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "article container _mt20 _pr60 _mb20";

        return (
            <div className={ContainerClassName}>
                <div className="row">
                    <h1>Definition of "Done"</h1>
                </div>
                <div className="row">
                    <p> We’re an open community, yet content published through our channel is reviewed and only considered publishable when:  </p>
                    <br/>

                    <p className='pBoxDark'>
                        <ol type="1">
                            <li>It is primarily about Scrum.</li>
                            <li>It conforms to the most recent version of the Scrum Guide.</li>
                            <li>Opinions are presented as such.</li>
                            <li>Complementary practices to the Scrum are presented as such.</li>
                            <li>The author is an experienced practitioner of Scrum.</li>
                            <li>It conforms to Scrum's values.</li>
                            <li>No commercial intent or commercial promotions. References to helpful material/books may be okay if approved by reviewer.</li>
                            <li>Not a 'spaghetti' of references to other practises/articles.</li>
                            <li>The aim is too for the author to get feedback, inspect, adapt through the writings.</li>
                            <li>The author is actively engaging in the Serious Scrum community.</li>
                            <li>English. Doesn't have to be perfect. Other languages may be okay if approved by another Serious Scrum editor.</li>
                            <li>Contains the tag: Serious Scrum.</li>
                            <li>It helps readers improve their practice of Scrum.</li>
                            <li>It is reviewed by at least one other Serious Scrum editor/writer.</li>
                        </ol>
                    </p>
                </div>
            </div>
        );
    }
}
window.DoD = DoD;