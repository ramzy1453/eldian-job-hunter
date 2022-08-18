import { useState } from "react";
import Modal from "react-modal";
import useAuthenticate from "../Hooks/useAuthenticate";
import Ernest from "../Utils/Ernest";
Modal.setAppElement("#modal");
export default function BiographyModal(props) {
  const [image, setimage] = useState("");
  const { auth, setAuth } = useAuthenticate();
  return (
    <Modal
      isOpen={props.isOpen}
      onRequestClose={props.closeModal}
      className="form"
    >
      <form
        onSubmit={(e) => e.preventDefault()}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <input
          value={image}
          style={{ padding: "0.5em" }}
          onChange={(e) => setimage(e.target.value)}
          placeholder="put the url image"
        />
        <button
          onClick={async () => {
            const response = await Ernest(
              "/api/auth/login",
              "PATCH",
              {
                image,
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
