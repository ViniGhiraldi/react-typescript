import { useContext } from "react"
import { UsuarioLogadoContext } from "../contexts"

export const useUsuarioLogado = () => {
    return useContext(UsuarioLogadoContext);
}