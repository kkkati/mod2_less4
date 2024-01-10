import styles from "./app.module.css";
import { useState, useRef } from "react";

const sendData = (formData) => console.log(formData);

function App() {
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [formError, setFormError] = useState(null);

  const button = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
    sendData({ email, password1 });

    // if (password1 !== password2) {
    //   setFormError("Набранные пароли отличаются");
    // } else {
    //   setFormError(null);
    //   sendData({ email, password1 });
    // }
  };
  const onChangeEmail = ({ target }) => {
    setEmail(target.value);
    let error = null;
    if (!/^[\w_@.]*$/.test(target.value)) {
      error = "Неверный email";
    }
    setFormError(error);
  };

  const onBlurPassword1 = () => {
    if (password1.length < 3) {
      setFormError("Неверный пароль, должно быть не менее 3 символов");
    }
  };

  const onChangePassword1 = ({ target }) => {
    setPassword1(target.value);
    let error = null;
    if (!/^[\w_]*$/.test(target.value)) {
      error =
        "Неверный пароль, можно использовать только латинские буквы, цифры, '_'";
    } else if (target.value.length > 15) {
      error = "Пароль должен быть не больше 15 символов";
    }
    setFormError(error);
  };

  const onChangePassword2 = ({ target }) => {
    setPassword2(target.value);
    if (password1 === target.value && email !== "") {
      setFormError(null);
      button.current.focus();
    }
  };

  const onBlurPassword2 = ({ target }) => {
    if (password1 !== target.value) {
      setFormError("Набранные пароли отличаются");
    } else {
      setFormError(null);
    }
  };

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        {formError && <div className={styles.errorLabel}>{formError}</div>}
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChangeEmail}
        ></input>
        <input
          type="password"
          name="password"
          value={password1}
          onChange={onChangePassword1}
          onBlur={onBlurPassword1}
        ></input>
        <input
          type="password"
          name="password"
          value={password2}
          onChange={onChangePassword2}
          onBlur={onBlurPassword2}
        ></input>
        <button type="submit" disabled={formError !== null} ref={button}>
          Зарегистрироваться
        </button>
      </form>
    </div>
  );
}

export default App;
