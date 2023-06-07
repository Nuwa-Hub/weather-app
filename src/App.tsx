import React from "react";
import { useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GlobalStyles } from "./app.styled";

import { AppStore } from "./store/store";
import { darkTheme, lightTheme } from "./theme";
import { routes } from "./routes";
import ProtectedRoute from "./common/ProtectedRoute";
import Auth from "./common/Auth";
import PermissionDenied from "./components/ui/PermissionDenied";
import Login from "./components/Login/Login";
import Home from "./pages/Home";

const App: React.FC = () => {
  const darkMode = useSelector((state: AppStore) => state.app.darkMode);
  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <BrowserRouter>
        <GlobalStyles />

        <Auth>
          <Routes>
            <Route path="/" element={<Login />} />
            {routes.map(({ element, path, name }) => (
              <Route
                key={name}
                path={path}
                element={<ProtectedRoute element={element} />}
              />
            ))}
            <Route path="/permission-denied" element={<PermissionDenied />} />
          </Routes>
        </Auth>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
