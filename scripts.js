const btnAll = document.querySelectorAll ('.btn_nav');
const btn = document.querySelector ('.btn_nav');
const checkboxAll = document.querySelectorAll ('.check');
const checkAllId = document.querySelector ('.check_all');
const noOneTwoThree = document.querySelectorAll ('.check_no_one_two_three');
const lowCost = document.querySelector ('.low_cost');
const fast = document.querySelector ('.fast');
const noOne = document.getElementById ('no_one');
const one = document.getElementById ('one');
const two = document.getElementById ('two');
const three = document.getElementById ('three');
const ticketsAll = [];

btnAll.forEach (function (item) {

    item.addEventListener ('click', function () {

        const btnContent = document.querySelectorAll ('.btn_cnt');
        const currentBtn = item;
        const btnId = currentBtn.getAttribute ('data-btn');
        const btnIdContent = document.querySelectorAll (btnId);

        if ( ! currentBtn.classList.contains ('active')) {
            btnAll.forEach (function (item) {
                item.classList.remove ('active');
            });

            btnContent.forEach (function (item) {
                item.classList.remove ('active');
            });

            btnIdContent.forEach (function (item) {
                item.classList.add ('active');
            });

            currentBtn.classList.add ('active');
        };
    });
});
btn.click ();

checkboxAll.forEach (function (item) {

    item.addEventListener ('click', function () {

        if ( ! item.classList.contains ('checked')) {
            item.classList.add ('checked');
        }

        else (item.classList.remove ('checked'));
    });
});

checkAllId.addEventListener ('click', function () {

    if (checkAllId.classList.contains ('checked')) {
        noOneTwoThree.forEach (function (item) {
            item.classList.add ('checked');
        });
    };

    if ( ! checkAllId.classList.contains ('checked')) {
        noOneTwoThree.forEach (function (item) {
            item.classList.remove ('checked');
        });
    };
});
checkAllId.click();

noOneTwoThree.forEach (function (item) {

    item.addEventListener ('click', function () {

        if ( ! item.classList.contains ('checked')) {
            checkAllId.classList.remove ('checked');
        };

        if ((noOne.classList.contains ('checked')) && (one.classList.contains ('checked')) && (two.classList.contains ('checked')) && (three.classList.contains ('checked'))) {
            checkAllId.classList.add ('checked');
        };
    });
});

function sendRequest() {
    
    const urlSearchId = 'http://localhost:3000/tickets';

    return fetch (urlSearchId)
    .then (function (response) {
        return response.json()
    })
    .then (function (data) {
        ticketsAll.push (data);
    })
    .catch (function (err) {
            console.log (err);
    });
};
sendRequest();

const delay = ms => {

    return new Promise (r => setTimeout(() => r(), ms));
};

