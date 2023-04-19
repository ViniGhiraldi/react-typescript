import { useCallback, useMemo, useRef, useState } from "react";
import { InputLogin } from "./components/InputLogin";
import { ButtonLogin } from "./components/ButtonLogin";
import { useUsuarioLogado } from "../../shared/hooks/UseUsuarioLogado";

export const Login = () => {
  const inputPasswordRef = useRef<HTMLInputElement>(null);

  const { nome } = useUsuarioLogado();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailLength = useMemo(()=>{
    return email.length;

  },[email.length])

  const handleEntrar = useCallback(()=>{
    alert(email + password);

    if(inputPasswordRef.current !== null){
        inputPasswordRef.current.focus()
    }
  },[email, password]);

  return (
    <div>
      <form>

        <p>Olá {nome}!</p>

        <p>Quantidade de caracteres no email: {emailLength}</p>

        <InputLogin
          type="email"
          label="Email"
          value={email}
          onChange={setEmail}
          onPressEnter={() => inputPasswordRef.current?.focus()}
        />

        <InputLogin 
          ref={inputPasswordRef}
          type="password"
          label="Senha"
          value={password}
          onChange={setPassword}
        />

        {/* <label>
          <span>Senha</span>
          <input
            type="password"
            value={password}
            ref={inputPasswordRef}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label> */}

        <ButtonLogin type="button" onClick={handleEntrar}>
          Entrar
        </ButtonLogin>
      </form>
    </div>
  );
};
