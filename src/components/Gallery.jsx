// Gallery.jsx
import React from "react";
import "./Gallery.css";

const images = [
  {
    src: "https://plus.unsplash.com/premium_photo-1661380558859-40df8dd91dfd?q=80&w=2070&auto=format&fit=crop",
    caption: "Modern Haircuts and Styling",
  },
  {
    src: "https://images.unsplash.com/photo-1536520002442-39764a41e987?q=80&w=1887&auto=format&fit=crop",
    caption: "Classic Shaves for a Fresh Look",
  },
  {
    src: "https://plus.unsplash.com/premium_photo-1661542350224-8e3f095ce053?q=80&w=1887&auto=format&fit=crop",
    caption: "Premium Grooming Services",
  },
  {
    src: "https://images.unsplash.com/photo-1593702288056-7927b442d0fa?q=80&w=2070&auto=format&fit=crop",
    caption: "Traditional Shave Services",
  },
];

const Gallery = () => {
  return (
    <section id="gallery" className="gallery-container">
      <h2 className="gallery-heading">Gallery</h2>
      <div className="gallery-track">
        {images.map((image, index) => (
          <div key={index} className="gallery-item">
            <img src={image.src} alt={`Slide ${index + 1}`} />
            <div className="caption">
              <p>{image.caption}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
