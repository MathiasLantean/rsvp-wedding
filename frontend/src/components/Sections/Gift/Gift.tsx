import {useState} from "react";
import {Modal} from "../../ui/modal";
import "./Gift.css";

const Gift: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const accounts = [
    {
      id: "uyu",
      title: "Cuenta bancaria en Pesos",
      data: {
        titular: "Carolina Reolon",
        banco: "BROU",
        cuenta: "Caja de Ahorro",
        numero: "001385836-00002",
      },
    },
    {
      id: "usd",
      title: "Cuenta bancaria en Dólares",
      data: {
        titular: "Carolina Reolon",
        banco: "BROU",
        cuenta: "Caja de Ahorro",
        numero: "001385836-00003",
      },
    },
    {
      id: "uyu2",
      title: "Cuenta bancaria en Pesos",
      data: {
        titular: "Juan Pérez",
        banco: "Banco Nación",
        cuenta: "Caja de Ahorro",
        numero: "1234567890",
      },
    },
    {
      id: "usd2",
      title: "Cuenta bancaria en Dólares",
      data: {
        titular: "Juan Pérez",
        banco: "Banco Galicia",
        cuenta: "Caja de Ahorro en USD",
        numero: "0987654321",
      },
    },
  ];

  const accountFields = [
    {label: "Titular:", key: "titular"},
    {label: "Banco:", key: "banco"},
    {label: "Cuenta:", key: "cuenta"},
    {label: "Nº de cuenta:", key: "numero"},
  ] as const;

  return (
    // <section className="gift-section">
    //   <div className="gift-background" />
    //   <div className="gift-overlay" />

    //   <div className="gift-content">
    //     <div className="gift-card">
    //       <h2 className="gift-title">Regalos</h2>

    //       <div className="gift-main-text">
    //         <p className="gift-paragraph-text">
    //           El mejor regalo para nosotros es que puedan acompañarnos en este
    //           día tan especial, celebrar juntos, reírnos, abrazarnos y compartir
    //           la fiesta con ustedes.
    //         </p>
    //         <p className="gift-paragraph-text">
    //           Y si además estaban pensando en hacernos un regalo, siendo
    //           sinceros: nada nos va a hacer tan felices como invertir en nuestra
    //           casita.
    //         </p>
    //         <p className="gift-paragraph-text">
    //           Por eso, cualquier aporte para este nuevo proyecto juntos será más
    //           que bienvenido y muy agradecido.
    //         </p>
    //         <p className="gift-intro-text gift-paragraph-text">
    //           Les dejamos nuestras cuentas por si quieren sumarse:
    //         </p>
    //       </div>

    //       <button
    //         type="button"
    //         className="gift-button"
    //         onClick={() => setIsModalOpen(true)}
    //       >
    //         Ver cuentas bancarias
    //       </button>

    //       <p className="gift-thanks-text">
    //         Gracias por ser parte de nuestra historia 💖
    //       </p>
    //     </div>
    //   </div>

    //   {/* <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
    //     <div className="gift-modal-content">
    //       <h2 className="gift-modal-title">Cuentas Bancarias</h2>
    //       <div className="gift-modal-accounts">
    //         {accounts.map((account) => (
    //           <div key={account.id} className="gift-modal-account">
    //             <h4 className="gift-modal-account-title">{account.title}</h4>

    //             <div className="gift-modal-account-data">
    //               {accountFields.map((field) => (
    //                 <div
    //                   key={field.label}
    //                   className="gift-modal-account-field"
    //                 >
    //                   <span className="gift-modal-field-label">
    //                     {field.label}
    //                   </span>
    //                   <span className="gift-modal-field-value">
    //                     {account.data[field.key]}
    //                   </span>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //         ))}
    //       </div>
    //     </div>
    //   </Modal> */}
    // </section>
    <></>
  );
};

export default Gift;
