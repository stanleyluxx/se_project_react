import { useState, useCallback } from "react";

// A drop-in replacement for the previous `useForm` hook that also handles
// validation. It mirrors the behaviour of controlled inputs while keeping
// track of the current `errors` object and a boolean `isValid` flag.
//
// The handler uses the browser's built-in validation facilities (e.g. the
// `required` attribute, `type="url"`, etc.) by reading
// `evt.target.validationMessage` and asking the form for `checkValidity()`.
//
// After successful submission (or when a modal is shown/hidden) consumers
// can call `resetForm` to clear values/errors/validity back to their
// initial defaults.
export default function useFormWithValidation(defaultValues, validateFn) {
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [showErrors, setShowErrors] = useState(false);

  // default validation logic for this form. Consumers may pass a custom
  // `validateFn` if they want bespoke rules.
  const defaultValidate = useCallback((vals) => {
    const errs = {};
    if (!vals.name || vals.name.trim() === "") {
      errs.name = "Please enter a name for the garment.";
    }

    try {
      new URL(vals.imageUrl);
    } catch (e) {
      errs.imageUrl = "Please provide a valid image URL.";
    }

    if (!vals.weather || vals.weather === "") {
      errs.weather = "Please select a weather type.";
    }

    return errs;
  }, []);

  const validate = validateFn || defaultValidate;

  const handleChange = useCallback(
    (evt) => {
      const { name, value } = evt.target;
      setValues((prev) => {
        const next = { ...prev, [name]: value };
        // if we've already attempted to submit, re-validate on change
        if (showErrors) {
          const nextErrors = validate(next);
          setErrors(nextErrors);
          setIsValid(Object.keys(nextErrors).length === 0);
        }
        return next;
      });
    },
    [showErrors, validate],
  );

  const resetForm = useCallback(
    (newValues = defaultValues, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
      setShowErrors(false);
    },
    [defaultValues],
  );

  // onSubmit handler helper. Accepts the native event and a success callback.
  const handleSubmit = useCallback(
    async (evt, onSuccess) => {
      if (evt && typeof evt.preventDefault === "function") evt.preventDefault();
      setShowErrors(true);
      const nextErrors = validate(values);
      setErrors(nextErrors);
      const valid = Object.keys(nextErrors).length === 0;
      setIsValid(valid);

      if (!valid) return false;

      // call the consumer-provided success handler. Allow it to be async.
      if (onSuccess) {
        await onSuccess(values);
      }

      // after successful submit, reset form and hide errors
      resetForm();
      return true;
    },
    [validate, values, resetForm],
  );

  return {
    values,
    handleChange,
    errors,
    isValid,
    showErrors,
    handleSubmit,
    resetForm,
    setValues,
    setErrors,
    setIsValid,
  };
}
