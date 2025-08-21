import { BrowserRouter } from "react-router-dom";
import ThemeProvider from "./themes/theme.tsx";
import AppRouter from "./router/AppRouter.tsx";
// import AppRouter from "./router/AppRouter";

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
