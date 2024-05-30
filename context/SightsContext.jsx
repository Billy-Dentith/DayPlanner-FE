import React, { createContext, useState } from "react";

export const SightsContext = createContext();

export const SightsProvider = ({ children }) => {
    const [usersSights, setUsersSights] = useState([]);
    const [savedRouteId, setSavedRouteId] = useState(null);

    return (
        <SightsContext.Provider value={{ usersSights, setUsersSights, savedRouteId, setSavedRouteId }}>
          {children}
        </SightsContext.Provider>
    );
}