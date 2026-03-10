import React from "react";
import Us from "../../components/us/US";
import Principles from "../../components/principles/Principles";
import OurDoctors from "../../components/ourDoctors/OurDoctors";
import Interior from "../../components/Interior/Interior";
import Cta from "../../components/cta/Cta";
import Review from "../../components/review/Review";
import { ReviewProvider } from "../../context/ReviewContext";
import Documents from "../../components/document/Documents";
import ClinicsMap from "../../components/address/ClinicsMap";
const About = () => {
  return (
    <div>
      <ReviewProvider>
        <Us/>
        <Principles />
        <OurDoctors />
        <Interior />
        <Documents />
        {/* <ClinicsMap /> */}
        <Review />
        <Cta />
      </ReviewProvider>
    </div>
  );
};

export default About;
