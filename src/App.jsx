import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';

import Header from "./components/Layout/header";
import Hero from "./components/Home/heroSection";
import About from "./components/pages/About";
import CategoriesSection from './components/Home/categoriesSection';
import BrandSection from "./components/Home/brandsSection";
import Contacts from "./components/pages/contact";
import ClientSection from "./components/Home/ClientsSection";
import Product from './components/data/product';
import Footer from "./components/Layout/Footer";
import AIChatBox from './components/Ui/AiChatbox';
import { allProducts, categories } from './components/data/product';


import WhatsAppButton from './components/Ui/WhatsAppButton';

import CallButton from './components/Ui/CallButton';


function HomePage() {
  return (
    <>
 <Header />
      <Hero />
      <About />
      <CategoriesSection />
      <BrandSection />
      <ClientSection />
      <Contacts />
      <Footer />
    </>
  );
}

// ProductsPage component - shows the Product component
function ProductsPage() {
  return <Product />;
}

function App() {
  const phoneNumber = "+971 52 708 7748";

  return (
    <div className="App">
      <Header />
      <div className="relative z-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
        </Routes>
      </div>
      <AIChatBox products={allProducts} categoriesList={categories} />
      
      {/* WhatsApp button - */}
      <WhatsAppButton 
        phoneNumber={phoneNumber}
        message="Hello, I'm interested in your products!"
        position="bottom-22 right-7"
      />
      
      {/* Call button - */}
      <CallButton 
        phoneNumber={phoneNumber}
        position="bottom-40 right-7"
      />
    </div>
  );
}

export default App;