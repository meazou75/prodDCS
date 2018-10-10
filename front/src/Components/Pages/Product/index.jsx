import React from 'react';

import '../../../Assets/css/product.css';

import AddModelModal from './Components/AddModelModal';
import AddBrandModal from './Components/AddBrandModal';
import ProductDetail from './Components/ProductDetail';
import ProductRow from './Components/ProductRow';
import ProductModelHeader from './Components/ProductModelHeader';

class Product extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
            activeProduct: 0,
            modalState: false,
            modalState2: false,
            loading: true,
            expanded: false
        };
    }

    getData() {
        this.setState({loading: true})
        fetch('http://localhost:3333/api/product')
            .then(res => res.json())
            .then(res => {
                if (res.success === true) {
                    this.setState({ products: res.products, loading: false });
                }
            });
    }

    componentWillMount() {
        this.getData();
    }

    render() {
        const renderProducts = () => {
            return this.state.products.map((product, index) => {
                return (
                    <ProductRow
                        key={product._id}
                        {...product}
                        onClick={() => {
                            this.setState({ activeProduct: index });
                        }}
                        active={
                            this.state.activeProduct === index ? true : false
                        }
                    />
                );
            });
        };

        const renderProductsModelName = () => {
            return this.state.products[
                this.state.activeProduct
            ].productModel.map((productModel, index) => {
                return (
                    <ProductDetail
                        key={productModel._id}
                        idProduct={
                            this.state.products[this.state.activeProduct]._id
                        }
                        {...productModel}
                        onModify={res => {
                            let old = [...this.state.products];
                            old[this.state.activeProduct].productModel[
                                index
                            ].productModelName = res;
                            this.setState({ products: old });
                        }}
                        onDelete={() => {
                            let old = [...this.state.products];
                            old[this.state.activeProduct].productModel.splice(
                                index,
                                1
                            );
                            this.setState({ products: old });
                        }}
                    />
                );
            });
        };

        if (this.state.loading === true) {
            return <p>Loading ...</p>;
        }

        return (
            <div>
                <AddBrandModal
                    show={this.state.modalState}
                    handleHide={() => {
                        this.setState({ modalState: false });
                    }}
                    onSuccess={product =>
                        this.setState({
                            products: [...this.state.products, product]
                        })
                    }
                />
                <AddModelModal
                    _id={this.state.products[this.state.activeProduct]._id}
                    show={this.state.modalState2}
                    handleHide={() => {
                        this.setState({ modalState2: false });
                    }}
                    onSuccess={product => {
                        let old = [...this.state.products];
                        old[this.state.activeProduct] = product;
                        this.setState({ products: old });
                    }}
                />
                <div className="container nopad" style={{ marginTop: '30px' }}>
                    <div className="row mainProduct-container">
                        <div
                            className={
                                this.state.expanded
                                    ? 'col-md-6 col-sm-6 col-xs-12 brand-container expanded'
                                    : 'col-md-6 col-sm-6 col-xs-12 brand-container'
                            }
                        >
                            <div
                                className={
                                    this.state.expanded
                                        ? 'products-render expanded'
                                        : 'products-render'
                                }
                            >
                                {renderProducts()}
                            </div>
                            <p className="button-container">
                                <button
                                    className="show-button hidden-md hidden-lg"
                                    onClick={() =>
                                        this.setState({
                                            expanded: !this.state.expanded
                                        })
                                    }
                                >
                                    {this.state.expanded ? 'Less' : 'More'}
                                </button>
                            </p>

                            <button
                                className="brand-add-button"
                                type="button"
                                onClick={() => {
                                    this.setState({ modalState: true });
                                }}
                            >
                                Add a Brand
                            </button>
                        </div>
                        <div className="col-md-6 col-sm-6 col-xs-12 product-container">
                            <ProductModelHeader
                                {...this.state.products[
                                    this.state.activeProduct
                                ]}
                                onDelete={() => {
                                    this.getData()
                                }}
                                onModify={() => {
                                    this.getData()
                                }}
                            />
                            <div
                                style={{ height: '390px', overflowY: 'scroll' }}
                            >
                                {renderProductsModelName()}
                            </div>
                            <button
                                className="model-add-button"
                                type="button"
                                onClick={() => {
                                    this.setState({ modalState2: true });
                                }}
                            >
                                Add a Model
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Product;
