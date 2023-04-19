import { createContext } from "react";

interface IUsuarioLogadoContextData {
    nome: string;
}

export const UsuarioLogadoContext = createContext({} as IUsuarioLogadoContextData);

interface IUsuarioLogadoProviderProps {
    children: React.ReactNode;
}

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProviderProps> = ({children}) => {
    return(
        <UsuarioLogadoContext.Provider value={{nome: 'Vini'}}>
            {children}
        </UsuarioLogadoContext.Provider>
    );
}