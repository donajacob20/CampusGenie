import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Homes from "./pages/home/home";
import LoginPage from "./pages/form/login";
import DefaultLayout from "./components/layout/DefaultLayout";
import RegisterPage from "./pages/form/register";
import { useRoutes } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProfilePage } from "./pages/form/profile";
import { Dashboard } from "./pages/chat/dashboard";
import ChatScreen from "./components/layout/chatscreen";

export const successToastMessage = () => {
  toast.success("Successfull!", {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const errorToastMessage = () => {
  toast.error("Failed!", {
    position: toast.POSITION.TOP_RIGHT,
  });
};

function App() {
  let element = useRoutes([
    {
      path: "/",
      element: <DefaultLayout />,
      children: [
        {
          path: "home",
          element: <Homes />,
        },
      ],
    },
    {
      path: "/auth",
      element: <DefaultLayout />,
      children: [
        { path: "signin", element: <LoginPage /> },
        { path: "register", element: <RegisterPage /> },
      ],
    },
    {
      path: "/chat",
      element: <DefaultLayout />,
      children: [
        { path: "dashboard", element: <Dashboard /> },
        { path: "profile", element: <ProfilePage /> },
        { path: "chatscreen", element: <ChatScreen /> },
      ],
    },
  ]);

  return (
    <>
      {element}
      <ToastContainer />
    </>
  );
}

export default App;
