import { Route, useRoutes } from "react-router-dom";
import Home from "../pages/home/Home";
import About from "../pages/about/About";
import Store from "../pages/store/Store";
import Login from "../pages/auth/login/Login";
import SignUp from "../pages/auth/signUp/SignUp";
import Admin from "../components/admin/panel/Admin";
import AddMaterial from "../components/admin/addMaterial/addMaterial";
import AllServices from "../components/admin/allServices/AllServices";
import DashBoard from "../components/admin/dashboard/DashBoard";
import EditMaterial from "../components/admin/editMaterial/EditMaterial";
import AllMaterials from "../components/admin/allMaterials/AllMaterials";
import AddServices from "../components/admin/addServices/AddServices";
import ProductDetail from "../components/admin/productDetail/ProductDetail";
import ClientLayout from "../components/client/clientLayout/ClientLayout";
import ClientDashboard from "../components/client/ClientDashboard/ClientDashboard";
import Wishlist from "../components/client/wishlist/Wishlist";
import Cart from "../components/client/cart/Cart";
import Appointments from "../components/client/appointments/Appointments";
import ProfileSettings from "../components/client/profileSettings/ProfileSettings";
import AllAppointments from "../components/admin/allAppointments/AllAppointments";
import Doctors from "../components/admin/doctors/Doctors";
import AddDoctor from "../components/admin/addDoctor/AddDoctor";
import EditDoctor from "../components/admin/editDoctor/EditDoctor";
import EditService from "../components/admin/editService/EditService";
import Services from "../pages/services/Services";

const MainRoutes = () => {
  const routes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/store", element: <Store /> },
    { path: "/services", element: <Services /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <SignUp /> },

    {
      path: "/admin",
      element: <Admin />,
      children: [
        { index: true, element: <DashBoard /> },
        { path: "addMaterial", element: <AddMaterial /> },
        { path: "addServices", element: <AddServices /> },
        { path: "editMaterial", element: <EditMaterial /> },
        { path: "allServices", element: <AllServices /> },
        { path: "dashboard", element: <DashBoard /> }, //
        { path: "allMaterials", element: <AllMaterials /> },
        { path: "editMaterial/:id", element: <EditMaterial /> },
        { path: "productDetail/:id", element: <ProductDetail /> },
        { path: "appointments", element: <AllAppointments /> },
        { path: "doctors", element: <Doctors /> },
        { path: "addDoctor", element: <AddDoctor /> },
        { path: "editDoctor/:id", element: <EditDoctor /> },
        { path: "editService/:id", element: <EditService /> },
      ],
    },
    {
      path: "/profile",
      element: <ClientLayout />,
      children: [
        { index: true, element: <ClientDashboard /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "cart", element: <Cart /> },
        { path: "appointments", element: <Appointments /> },
        { path: "settings", element: <ProfileSettings /> },
      ],
    },
  ];

  return useRoutes(routes);
};

export default MainRoutes;
