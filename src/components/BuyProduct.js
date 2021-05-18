import { useState } from 'react';
import { Button, Icon, Label, Input } from 'semantic-ui-react'

import { useParams, Redirect } from 'react-router-dom';
  
const axios = require('axios');
const accessTokenStorage = window.localStorage;

const initialState = {
    number: 0
};

const number = 5;
const cost = 500;

export default function BuyProduct() {

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

  const [formState, setFormState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const {productId} = useParams()

  const submitHandler = (event) => {
    event.preventDefault();
    buy(); 
  };

  const buy = () => {
    const accessToken =  JSON.parse(localStorage.getItem('user')).accessToken
    const json = JSON.stringify(formState);
    axios.post(
      'http://localhost:9000/api/v1/products/buy/'+productId, json, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ accessToken ,
          'Access-Control-Allow-Origin' : '*'
        }
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
		<div className="price"><Label tag size='big' color='teal'>{cost}  ฿</Label></div>
	</section>
	<section id="right">
		<div>
		<a href="/listproduct"><i className="back-icon zmdi zmdi-long-arrow-left"></i></a>
		<a href="/editproduct"><i className="edit-icon zmdi zmdi-edit">edit</i></a>
		</div>
		<form onSubmit={(e) => submitHandler(e)}>
			<div className="product-name">Product name</div>
			<div className="product-des">Description here naja</div>
			<div className="product-avail">Available {number}</div>
			<div id="amount">
				<button id="btn-1" className="ui icon button">
					<i className="minus icon"></i>
  				</button>
				<input
					className="sum-product"
      				type="number"
      				placeholder="number"
      				value={formState.number}
      				onChange={e => {
      				  setFormState({ ...formState, number: e.target.value });
      				}} 
				/>
				<button className="ui icon button">
				  <i className="plus icon"></i>
				</button>
			</div>
			<div id="button">
				<p className="sum-total">Amount</p>
				<button className="btn-hover color-1" type="submit">Purchase</button>
			</div>
		</form>
		
	</section>
</div>
  )
}