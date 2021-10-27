import React from 'react';

class R2MSubCategory extends React.Component {
    constructor(props) {
        super(props);
        this.setCategory = this.setCategory.bind(this);
    }

    setCategory(){
        window.location.href='/r2m/chapter/'+this.props.data.name.toLowerCase().replace(/\s/g, "-");
    }

    render() {

        return (
            <li id={this.props.data.id} onClick={this.setCategory}>
                {this.props.data.name}
            </li>
        );
    }
}
window.R2MSubCategory = R2MSubCategory;