import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import ModalWithForm from "../modalWithForm/ModalWithForm.jsx";
import { useEffect } from "react";

// stable defaults for the form fields
const defaultValues = {
  name: "",
  email: "",
  password: "",
  avatar: "",
};

const RegisterModal = ({ isOpen, onRegister, onCloseModal }) => {
  const validateRegistrationForm = (values) => {
    const errors = {};

    if (!values.name || values.name.trim() === "") {
      errors.name = "Please enter your name.";
    }

    if (!values.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      errors.email = "Please enter a valid email address.";
    }

    if (!values.password || values.password.trim() === "") {
      errors.password = "Please enter a password.";
    }

    if (!values.avatar || values.avatar.trim() === "") {
      errors.avatar = "Please enter an avatar URL.";
    } else {
      try {
        new URL(values.avatar);
      } catch {
        errors.avatar = "Please enter a valid avatar URL.";
      }
    }

    return errors;
  };

  const { values, handleChange, resetForm, errors, showErrors, handleSubmit } =
    useFormWithValidation(defaultValues, validateRegistrationForm);

  useEffect(() => {
    if (isOpen) {
      // clear everything when the modal opens
      resetForm();
    }
  }, [isOpen, resetForm]);

  function handleFormSubmit(evt) {
    // delegate validation and submission to the hook
    handleSubmit(evt, onRegister);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Register"
      buttonText="Register"
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

      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          required
          className={
            "modal__input" +
            (showErrors && errors.name ? " modal__input_invalid" : "")
          }
          placeholder="Name"
        />
        {showErrors && errors.name && (
          <span className="modal__error">{errors.name}</span>
        )}
      </label>

      <label className="modal__label">
        Avatar URL
        <input
          type="text"
          name="avatar"
          value={values.avatar}
          onChange={handleChange}
          required
          className={
            "modal__input" +
            (showErrors && errors.avatar ? " modal__input_invalid" : "")
          }
          placeholder="Avatar URL"
        />
        {showErrors && errors.avatar && (
          <span className="modal__error">{errors.avatar}</span>
        )}
      </label>
    </ModalWithForm>
  );
};

export default RegisterModal;
