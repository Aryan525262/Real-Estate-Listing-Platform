import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import PropertyContext from '../context/Property/PropertyContext';

const PropertyDetails = () => {
  const { id } = useParams();
  const { allProperties, showProperty } = useContext(PropertyContext);
  const [property, setProperty] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const data = allProperties?.properties || [];

  useEffect(() => {
    showProperty();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      const selected = data.find((p) => p._id === id);
      setProperty(selected);
      setCurrentIndex(0); // Reset image index when property changes
    }
  }, [data, id]);

  const nextImage = () => {
    if (!property?.images?.length) return;
    setCurrentIndex((prev) => (prev + 1) % property.images.length);
  };

  const prevImage = () => {
    if (!property?.images?.length) return;
    setCurrentIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
  };

  if (!property) {
    return <div>Loading Property...</div>;
  }

  const currentImage = property.images?.[currentIndex]?.url || "/noImage.png";

  return (
    <div className='container mx-2 d-flex flex-column'>
      <h2 className="primaryText my-2 text-center mb-3">{property.title}</h2>
      <div className="container ">
      <div className=" position-relative mb-3" style={{ width: "80vh", height: "70vh" }}>
        <img
          width="100%"
          height="100%"
          src={currentImage}
          alt="Property"
          style={{
            borderRadius: "8px",
            boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
          }}        
        />
        {property.images?.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="position-absolute top-50 start-0 translate-middle-y bg-transparent p-2 rounded-circle shadow mx-1 text-white"
              style={{ zIndex: 1 }}
            >
              ◁
            </button>
            <button
              onClick={nextImage}
              className="position-absolute top-50 end-0 translate-middle-y bg-transparent p-2 rounded-circle shadow mx-1 text-white"
              style={{ zIndex: 1 }}
            >
              ▷
            </button>
          </>
        )}
      </div>

      <div className="content-container ">
        <p className="text-bold">{property.description}</p>
        <p className='text-bold'>Location: {property.location}</p>
        <span className="text-bold" style={{color:"Green"}}>Price:</span>
        <span style={{color:"Orange"}}> ₹</span> 
        <span className='text-bold'>{property.price}</span>
        <p className='primaryText'>Property Information</p>

        <p className="text-bold">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis dolore quasi suscipit consequatur voluptas voluptatem excepturi earum cum, quidem praesentium facere ratione. Nesciunt temporibus necessitatibus saepe quas nulla eligendi esse.
        Nam itaque, aut beatae cum omnis voluptatem officiis totam repudiandae alias facere suscipit tempora et, sed voluptas animi molestiae sint vitae, inventore debitis repellat unde temporibus? Delectus rem sunt est!
        Magni eos amet recusandae pariatur molestias fugit, voluptatum corporis vel ex eveniet nobis asperiores perspiciatis libero expedita obcaecati totam quam nisi error non rem doloremque. Est nostrum quos temporibus minus.
        Eaque eligendi rerum nisi atque. Minus quibusdam dolore commodi provident reiciendis repudiandae veniam placeat itaque nihil quas, exercitationem amet debitis id suscipit facere. Neque distinctio asperiores aperiam? Dolores, libero labore?
        </p>
        <p className='primaryText'>Seller Details</p>
        <p className='text-bold'>Name: {property.userId.name}</p>
        <p className='text-bold'>Email: {property.userId.email}</p>
        <p className='text-bold'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, amet. Consequuntur consectetur alias minus deleniti distinctio dolorum, totam tenetur, nesciunt facilis recusandae repudiandae fuga hic, labore eum porro mollitia maxime?
        Unde, obcaecati voluptates quaerat officia voluptas deleniti adipisci, aliquid nobis ipsam asperiores, hic voluptatem sint corrupti! Nemo cumque voluptates, cum culpa minus ipsum adipisci incidunt, vel deleniti, laborum quis quae?</p>
        <Link to="/bookVisit" state={{ propertyId: property._id }} className="btn btn-primary mt-3" role="button">Book A Visit</Link>
      </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
