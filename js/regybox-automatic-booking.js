let dateNow = () => new Date(Date.now());

let bookingTime = {
    hours: isWednesday() ? 17 : 18,
    minutes: 0,
}

start();

function start() {
    let checkTimeToBook = setInterval(() => {
        // Check if it's time to book class
        console.log(dateNow().getHours() + 'h' + dateNow().getMinutes() + 'm' + dateNow().getSeconds() + 's | Checking if it\'s time to book..');

        console.log(`dateNow: ${dateNow().getHours()}h${dateNow().getMinutes()}m${dateNow().getSeconds()}s | bookTime: ${bookingTime.hours}h${bookingTime.minutes}m `);
        console.log('Time to book? => ', dateNow().getHours() === bookingTime.hours && dateNow().getMinutes() === bookingTime.minutes);

        if (dateNow().getHours() === bookingTime.hours && dateNow().getMinutes() === bookingTime.minutes) {
            console.debug('Time to book is now!' + `| dateNow: ${dateNow().getHours()}h${dateNow().getMinutes()}m${dateNow().getSeconds()}s${dateNow().getMilliseconds()}ms`);
            clickOnToday();
            clearInterval(checkTimeToBook);
        }
    }, 1000);
}

function clickOnToday() {
    console.debug('Clicking today button');
    let todayElement = document.querySelectorAll('.calendar-day-today')[0];
    todayElement.click();
    click2DaysFromNow();
}

function click2DaysFromNow() {
    // Get Today date
    let todayNumber = document.querySelectorAll('.calendar-day-today')[0].dataset.day;
    let todayMonth = document.querySelectorAll('.calendar-day-today')[0].dataset.month;
    let todayYear = document.querySelectorAll('.calendar-day-today')[0].dataset.year;

    // Click 2 days from today
    console.debug('Clicking 2 days from now');
    let div2DaysFromToday = document.querySelectorAll('[data-year="'+ todayYear + '"][data-month="' + todayMonth + '"][data-day="' + (parseInt(todayNumber) + 2) + '"]')[0]
    div2DaysFromToday.click();

    clickInscrever();
}

function clickInscrever() {
    // Get the time of 18h class: 18:00 || 18:05
    let xpath = "//div[text()='18:00 -> 18:45']";

    if (isWednesday()) {
        xpath = "//div[text()='17:00 -> 17:45']";
    }

    let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    let classDivElement = matchingElement.parentElement.parentElement;
    classDivElement.id = 'classDivElement';

    // Click "INSCREVER" button
    let bookButton = document.querySelector('#classDivElement').querySelector('button.color-green');
    console.debug('Clicking INSCREVER');
    bookButton.click();
    console.debug('Time after booking!' + `| dateNow: ${dateNow().getHours()}h:${dateNow().getMinutes()}m${dateNow().getSeconds()}s${dateNow().getMilliseconds()}ms`);
}

function isWednesday() {
    /* The value returned by getDay() is an integer corresponding to the day of the week:
    * 0 (Sunday) | 1 (Monday) | 2 (Tuesday) | 3 (Wednesday) | 4 (Thursday) | 5 (Friday) */
    return dateNow().getDay() === 3;
}
