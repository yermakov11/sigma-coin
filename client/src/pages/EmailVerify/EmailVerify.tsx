import { useState, useEffect, Fragment } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./EmailVerify.module.scss";
import check_marks from "../../../src/assets/check_mark.png";
import axios from "axios";

export default function EmailVerify() {
  const [valid, setValid] = useState<boolean>(false);
  const { token } = useParams<{ token: string }>();

  useEffect(() => {
    verifyEmailUrl();
  }, [token]);

  const verifyEmailUrl = async () => {
    try {
      const URL = `http://localhost:3000/verify/${token}`;
      const response = await axios.get(URL, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.data.message === "Email verified") {
        setValid(true);
        console.log(valid, "valid");
      }
    } catch (error) {
      console.error(error);
      setValid(false);
    }
  };

  return (
    <Fragment>
        <main className={styles.container_verify}>
          <img src={check_marks} alt="check-marks" />
          <h3>Email verified successfully</h3>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </main>
    </Fragment>
  );
}
