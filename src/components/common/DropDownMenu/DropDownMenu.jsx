import React from 'react'
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

export default DropDownMenu;