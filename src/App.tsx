import { useState, useEffect } from 'react';
import './styles/container.css';

function App() {
  // 1. Definimos la fecha de vencimiento (Formato: AAAA-MM-DD para evitar errores de parsing)
  const fechaVencimientoStr = "2027-02-03"; 
  const [mensajeDias, setMensajeDias] = useState("");
  const [esVencida, setEsVencida] = useState(false);

  useEffect(() => {
    const calcularDiferencia = () => {
      const hoy = new Date();
      const vencimiento = new Date(fechaVencimientoStr);
      
      // Eliminamos las horas para comparar solo días
      hoy.setHours(0, 0, 0, 0);
      vencimiento.setHours(0, 0, 0, 0);

      const diferenciaTiempo = vencimiento - hoy;
      const diferenciaDias = Math.ceil(diferenciaTiempo / (1000 * 60 * 60 * 24));

      if (diferenciaDias < 0) {
        setEsVencida(true);
        setMensajeDias(`La póliza ha vencido hace ${Math.abs(diferenciaDias)} días`);
      } else if (diferenciaDias === 0) {
        setEsVencida(false);
        setMensajeDias("La póliza vence hoy");
      } else {
        setEsVencida(false);
        setMensajeDias(`Faltan ${diferenciaDias} días para el vencimiento`);
      }
    };

    calcularDiferencia();
  }, [fechaVencimientoStr]);

  return (
    <>
      <div className="container">
        <div className="logo"> 
          <img src="https://app.segurosrc871.com/images/logo2.png" height="80%" width="80%" alt="Logo" />
        </div>
        <div className="card">
          <div className="card-header">
            Detalles del Vehículo
          </div>
          <div className="card-body">
            {/* El estatus ahora cambia de color dinámicamente */}
            <p style={{ color: esVencida ? 'red' : 'green' }}>
              <strong style={{ color: 'black' }}>Estatus:</strong> {esVencida ? "VENCIDA" : "VIGENTE"}
            </p>
            
            <p><strong>Vehículo:</strong> HAOJIN AGUILA 150 CC</p>
            <p><strong>Placa:</strong> AN2Y25D</p>
            <p><strong>Serial C.:</strong> 81K1AA7B2SC009762</p>
            <p><strong>Asegurado:</strong> Raizelys Dariagny Medina Teran </p>
            <p><strong>Fecha de Vencimiento:</strong> 03-02-2027</p>
            
            <p><strong>Días Restantes:</strong> {mensajeDias}</p>
          </div>
          
          <div className="card-footer text-center">
            <div className="d-flex justify-content-center gap-2">
              <a href="https://app.segurosrc871.com/providencia/" 
                 className="btn btn-custom d-flex align-items-center justify-content-center text-center" 
                 style={{ minWidth: 250, height: 60 }}>
                Descargar Providencia de la SUDEASEG <br />SUJETO REGULADO # 14
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
