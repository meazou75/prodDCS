import React from 'react';

class ProductRow extends React.Component {
    render() {
        return (
            <div
                className={
                    this.props.active ? 'product-brand active' : 'product-brand'
                }
                onClick={this.props.onClick}
                style={{ cursor: 'pointer' }}
            >
                <i
                    className={
                        this.props.active ? 'fas fa-circle' : 'far fa-circle'
                    }
                />{' '}
                {this.props.productBrand}
                <i className="fas fa-chevron-right" />
            </div>
        );
    }
}

export default ProductRow;