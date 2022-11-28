// import './output.css'
import Get from "./Get";
import Post from "./Post";
import Form from "./Form";
import axios from "axios";
import { withTranslation, useTranslation } from "react-i18next";
import { QueryClient, QueryClientProvider } from 'react-query'
import Albums, { Album } from "./Albums";
import { useState } from "react";

const queryClient = new QueryClient()

function App() {
  const [t, i18n] = useTranslation('common');
  const [albumId, setAlbumId] = useState(-1)
  return (
    // <>
    //   <button onClick={() => i18n.changeLanguage("vi")}>vi</button>
    //   <button onClick={() => i18n.changeLanguage("en")}>en</button>
    //   <Form />
    // </>
    <QueryClientProvider client={queryClient}>
      {
        albumId > -1 ?
          (<Album albumId={albumId} setAlbumId={setAlbumId} />) :
          (<Albums setAlbumId={setAlbumId}/>)
      }
    </QueryClientProvider>
  );
}

export default withTranslation("common")(App);
