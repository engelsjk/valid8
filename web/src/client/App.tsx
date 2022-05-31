import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "theme-ui";

import './App.css';

import PageNotFoundScreen from "./screens/PageNotFoundScreen";
import HomeScreen from "./screens/HomeScreen";
import TasksScreen from "./screens/TasksScreen";
import BuildingsScreen from "./screens/BuildingsScreen";
import BuildingScreen from "./screens/BuildingScreen";
import theme from "./theme";

const App = () => (
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<PageNotFoundScreen />} />
        <Route path="/" element={<HomeScreen />} />
        <Route path="tasks" element={<TasksScreen />} />
        <Route path="tasks/buildings" element={<BuildingsScreen />} />
        <Route path="tasks/buildings/:taskID" element={<BuildingScreen />} />
      </Routes>
    </BrowserRouter >
  </ThemeProvider >
);

export default App;
