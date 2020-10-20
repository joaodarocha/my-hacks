// Open regibox.pt
function openRegibox() {
    window.location.href = "https://www.regibox.pt/app/app_nova/index.php";
}

openRegibox();

function click2DaysFromNow() {
    // Get Today date
    var todayNumber = document.querySelectorAll('.calendar-day-today')[0].dataset.day
    var todayMonth = document.querySelectorAll('.calendar-day-today')[0].dataset.month

    // Click 2 days from today
    document.querySelectorAll('[data-year="2020"][data-month="' + todayMonth + '"][data-day="' + (parseInt(todayNumber) + 2) + '"]')[0].click()

    setTimeout(() => {

        // Get the time of 18h class: 18:00 || 18:05
        xpath = "//div[text()='18:05 -> 18:50']";

        matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        var class18Div = matchingElement.parentElement.parentElement;
        class18Div.id = 'class18Div';

        // Click "INSCREVER" button
        var bookButton = document.querySelector('#class18Div').querySelector('button.color-green')
        bookButton.click();

    })
}
function clickMarcarAulas() {
    var xpath = "//a[text()='MARCAR AULAS']";

    var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    // Click "Marcar Aulas"
    matchingElement.click();

    console.log('Waiting for page reload..');
    setTimeout(() => {
        click2DaysFromNow();
    }, 1000)

}
function clickBackButton() {
    document.querySelector('div.but_back').children[0].click();
    console.log('Waiting for page reload..');
    setTimeout(() => {
        clickMarcarAulas();

    }, 1000)
}

var dateNow = () => new Date(Date.now());

var checkTimeToBook = setInterval(() => {
    // Check if it's time to book class
    if (dateNow().getHours() === 18 && dateNow().getMinutes() === 5) {
        clickBackButton();
        clearInterval(checkTimeToBook);
    }
}, 1000);








