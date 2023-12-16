import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Protected from './components/Protected';
import { AuthContextProvider } from './context/AuthContext';
import Account from './pages/Account';
import Home from './pages/Home';
import Signin from './pages/Signin';
import Header from './components/Header';
import MyHtmlComponent from './pages/Test';
import('./index.css');

function App() {
  return (
    <div>
      <AuthContextProvider>
        {/* <Navbar /> */}
        {/* <Header /> */}
        <Routes>
          <Route path="/" element={<MyHtmlComponent />} />
          {/* <Route path="/" element={<Home />} /> */}
          {/* <Route path="/signin" element={<Signin />} /> */}
          {/* <Route path="/signin" element={<Signin />} /> */}
          <Route
            path="/account"
            element={
              <Protected>
                <Account />
              </Protected>
            }
          />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
