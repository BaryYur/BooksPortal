import "./UsersList.css";
import UserItem from "./UserItem";

const UsersList = ({ usersData }) => {
    return (
        <div className="users-list-container">
            <div className="users-list-container__head">
                <div>User name:</div>
                <div>Email:</div>
                <div></div>
            </div>
            <ul>
            {usersData.length !== 0 && usersData.map(userInfo => (
                    <UserItem
                        key={Math.random()}
                        name={userInfo.name}
                        lastName={userInfo.lastName}
                        phoneNumber={userInfo.phoneNumber}
                        email={userInfo.email}
                    />
                ))
            }
            {usersData.length === 0 && <p className="no-items-paragraph" style={{ fontSize: "20px" }}>Not found users!</p>}
            </ul>
        </div>
    );
}

export default UsersList;