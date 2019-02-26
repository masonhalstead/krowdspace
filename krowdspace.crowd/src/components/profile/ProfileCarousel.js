import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export const ProfileCarousel = ({ featured }) => {
  return (
    <React.Fragment>
      <Carousel
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        infiniteLoop={true}
        autoPlay={true}
        stopOnHover={false}
        interval={8000}
      >
        {featured.map((project, index) => {
          return (
            <div key={index}>
              <img src={project.image_url} alt={project.name} />
              <div className="legend">
              <Link to={`/project/${project.uri}`}>
                <Button variant="primary" type="submit">
                  View Project
                </Button>
              </Link>
              </div>
            </div>
          );
        })}
      </Carousel>
    </React.Fragment>
  );
};
