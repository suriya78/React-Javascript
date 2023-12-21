import React from "react";
import "./home.css";
import Footer from "./footer";

const vechileData = [
    {
      id: 1,
      title: 'Bike',
      description: 'Professional Bike Service for Peak Performance',
      imageUrl: 'https://www.apnamechanic.com/wp-content/uploads/2023/05/doorstep-bike-service-1.jpg',
    },
    {
      id: 2,
      title: 'Car',
      description: 'Comprehensive car service ensuring optimal performance and longevity',
      imageUrl: 'https://www.creativefabrica.com/wp-content/uploads/2020/03/08/Auto-service-car-repair-automotive-logo-Graphics-3403838-1-580x348.jpg',
    },
    {
        id:3,
        title: 'Truck',
        description:'Truck service providing maintenance, repairs, and diagnostics for optimal performance and longevit',
        imageUrl:'https://static.vecteezy.com/system/resources/thumbnails/006/793/544/small/semi-truck-repair-illustration-logo-design-vector.jpg',
    },
  ];
const VechileCard = ({ vechile_type }) => (
    <div className="card">
      <img src={vechile_type.imageUrl} alt={vechile_type.title} />
      <div className="card-info">
        <h2>{vechile_type.title}</h2>
        <p className="hello">{vechile_type.description}</p>
        
      </div>
    </div>
);
const Home=()=>
{
    
    return (
        <div className="for-col">
            <div className="home-page">
               <h1>Welcome to Vechile Service Registration</h1>
                 <div className="estate-cards">
                   {vechileData.map((vechile_type) => (
                   <VechileCard key={vechile_type} vechile_type={vechile_type} />
                     ))}
                  </div>
           </div>
           <div>
             <Footer />
            </div>
        </div>
    );
}
export default Home;