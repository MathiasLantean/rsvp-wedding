import './Ubicacion.css';
import iconTorta from '../../../assets/icon-torta.png';
import iconCopas from '../../../assets/icon-copas.png';

const Ubicacion: React.FC = () => {
  return (
    <>
    <div className="ubicacion-info-container">
      <div className="ubicacion-info-content">
        <img src={iconCopas} alt="icon-ciudad" className="ubicacion-info-icon" height={80} width={80}/>
          <div className="ubicacion-info-content-text">
          <h2 className="ubicacion-info-title">Ciudad</h2>
        <p className="ubicacion-info-description">Montevideo, Uruguay</p>
        </div>
      </div>
      <div className="ubicacion-info-content">
        <img src={iconTorta} alt="icon-torta" className="ubicacion-info-icon" height={80} width={80}/>
        <div className="ubicacion-info-content-text">
            <h2 className="ubicacion-info-title">Dirección</h2>
            <p className="ubicacion-info-description">Cno. del Tropero 4750</p>
        </div>
      </div>

    </div>
<div className="map-wrapper">

<iframe className="ubicacion-iframe"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1637.8215884355463!2d-56.37206572134811!3d-34.81491801703974!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a1d0854166c1b5%3A0xe8a22c7a58378835!2sLos%20Tilos!5e0!3m2!1ses!2suy!4v1769240400447!5m2!1ses!2suy"
        width="100%"
        height="800px"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
  <div className="map-overlay"></div>
      </div>
      </>
  );
};

export default Ubicacion;