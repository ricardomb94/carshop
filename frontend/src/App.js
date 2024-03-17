import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ContactFormScreen from "./screens/ContactFormScreen"
import Footer3 from "./components/Footer3";
import GotoTopButton from "./components/GotoTopButton";


const App = () => {
  return (
    <>
      <Header />
      <main className='py-3'>
        <Container>
          <Outlet />
        </Container>
      </main>
      <ContactFormScreen/>
      <Footer3/>
      <ToastContainer />
      <GotoTopButton  className="btn btn-warning gotop-button"/>
    </>
  );
};

export default App;
