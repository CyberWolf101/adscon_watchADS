import React, { useState } from 'react';
import { createContext } from 'react';

export const tradeContext = createContext()


function TradeContextProvider({ children }) {
    const [canTrade , setCanTrade] = useState(true)


    return (
        <tradeContext.Provider value={[canTrade, setCanTrade]} >
            {children}
        </tradeContext.Provider>
    );
}

export default TradeContextProvider;