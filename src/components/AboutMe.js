import { Avatar } from 'antd';
import ProfilePicture from "../assets/profile_picture.jpg"
export function AboutMe() {
    return (
        <div className="App__left__aboutme">
            <div className="App__left__aboutme__header">
                <Avatar alt="Cameron Dudd Headshot Image"
                        src={ProfilePicture}
                        shape="square"
                        size={55}
                        className="ProfilePicture">
                </Avatar>
                <div className="App__left__aboutme__header__text">
                    <b>
                        <p>Cameron Dudd</p>
                        <p>Junior Software Engineer</p>
                    </b>
                </div>
            </div>
        </div>
    );
}
