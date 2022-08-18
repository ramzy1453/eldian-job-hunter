import styled from "styled-components";

const Wrapper = styled.main`
  display: flex;
  flex-direction: column;
  nav {
    width: var(--fluid-width);
    max-width: var(--max-width);
    margin: 0.5em auto;
    height: var(--nav-height);
    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: flex;
    align-items: center;
    margin-top: -2em;
    justify-content: space-around;
    .info {
      width: 50%;
      display: flex;
      flex-direction: column;
    }
    img {
      width: 30%;
      margin-top: -3rem;
    }
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--primary-500);
    }
  }
  p {
    color: var(--grey-600);
  }
  @media screen and (max-width: 992px) {
    .page {
      flex-direction: column-reverse;
      margin-top: 2em;
      .info {
        margin-bottom: 3em;
        h1 {
          text-align: center;
        }
        p {
          text-align: center;
        }
      }
      img {
        margin-bottom: 2em;
      }
    }
  }
`;

export default Wrapper;
