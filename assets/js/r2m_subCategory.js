import React from 'react';

class R2MSubCategory extends React.Component {
    constructor(props) {
        super(props);
        this.setCategory = this.setCategory.bind(this);
    }

    setCategory(){
        this.props.functions.setLabel(this.props.data.name.toLowerCase().replace(/\s/g, "-"));
        this.props.functions.toggleCategoryMenu();
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