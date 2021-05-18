import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';
  
const axios = require('axios');

const initialState = {
    number: 0
};

export default function BuyProduct() {
  const [formState, setFormState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const {productId} = useParams()

  const submitHandler = (event) => {
    event.preventDefault();
    buy(); 
  };


  useEffect( () => {
    const accessToken =  JSON.parse(localStorage.getItem('user')).accessToken
    axios.get(
    'http://localhost:9000/api/v1/products/'+ productId, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+ accessToken,
        'Access-Control-Allow-Origin' : '*'
      }
      
    }).then(product => {
        setSelectedProduct(product.data)
        console.log(selectedProduct)
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
    <div className="AddProduct">

    {/* <form onSubmit={(e) => submitHandler(e)} >
    <input
      type="number"
      placeholder="number"
      value={formState.number}
      onChange={e => {
        setFormState({ ...formState, number: e.target.value });
      }}
    />
    <button type="submit">Confirm</button>
  </form> */}


  <main id="main">
	<section id="left">
		<div id="head">
			<h1>{selectedProduct.name}</h1>
			<p>{selectedProduct.description}</p>
		</div>
		<h3>Available: {selectedProduct.available}</h3>
        <h3> Price: {parseInt(selectedProduct.price).toFixed(2)} ฿</h3>
	</section>
	<section id="right">
		<h1>Transaction</h1>
		<form onSubmit={(e) => submitHandler(e)} >
			{/* <div id="form-card" class="form-field">
				<label for="cc-number">Card number:</label>
				<input id="cc-number" maxlength="19" placeholder="1111 2222 3333 4444" required/>
			</div> */}
            {/* 
			<div id="form-date" class="form-field">
				<label for="expiry-month">Expiry date:</label>
				<div id="date-val">
					<select id="expiry-month" required>
															<option id="trans-label_month" value="" default="default" selected="selected">Month</option>
															<option value="1">01</option>
															<option value="2">02</option>
															<option value="3">03</option>
															<option value="4">04</option>
															<option value="5">05</option>
															<option value="6">06</option>
															<option value="7">07</option>
															<option value="8">08</option>
															<option value="9">09</option>
															<option value="10">10</option>
															<option value="11">11</option>
															<option value="12">12</option>
													</select>
					<select id="expiry-year" required>
															<option id="trans-label_year" value="" default="" selected="selected">Year</option>
													<option value="2018">18</option><option value="2019">19</option><option value="2020">20</option><option value="2021">21</option><option value="2022">22</option><option value="2023">23</option><option value="2024">24</option><option value="2025">25</option><option value="2026">26</option><option value="2027">27</option><option value="2028">28</option><option value="2029">29</option><option value="2030">30</option><option value="2031">31</option><option value="2032">32</option><option value="2033">33</option><option value="2034">34</option><option value="2035">35</option><option value="2036">36</option><option value="2037">37</option><option value="2038">38</option><option value="2039">39</option><option value="2040">40</option><option value="2041">41</option><option value="2042">42</option><option value="2043">43</option><option value="2044">44</option><option value="2045">45</option><option value="2046">46</option><option value="2047">47</option></select>
				</div>
			</div>
			 */}
			{/* <div id="form-sec-code" class="form-field">
				<label for="sec-code">Security code:</label>
				<input type="password" maxlength="3" placeholder="123" required/>
			</div> */}
            <label >Quantity:
			<input
                type="number"
                id="quantity"
                placeholder="number"
                value={formState.number}
                onChange={e => {
                    setFormState({ ...formState, number: e.target.value });
                }}
            />
            </label>
			<button type="submit">Purchase</button>
		</form>
	</section>
</main>
</div>
  


  )
}