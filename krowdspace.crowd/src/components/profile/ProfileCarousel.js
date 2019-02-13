import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import Button from 'react-bootstrap/Button';

export const ProfileCarousel = ({featured}) => {
    return (
        <React.Fragment>
          <Carousel
          showStatus={false}
          showIndicators={false}
          showThumbs={false}
          infiniteLoop={true}
          autoPlay={true}
          stopOnHover={true}
          interval={8000}
          >
          {featured.map((project, index) => {
              return <div key={index}>
                    <img src={project.image_url} alt={project.name}/>
                    <div className="legend">
                      <Button variant="primary" type="submit">
                      View Project
                      </Button>
                    </div>
                </div>
          })}
          </Carousel>
        </React.Fragment>
    )
}