import Head from "next/head";
import Home from "./Components";
import { isAuthenticated } from "./sign-in/auth";
{/* <Route path="/waste-products" element={<WasteProductsPage />} /> */}

export default function App() {
  return (
    <>
      <Head>
        <title>Your Website Title</title>
        <link rel="icon" href="/bugb.png" type="image/png" />
      </Head>
      <Home />
    </>
  );
}
