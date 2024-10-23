import SignUp from "./components/SignUp";
import Login from "./components/Login";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import MainHomePage from "./pages/MainHomePage";
import LibraryOfWords from "./pages/LibraryOfWords";
import MainLayout from "./layouts/MainLayout";
import AdminDashboard from "./components/dashboard/AdminDashboard";
import UserAllTimeDashboard from "./components/dashboard/UserAllTimeDashboard";
import { UserDataProvider } from "./components/helpers/UserDataContext";
import { EditModeProvider } from "./components/helpers/EditModeContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<MainLayout />}>
        <Route index element={<MainHomePage />} />
      </Route>
      <Route path="/library" element={<MainLayout />}>
        <Route index element={<LibraryOfWords />} />
      </Route>
      <Route path="/admin-dashboard" element={<MainLayout />}>
        <Route index element={<AdminDashboard />} />
      </Route>
      <Route path="/user-all-time-dashboard" element={<MainLayout />}>
        <Route index element={<UserAllTimeDashboard />} />
      </Route>
    </>
  )
);

const App = () => {
  return (
    <UserDataProvider>
      <EditModeProvider>
        <RouterProvider router={router} />
      </EditModeProvider>
    </UserDataProvider>
  );
};

export default App;
