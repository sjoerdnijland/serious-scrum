import React from 'react';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.handleChangeInput = this.handleChangeInput.bind(this);
    }

    handleChangeInput(event){
        let {value} = event.target;
        let inputValue = value;

        this.props.functions.setSearch(inputValue);

        return;
    };

    render() {

        let containerClassName = "searchContainer "+this.props.type;

        const inputClassName = "search";

        const disabled = this.props.disabled;

        if(disabled){
            containerClassName += " inputDisabled ";
        }
        let search = this.props.value;
        if(!search){
            search = "";
        }

        return (
            <div className={containerClassName}>
                <input
                    name={this.props.name}
                    type="text"
                    onChange={this.handleChangeInput}
                    className={inputClassName}
                    value={search}
                    placeholder="Search..."
                    disabled={disabled}
                />
            </div>
        );
    }
}
window.Search = Search;