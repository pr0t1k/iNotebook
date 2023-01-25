import React from "react";
const About = () => {
  return (
    <div className="my-2">
      <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="https://images6.alphacoders.com/346/thumbbig-346199.webp" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h1>Remember everything</h1>
              <h3>iNotebook was founded to address a growing problem that technology helped to create: how to succeed in a world where the volume and velocity of information are constantly increasing.</h3>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://images7.alphacoders.com/694/thumbbig-694702.webp" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h1>Accomplish anything</h1>
              <h3>People today are overwhelmed with information, and anxious about how to handle it all. iNotebook helps people find focus now, in the moment, to make progress on what matters most.</h3>
            </div>
          </div>
          <div class="carousel-item">
            <img src="https://images4.alphacoders.com/682/thumbbig-682926.webp" class="d-block w-100" alt="..." />
            <div class="carousel-caption d-none d-md-block">
              <h1>Become ever better</h1>
              <h3>iNotebook launched the digital personal productivity movement, and has been growing ever since. More than 225 million people around the world have discovered iNotebook, which is used in over 25 languages every day.</h3>
            </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default About;
