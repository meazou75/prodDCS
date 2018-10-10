import React from 'react';

class ProductTextInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            input: false,
            value: ''
        };
        this.handleChange = this.handleChange.bind(this);
    }
    componentWillMount() {
        this.setState({ value: this.props.value });
    }
    componentWillReceiveProps() {
        this.setState({ value: this.props.value });
    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }
    handleSubmit() {
        fetch('http://localhost:3333/api/product/model', {
            method: 'PUT',
            body: JSON.stringify({
                _id: this.props.idProduct,
                _idModel: this.props.id,
                productModelName: this.state.value
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    this.setState({ input: false });
                    this.props.onModify(this.state.value);
                    this.props.reinit();
                }
            })
            .catch(err => {
                console.error(err);
            });
    }
    render() {
        if (this.state.input || this.props.edit) {
            return (
                <div className={this.props.className}>
                    <input
                        type="text"
                        name="value"
                        onChange={this.handleChange}
                        value={this.state.value}
                    />
                    <button onClick={() => this.handleSubmit()}>
                        <i className="fas fa-check" />
                    </button>
                </div>
            );
        } else {
            return (
                <div
                    className={this.props.className}
                    onClick={() => {
                        this.setState({ input: true });
                    }}
                >
                    {this.props.value}
                </div>
            );
        }
    }
}
export default ProductTextInput;
