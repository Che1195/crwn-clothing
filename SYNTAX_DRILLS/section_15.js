 /*********************************************************
 * 160. CSS in JS
 **********************************************************/

 // having separate CSS files for every component means some components may overlap
 // in there naming since they will be sharing the same global name space, unfortunately
 // we lose access to a lot of selectors

 // javascript can render CSS:

 const textStyles = {
   color: "red",
   fontSize: "16px"
 }

 const Card = () => (
   <div style={style}> I am a Component </div>
 )

 // we lose the seperation of concerns but the performance gets a big boost since
 // JS is much faster, though there is still some overhead costs that come with
 // having more JS

 // the styled components library allows us to encapsulate all of our CSS into the
 // component that it styles

  /*********************************************************
 * 161. Styled Components
 **********************************************************/

 // using npm install styled-components to add the library to your project

 // this library solves all the issues faced with using JS for CSS without it

 // since JS controls CSS we can use props being passed into our components to 
 // control its styling

  /*********************************************************
 * 162. Styled Components in our App
 **********************************************************/

 // example using the simple HomePage component

 // homepage.styles.jsx
import styled from "styled-components"
import HomePage from "../src/pages/homepage/homepage.component";

export const HomePageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

// homepage.component.jsx
import React from "react";
import Directory from "../../components/directory/directory.component";

import { HomePageContainer } from "./homepage.styles"

const HomePage = () => (
  <HomePageContainer>
    <Directory />
  </HomePageContainer>
);

export default HomePage;