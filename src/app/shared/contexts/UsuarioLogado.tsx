import { createContext, useCallback, useEffect, useState } from "react";

interface IUsuarioLogadoContextData {
    nome: string;
    logout: () => void;
}

export const UsuarioLogadoContext = createContext({} as IUsuarioLogadoContextData);

interface IUsuarioLogadoProviderProps {
    children: React.ReactNode;
}

export const UsuarioLogadoProvider: React.FC<IUsuarioLogadoProviderProps> = ({children}) => {
    const [nome, setNome] = useState('');

    useEffect(()=>{
        setTimeout(()=>{
            setNome('Vinicius')
        },300)
    })

    const handleLogout = useCallback(()=>{
        console.log('logout');
    },[])

    return(
        <UsuarioLogadoContext.Provider value={{nome: nome, logout: handleLogout}}>
            {children}
        </UsuarioLogadoContext.Provider>
    );
}