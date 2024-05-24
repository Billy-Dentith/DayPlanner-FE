import React, { createContext, useState } from "react";

export const SightsContext = createContext();

export const SightsProvider = ({ children }) => {
    const [usersSights, setUsersSights] = useState([]);

    return (
        <SightsContext.Provider value={{ usersSights, setUsersSights }}>
          {children}
        </SightsContext.Provider>
    );
}