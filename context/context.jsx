"use client";
import { createContext , useContext , useState , useEffect} from "react";
import axios from "axios";

const MyContext = createContext();

export const useMyContext = () => {
    return useContext (MyContext);
}

export const MyContextProvider = ( { children } ) => {

    const [ state , setState ] = useState ( {
        user : null,
        userName : "",
        userEmail : "",
        theme : "light",
        language : "en"
    } );


  useEffect(() => {
    const restoreUser = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/me`,
          { withCredentials: true }
        );
        updateState("user", res.data.user);
      } catch {
        updateState("user", null);
      }
    };

    restoreUser();
  }, []);

   const updateState = (field, newValue) => {
    setState(prevState => ({
      ...prevState,      // Spread the previous state
      [field]: newValue  // Update the specific field
    }));
    };

    return(
            <MyContext.Provider value={{ ...state, updateState }}>
            {children}
            </MyContext.Provider>
    );

}