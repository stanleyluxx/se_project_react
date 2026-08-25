import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import ModalWithForm from "../modalWithForm/ModalWithForm.jsx";
import { useEffect } from "react";

const defaultValues = {
  email: "",
  password: "",
};

const LoginModal = ({ isOpen, onLogin, onCloseModal }) => {
  const validateLoginForm = (values) => {
    const errors = {};

    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!values.password || values.password.trim() === "") {
      errors.password = "Please enter a password.";
    }

    return errors;
  };

  const { values, handleChange, resetForm, errors, showErrors, handleSubmit } =
    useFormWithValidation(defaultValues, validateLoginForm);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  function handleFormSubmit(evt) {
    handleSubmit(evt, onLogin);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Log In"
      buttonText="Log In"
      onSubmit={handleFormSubmit}
    >
      <label className="modal__label">
        Email
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          required
          className={
            "modal__input" +
            (showErrors && errors.email ? " modal__input_invalid" : "")
          }
          placeholder="Email"
        />
        {showErrors && errors.email && (
          <span className="modal__error">{errors.email}</span>
        )}
      </label>

      <label className="modal__label">
        Password
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          required
          className={
            "modal__input" +
            (showErrors && errors.password ? " modal__input_invalid" : "")
          }
          placeholder="Password"
        />
        {showErrors && errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default LoginModal;
