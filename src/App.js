// import './output.css'
import Get from "./Get.tsx";
import Post from "./Post.tsx";
import Form from "./Form.jsx";
import axios from "axios";
import { withTranslation, useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Prefetching from "./Prefetching";

const queryClient = new QueryClient()

function App() {
  const [t, i18n] = useTranslation('common');
  
  return (
    <>
      <button onClick={() => i18n.changeLanguage("vi")}>vi</button>
      <button onClick={() => i18n.changeLanguage("en")}>en</button>
      <Form />
      
      {/* <Prefetching /> */}
    </>


  );
}

export default withTranslation("common")(App);