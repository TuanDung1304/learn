// import './output.css'
import Get from "./Get";
import Post from "./Post";
import Form from "./Form";
import { withTranslation, Trans, useTranslation } from "react-i18next";

function App() {
  const [t, i18n] = useTranslation('common');
  return (
    <>
      <button onClick={() => i18n.changeLanguage("vi")}>vi</button>
      <button onClick={() => i18n.changeLanguage("en")}>en</button>
      <Form />
    </>
  );
}

export default withTranslation("common")(App);
