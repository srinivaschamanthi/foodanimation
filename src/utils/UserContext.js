 import { createContext } from "react";

const UserContext = createContext({
    loggedInUser : "test user"
})

export default UserContext