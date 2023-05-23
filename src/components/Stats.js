export function TypeRacer() {
    return (
        <div className="App__right__stats__typeracer">
            <a href="https://data.typeracer.com/pit/profile?user=sigmaimu&ref=badge" target="_top">
                <img src="https://data.typeracer.com/misc/badge?user=sigmaimu" border="0"
                     alt="TypeRacer.com scorecard for user sigmaimu"/>
            </a>
        </div>
    );
}

export function CodeWars() {
    return (
        <div className="App__right__stats__codewars">
            <a href="https://www.codewars.com/users/CameronDudd" target="_blank" rel="noreferrer">
                <img src="https://www.codewars.com/users/CameronDudd/badges/large"
                     border="0"
                     alt="codewars.com scorecard for user CameronDudd"/>
            </a>
        </div>
    );
}

export function Stats() {
    return (
        <div className="App__right__stats">
            <TypeRacer />
            <CodeWars />
        </div>
    );
}