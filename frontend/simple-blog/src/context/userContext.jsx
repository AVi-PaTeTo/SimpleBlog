import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"


const UserContext = createContext();

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            try{
                const decodedToken = jwtDecode(token);
                setCurrentUser({
                    id: decodedToken.id
                });
            } catch (err) {
                console.error("Invalid Token:", err);
                setCurrentUser(null);
                }
            }
        },[])

    return (
        <UserContext.Provider value={{ currentUser, setCurrentUser }}>
        {children}
        </UserContext.Provider>
  );
};


export const useUser = () => useContext(UserContext);