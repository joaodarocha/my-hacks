let dateNow = () => new Date(Date.now());

isDevelopment = false;

let bookingTime = {
    hours: 18,
    minutes: 10,
}

intervalTimeout = 1000;
isBooked = false;
checkTimeToBookInterval = () => {
};

start();

function start() {

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

    checkTimeToBookInterval = setInterval(() => {
        // Check if it's time to book class
        console.log(printDateNow() + '| Checking if it\'s time to book..');

        console.log(`dateNow: ${printDateNow()} | bookTime: ${bookingTime.hours}h${bookingTime.minutes}m `);
        console.log('Time to book? => ', isTimeToBook());

        if (isTimeToBook()) {
            console.debug('Time to book is now!' + `| dateNow: ${printDateNow()}`);
            clickOnToday(checkTimeToBookInterval);
        }
        if (isBooked) {
            clearInterval(checkTimeToBookInterval);
        }
    }, intervalTimeout);
}

function clickOnToday() {
    console.debug('Clicking today button');
    let todayElement = document.querySelectorAll('.calendar-day-today')[0];
    todayElement.click();
    click2DaysFromNow();
}

function click2DaysFromNow() {
    // Get Today date
    let todayDate = document.querySelectorAll('.calendar-day-today')[0].dataset;
    let day = todayDate.day;
    let month = todayDate.month;
    let year = todayDate.year;

    // Click 2 days from today
    console.debug('Clicking 2 days from now');
    let div2DaysFromToday = document.querySelectorAll('[data-year="' + year + '"][data-month="' + month + '"][data-day="' + (parseInt(day) + 2) + '"]')[0]

    if (!!div2DaysFromToday) {
        div2DaysFromToday.click();
        clickInscrever();
    } else {
        console.error('Cannot find the day to book!\n Did you open the calendar?');
    }

}

function clickInscrever() {
    // Get the time of 18h class: 18:00 || 18:05
    // let xpath = `//div[text()='17:00 -> 17:50']`;
    let xpath = `//div[text()='18:10 -> 19:00']`;

    if (isDevelopment) {
        xpath = "//div[text()='14:15 -> 15:45']";
    }

    let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    if (matchingElement) {

        let classToBook = matchingElement.parentElement.parentElement;
        classToBook.id = 'classToBook';

        // Click "INSCREVER" button
        let bookButton = document.querySelector('#classToBook').querySelector('button.color-green');
        console.debug('Clicking INSCREVER');
        bookButton.click();

        let okButton = document.querySelector('.dialog-button.dialog-button-bold')
        console.debug('Clicking OK');
        okButton.click();
        isBooked = true;
        console.debug('Time after booking!' + `| dateNow: ${printDateNow()}`);
        // clearInterval(checkTimeToBookInterval);
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

