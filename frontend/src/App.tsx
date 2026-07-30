import { BrowserRouter, Route, Routes, useLocation, matchPath } from "react-router-dom";
import { CartProvider } from "./contexts/CartContext";
import { CheckoutProvider } from "./contexts/CheckoutContext";
import { FloatingCart } from "./components/ui/FloatingCart";
import { HomePage } from "./pages/Home/HomePage";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { CheckoutPage } from "./pages/Checkout/CheckoutPage";
import { OrderConfirmation } from "./pages/OrderConfirmation/OrderConfirmation";

function App() {
  return (
    <CartProvider>
      <CheckoutProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </CheckoutProvider>
    </CartProvider>
  );
}

function AppRoutes() {
  const location = useLocation();
  const isSpecialRoute = Boolean(
    matchPath("/product/:id", location.pathname) ||
    matchPath("/checkout", location.pathname) ||
    matchPath("/order-confirmation", location.pathname),
  );

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
      </Routes>
      {!isSpecialRoute && <FloatingCart />}
    </>
  );
}

export default App;
