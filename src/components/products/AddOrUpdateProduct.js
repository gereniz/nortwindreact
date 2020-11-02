import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { getCategories } from "../../redux/actions/categoryActions";
import { saveProduct } from "../../redux/actions/productActions";
import ProductDetail from "./ProductDetail";

function AddOrUpdateProduct({
  products,
  categories,
  getProducts,
  getCategories,
  saveProduct,
  history,
  ...props
}) {
  const [product, setProduct] = useState({ ...props.product });
  const [errors,setErrors] = useState({});
  useEffect(() => {
    if (categories.length === 0) {
      getCategories();
    }
    setProduct({ ...props.product });
  }, [props.product]);

  function handleChange(event) {
    const { name, value } = event.target;
    setProduct((previousProduct) => ({
      ...previousProduct,
      [name]: name === "categoryID" ? parseInt(value, 10) : value,
    }));
    validate(name,value);
    }
    
    function validate(name,value){
      if(name==="name" && value === ""){
        setErrors((previousErrors => ({
          ...previousErrors,name:"Not Product Name"  
        })));
      }else{
        setErrors(previousErrors =>({
          ...previousErrors,
          name : ""
        }));
      }
    }
  

  function handleSave(event) {
    event.preventDefault();
    saveProduct(product).then(() => {
      history.push("/");
    });
  }

  return (
    <ProductDetail
      product={product}
      categories={categories}
      onChange={handleChange}
      onSave={handleSave}
      errors= {errors}
    />
  );
}

export function getProductByID(products, id) {
  let product =
    products.find((product) => product.id == id) || null;
  return product;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id ;
  const product =
    id && state.productListReducer.length > 0
      ? getProductByID(state.productListReducer, id)
      : {};
  return {
    product,
    products: state.productListReducer,
    categories: state.categoryListReducer,
  };
}
const mapDispatchToProps = {
  getCategories,
  saveProduct,
};

export default connect(mapStateToProps,mapDispatchToProps)(AddOrUpdateProduct);
