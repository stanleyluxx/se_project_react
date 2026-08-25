import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import ModalWithForm from "../modalWithForm/ModalWithForm.jsx";
import { useEffect } from "react";

// Keep defaults at module scope so they are referentially stable
// across renders. This avoids needing `useMemo` inside the component.
const defaultValues = {
  name: "",
  imageUrl: "",
  weather: "",
};

const AddItemModal = ({ isOpen, onAddItem, onCloseModal }) => {
  const { values, handleChange, resetForm, errors, showErrors, handleSubmit } =
    useFormWithValidation(defaultValues);

  useEffect(() => {
    if (isOpen) {
      // clear everything when the modal opens
      resetForm();
    }
  }, [isOpen, resetForm]);

  function handleFormSubmit(evt) {
    // delegate validation and submission to the hook
    handleSubmit(evt, onAddItem);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      title="New Garment"
      buttonText="Add Garment"
      onSubmit={handleFormSubmit}
    >
      <label className="modal__label">
        Name
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
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
        Image URL
        <input
          type="text"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          className={
            "modal__input" +
            (showErrors && errors.imageUrl ? " modal__input_invalid" : "")
          }
          placeholder="Image URL"
        />
        {showErrors && errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>

      <fieldset className="modal__radio-buttons">
        <legend className="modal__legend">Select the weather type:</legend>

        {["hot", "warm", "cold"].map((type) => (
          <label key={type} className="modal__radio-label">
            <input
              type="radio"
              name="weather"
              value={type}
              checked={values.weather === type}
              onChange={handleChange}
              className="modal__radio-input"
            />
            {type}
          </label>
        ))}
        {showErrors && errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
