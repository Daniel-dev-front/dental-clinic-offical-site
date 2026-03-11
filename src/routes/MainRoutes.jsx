import { useRoutes } from "react-router-dom";
import { lazy } from "react";
import ProtectedRoute from "./ProtectedRoute";

const Home = lazy(() => import("../pages/home/Home"));
const About = lazy(() => import("../pages/about/About"));
const Store = lazy(() => import("../pages/store/Store"));
const Services = lazy(() => import("../pages/services/Services"));
const Login = lazy(() => import("../pages/auth/login/Login"));
const SignUp = lazy(() => import("../pages/auth/signUp/SignUp"));

// Админские компоненты
const Admin = lazy(() => import("../components/admin/panel/Admin"));
const AddMaterial = lazy(() => import("../components/admin/addMaterial/AddMaterial"));
const AllServices = lazy(() => import("../components/admin/allServices/AllServices"));
const DashBoard = lazy(() => import("../components/admin/dashboard/DashBoard"));
const EditMaterial = lazy(() => import("../components/admin/editMaterial/EditMaterial"));
const AllMaterials = lazy(() => import("../components/admin/allMaterials/AllMaterials"));
const AddServices = lazy(() => import("../components/admin/addServices/AddServices"));
const ProductDetail = lazy(() => import("../components/admin/productDetail/ProductDetail"));
const AllAppointments = lazy(() => import("../components/admin/allAppointments/AllAppointments"));
const Doctors = lazy(() => import("../components/admin/doctors/Doctors"));
const AddDoctor = lazy(() => import("../components/admin/addDoctor/AddDoctor"));
const EditDoctor = lazy(() => import("../components/admin/editDoctor/EditDoctor"));
const EditService = lazy(() => import("../components/admin/editService/EditService"));

// Клиентские компоненты
const ClientLayout = lazy(() => import("../components/client/clientLayout/ClientLayout"));
const ClientDashboard = lazy(() => import("../components/client/ClientDashboard/ClientDashboard"));
const Wishlist = lazy(() => import("../components/client/Wishlist/Wishlist"));
const Cart = lazy(() => import("../components/client/cart/Cart"));
const Appointments = lazy(() => import("../components/client/appointments/Appointments"));
const ProfileSettings = lazy(() => import("../components/client/profileSettings/ProfileSettings"));
const Checkout = lazy(() => import("../components/client/checkout/Checkout"));

const MainRoutes = () => {
  const routes = [
    // Публичные маршруты
    { path: "/", element: <Home /> },
    { path: "/about", element: <About /> },
    { path: "/store", element: <Store /> },
    { path: "/services", element: <Services /> },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <SignUp /> },

    // Админка
    {
      path: "/admin",
      element: (
        <ProtectedRoute roles={["admin"]}>
          <Admin />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <DashBoard /> },
        { path: "addMaterial", element: <AddMaterial /> },
        { path: "addServices", element: <AddServices /> },
        { path: "editMaterial", element: <EditMaterial /> },
        { path: "allServices", element: <AllServices /> },
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

    // Личный кабинет
    {
      path: "/profile",
      element: (
        <ProtectedRoute>
          <ClientLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <ClientDashboard /> },
        { path: "wishlist", element: <Wishlist /> },
        { path: "cart", element: <Cart /> },
        { path: "appointments", element: <Appointments /> },
        { path: "settings", element: <ProfileSettings /> },
        { path: "checkout", element: <Checkout /> },
      ],
    },
  ];

  return useRoutes(routes);
};

export default MainRoutes;