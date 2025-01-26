import { ToastContainer } from "react-toastify"
import RouterApp from "./router"
import '../src/toast.css';

function App() {


  return (
    <div className="App">
      <ToastContainer autoClose={1000} // Fecha o toast após 2 segundos
        hideProgressBar={false} // Mantém a barra de progresso visível
        newestOnTop={true} // Exibe os toasts mais recentes no topo
        closeOnClick // Fecha o toast ao clicar
        pauseOnHover // Pausa o timer ao passar o mouse 
      />
      <RouterApp />
    </div>
  )
}

export default App
