import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css';

import Header from "./components/layout/header";
import Hero from "./components/Home/heroSection";
import About from "./components/pages/About";
import CategoriesSection from './components/Home/categoriesSection';
import BrandSection from "./components/Home/brandsSection";
import Contacts from "./components/pages/contact";
import ClientSection from "./components/Home/ClientsSection";
import Product from './components/data/product';

import Footer from "./components/layout/Footer";



// Home Page with all sections
function HomePage() {
  return (
    <>

      <Hero id="home" />
      <div id="about">
        <About />
      </div>
      <CategoriesSection />
      <BrandSection />
      <div id="contact">
        <Contacts />
      </div>
      <ClientSection />
  
      <Footer />
    </>
  );
}

// Products Page (separate page)
function ProductsPage() {
  return (
    <>
      <Product />
      <Footer />
    </>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation on initial load and route changes
    if (location.hash) {
      const elementId = location.hash.slice(1);
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    } else if (location.pathname === "/") {
      // If no hash and on home page, scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  return (
    <div className="App">
      
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
      </Routes>
    </div>
  );
}

export default App;