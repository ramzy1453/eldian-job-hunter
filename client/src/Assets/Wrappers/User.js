import styled from "styled-components";

const Wrapper = styled.article`
  padding: 1em;
  display: flex;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  margin-bottom: 1.5em;
  justify-content: center;
  transition: 0.3s ease all;
  cursor: pointer;
  align-items: center;
  .image {
    width: 10em;
    height: 10em;
    margin-right: 1.5em;
  }
  .informations {
    flex: 1;
  }
  &:hover {
    transform: scale(1.03);
    transition: 0.3s ease all;
  }
`;

export default Wrapper;
