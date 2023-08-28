import { useContext } from "react";
import { ModalProvider } from "./index";

const UseModalContext = () => {
  return useContext(ModalProvider);
};

export default UseModalContext;
