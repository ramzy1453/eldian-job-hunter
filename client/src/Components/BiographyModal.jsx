import { useState } from "react";
import Modal from "react-modal";
import useAuthenticate from "../Hooks/useAuthenticate";
import Ernest from "../Utils/Ernest";
Modal.setAppElement("#modal");
export default function BiographyModal(props) {
  const [aboutme, setAboutme] = useState(props.aboutme);
  const { auth, setAuth } = useAuthenticate();
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      style={{
        content: {
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
          width: "70%",
          height: "70%",
          margin: "auto",
          border: "none",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        },
      }}
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <textarea
          value={aboutme}
          onChange={(e) => setAboutme(e.target.value)}
          style={{
            width: "70%",
            height: "17em",
            padding: "0.6em",
          }}
        />
        <button
          onClick={async () => {
            const response = await Ernest(
              "/api/auth/login",
              "PATCH",
              {
                aboutme,
              },
              {
                Authorization: `Bearer ${auth.token}`,
              }
            );
            const { token, user } = response;
            setAuth({ token, user });
            props.closeModal();
          }}
          style={{
            marginTop: "1em",
          }}
          className="btn"
        >
          Update
        </button>
      </form>
    </Modal>
  );
}
