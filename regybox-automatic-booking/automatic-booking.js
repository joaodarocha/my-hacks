// Open regibox.pt
// function openRegibox() {
//     window.location.href = "https://www.regibox.pt/app/app_nova/index.php";
// }
//
// openRegibox();

let dateNow = () => new Date(Date.now());

let bookingTime = {
    hours: 18,
    minutes: dateNow().getDay() === (0 || 2) ? 0 : 5,
}

// Testing
// bookingTime.hours = 17;
// bookingTime.minutes = 4;

start();

function start() {
    let checkTimeToBook = setInterval(() => {
        // Check if it's time to book class
        console.log(dateNow().getHours() + 'h' + dateNow().getMinutes() + 'm' + dateNow().getSeconds() + 's | Checking if the it\s time to book..');
        // let timeLeft = () => document.querySelector('div#tzcd').innerText;
        // console.log('Is time to book? => ', timeLeft() === timeToBook);
        // if (timeLeft() === timeToBook) {
        // console.log('Is time to book? => ', timeLeft() === timeToBook);
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
    // document.querySelector('div.but_back').children[0].click();
    click2DaysFromNow();
}


/*function clickMarcarAulas() {
    let xpath = "//a[text()='MARCAR AULAS']";

    let matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    // Click "Marcar Aulas"
    console.debug('Clicking MARCAR AULAS')
    matchingElement.click();

    console.log('Waiting for page reload..');
    click2DaysFromNow();
}*/

function click2DaysFromNow() {
    // Get Today date
    let todayNumber = document.querySelectorAll('.calendar-day-today')[0].dataset.day;
    let todayMonth = document.querySelectorAll('.calendar-day-today')[0].dataset.month;

    // Click 2 days from today
    console.debug('Clicking 2 days from now');
    let div2DaysFromToday = document.querySelectorAll('[data-year="2020"][data-month="' + todayMonth + '"][data-day="' + (parseInt(todayNumber) + 2) + '"]')[0]
    div2DaysFromToday.click();

    clickInscrever();
}

function clickInscrever() {
    let xpath = "";
    // Get the time of 18h class: 18:00 || 18:05
    /* The value returned by getDay() is an integer corresponding to the day of the week: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on. */
    if (dateNow().getDay() === (0 || 2)) {
        // Domingos e Terças
        xpath = "//div[text()='18:00 -> 18:45']";
    } else {
        // Sábados, Segundas e Quartas
        xpath = "//div[text()='18:05 -> 18:50']";
        // Test
        // xpath = "//div[text()='17:00 -> 17:45']";
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
