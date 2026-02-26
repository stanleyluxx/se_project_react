import useForm from "../../hooks/useform.js";
import ModalWithForm from "../modalWithForm/ModalWithForm.jsx";

const AddItemModal = ({ isOpen, onAddItem, onCloseModal, onClose }) => {
  const defaultValues = {
    name: "",
    imageUrl: "",
    weather: "",
  };
  const { values, handleChange, resetForm } = useForm(defaultValues);

  function handleFormSubmit(evt) {
    evt.preventDefault();
    onAddItem(values);
    onCloseModal();
    resetForm();
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
          className="modal__input"
          placeholder="Name"
          required
        />
      </label>

      <label className="modal__label">
        Image URL
        <input
          type="url"
          name="imageUrl"
          value={values.imageUrl}
          onChange={handleChange}
          className="modal__input"
          placeholder="Image URL"
          required
        />
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
      </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;
