import React from 'react';

class SubCategory extends React.Component {
    constructor(props) {
        super(props);
        this.setCategory = this.setCategory.bind(this);
    }

    setCategory(event){
        let { id } = event.target;
        this.props.functions.setCategory(id);
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
window.SubCategory = SubCategory;