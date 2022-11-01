import Swiper, {Navigation, Pagination} from 'swiper';
import Inputmask from "inputmask/lib/inputmask.js";
import JustValidate from 'just-validate';
import Choices from "choices.js";

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const swiper = new Swiper('.swiper', {

    modules: [Navigation, Pagination],
    pagination: {
        el: '.swiper-pagination',
        clickable: 'true',
    },
    breakpoints: {
        1400: {
            enabled: false,
            spaceBetween: 40,
        },

        576: {
            slidesPerView: 'auto',
            spaceBetween: 40,
            pagination: {
                enabled: false
            },
            enabled: true,

        },

        320: {
            slidesPerView: 'auto',
            spaceBetween: 32,
            pagination: {
                enabled: true
            },
        }
    }
});

//Inputmask

const inputsTel = document.querySelectorAll('input[type="tel"]')
let im = new Inputmask('+44 (999) 999-99-99', {
    placeholder: "0",
});
im.mask(inputsTel);


//Validate

const validate = new JustValidate('.contact-us__form');

validate
    .addField('#contact-us__email', [
        {
            rule: 'required',
            errorMessage: 'Email is required',
        },
        {
            rule: 'email',
            errorMessage: 'Email is invalid!',
        },
    ])
    .addField('#contact-us__phone', [
        {
            rule: 'required',
            errorMessage: 'Number is required',
        }
    ])
    .addField('#contact-us__message', [
        {
            rule: 'required',
            errorMessage: 'Message is required',
        },
        {
            rule: 'maxLength',
            value: 140,
            errorMessage: 'Message is too long!',
        },
    ])
    .addField('#contact-us__checkbox', [
        {
            rule: 'required',
            errorMessage: 'Consent to data processing is required',
        }
    ])
    .addRequiredGroup('#contact-us__sex', 'You must select a gender');

//Select

const valuesCountry = [
    {
        value: 'UK',
        label: '<img src="images/united-kingdom-flag-circle.svg"/> United Kingdom',
        id: 1
    },
    {
        value: 'USA',
        label: '<img src="images/united-states-flag-circle.svg"/> United States',
        id: 2
    },
    {
        value: 'RUS',
        label: '<img src="images/russian-federation-flag-circle.svg"/> Russia',
        id: 3
    },
    {
        value: 'UKR',
        label: '<img src="images/ukraine-flag-circle.svg"/> Ukraine',
        id: 4
    }
]

const valuesLanguage = [
    {
        value: 'ENG',
        label: '<img src="images/united-kingdom-flag.svg"/> English',
        id: 2
    },
    {
        value: 'RUS',
        label: '<img src="images/russian-federation-flag.svg"/> Russian',
        id: 1
    },
]

const countrySelect = document.querySelector('.contact-us__select');
const countryChoices = new Choices(countrySelect, {
    choices: valuesCountry,
    shouldSort: false,
    allowHTML: true,
    searchEnabled: false,
});

const languageSelect = document.querySelector('.footer__language-select');
const languageChoices = new Choices(languageSelect, {
    choices: valuesLanguage,
    shouldSort: false,
    allowHTML: true,
    searchEnabled: false,
});

//Nav Toggle

function navToggle() {
    const navToggler = document.querySelector('.navbar__toggler'),
        navCollapse = document.querySelector('.navbar__collapse'),
        body = document.querySelector('body')

    navToggler.addEventListener('click', function () {
        navToggler.classList.toggle('active')
        navCollapse.classList.toggle('active')
        body.classList.toggle('no-scroll')
    })
}

//Accordion

function accordion() {
    const accordionItem = document.querySelectorAll('.faq__accordion-item')

    function resetClass() {
        for (let item of accordionItem) {
            item.classList.remove('show')
        }
    }

    function currentClass(index) {
        if (accordionItem[index].classList.contains('show')) {
            resetClass()

        } else {
            resetClass()
            accordionItem[index].classList.add('show')
        }
    }

    accordionItem.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentClass(index)
        })
    })
}

// City select

function currentCity() {
    const cities = document.querySelectorAll('.where-are-we__item')

    function currentItem(index) {
        for (let city of cities) {
            city.classList.remove('active')
        }
        cities[index].classList.add('active')
    }

    cities.forEach((city, index) => {
        city.addEventListener('click', () => {
            currentItem(index)
        })
    })
}

// Text limit

function textLimit() {
    const textarea = document.querySelector('.contact-us__textarea'),
        current = document.querySelector('.contact-us__message-current'),
        counter = document.querySelector('.contact-us__message-counter'),
        maxlength = 140;

    textarea.addEventListener('input', onInput)

    function onInput(event) {
        const length = event.target.value.length;
        current.textContent = length;
        if (length <= maxlength) {
            counter.classList.remove('error')
            textarea.classList.remove('error')
        } else {
            counter.classList.add('error')
            textarea.classList.add('error')
        }
    }
}

//Crypto list

async function cryptocurrenciesList() {
    let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false', {})
    let content = await response.json()
    content = content.splice(0, 19)

    let list = document.querySelector('.cryptocurrencies__list')
    let itemEnd = document.querySelector('.cryptocurrencies__item--end')
    let item

    for (item in content) {
        list.innerHTML +=
            `<li class="cryptocurrencies__item">
                <img src="${content[item].image}" alt="Bitcoin logo">
                <div class="cryptocurrencies__item-content">
                    <p class="cryptocurrencies__item-abbreviation">${content[item].symbol}</p>
                    <p class="cryptocurrencies__item-name">${content[item].name}</p>
                </div>
            </li>`
    }

    list.innerHTML +=
        `<li class="cryptocurrencies__item cryptocurrencies__item--end">
            <div class="cryptocurrencies__item-container">
                And many others
            </div>
        </li>`

    function openCryptocurrenciesList() {
        const list = document.querySelector('.cryptocurrencies__list'),
            item = document.querySelector('.cryptocurrencies__item'),
            seeAll = document.querySelector('.cryptocurrencies__see-all'),
            body = document.querySelector('body')

        let gap = 26
        let itemHeight = item.offsetHeight + gap

        function getCryptocurrenciesListHeight() {
            body.offsetWidth > 576 ? list.style.maxHeight = list.scrollHeight + 'px' : list.style.maxHeight = itemHeight * 5 - gap + 'px'
        }

        window.addEventListener('resize', getCryptocurrenciesListHeight)
        getCryptocurrenciesListHeight()

        seeAll.addEventListener('click', function () {
            seeAll.classList.toggle('active')
            list.classList.toggle('active')
            !list.classList.contains('active') ? list.style.maxHeight = itemHeight * 5 - gap + 'px' : list.style.maxHeight = list.scrollHeight + 'px'

        })
    }

    openCryptocurrenciesList()

}


textLimit()
currentCity()
navToggle()
accordion()
cryptocurrenciesList()


