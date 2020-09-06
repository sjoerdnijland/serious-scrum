import React from 'react';

class Build extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: null,
        };
    }

    render() {

        const ContainerClassName = "build row";
        const trademarkUrl = "https://www.boip.int/nl/merkenregister?embedded-app-path=Ym1ib25saW5lL3NlYXJjaC9ieW51bWJlci9wZXJmb3JtLmRvP21hcmtOdW1iZXJUeXBlPUFQUCZtYXJrTnVtYmVyPTE0MDUwNDEmX2dhPTIuMTUzOTkxNTguMTk3NTc5ODM3OS4xNTkwNTY4NzQyLTIxMTAxOTY1NjkuMTU5MDU2ODc0MiZfZ2FjPTEuMTYwNTY5NjIuMTU5MDU2ODc0NS5FQUlhSVFvYkNoTUkxSm1BcHRMVDZRSVZ5YkxWQ2gzUkN3TlpFQUFZQVNBQUVnTGI1X0RfQndF"

        return (
            <div className={ContainerClassName}>
                <div className="two-thirds column ">
                    build: 2.9 - AGNC - <a href={trademarkUrl} target="_blank">Serious Scrum has a Registered Trademark</a> - KVK: 58970037 - BTW: NL164404363B01- IBAN: NL84 RABO 0130 4761 53
                </div>
                <div className="one-third column right _pr40">
                    :)
                </div>
            </div>

        );
    }
}
window.Build = Build;