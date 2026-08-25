import { useEffect } from "react";
import useFormWithValidation from "../../hooks/useFormWithValidation.js";
import ModalWithForm from "../modalWithForm/ModalWithForm.jsx";
import "./EditProfileModal.css";

const defaultValues = {
  name: "",
  avatar: "",
};

function EditProfileModal({
  isOpen,
  onCloseModal,
  onUpdateProfile,
  currentUser,
}) {
  const validateProfileForm = (values) => {
    const errors = {};

    if (!values.name || values.name.trim() === "") {
      errors.name = "Please enter a name.";
    }

    if (!values.avatar || values.avatar.trim() === "") {
      errors.avatar = "Please enter an avatar URL.";
    }

    return errors;
  };

  const { values, handleChange, resetForm, errors, showErrors, handleSubmit } =
    useFormWithValidation(defaultValues, validateProfileForm);

  useEffect(() => {
    if (isOpen && currentUser) {
      resetForm({
        name: currentUser.name || "",
        avatar: currentUser.avatar || "",
      });
    }
  }, [isOpen, currentUser, resetForm]);

  function handleFormSubmit(evt) {
    handleSubmit(evt, onUpdateProfile);
  }

  return (
    <ModalWithForm
      isOpen={isOpen}
      onClose={onCloseModal}
      title="Edit Profile"
      buttonText="Save changes"
      onSubmit={handleFormSubmit}
    >
      <label className="edit-profile-modal__label">
        Name
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className={
            "edit-profile-modal__input" +
            (showErrors && errors.name ? "modal__input_invalid" : "")
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
}

export default EditProfileModal;
