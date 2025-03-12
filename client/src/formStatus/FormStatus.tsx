import { useFormStatus } from "react-dom";
import style from "./FormStatus.module.scss";

interface FormStatusProps {
    status: string;
}

const FormStatus = ({ status }: FormStatusProps) => {
  const { pending } = useFormStatus();
  return (
    <button className={style.button} type="submit" disabled={pending}>
        {pending ? "loading..." : status}
    </button>
  )
}

export default FormStatus;
