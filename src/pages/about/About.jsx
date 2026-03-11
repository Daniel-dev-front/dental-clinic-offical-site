import React from "react";
import Us from "./us/Us.jsx";
import Principles from "./principles/Principles.jsx";
import OurDoctors from "./ourDoctors/OurDoctors.jsx";
import Interior from "./Interior/Interior.jsx";
import Cta from "./cta/Cta.jsx";
import Review from "./review/Review.jsx";
import Documents from "./document/Documents.jsx";
import ClinicsMap from "./address/ClinicsMap.jsx";
import { ReviewProvider } from "../../context/ReviewContext.jsx";
const About = () => {
  return (
    <div>
    
        <Us/>
        <Principles />
        <OurDoctors />
        <Interior />
        <Documents />
        <ClinicsMap />
      <ReviewProvider>
        <Review />
      </ReviewProvider>
        <Cta />
    </div>
  );
};

export default About;
