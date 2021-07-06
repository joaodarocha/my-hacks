let dateNow = () => new Date(Date.now());

isDevelopment = false;

let bookingTime = {
    hours: 18,
    minutes: 10,
}

let isBooked = false;
let oneSecondInterval = () => {
};

start();

function start() {

    if (isDevelopment) {
        bookingTime.hours = dateNow().getHours();
        bookingTime.minutes = dateNow().getMinutes() + 1;
    }

    let todayElement = document.querySelectorAll('.calendar-day-today')[0];
    if (!todayElement) {
        console.error('Cannot find the day to book!\n Did you open the calendar?');
        console.debug('I\'m opening the calendar for you!');
        // Abrir o calendário
        document.querySelectorAll('a.link')[8].click();
    }

    let now = dateNow();
    let timeToBook = new Date(now.getFullYear(), now.getMonth(), now.getDate(), bookingTime.hours, bookingTime.minutes, 0);

    let millisecondsTillBookTime = timeToBook - now - 10000;

    const hours = Math.floor((millisecondsTillBookTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((millisecondsTillBookTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((millisecondsTillBookTime % (1000 * 60)) / 1000);


    console.log(`Time to book: ${hours}h${minutes}m${seconds}s`)

    setTimeout(checkTimeToBook, millisecondsTillBookTime);

}

function checkTimeToBook() {
    oneSecondInterval = setInterval(() => {
        // Check if it's time to book class
        console.log(printDateNow() + '| Checking if it\'s time to book..');

        console.log(`dateNow: ${printDateNow()} | bookTime: ${bookingTime.hours}h${bookingTime.minutes}m `);
        console.log('Time to book? => ', isTimeToBook());
        console.log('Is Booked? =>', isBooked);

        if (isTimeToBook() && !isBooked) {
            console.debug('Time to book is now!' + `| dateNow: ${printDateNow()}`);
            clickOnToday(oneSecondInterval)
            clearInterval(oneSecondInterval);
        }
    }, 1000);

}

function clickOnToday() {
    console.debug('Clicking today button');
    // console.debug(printDateNow());
    let todayElement = document.querySelectorAll('.calendar-day-today')[0];
    todayElement.click();
    click2DaysFromNow();
}

function click2DaysFromNow() {
    // Get Today date
    let today = new Date();
    let dayAfterTomorrow = new Date();
    dayAfterTomorrow.setDate(today.getDate() + 2);
    let day = dayAfterTomorrow.getDate();
    let month = dayAfterTomorrow.getMonth();
    let year = dayAfterTomorrow.getFullYear();

    // Click 2 days from today
    console.debug('Clicking 2 days from now');
    console.log(`clicking date: ${day}/${month + 1}/${year}`);
    // console.debug(printDateNow());
    let div2DaysFromToday = document.querySelectorAll('[data-year="' + year + '"][data-month="' + month + '"][data-day="' + day + '"]')[0]

    if (!!div2DaysFromToday && !isBooked) {
        console.log('Found div:', div2DaysFromToday);
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
        xpath = "//div[text()='13:10 -> 14:00']";
        // xpath = `//div[text()='17:00 -> 17:50']`;
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
        } else {
            console.error('Cannot see the button INSCREVER!\n Do you have the correct time?');
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

