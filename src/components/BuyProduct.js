import { useState } from 'react';
import { Button, Icon, Label, Input } from 'semantic-ui-react'

const axios = require('axios');
const accessTokenStorage = window.localStorage;

const initialState = {
    number: 0
};

const number = 5;
const cost = 500;

export default function BuyProduct() {

  function RandomImage() {
	const style = {
		height: '100%',
		width: '100%',
        background: 'linear-gradient(135deg,rgba(91, 36, 122, 0.45) 0%,rgba(27, 206, 223, 0.55) 100%),url(https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-12-blue-select-2020?wid=940&hei=1112&fmt=png-alpha&.v=1604343704000)',
	}
	return (
		<div style={style} />
	)
  }

  const [formState, setFormState] = useState(initialState);
  
  const submitHandler = event => {
    event.preventDefault();
    postData();
  };

  const postData = () => {
    const json = JSON.stringify(formState);
    axios.post(
      'http://localhost:9000/api/v1/products/buy/'+accessTokenStorage.getItem('productId'), json, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ accessTokenStorage.getItem('UserAccessToken') ,
          'Access-Control-Allow-Origin' : '*'
        }
      });
  };

  return (
  <div id="main" className="buy-body">
	<section id="left">
		<RandomImage/>
		<div className="price"><Label tag size='big' color='teal'>{cost}  ฿</Label></div>
	</section>
	<section id="right">
		<form onSubmit={submitHandler}>
			<div className="product-name">Product name here naja</div>
			<div className="product-des">Description here naja</div>
			<div className="product-avail">Available {number}</div>
			<input
				className="sum-product"
      			type="number"
      			placeholder="number"
      			value={formState.number}
      			onChange={e => {
      			  setFormState({ ...formState, number: e.target.value });
      			}} 
			/>
			<div id="button">
				<p className="sum-total ">Amount</p>
				<button type="submit">Purchase</button>
			</div>
		</form>
		
	</section>
</div>

  )
}