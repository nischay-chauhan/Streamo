interface UserPAgeProps {
    params : {
        username : string
    }
}


const UserPage = ({params : {username}} :  UserPAgeProps) => {
   
    return(
        <div>
            User Page {username}
        </div>
    )
}

export default UserPage