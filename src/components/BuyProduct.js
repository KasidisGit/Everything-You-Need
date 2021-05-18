import { useState } from 'react';
import { useParams, Redirect } from 'react-router-dom';
  
const axios = require('axios');
const accessTokenStorage = window.localStorage;

const initialState = {
    number: 0
};

export default function BuyProduct() {
  const [formState, setFormState] = useState(initialState);
  const [submitted, setSubmitted] = useState(false);
  const {productId} = useParams()

  const submitHandler = (event) => {
    event.preventDefault();
    buy(); 
  };

  const buy = () => {
    const json = JSON.stringify(formState);
    axios.post(
      'http://localhost:9000/api/v1/products/buy/'+productId, json, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ accessTokenStorage.getItem('UserAccessToken') ,
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

    <form onSubmit={(e) => submitHandler(e)} >
    <input
      type="number"
      placeholder="number"
      value={formState.number}
      onChange={e => {
        setFormState({ ...formState, number: e.target.value });
      }}
    />
    <button type="submit">Confirm</button>
  </form>
  <Link to={{pathname: '/listproduct'}}>
      back
  </Link>
  <main id="main">
	<section id="left">
		<div id="head">
			<h1>Life has great moments</h1>
			<p>Enjoy them with music!</p>
		</div>
		<h3>Only 9.99$</h3>
	</section>
	<section id="right">
		<h1>Purchase</h1>
		<form action="#">
			<div id="form-card" class="form-field">
				<label for="cc-number">Card number:</label>
				<input id="cc-number" maxlength="19" placeholder="1111 2222 3333 4444" required/>
			</div>

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
			
			<div id="form-sec-code" class="form-field">
				<label for="sec-code">Security code:</label>
				<input type="password" maxlength="3" placeholder="123" required/>
			</div>
			
			<button type="submit">Purchase Premium</button>
		</form>
	</section>
</main>
  </div>
  


  )
}