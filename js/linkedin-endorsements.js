/*

* Description:
*   This script automatically endorses all skills on a LinkedIn profile
*
* Created: 25/05/2024
* Updated: 24/09/2024
* Author: João Rocha
*
*/

let interval = null;
let skills = null;
const endorseBtnSelector = "button.artdeco-button .artdeco-button__text";
const loadMoreBtnSelector = ".scaffold-finite-scroll__load-button";
const getSkillsToEndorse = () => {
    return Array.from(document.querySelectorAll(endorseBtnSelector)).filter(
        (e) => e.innerText === "Endorse"
    );
};

const stop = () => {
    clearInterval(interval);
    console.log("Done!");
};
const run = () => {
    interval = setInterval(() => {
        let skills = getSkillsToEndorse();
        console.log("Ok, let's do this!");
        const loadMoreBtn = document.querySelector(loadMoreBtnSelector);
        if (loadMoreBtn && !skills.length) {
            console.log("Scrolling to bottom..");
            window.scrollTo(0, document.body.scrollHeight);
            setTimeout(() => {
                clearInterval(interval);
                run();
            }, 2000);
        } else {
            skills = getSkillsToEndorse();
            console.log(skills);
            if (!skills.length) {
                stop();
            } else {
                skills[0].click();
            }
        }
    }, 5000);
};
run();
