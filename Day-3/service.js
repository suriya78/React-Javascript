import React, { useState } from 'react';
import './service.css';

const services = [
    {
      type: 'Maintanance',
      image: 'https://previews.123rf.com/images/john79/john791712/john79171200055/91961370-repair-and-maintenance-symbol-with-tool.jpg',
    },
    {
      type: 'Repair',
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHTFAPKdtGYdQSuRflgXKpRJEYGXa7B7zMU08ROvEwHt_kBD6oi59Z0ESGcOzWoDqG37g&usqp=CAU',
    },
    {
      type: 'Installation',
      image: 'https://decowindow.in/media/catalog/product/cache/9c5c0f05f03be2a2bfe530411f6cf51a/i/n/installation-icon.jpg',
    },
  ];

const ServicePortal = () => {
  const [selectedType, setSelectedType] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  
  const vehicleTypes = ['Car', 'Motorcycle', 'Truck'];
  const carBrands = ['Toyota', 'Honda', 'Ford','Mahindra','Hundai','Jeep','Maruti Suzuki','BMW'];
  const motorcycleBrands = ['Harley-Davidson', 'Yamaha', 'Suzuki','Bajaj','KTM','BMW'];
  const truckBrands = ['Volvo', 'Ford', 'Chevrolet','Barath Benz','Tata'];

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setSelectedBrand('');
  };

  const handleBrandChange = (e) => {
    setSelectedBrand(e.target.value);
  };
  
  const [mobileNumber, setMobileNumber] = useState('');
  const [vehicleNumber, setVehicleNumber] = useState('');
  const [dateOfService, setDateOfService] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted with data:', {
      mobileNumber,
      vehicleNumber,
      dateOfService,
    });

    setMobileNumber('');
    setVehicleNumber('');
    setDateOfService('');
  };
  
  return (
    <div className='for-img'>
      <div></div>
        <div className="service-portal">
        <h1>Vehicle Service Portal</h1>

        <div className="select-container">
            <label htmlFor="vehicle-type">Select Vehicle Type:</label>
            <select id="vehicle-type" value={selectedType} onChange={handleTypeChange}>
            <option value="">Select Type</option>
            {vehicleTypes.map((type) => (
                <option key={type} value={type}>
                {type}
                </option>
            ))}
            </select>
        </div>

        {selectedType && (
            <div className="select-container">
            <label htmlFor="vehicle-brand">Select Vehicle Brand:</label>
            <select id="vehicle-brand" value={selectedBrand} onChange={handleBrandChange}>
                <option value="">Select Brand</option>
                {selectedType === 'Car' && carBrands.map((brand) => (
                <option key={brand} value={brand}>
                    {brand}
                </option>
                ))}
                {selectedType === 'Motorcycle' && motorcycleBrands.map((brand) => (
                <option key={brand} value={brand}>
                    {brand}
                </option>
                ))}
                {selectedType === 'Truck' && truckBrands.map((brand) => (
                <option key={brand} value={brand}>
                    {brand}
                </option>
                ))}
            </select>
           
            </div>
        )}

        {selectedBrand && (
            <div className="selected-info">
            <p>Selected Vehicle Type: {selectedType}</p>
            <p>Selected Vehicle Brand: {selectedBrand}</p>
            </div>
            
        )}
        </div>
        <div className='contains'>
          <form onSubmit={handleSubmit}>
            <div>
              <label>
                Mobile Number:
                <input
                  type="tel"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </label>
            </div>

            <div>
              <label>
                Vehicle Number:
                <input
                  type="text"
                  value={vehicleNumber}
                  onChange={(e) => setVehicleNumber(e.target.value)}
                  required
                />
              </label>
            </div>

            <div>
              <label>
                Date of Service:
                <input
                  type="date"
                  value={dateOfService}
                  onChange={(e) => setDateOfService(e.target.value)}
                  required
                />
              </label>
            </div>

            <div>
              <button type="submit" >Submit</button>
            </div>
          </form>
        </div>
        <h2>Service We Care</h2>
        <div className="service-list">
        {services.map((service, index) => (
          <div className="service" key={index}>
            <img src={service.image} alt={service.type} />
            <h2>{service.type}</h2>
          </div>
        ))}
      </div>

    </div>
  );
};
export default ServicePortal;
