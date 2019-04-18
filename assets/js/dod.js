import React from 'react';

class DoD extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        var ContainerClassName = "article container _mt20 _pr60";

        return (
            <div className={ContainerClassName}>
                <div className="row">
                    <h1>Definition of "Done"</h1>
                </div>
                <div className="row">
                    <p> We’re an open community, yet content published through our channel is reviewed and only considered publishable when:  </p>
                    <br/>
                    <p>1. It is primarily about Scrum.</p>
                    <br/>
                    <p>2. It is not in conflict with the Scrum Guide.</p>
                    <br/>
                    <p>3. Opinions are not presented as facts or rules.</p>
                    <br/>
                    <p>4. Complementary practices to the Scrum are presented as such.</p>
                    <br/>
                    <p>5. It's serious, but not boring.</p>
                    <br/>
                    <p>6. The author is an experienced practitioner of Scrum.</p>
                    <br/>
                    <p>7. It conforms to Scrum's values.</p>
                    <br/>
                    <p>8. No commercial intent or commercial promotions. References to helpful material/books may be okay if approved by reviewer.</p>
                    <br/>
                    <p>9. Not a spaghetti of references to other practises/articles.</p>
                    <br/>
                    <p>10. The aim is too for the author to get feedback, inspect, adapt through the writings.</p>
                    <br/>
                    <p>11. The author is actively engaging in the Serious Scrum community.</p>
                    <br/>
                    <p>12. English. Doesn't have to be perfect. Other languages may be okay if approved by another Serious Scrum editor.</p>
                    <br/>
                    <p>13. Contains the tag: Serious Scrum.</p>
                    <br/>
                    <p>14. It helps people improve their understanding of Scrum.</p>
                    <br/>
                    <p>15. It helps people improve their play.</p>
                    <br/>
                    <p>16. It is reviewed by at least one other Serious Scrum editor/writer.</p>

                </div>
            </div>
        );
    }
}
window.DoD = DoD;