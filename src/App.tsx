import React from 'react';
import { Header } from './components/header/Header';
import { Outlet } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';

function App() {
  return (
    <MantineProvider
      theme={{
        fontFamily: 'Inter, sans-serif',
        lineHeight: 1.25,
        colorScheme: 'light',
        black: '#232134',
        radius: { md: '8px' },
        colors: {
          accentLight: ['#5e96fc'],
          hoverLight: ['#92C1FF', '#DEECFF'],
          activeLight: ['#3B7CD3'],
        },
      }}
      withGlobalStyles
    >
      <div className="app">
        <Header />
        <main className="main">
          <Outlet />
        </main>
      </div>
    </MantineProvider>
  );
}

export default App;
