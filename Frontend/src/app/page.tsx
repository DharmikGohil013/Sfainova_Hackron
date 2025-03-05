import Head from "next/head";
import Home from "./Components";
import { isAuthenticated } from "./sign-in/auth";
import logo from "../assets/bugb.png";

export default function App() {
  return (
    <>
      <Head>
        <title>Your Website Title</title>
        <link rel="icon" href={logo} type="image/png" />
      </Head>
      <Home />
    </>
  );
}
