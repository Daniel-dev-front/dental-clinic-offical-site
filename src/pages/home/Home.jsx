import React from "react";
import Main from "./main/Main";
import Trust from "./trust/Trust";
import NavServices from "./navService/NavServices";
import WeStore from "./weStore/WeStore";
import YouKnow from "./youKnow/YouKnow";
import SignUp from "../auth/signUp/SignUp";
import Advantages from "./advantages/Advantages";
import ServicesPreview from "./servicesPreview/ServicesPreview";

const Home = () => {
  return (
    <div>
      <Main />
      <Trust />
      <NavServices />
      <YouKnow />
      <Advantages />
      <WeStore />
      <ServicesPreview />
      <SignUp />
    </div>
  );
};

export default Home;
