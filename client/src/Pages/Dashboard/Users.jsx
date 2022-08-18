import React from "react";
import Loading from "../../Components/Loading";
import useAuthenticate from "../../Hooks/useAuthenticate";
import useErnest from "../../Hooks/useErnest";
import Wrapper from "../../Assets/Wrappers/User";
import moment from "moment";

function Users() {
  const { auth } = useAuthenticate();

  const response = useErnest(`/api/auth/users`, {
    Authorization: `Bearer ${auth.token}`,
  });
  const users = response.data?.users;
  return (
    <div>
      <h3>Users registred in Eldian Job Tracker</h3>
      {response.isLoading && <Loading />}
      {!response.isLoading && users.length === 0 && <h4>No users registred</h4>}
      {!response.isLoading &&
        users.length > 0 &&
        users.map((user) => <UserInfo key={user._id} {...user} />)}
    </div>
  );
}
export default Users;

const UserInfo = (props) => {
  return (
    <Wrapper>
      <img className="image" alt="" src={props.image} />
      <div className="informations">
        <h4>{props.username}</h4>
        <h5>{props.email}</h5>
        <h5>{props.aboutme}</h5>
        <h5>Joined the {moment(props.createdAt).format("MMM Do, YYYY")}</h5>
      </div>
    </Wrapper>
  );
};
