import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Login({ btnName, onSignIn }) {
  const [values, setValues] = useState({});
  const { email, password } = values;

  const handleChange = (evt) => {
    const { name, value } = evt.target;

    setValues({ ...values, [name]: value });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSignIn({ email, password });
    setValues({});
  };

  return (
    <div className="authorization">
      <h2 className="authorization__title">Вход</h2>
      <form name="register" className="authorization__form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="authorization__input"
          autoComplete="email"
          onChange={handleChange}
          value={email ?? ''}
          required
        />
        <span className={`authorization__input-error email-error`}></span>
        <input
          type="password"
          name="password"
          placeholder="Пароль"
          className="authorization__input"
          autoComplete="current-password"
          onChange={handleChange}
          value={password ?? ''}
          required
        />
        <span className={`authorization__input-error password-error`}></span>
        <button type="submit" className="authorization__submit-button">
          {btnName}
        </button>
        <Link to="/sign-up" className="authorization__link">
          Нет аккаунта? Зарегистрируйтесь
        </Link>
      </form>
    </div>
  );
}
