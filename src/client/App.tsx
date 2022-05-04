import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "theme-ui";

import './App.css';

import TaskBuildingScreen from "./screens/TaskBuildingScreen";
import theme from "./theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="/task/building/:taskID" element={<TaskBuildingScreen />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
