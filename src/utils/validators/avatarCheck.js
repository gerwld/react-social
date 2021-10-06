const avatarCheck = (pic) => {
    if (pic) {
        if (pic.large) {return pic.large}
        if (pic.small) {return pic.small}
        else return "/images/avatars/def-avatar.png";
    } else return "/images/avatars/def-avatar.png";
}
 
export default avatarCheck;