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
                        <span>1. It is primarily about Scrum.</span><br/>
                        <span>2. It conforms to the most recent version of the Scrum Guide.</span><br/>
                        <span>3. Opinions are not presented as such.</span><br/>
                        <span>4. Complementary practices to the Scrum are presented as such.</span><br/>
                        <span>5. The author is an experienced practitioner of Scrum.</span><br/>
                        <span>6. It conforms to Scrum's values.</span><br/>
                        <span>7. No commercial intent or commercial promotions. References to helpful material/books may be okay if approved by reviewer.</span><br/>
                        <span>8. Not a 'spaghetti' of references to other practises/articles.</span><br/>
                        <span>9. The aim is too for the author to get feedback, inspect, adapt through the writings.</span><br/>
                        <span>10. The author is actively engaging in the Serious Scrum community.</span><br/>
                        <span>11. English. Doesn't have to be perfect. Other languages may be okay if approved by another Serious Scrum editor.</span><br/>
                        <span>12. Contains the tag: Serious Scrum.</span><br/>
                        <span>13. It helps readers improve their practice of Scrum.</span><br/>
                        <span>14. It is reviewed by at least one other Serious Scrum editor/writer.</span><br/>
                    </p>
                </div>
            </div>
        );
    }
}
window.DoD = DoD;