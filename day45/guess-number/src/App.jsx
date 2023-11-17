import { useLayoutEffect } from "react";
import Main from "./components/Main";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useColorMode } from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

function App() {
  const { colorMode, toggleColorMode } = useColorMode();
  const handleTheme = () => {
    const themeToggle = colorMode === "light" ? "dark" : "light";
    toggleColorMode(themeToggle);
    localStorage.setItem("theme", themeToggle);
  };
  useLayoutEffect(() => {
    toast.info("Chào mừng bạn đến với trò chơi đoán số");
  }, []);
  return (
    <>
      <IconButton
        onClick={handleTheme}
        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
        variant="solid"
        style={{ position: "fixed", top: 20, right: 20 }}
      />
      <Main />
      <ToastContainer
        autoClose="3000"
      />
    </>
  );
}

export default App;