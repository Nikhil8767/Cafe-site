import React from "react";
import { Link } from "react-router-dom";
import { HiOutlineArrowRight } from "react-icons/hi";

const About = () => {
  return (
    <>
      <section className="about" id="about">
        <div className="container">
          <div className="banner">
            <div className="top">
              <h1 className="heading">ABOUT US</h1>
              <p>The only thing we're serious about is food.</p>
            </div>
            <p className="mid">
              Lets have the Breakfast ,Lunch and dinner at your nearest cafe ,so come to Moonlit Mug cafe
              and have your favourite meal.
              If its little far from your home then just for eating best good quality food you can come 
              Moonlit Mug is waiting for you.
              we are mainting high quality of hygine and cleanliness.
              you will find proper arragnments as you want.
              we have music group for you so can you can enjoy the music while eating food .
            </p>
            <Link to={"/"}>
              Explore Menu{" "}
              <span>
                <HiOutlineArrowRight />
              </span>
            </Link>
          </div>
          <div className="banner">
            <img src="about.png" alt="about" />
          </div>
        </div>
      </section>
    </>
  );
};

export default About;