//запускается сразу при открытии/обновлении страницы
async function sort () {

    await delay (500);

    const ticketsAllCopy = ticketsAll[0].slice();
    const ticketsAllCopySort = [];
    const filterDone = [];

    function filter() {

        //Каждый фильтр по отдельности
        if (noOne.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 0) && (a.segments[1].stops.length == 0)) ? ticketsAllCopySort.push (a) : 1);
        };

        if (one.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 1) && (a.segments[1].stops.length == 1)) ? ticketsAllCopySort.push (a) : 1);
        };

        if (two.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 2) && (a.segments[1].stops.length == 2)) ? ticketsAllCopySort.push (a) : 1);
        };

        if (three.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 3) && (a.segments[1].stops.length == 3)) ? ticketsAllCopySort.push (a) : 1);
        };

        //Без пересадок и с 1 пересадкой
        if (noOne.classList.contains ('checked') && one.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 0) && (a.segments[1].stops.length == 1) || (a.segments[0].stops.length == 1) && (a.segments[1].stops.length == 0)) ? ticketsAllCopySort.push (a) : 1);
        };

        //Без пересадок и с 2 пересадками
        if (noOne.classList.contains ('checked') && two.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 0) && (a.segments[1].stops.length == 2) || (a.segments[0].stops.length == 2) && (a.segments[1].stops.length == 0)) ? ticketsAllCopySort.push (a) : 1);
        };

        //Без пересадок и с 3 пересадками
        if (noOne.classList.contains ('checked') && three.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 0) && (a.segments[1].stops.length == 3) || (a.segments[0].stops.length == 3) && (a.segments[1].stops.length == 0)) ? ticketsAllCopySort.push (a) : 1);
        };

        //С 1 пересадкой и с 2 пересадками
        if (one.classList.contains ('checked') && two.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 1) && (a.segments[1].stops.length == 2) || (a.segments[0].stops.length == 2) && (a.segments[1].stops.length == 1)) ? ticketsAllCopySort.push (a) : 1);
        };

        //С 1 пересадкой и с 3 пересадками
        if (one.classList.contains ('checked') && three.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 1) && (a.segments[1].stops.length == 3) || (a.segments[0].stops.length == 3) && (a.segments[1].stops.length == 1)) ? ticketsAllCopySort.push (a) : 1);
        };

        //С 2 пересадками и с 3 пересадками
        if (two.classList.contains ('checked') && three.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 2) && (a.segments[1].stops.length == 3) || (a.segments[0].stops.length == 3) && (a.segments[1].stops.length == 2)) ? ticketsAllCopySort.push (a) : 1);
        };   
    };

    function btn() {

        if (lowCost.classList.contains ('active')) {
            ticketsAllCopySort.sort ((a, b) => a.price > b.price ? 1 : -1);
        };

        if (fast.classList.contains ('active')) {
            ticketsAllCopySort.sort ((a, b) => ((a.segments[0].duration + a.segments[1].duration) > (b.segments[0].duration + b.segments[1].duration)) ? 1 : -1);
        };

        filterDone.push (ticketsAllCopySort.slice (0, 5));
    };

    function show() {

        const filterForShow = filterDone[0].slice ();

        filterForShow.forEach (function (item) {

            const priceDone = new Intl.NumberFormat ('ru-RU').format(item.price);
            const min = item.segments[0].duration;
            const minB = item.segments[1].duration;

            document.querySelector ('.buttons_content').innerHTML += `
                <div class='btn_cnt active'>
                    <div class='price'>${priceDone + ' Р'}</div>
                    <div class='avia_logo'>
                        <img src='${getImg()}' alt='Логотип авиакомпании'>
                    </div>

                    <div class='there'>
                        <div class='city_period'>
                            <div class='city'>${item.segments[0].origin + ' - ' + item.segments[0].destination}</div>
                            <div class='period'>${item.segments[0].date.split ('T')[1].substr (0, 5) + ' - ' + timePeriod (
                                (Number (item.segments[0].duration)) + 
                                    (
                                        (Number (item.segments[0].date.split ('T')[1].substr (0, 5).split (':')[0] * 60)) + 
                                        (Number (item.segments[0].date.split ('T')[1].substr (0, 5).split (':')[1]))
                                    )
                            )}</div>
                        </div>
                        <div class='way_time'>
                            <div class='way'>В пути</div>
                            <div class='time'>${timeOnWay (min)}</div>
                        </div>
                        <div class='transfer_t_city'>
                            <div class='transfer'>${transferShow()}</div>
                            <div class='t_city'>${tCityShow()}</div>
                        </div>
                    </div>

                    <div class='back'>
                        <div class='city_period_b'>
                            <div class='city_b'>${item.segments[1].origin + ' - ' + item.segments[1].destination}</div>
                            <div class='period_b'>${item.segments[1].date.split ('T')[1].substr (0, 5) + ' - ' + timePeriod (
                                (Number (item.segments[1].duration)) + 
                                    (
                                        (Number (item.segments[1].date.split ('T')[1].substr (0, 5).split (':')[0] * 60)) + 
                                        (Number (item.segments[1].date.split ('T')[1].substr (0, 5).split (':')[1]))
                                    )
                            )}</div>
                        </div>
                        <div class='way_time_b'>
                            <div class='way_b'>В пути</div>
                            <div class='time_b'>${timeOnWay (minB)}</div>
                        </div>
                        <div class='transfer_t_city_b'>
                            <div class='transfer_b'>${transferShowB()}</div>
                            <div class='t_city_b'>${tCityShowB()}</div>
                        </div>
                    </div>
                </div>
            `;

            function getImg() {

                const carrier = item.carrier;

                return 'http://pics.avs.io/99/36/' + carrier + '.png';
            };
            
            function timeOnWay (mins) {

                let hours = Math.trunc(mins/60);
                let minutes = mins % 60;
                
                if (minutes < 10) {
                    minutes = '0' + minutes;   
                };

                return hours + 'ч ' + minutes + 'м';
            };

            function timePeriod (mins) {

                let hours = Math.trunc(mins/60);
                let minutes = mins % 60;

                while (hours >= 24) {
                    hours = hours - 24;

                    if (hours >= 0 && hours < 10) {
                        hours = '0' + hours;
                    };
                };

                if (minutes >= 0 && minutes < 10) {
                    minutes = '0' + minutes;
                };

                return hours + ':' + minutes;
            };

            function transferShow() {

                if (item.segments[0].stops.length == 0) {
                    return 'Без пересадок';
                };

                if (item.segments[0].stops.length == 1) {
                    return '1 пересадка';
                };

                if (item.segments[0].stops.length == 2) {
                    return '2 пересадки';
                };

                if (item.segments[0].stops.length == 3) {
                    return '3 пересадки';
                };
            };
            function transferShowB() {

                if (item.segments[1].stops.length == 0) {
                    return 'Без пересадок';
                };

                if (item.segments[1].stops.length == 1) {
                    return '1 пересадка';
                };

                if (item.segments[1].stops.length == 2) {
                    return '2 пересадки';
                };

                if (item.segments[1].stops.length == 3) {
                    return '3 пересадки';
                };
            };
            
            function tCityShow() {

                if (item.segments[0].stops.length == 0) {
                    return 'Без пересадок';
                }

                else return (item.segments[0].stops.join (', '));
            };
            function tCityShowB() {

                if (item.segments[1].stops.length == 0) {
                    return 'Без пересадок';
                }

                else return (item.segments[1].stops.join (', '));
            };
        });
    };

    filter();
    btn();
    show();
};
sort ();

