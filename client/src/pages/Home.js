// import React, { useState } from "react";
import React from 'react';
import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";

// const Home = () => {
//   //this page manages the state currentCategory which is passed to ProductList component as a prop and
//   //instructs which category's products should be retrieved by Apollo.  To set that currentCaregory value,
//   //the setCategory callback function is passed to the categoryMenu component as a prop to be executed
//   //on a new category pick
//   const [currentCategory, setCategory] = useState("");

//   return (
//     <div className="container">
//       <CategoryMenu setCategory={setCategory} />
//       <ProductList currentCategory={currentCategory} />
//     </div>
//   );
// };

const Home = () => {
  return (
    <div className="container">
      <CategoryMenu />
      <ProductList />
    </div>
  );
};

export default Home;
