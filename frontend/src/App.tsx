import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ThemeProvider from "./themes/theme.tsx";
import AppRouter from "./router/AppRouter.tsx";
import { persistor, store } from "./store/store.ts";
import { PersistGate } from "redux-persist/integration/react";
// import AppRouter from "./router/AppRouter";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider>
          <BrowserRouter basename="/ai-career-assistant">
            <AppRouter />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
