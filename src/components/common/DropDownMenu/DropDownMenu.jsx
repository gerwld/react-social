import ButtonBase from '@mui/material/ButtonBase';
import React from 'react';
import Foco from 'react-foco';
import s from "./Drop.module.css";

const DropDownMenu = ({ isAuthor, hideContent, deletePost, postId, toggleSet }) => {
    //Almost all here is hardcoded, so actions road is also simple.
    let dropDown = [
        { id: 'hide', name: "Not show post's from this group", onClick: () => {hideContent(true); toggleSet(false)}, icon: "fa-solid fa-eye-slash" },
        { id: 'report', name: "Report problem", onClick: (e) => e, icon: "fa-solid fa-circle-exclamation" },
        { id: 'why', name: "Why am i seeing this content?", onClick: (e) => e, icon: "fa-solid fa-circle-question" },
    ];
    let dropDownAuthor = [
        { id: 'delete', name: "Delete post", onClick: () => setTimeout(() => { deletePost(postId) }, 200), icon: "fa-solid fa-trash" },
        { id: 'edit', name: "Edit post", onClick: (e) => e, icon: "fa-solid fa-edit" },
        { id: 'report', name: "Report problem", onClick: (e) => e, icon: "fa-solid fa-circle-exclamation" }
    ];
    let set = isAuthor ? dropDownAuthor : dropDown;

    return (<div className={s.dropdown_menu}>
        <ul>
            {set.map(prop => <li key={prop.id} onClick={(id) => prop.onClick(id)}>
                {prop.icon && <i className={`${prop.icon} ${s.icons}`} />}
                <span>{prop.name}</span>
            </li>)}
        </ul>
    </div>);
}

const ActionBlockButton = ({ isShowSet, toggleSet, postId, isAuthPost, hideContent, deletePost }) => {
    return (
        <Foco onClickOutside={() => toggleSet(false)}>
            <ButtonBase onClick={() => toggleSet(!isShowSet)} children={<><i className="fas fa-ellipsis-h" /></>} />
            {isShowSet && <DropDownMenu postId={postId} isAuthor={isAuthPost} hideContent={hideContent} deletePost={deletePost}
                toggleSet={toggleSet} />}
        </Foco>
    )
}

export default ActionBlockButton;