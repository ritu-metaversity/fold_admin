import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifyToast = () => {
  const succes = (string) =>
    toast.success(string, {
      autoClose: 3000,
      style: { background: "rgb(80 91 119)", color: "white" },
    });

  const error = (string) =>
    toast.error(string, {
      autoClose: 3000,
      style: { background: "rgb(80 91 119)", color: "white" },
    });

  return { succes, error };
};
