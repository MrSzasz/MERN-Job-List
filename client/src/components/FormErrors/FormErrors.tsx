type PropsType_FormErrors = {
  errorMessage: string;
};

const FormErrors = ({ errorMessage }: PropsType_FormErrors) => {
  return <small className="text-red-500">{errorMessage}</small>;
};

export default FormErrors;
