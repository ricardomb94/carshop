import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "./components/Header";
import ContactFormScreen from "./screens/ContactFormScreen"
import Footer from "./components/Footer";
import Footer2 from "./components/Footer2";
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
      <Footer />
      <ContactFormScreen/>
      <Footer2/>
      <Footer3/>
      <ToastContainer />
      <GotoTopButton />
    </>
  );
};

export default App;
