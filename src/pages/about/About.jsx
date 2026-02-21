import React from "react";
import Us from "./us/Us";
import Principles from "./principles/Principles";
import OurDoctors from "./ourDoctors/OurDoctors";
import Interior from "./Interior/Interior";
import Cta from "./cta/Cta";
import ClinicsMap from "./adress/ClinicsMap";
import Review from "./review/Review";
import { ReviewProvider } from "../../context/ReviewContext";
import Documents from "./document/Documents";
// import scss from "./Aboute.module.scss"
const About = () => {
  return (
    <div>
      <ReviewProvider>
        <Us />
        <Principles />
        <OurDoctors />
        <Interior />
        <Documents />
        <ClinicsMap />
        <Review />
        <Cta />
      </ReviewProvider>
    </div>
  );
};

export default About;
