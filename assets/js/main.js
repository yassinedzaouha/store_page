document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('.slider img');
    let currentIndex = 0;

    function slideImages() {
        currentIndex = (currentIndex + 1) % images.length;
        const transitionSpeed = currentIndex === 0 ? '2s' : '1s';
        document.querySelector('.slider').style.transition = `transform ${transitionSpeed} ease-in-out`;
        const slideWidth = images[0].clientWidth;
        document.querySelector('.slider').style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    setInterval(slideImages, 3000);

    window.addEventListener('resize', function() {
        const slideWidth = images[0].clientWidth;
        document.querySelector('.slider').style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    });
});

const imagesArray = [
    './assets/img/img_camera.jpg', './assets/img/img_headphones2.jpg', './assets/img/img_pc.jpg',
    './assets/img/img_keyboard.jpg', './assets/img/img_headphones.jpg', './assets/img/img_watch.jpg',
    './assets/img/img_glasses.jpg', './assets/img/img_bioglow.jpg', './assets/img/img_watch2.jpg',
];

const titles = [
    'Camera', 'Sonny', 'PC', 'Keyboard', 'Oraimo', 'Watch'
];
const prices = ['£320', '£659', '£1000', '£300', '£399' , '£500'];

function modifyCard(clonedCard, index) {
    try {
        if (!clonedCard) throw new Error("Cloned card element is missing.");

        const image = imagesArray[index % imagesArray.length];
        const title = titles[index % titles.length];
        const price = prices[index % prices.length] || `£${(index + 1) * 100}`;

        clonedCard.querySelector('.top').style.backgroundImage = `url(${image})`;
        clonedCard.querySelector('.card-title').textContent = title;
        clonedCard.querySelector('.titele_inside').textContent = title;
        clonedCard.querySelector('.card-price').textContent = price;
    } catch (error) {
        console.error("Error in modifyCard:", error);
    }
}

function changeCards(count) {
    try {
        const wrapper = document.querySelector(".cards");

        if (!wrapper) throw new Error("Cards wrapper element is missing.");

        for (let i = 0; i < count; i++) {
            const cardHTML = `
                <div class="wrapper" id="card-container">
                    <div class="card">
                        <div class="top"></div>
                        <div class="bottom">
                            <div class="left">
                                <div class="details">
                                    <h1 class="card-title">Chair</h1>
                                    <p class="card-price">£250</p>
                                </div>
                                <div class="buy"><img class="buy_img" src="./assets/icons/shopping_cart.svg" alt=""></div>
                            </div>
                            <div class="right">
                                <div class="done"><img src="./assets/icons/done.svg" alt=""></div>
                                <div class="details">
                                    <h1 class="titele_inside">Chair</h1>
                                    <p>Added to your cart</p>
                                </div>
                                <div class="remove"><img src="./assets/icons/close.svg" alt=""></div>
                            </div>
                        </div>
                    </div>
                    <div class="inside">
                        <div class="icon"><img src="./assets/icons/info_icon.svg" alt=""></div>
                        <div class="contents">
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit...</p>
                        </div>
                    </div>
                </div>`;

            wrapper.insertAdjacentHTML("beforeend", cardHTML);
            const newCard = wrapper.lastElementChild;
            modifyCard(newCard, i);
        }
    } catch (error) {
        console.error("Error in changeCards:", error);
    }
}

changeCards(5);
changeCards(5);
changeCards(6);


let basketCount = 0;

function updateBasketCount() {
    const counter = document.getElementById('basket-counter');
    counter.textContent = basketCount;
    counter.style.display = basketCount > 0 ? 'inline' : 'none';
}

$(document).on('click', '.buy', function() {
    basketCount++;
    updateBasketCount();
    $(this).closest('.bottom').addClass("clicked");
});

$(document).on('click', '.remove', function() {
    if (basketCount > 0) basketCount--;
    updateBasketCount();
    $(this).closest('.bottom').removeClass("clicked");
});
