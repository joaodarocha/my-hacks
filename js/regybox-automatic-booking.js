/*

* Description:
*   This scripts automatically books a class on RegyBox
*
* Created: 21/10/2020
* Updated: 10/03/2023
* Author: João Rocha
*
*/

let dateNow = () => new Date(Date.now());

isDevelopment = false;

let bookingTime = {
    hours: 13,
    minutes: 0,
}

let intervalTimeout = 1000;
let isBooked = false;


start();

function start() {

    iteration = 0;

    if (isDevelopment) {
        bookingTime.hours = dateNow().getHours();
        bookingTime.minutes = dateNow().getMinutes();
    }

    console.debug('Clicking today button');
    let todayElement = document.querySelectorAll('.calendar-day-today')[0];
    if (!todayElement) {
        console.error('Cannot find the day to book!\n Did you open the calendar?');
        console.debug('I\'m opening the calendar for you!');
        // Abrir o calendário
        document.querySelectorAll('a.link')[8].click();
    }

    const checkTimeToBookInterval = setInterval(() => {
        // Check if it's time to book class
        console.log(printDateNow() + '| Checking if it\'s time to book..');
        console.debug('Iteration = ', iteration++);

        console.log(`dateNow: ${printDateNow()} | bookTime: ${bookingTime.hours}h${bookingTime.minutes}m `);
        console.log('Time to book? => ', isTimeToBook());
        console.log('Is Booked? =>', isBooked);

        if (isTimeToBook() && !isBooked) {
            console.debug('Time to book is now!' + `| dateNow: ${printDateNow()}`);
            clickOnToday(checkTimeToBookInterval)
            clearInterval(checkTimeToBookInterval);
        }
    }, intervalTimeout);
}

function clickOnToday() {
    console.debug('Clicking today button');
    // console.debug(printDateNow());
    let todayElement = document.querySelectorAll('.calendar-day-today')[0];
    todayElement.click();
    clickingOnDayToBook();
}

function clickingOnDayToBook() {
    // Get Today date
    let today = new Date();
    let dayOfClass = new Date();
    dayOfClass.setDate(today.getDate() + 3);
    let day = dayOfClass.getDate();
    let month = dayOfClass.getMonth();
    let year = dayOfClass.getFullYear();

    // Click on day of class
    console.debug('Clicking 3 days from now');
    console.log(`clicking date: ${day}/${month + 1}/${year}`);
    // console.debug(printDateNow());
    let div3DaysFromToday = document.querySelectorAll('[data-year="' + year + '"][data-month="' + month + '"][data-day="' + day + '"]')[0]

    if (!!div3DaysFromToday && !isBooked) {
        div3DaysFromToday.click();
        clickInscrever();
    } else {
        console.error('Cannot find the day to book!\n Did you open the calendar?');
    }

}

function clickInscrever() {
    // let xpath = `//div[text()='11:00 -> 12:00']`;
    let xpath = `//div[text()='18:00 -> 19:00']`;

    if (isDevelopment) {
        xpath = `//div[text()='08:00 -> 09:00']`;
        // xpath = "//div[text()='13:10 -> 14:00']";
        // xpath = `//div[text()='16:30 -> 17:30']`;
    }

    let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (matchingElement && !isBooked) {

        let classToBook = matchingElement.parentElement.parentElement;
        classToBook.id = 'classToBook';

        // Click "INSCREVER" button
        let bookButton = document.querySelector('#classToBook').querySelector('button.color-green');
        if (bookButton && !isBooked) {
            console.debug('Clicking INSCREVER');
            bookButton.click();
        }

        let okButton = document.querySelector('.dialog-button.dialog-button-bold')
        // setTimeout(() => {
        //     console.debug(printDateNow());
        // }, 100);

        if (okButton && !isBooked) {
            console.debug('Clicking OK');
            okButton.click();
            console.debug('Time after booking!' + `| dateNow: ${printDateNow()}`);
            isBooked = true;
        }
    } else {
        console.error('Cannot find the button to book yet!');
    }
}

function printDateNow() {
    return `${dateNow().getHours()}h:${dateNow().getMinutes()}m${dateNow().getSeconds()}s   (+${dateNow().getMilliseconds()}ms)`;
}

function isTimeToBook() {
    return dateNow().getHours() === bookingTime.hours && dateNow().getMinutes() === bookingTime.minutes
}
