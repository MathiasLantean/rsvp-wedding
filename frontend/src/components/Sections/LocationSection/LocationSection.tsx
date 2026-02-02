import "./LocationSection.css";

const LocationSection: React.FC = () => {
  const address = "Los Tilos, Camino del Tropero 4750, Montevideo, Uruguay";

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    address,
  )}`;

  return (
    <div className="location-container">
      <div className="location-title-container">
        <h2 className="location-title">Ubicación</h2>
        <div className="location-text-container">
          <p className="location-text">LOS TILOS</p>
          <p className="location-text">Cno. del Tropero 4750</p>
          <p className="location-text">Montevideo, Uruguay</p>
        </div>
        <a
          href={mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="button-search"
        >
          Cómo llegar
        </a>
      </div>
      <div className="map-wrapper">
        <iframe
          // className="ubicacion-iframe"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1637.8215884355463!2d-56.37206572134811!3d-34.81491801703974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a1d0854166c1b5%3A0xe8a22c7a58378835!2sLos%20Tilos!5e0!3m2!1ses!2suy!4v1769240400447!5m2!1ses!2suy"
          width="100%"
          height="800px"
          style={{border: 0}}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
        <div className="map-overlay"></div>
      </div>
    </div>
  );
};

export default LocationSection;
