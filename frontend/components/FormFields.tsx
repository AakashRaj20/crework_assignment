import { FormFieldProps } from "@/utils/types";

const FormField: React.FC<FormFieldProps> = ({
  type,
  placeholder,
  name,
  register,
  error,
  valueAsNumber,
}) => (
  <>
    <input
      autoComplete="on"
      className="form-input"
      type={type}
      placeholder={placeholder}
      {...register(name, { valueAsNumber })}
    />
    {error && (
      <span className="error-message text-red-600 inline-flex !mt-2">
        {error.message}
      </span>
    )}
  </>
);
export default FormField;
