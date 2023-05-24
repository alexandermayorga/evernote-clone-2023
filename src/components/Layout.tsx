import { ReactElement } from "react";
// import Footer from "./Footer";
// import Header from "./Header";

type Props = {
    children?: ReactElement
    // any props that come into the component
}

export default function Layout({ children }: Props) {
  return (
    <div className="main d-flex">
      {/* <Header /> */}
      {children}
      {/* <Footer /> */}
    </div>
  );
}
