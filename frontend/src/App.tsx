import { BrowserRouter, Route, Routes, useLocation, matchPath } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { FloatingCart } from "./components/ui/FloatingCart";
import { HomePage } from "./pages/Home/HomePage";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </CartProvider>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isProductDetails = Boolean(matchPath("/product/:id", location.pathname));

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
      </Routes>
      {!isProductDetails && <FloatingCart />}
    </>
  );
}

export default App;