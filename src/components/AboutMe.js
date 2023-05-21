import { useState } from 'react';
import { Drawer, Button } from 'antd';

import { CodeWars, TypeRacer } from './Stats.js';
export function AboutMe() {

    const [aboutMeOpen, setAboutMeOpen] = useState(false);

        const showAboutMe = () => {
            setAboutMeOpen(true);
        };

        const hideAboutMe = () => {
            setAboutMeOpen(false);
        };

    return (
        <div className="App__left__aboutme">
            <Drawer placement="left"
                    open={aboutMeOpen}
                    onClose={hideAboutMe}
                    closable={false}>
                <div className="App__left__aboutme__socials">
                    <TypeRacer />
                    <CodeWars />
                </div>
            </Drawer>
            <Button onClick={showAboutMe} className="App__left__aboutme__button">About Me</Button>
        </div>
    );
}
