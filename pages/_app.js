import { createContext } from "react";
import "../styles/globals.css";

const ThemeContext = createContext("dark");
function MyApp({ Component, pageProps }) {
  return;
  <ThemeContext value="dark">
    <Component {...pageProps} />
  </ThemeContext>;
}

export default MyApp;
