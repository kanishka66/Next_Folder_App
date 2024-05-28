import CreateFolderModal from "../components/Folder/CreateFolderModal";
import SideNavBar from "../components/SideNavBar";
import Toast from "../components/Toast";
import "../styles/globals.css";

import { useState } from "react";
import { ShowToastContext } from "../context/ShowToastContext";
import { ParentFolderIdContext } from "../context/ParentFolderIdContext";
import { Appstate } from "../context/AuthContext";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  const [showToastMsg,setShowToastMsg]=useState();
  const [parentFolderId,setParentFolderId]=useState();
  const [login,setLogin] = useState(false);
  const [userName,setUserName] = useState("");
  const [userNumber,setUserNumber] = useState(null);

  return (
    
    <>
    <Appstate.Provider value={{login,userName,setLogin,setUserName,userNumber,setUserNumber}}>
      <ParentFolderIdContext.Provider value={{parentFolderId,setParentFolderId}}>
      <ShowToastContext.Provider value={{showToastMsg,setShowToastMsg}}>
      <div className="flex">
        <SideNavBar />
        <div className="grid grid-cols-1
        md:grid-cols-2 w-full">
          <div className="col-span-2">
            <Component {...pageProps} />
          </div>
        </div>
      
      </div>
      {showToastMsg?<Toast msg={showToastMsg} />:null}
      </ShowToastContext.Provider>
      </ParentFolderIdContext.Provider>
      
      </Appstate.Provider>
    </>
  );
}

export default MyApp;
