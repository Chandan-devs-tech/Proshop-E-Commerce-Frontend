import React from 'react';
import { Carousel } from 'react-bootstrap';

const Home = () => (
  <div className="carousel-container">
    {' '}
    <Carousel interval={2500} fluid>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={`${process.env.PUBLIC_URL}/assets/man/cover-img.jpg`}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={`${process.env.PUBLIC_URL}/assets/woman/cover-img.jpg`}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={`${process.env.PUBLIC_URL}/assets/kids/cover-img.jpg`}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={`${process.env.PUBLIC_URL}/assets/perfumes/cover-img.webp`}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={`${process.env.PUBLIC_URL}/assets/cosmetics/cover-img.jpg`}
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100 carousel-img"
          src={`${process.env.PUBLIC_URL}/assets/skin-care/cover-img.jpg`}
          alt="First slide"
        />
      </Carousel.Item>
    </Carousel>
  </div>
);

export default Home;
