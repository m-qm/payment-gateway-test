// pages/Home.js
import CreatePayment from './createPayment';
import Footer from '../components/Footer';

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <CreatePayment />
      <div style={{ bottom: "0", position: 'fixed', marginBottom: '8px' }}>
        <Footer />
      </div>
    </div>
  )
};

export default Home;
