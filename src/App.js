import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Admin from 'admin/Admin';
import Routes from './Routes';
import { getUser } from 'utils/Common';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const user = getUser();

  return user.isAdmin ? (
    <Router forceRefresh>
      <Admin />
    </Router>
  ) : (
    <Router forceRefresh>
      <div className='main'>
        <Header />
        <div className='main-content'>
          <div className='container'>
            <Routes />
          </div>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
