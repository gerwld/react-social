import s from './Dialogs.module.css';
import Message from './Message';

const Dialogs = (props) => {
    return(
        <div>
            <span className={s.title}>Dialogs</span>
            <div className={s.dialogs_frame}>
                <ul className={s.userlist}>
                    <li>Andrew K</li>
                    <li className={s.selected_item}>Anton B</li>
                    <li>Richard M</li>
                    <li>Sergey K</li>
                    <li>Patrick J</li>
                    <li>Evgenii K</li>
                    <li>Somebody O</li>
                    <li>Anastasia I</li>
                    <li>Svetlana W</li>
                    <li>Anton B</li>
                    <li>Richard M</li>
                    <li>Sergey K</li>
                    <li>Patrick J</li>
                    <li>Evgenii K</li>
                    <li>Somebody O</li>
                    <li>Anastasia I</li>
                    <li>Svetlana W</li>
                </ul>
                <div className={s.dialog_window}>
                    <div>
                        <Message content="Hi there" userdata="Anton B" userid="1"/>
                        <Message content="Hi" userid="2"/>
                        <Message content="How are you?" userdata="Anton B" userid="1"/>
                        <Message content="I'm ok. Do you played in a new Witcheer?" userid="2"/>
                        <Message content="Oh yeah. It's so cool." userdata="Anton B" userid="1"/>
                        <Message content="And grapics is just unbeliveble! Cant imagine that CD do that" userdata="Anton B" userid="1"/>
                        <Message content="Right." userid="2"/>
                        <Message content="I'm playing in it for like ~30 hours without even one break." userid="2"/>
                        <Message content="And i guess its the best game i've ever seen" userid="2"/>
                      
                    </div>
                    <form className={s.messageInput}>
                        <textarea></textarea>
                        <input type="submit" value="Send"></input>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Dialogs;