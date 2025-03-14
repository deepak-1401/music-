import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import Layout from './components/Layout';
import Home from './pages/Home';
import Library from './pages/Library';
import Favorites from './pages/Favorites';
import Downloads from './pages/Downloads';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="library" element={<Library />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="downloads" element={<Downloads />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;