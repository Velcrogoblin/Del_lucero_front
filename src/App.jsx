import "./App.css";
import { useState, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Login } from "./Components/Login/Login";
import { Register } from "./Components/Login/Register";
import { Catalogue } from "./Components/Catalogue/Catalogue";
import { Wrapper } from "./Components/Wrapper/Wrapper";
import { Menu } from "./Components/Menu/Menu";
import { Clients } from "./Components/Clients/Clients";
import { ClientCreate } from "./Components/Clients/ClientCreate";
import { Orders } from "./Components/Orders/Orders";
import { Sales } from "./Components/Sales/Sales";
import { Products } from "./Components/Products/Products";
import { OrderCreate } from "./Components/Orders/OrderCreate";
import { ProductCreate } from "./Components/Products/ProductCreate";
import { ClientEdit } from "./Components/Clients/ClientEdit";
import { OrderEdit } from "./Components/Orders/OrderEdit";
import { ProductEdit } from "./Components/Products/ProductEdit";
import { SalesHistory } from "./Components/Sales/SalesHistory";
import { Providers } from "./Components/Providers/Providers";
import { ProviderEdit } from "./Components/Providers/ProviderEdit";
import { ProviderCreate } from "./Components/Providers/ProviderCreate";
import { Detail } from "./Components/Detail/Detail";
import { ClientsGrid } from "./Components/Clients/ClientsGrid";
import { ProductsGrid } from "./Components/Products/ProductsGrid";
import { OrdersGrid } from "./Components/Orders/OrdersGrid";
import { ProviderGrid } from "./Components/Providers/ProviderGrid";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken && storedToken.length > 150) {
      setIsLoggedIn(true);
    }
  }, [token]);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Wrapper />}>
          {isLoggedIn ? (
            <Route
              index
              element={
                <Menu setToken={setToken} setIsLoggedIn={setIsLoggedIn} />
              }
            />
          ) : (
            <Route index element={<Login setToken={setToken} />} />
          )}
          {/* <Route index element={<Menu />} /> */}
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/register" element={<Register />} />

          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/create" element={<ClientCreate />} />
          <Route path="/clients/id/:id" element={<ClientEdit />} />
          <Route path="/clients/grid" element={<ClientsGrid />} />

          <Route path="/sales" element={<Sales />} />
          <Route path="/sales/history" element={<SalesHistory />} />

          <Route path="/orders" element={<Orders />} />
          <Route path="/orders/grid" element={<OrdersGrid />} />
          <Route path="/orders/create" element={<OrderCreate />} />
          <Route path="/orders/edit/:id" element={<OrderEdit />} />

          <Route path="/products" element={<Products />} />
          <Route path="/products/grid" element={<ProductsGrid />} />
          <Route path="/products/create" element={<ProductCreate />} />
          <Route path="/products/edit/:id" element={<ProductEdit />} />

          <Route path="/providers" element={<Providers />} />
          <Route path="/providers/create" element={<ProviderCreate />} />
          <Route path="/providers/edit/:id" element={<ProviderEdit />} />
          <Route path="/providers/grid" element={<ProviderGrid />} />

          <Route path="/catalogue" element={<Catalogue />} />
          <Route path="/detail/:id" element={<Detail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
