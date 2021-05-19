import { useEffect, useState } from 'react';
import { Redirect, useLocation, useHistory } from 'react-router-dom';
import profile from '../images/profile.jpg'
import logo from '../images/logo.png'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import Carousel from '../Carousal.js';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import authService from '../services/authentication.service'

const axios = require('axios');
const LoadingComponent = () => <div> Loading... </div>  

export default function ListProduct() {

  const location = useLocation()
  const history = useHistory()
  const [products, setProducts] = useState([]);
  const [buySubmitted, setBuySubmitted] = useState(false);
  const [editSubmitted, setEditSubmitted] = useState(false);
  const [productId, setProductId] = useState("")
  const [isLoaded, setIsLoaded] = useState(true)
  const [islogout, setisLogout] = useState(false);

  const buyHandler = (productId) => {
    setBuySubmitted(true)
    setProductId(productId)

  };

  const logout = async () =>{
    try {
      const result = await authService.logout()
      console.log(result)
      setisLogout(true)
    } catch(error) {
      alert(error)
    }
  }

  const editHandler = (productId) => {
    setEditSubmitted(true)
    setProductId(productId)
  };

  useEffect( () => {
        // const accessToken =  JSON.parse(localStorage.getItem('user')).accessToken
        // console.log(accessToken)
        axios.get(
        'http://localhost:9000/api/v1/products', {
          // headers: {
          //   'Content-Type': 'application/json',
          //   'Authorization': 'Bearer '+ accessToken,
          //   'Access-Control-Allow-Origin' : '*'
          // },
          withCredentials: true
          
        }).then(product => {
            setProducts(product.data.rows)
            setIsLoaded(false);
        })
        .catch(err => {
            console.error(err)
        });

  } , [])

  function RandomImage() {
    const randomId = Math.floor(Math.random() * 50) + 1;
    return `https://picsum.photos/id/${randomId}/275/275.jpg`
  }



  if ( location.state ){
    if( location.state.status === 'ok'){
        history.replace('/listproduct',{})
        window.location.reload()
    }
  }
  if (islogout) {
    return <Redirect to={{
      pathname: '/login',
    }}
    />
  }
  if (buySubmitted) {
    return <Redirect to={{
      pathname: '/buyproduct/'+productId,
    }}
    />
  } 
  if (editSubmitted) {
    return <Redirect to={{
      pathname: '/editproduct/'+productId,
    }}
    />
  } 
  if (isLoaded){
      return < LoadingComponent />
  }
  else{
  return (
    <body id="list-body">
      <div className="container-scroller">
        <nav className="navbar col-lg-12 col-12 p-0 fixed-top d-flex flex-row">
          <div className="text-center navbar-brand-wrapper d-flex align-items-center justify-content-center">
            <a className="cart-pic" href="/listproduct"><img src={logo} alt="" /></a>
            <div className="navbar-brand title-store" href="/listproduct">Everything you need</div>
          </div>
          <div className="navbar-menu-wrapper d-flex align-items-stretch">
            <ul className="navbar-nav navbar-nav-right">
              <li className="nav-item nav-profile">
                  <div className="nav-profile-img">
                    <img className="profile-img" src={profile} alt=""/>
                    <span className="availability-status online"></span>
                  </div>
                  <div className="nav-profile-text">
                    <p className="text-black">Jimin SudLorh</p>
                  </div>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container-fluid page-body-wrapper">
          <nav className="sidebar sidebar-offcanvas" id="sidebar">
            <ul className="nav fixed-nav">
              <li className="nav-item nav-profile">
                <div className="nav-link">
                  <div className="nav-profile-image">
                    <img src={profile} alt=""/>
                  </div>
                  <div className="nav-profile-text d-flex flex-column">
                    <span className="font-weight-bold mb-2">Jimin SudLorh</span>
                    <span className="text-secondary">Role: Dancer</span>
                  </div>
                </div>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/listproduct">
                  <span className="menu-title active"><i className="icon shopping basket"></i>&nbsp;&nbsp;&nbsp;Products</span>
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/user/me">
                  <span className="menu-title"><i className="icon user"></i>&nbsp;&nbsp;&nbsp;Profile</span>
                  
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={() => logout()}>
                  <span className="menu-title"><i className="icon sign out"></i>&nbsp;&nbsp;&nbsp;Sign out</span>
                </a>
              </li>
              <li className="nav-item sidebar-actions">
                <span className="nav-link">
                  <button className="btn btn-block btn-lg btn-gradient-primary mt-4">+ Add a product</button>
                </span>
              </li>
            </ul>
          </nav>
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="row" id="proBanner">
                <div className="col-12">
                  <span className="d-flex align-items-center purchase-popup">
                  <Carousel />
                  </span>
                </div>
              </div>
              <div className="page-header">
                <h3 className="page-title">Products</h3>
              </div>
              <Card.Group>
              { products.map((element, idx) => {
                  return <div key={idx} className="product-img">
                    <Card>
                      <Image src={RandomImage()} wrapped ui={false} />
                      <Card.Content>
                        <Card.Header>{element.name}</Card.Header>
                        <Card.Meta>
                          <span className='date'>{element.description}</span>
                        </Card.Meta>
                        <Card.Description>
                          Price {element.price} Baht
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                      <div className='two buttons'>
                      
                        <Button circular icon='edit' onClick={() => editHandler(element.id)} />
                        <Button animated='vertical' color='teal' onClick={() => buyHandler(element.id)}  className='shop-btn'>
                          
                          <Button.Content hidden>Shop</Button.Content>
                          <Button.Content visible>
                            <Icon name='shop' />
                          </Button.Content>
                        </Button>
                      </div>
                      </Card.Content>
                    </Card>
                </div>
                })}
              </Card.Group>
            </div>
          </div>
        </div>
      </div>
    </body>
  )}
}