//Запускается при нажатии на фильтры или кнопки 'Самый дешевый' и 'Самый быстрый'
function sortOnClick () {

    const ticketsAllCopy = ticketsAll[0].slice();
    const ticketsAllCopySort = [];
    const filterDone = [];

    function filter() {

        //Каждый фильтр по отдельности
        if (noOne.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 0) && (a.segments[1].stops.length == 0)) ? ticketsAllCopySort.push (a) : 1);
        };

        if (one.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 1) && (a.segments[1].stops.length == 1)) ? ticketsAllCopySort.push (a) : 1);
        };

        if (two.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 2) && (a.segments[1].stops.length == 2)) ? ticketsAllCopySort.push (a) : 1);
        };

        if (three.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 3) && (a.segments[1].stops.length == 3)) ? ticketsAllCopySort.push (a) : 1);
        };

        //Без пересадок и с 1 пересадкой
        if (noOne.classList.contains ('checked') && one.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 0) && (a.segments[1].stops.length == 1) || (a.segments[0].stops.length == 1) && (a.segments[1].stops.length == 0)) ? ticketsAllCopySort.push (a) : 1);
        };

        //Без пересадок и с 2 пересадками
        if (noOne.classList.contains ('checked') && two.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 0) && (a.segments[1].stops.length == 2) || (a.segments[0].stops.length == 2) && (a.segments[1].stops.length == 0)) ? ticketsAllCopySort.push (a) : 1);
        };

        //Без пересадок и с 3 пересадками
        if (noOne.classList.contains ('checked') && three.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 0) && (a.segments[1].stops.length == 3) || (a.segments[0].stops.length == 3) && (a.segments[1].stops.length == 0)) ? ticketsAllCopySort.push (a) : 1);
        };

        //С 1 пересадкой и с 2 пересадками
        if (one.classList.contains ('checked') && two.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 1) && (a.segments[1].stops.length == 2) || (a.segments[0].stops.length == 2) && (a.segments[1].stops.length == 1)) ? ticketsAllCopySort.push (a) : 1);
        };

        //С 1 пересадкой и с 3 пересадками
        if (one.classList.contains ('checked') && three.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 1) && (a.segments[1].stops.length == 3) || (a.segments[0].stops.length == 3) && (a.segments[1].stops.length == 1)) ? ticketsAllCopySort.push (a) : 1);
        };

        //С 2 пересадками и с 3 пересадками
        if (two.classList.contains ('checked') && three.classList.contains ('checked')) {
            ticketsAllCopy.sort ((a) => ((a.segments[0].stops.length == 2) && (a.segments[1].stops.length == 3) || (a.segments[0].stops.length == 3) && (a.segments[1].stops.length == 2)) ? ticketsAllCopySort.push (a) : 1);
        };   
    };

    function btn() {

        if (lowCost.classList.contains ('active')) {
            ticketsAllCopySort.sort ((a, b) => a.price > b.price ? 1 : -1);
        };

        if (fast.classList.contains ('active')) {
            ticketsAllCopySort.sort ((a, b) => ((a.segments[0].duration + a.segments[1].duration) > (b.segments[0].duration + b.segments[1].duration)) ? 1 : -1);
        };

        filterDone.push (ticketsAllCopySort.slice (0, 5));
    };

    function show() {

        const filterForShow = filterDone[0].slice ();

        filterForShow.forEach (function (item) {

            const priceDone = new Intl.NumberFormat ('ru-RU').format(item.price);
            const min = item.segments[0].duration;
            const minB = item.segments[1].duration;

            document.querySelector ('.buttons_content').innerHTML += `
                <div class='btn_cnt active'>
                    <div class='price'>${priceDone + ' Р'}</div>
                    <div class='avia_logo'>
                        <img src='${getImg()}' alt='Логотип авиакомпании'>
                    </div>

                    <div class='there'>
                        <div class='city_period'>
                            <div class='city'>${item.segments[0].origin + ' - ' + item.segments[0].destination}</div>
                            <div class='period'>${item.segments[0].date.split ('T')[1].substr (0, 5) + ' - ' + timePeriod (
                                (Number (item.segments[0].duration)) + 
                                    (
                                        (Number (item.segments[0].date.split ('T')[1].substr (0, 5).split (':')[0] * 60)) + 
                                        (Number (item.segments[0].date.split ('T')[1].substr (0, 5).split (':')[1]))
                                    )
                            )}</div>
                        </div>
                        <div class='way_time'>
                            <div class='way'>В пути</div>
                            <div class='time'>${timeOnWay (min)}</div>
                        </div>
                        <div class='transfer_t_city'>
                            <div class='transfer'>${transferShow()}</div>
                            <div class='t_city'>${tCityShow()}</div>
                        </div>
                    </div>

                    <div class='back'>
                        <div class='city_period_b'>
                            <div class='city_b'>${item.segments[1].origin + ' - ' + item.segments[1].destination}</div>
                            <div class='period_b'>${item.segments[1].date.split ('T')[1].substr (0, 5) + ' - ' + timePeriod (
                                (Number (item.segments[1].duration)) + 
                                    (
                                        (Number (item.segments[1].date.split ('T')[1].substr (0, 5).split (':')[0] * 60)) + 
                                        (Number (item.segments[1].date.split ('T')[1].substr (0, 5).split (':')[1]))
                                    )
                            )}</div>
                        </div>
                        <div class='way_time_b'>
                            <div class='way_b'>В пути</div>
                            <div class='time_b'>${timeOnWay (minB)}</div>
                        </div>
                        <div class='transfer_t_city_b'>
                            <div class='transfer_b'>${transferShowB()}</div>
                            <div class='t_city_b'>${tCityShowB()}</div>
                        </div>
                    </div>
                </div>
            `;

            function getImg() {

                const carrier = item.carrier;

                return 'http://pics.avs.io/99/36/' + carrier + '.png';
            };
            
            function timeOnWay (mins) {

                let hours = Math.trunc(mins/60);
                let minutes = mins % 60;
                
                if (minutes < 10) {
                    minutes = '0' + minutes;   
                };

                return hours + 'ч ' + minutes + 'м';
            };

            function timePeriod (mins) {

                let hours = Math.trunc(mins/60);
                let minutes = mins % 60;

                while (hours >= 24) {
                    hours = hours - 24;

                    if (hours >= 0 && hours < 10) {
                        hours = '0' + hours;
                    };
                };

                if (minutes >= 0 && minutes < 10) {
                    minutes = '0' + minutes;
                };

                return hours + ':' + minutes;
            };

            function transferShow() {

                if (item.segments[0].stops.length == 0) {
                    return 'Без пересадок';
                };

                if (item.segments[0].stops.length == 1) {
                    return '1 пересадка';
                };

                if (item.segments[0].stops.length == 2) {
                    return '2 пересадки';
                };

                if (item.segments[0].stops.length == 3) {
                    return '3 пересадки';
                };
            };
            function transferShowB() {

                if (item.segments[1].stops.length == 0) {
                    return 'Без пересадок';
                };

                if (item.segments[1].stops.length == 1) {
                    return '1 пересадка';
                };

                if (item.segments[1].stops.length == 2) {
                    return '2 пересадки';
                };

                if (item.segments[1].stops.length == 3) {
                    return '3 пересадки';
                };
            };
            
            function tCityShow() {

                if (item.segments[0].stops.length == 0) {
                    return 'Без пересадок';
                }

                else return (item.segments[0].stops.join (', '));
            };
            function tCityShowB() {

                if (item.segments[1].stops.length == 0) {
                    return 'Без пересадок';
                }

                else return (item.segments[1].stops.join (', '));
            };
        });
    };

    filter();
    btn();
    show();
};

function oops() {

    document.querySelector ('.buttons_content').innerHTML += `
        <div class ='oops'>Выберите количество пересадок</div>
    `
};

checkboxAll.forEach (function (item) {

    item.addEventListener ('click', function () {

        document.querySelector ('.buttons_content').innerHTML = '';

        if ( !checkAllId.classList.contains ('checked') && !noOne.classList.contains ('checked') && !one.classList.contains ('checked') && !two.classList.contains ('checked') && !three.classList.contains ('checked')) {
            oops();
        }

        else (sortOnClick());
    });
});

btnAll.forEach (function (item) {

    item.addEventListener ('click', function () {

        document.querySelector ('.buttons_content').innerHTML = '';

        if ( !checkAllId.classList.contains ('checked') && !noOne.classList.contains ('checked') && !one.classList.contains ('checked') && !two.classList.contains ('checked') && !three.classList.contains ('checked')) {
            oops();
        }
        
        else (sortOnClick ());
    });
});