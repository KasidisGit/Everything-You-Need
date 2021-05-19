import { useState, useEffect } from 'react';
import { Label } from 'semantic-ui-react'
import { useLocation,  Redirect, Link } from 'react-router-dom';
  
const axios = require('axios');

const initialState = {
    number: 0
};

export default function BuyProduct() {

  const [formState, setFormState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const location = useLocation()
  const x =location.pathname.split('/')
  const productId = x[x.length-1]

  
  function RandomImage() {
	const randomId = Math.floor(Math.random() * 50) + 1;
	const style = {
		height: '100%',
		width: '100%',
        background: `url(https://picsum.photos/id/${randomId}/275/455.jpg)`,
	}
	return (
		<div style={style} />
	)
  }

  const submitHandler = (event) => {
    event.preventDefault();
    buy(); 
  };

  useEffect( () => {
    axios.get(
    'http://localhost:9000/api/v1/products/'+ productId, {
      withCredentials: true
      
    }).then(product => {
        setSelectedProduct(product.data)
    })
    .catch(err => {
        console.error(err)
    });

    } , [])

  const buy = () => {
    const accessToken =  JSON.parse(localStorage.getItem('user')).accessToken
    const json = JSON.stringify(formState);
    axios.post(
      'http://localhost:9000/api/v1/products/buy/'+productId, json, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ accessToken ,
          'Access-Control-Allow-Origin' : '*'
        },
        withCredentials: true
      })
      .then(
          setSubmitted(true)
        ).catch(err =>{
            console.error(err)
        });
  };

  if (submitted) {
    return <Redirect to={{
      pathname: '/listproduct',
      state: {status: 'ok'}
        }}
    />
  }  

  return (
  <div id="main" className="buy-body">
	<section id="left">
		<RandomImage/>
		<div className="price"><Label tag size='big' color='teal'>Price: {parseInt(selectedProduct.price).toFixed(2)} ฿</Label></div>
	</section>
	<section id="right">
		<div>
		<a href="/listproduct"><i className="back-icon zmdi zmdi-long-arrow-left"></i></a>
		<Link to={{ pathname: "/editproduct/"+productId }}><i className="edit-icon zmdi zmdi-edit">edit</i></Link>
		</div>
		<form onSubmit={(e) => submitHandler(e)}>
			<div className="product-name">{selectedProduct.name}</div>
			<div className="product-des">{selectedProduct.description}</div>
			<div className="product-avail">Available: {selectedProduct.available}</div>
			<div id="amount">
				<div id="btn-1" className="ui icon button">
					<i className="minus icon"></i>
  				</div>
				<input
					className="sum-product"
      				type="number"
      				placeholder="number"
      				value={formState.number}
      				onChange={e => {
      				  setFormState({ ...formState, number: e.target.value });
      				}} 
				/>
				<div className="ui icon button">
				  <i className="plus icon"></i>
				</div>
			</div>
			<div id="button">
				<p className="sum-total">Total: {formState.number*selectedProduct.price} ฿</p>
				<button className="btn-hover color-1" type="submit">Purchase</button>
			</div>
		</form>
		
	</section>

</div>
  )
}