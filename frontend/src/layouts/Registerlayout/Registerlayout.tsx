import Footer from "../../components/Footer";
import RegisterHeader from "../../components/RegisterHeader";
import Register from "../../pages/Register";

interface Props {
  children?: React.ReactNode;
}


export default function Registerlayout({children} : Props) {
  return (
    <div>
      <RegisterHeader />
      {children}
      <Footer />
    </div>
  )
}