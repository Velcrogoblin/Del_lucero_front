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
import { ExpenseCreate } from "./Components/Expenses/ExpenseCreate";
import { Expenses } from "./Components/Expenses/Expenses";
import { ExpenseEdit } from "./Components/Expenses/ExpenseEdit";
import { Supplies } from "./Components/Supplies/Supplies";
import { SupplyCreate } from "./Components/Supplies/SupplyCreate";
import { SupplyEdit } from "./Components/Supplies/SupplyEdit";
import { PurchasesGrid } from "./Components/Purchases/Purchases";


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
        <Route path="/" element={<Wrapper />}/>
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route index element={<Menu />} />

          <Route path="/clients" element={<Clients />} />
          <Route path="/clients/create" element={<ClientCreate />} />
          <Route path="/clients/id/:id" element={<ClientEdit />} />
          <Route path="/clients/grid" element={<ClientsGrid />} />

        <Route path="/sales" element={<Sales />} />
        <Route path="/sales/history" element={<SalesHistory />} />

        <Route path="/orders" element={<OrdersGrid />} />
        <Route path="/orders/create" element={<OrderCreate />} />
        <Route path="/orders/edit/:id" element={<OrderEdit />} />

        <Route path="/products" element={<Products />} />
        <Route path="/products/grid" element={<ProductsGrid />} />
        <Route path="/products/create" element={<ProductCreate />} />
        <Route path="/products/edit/:id" element={<ProductEdit />} />

        <Route path="/providers" element={<Providers />} />
        <Route path="/providers/create" element={<ProviderCreate />} />
        <Route path="/providers/edit/:id" element={<ProviderEdit />} />

        <Route path="/expenses" element={<Expenses/>} />
        <Route path="/expenses/create" element={<ExpenseCreate/>} />
        <Route path="/expenses/edit/:id" element={<ExpenseEdit />} />

        <Route path="/supplies" element={<Supplies/>} />
        <Route path="/supplies/create" element={<SupplyCreate/>} />
        <Route path="/supplies/edit/:id" element={<SupplyEdit />} />

        <Route path="/catalogue" element={<Catalogue />} />
        <Route path="/detail/:id" element={<Detail />} />

        <Route path="/purchases" element={<PurchasesGrid />} />
      </Routes>
    </div>
  );
}

export default App;
