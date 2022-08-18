import styled from "styled-components";

const Wrapper = styled.section`
  display: flex;
  .image-wrapper {
    display: flex;
    flex-direction: column;
    img {
      margin-bottom: 1em;
      width: 150px;
      height: 150px;
    }
  }
  .informations {
    margin-left: 3em;
    flex: 1;
    .first {
      margin-bottom: 1em;
      .name {
        font-size: 1.75em;
      }
      .about-me {
      }
    }
    .second {
    }
  }
  .btn-bio {
    margin-top: 0.9em;
  }
  .form-center {
    display: flex;
    flex-direction: column;
  }
`;

export default Wrapper;
