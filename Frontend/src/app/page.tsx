import Head from "next/head";
import Home from "./Components";
import { isAuthenticated } from "./sign-in/auth";

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
