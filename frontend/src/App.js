import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Container} from "react-bootstrap";
import Header from "./components/Header.component";
import Footer from "./components/Footer.component";
import HomePage from "./pages/HomePage.component";
import ProductPage from "./pages/ProductPage.component";

function App() {
    return (
        <Router>
            <Header/>
            <main className='py-3'>
                <Container>
                    <Route exact path='/' component={HomePage}/>
                    <Route path='/product/:id' component={ProductPage}/>
                </Container>
            </main>
            <Footer/>
        </Router>
    );
}

export default App;
