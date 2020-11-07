import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from "react-bootstrap";
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import HomePage from "./pages/Home.page";
import ProductPage from "./pages/Product.page";
import CartPage from "./pages/Cart.page";
import LoginPage from "./pages/Login.page";
import RegisterPage from "./pages/Register.page";
import ProfilePage from "./pages/Profile.page";
import ShippingPage from "./pages/Shipping.page";
import PaymentPage from "./pages/Payment.page";
import PlaceOrderPage from "./pages/PlaceOrder.page";
import OrderPage from "./pages/Order.page";

function App() {
    return (
        <Router>
            <Header/>
            <main className='py-3'>
                <Container>
                    <Route path='/login' component={LoginPage}/>
                    <Route path='/register' component={RegisterPage}/>
                    <Route path='/profile' component={ProfilePage}/>
                    <Route path='/shipping' component={ShippingPage}/>
                    <Route path='/payment' component={PaymentPage}/>
                    <Route path='/placeorder' component={PlaceOrderPage}/>
                    <Route path='/order/:id' component={OrderPage}/>
                    <Route path='/product/:id' component={ProductPage}/>
                    <Route path='/cart/:id?' component={CartPage}/>
                    <Route exact path='/' component={HomePage}/>
                </Container>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
