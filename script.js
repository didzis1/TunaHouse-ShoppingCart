const imageDiv = document.getElementById("image-carousel");
let i = 0;
let time = 2500;
let images = [];
let cart = [];

// Image carousel
images[0] = 'images/slideshow/1.jpg';
images[1] = 'images/slideshow/2.jpg';
images[2] = 'images/slideshow/3.jpg';
images[3] = 'images/slideshow/4.jpg';
images[4] = 'images/slideshow/5.jpg';

function imageCarousel() {
    document.slide.src = images[i];
    if (i < images.length - 1) {
        i++;
    } else {
        i = 0;
    }
}

setInterval(imageCarousel, time);
imageCarousel();

// Menu list
const menu = [{
        "id": "1",
        "name": "Inari Tofu",
        "category": "nigiri",
        "pieces": "1",
        "img": "images/products/nigiri/inari-nigiri.jpg",
        "price": "0.99"
    },
    {
        "id": "2",
        "name": "Salmon",
        "category": "nigiri",
        "pieces": "1",
        "img": "images/products/nigiri/salmon-nigiri.jpg",
        "price": "1.09"
    },
    {
        "id": "3",
        "name": "Grilled Salmon",
        "category": "nigiri",
        "pieces": "1",
        "img": "images/products/nigiri/grilled-nigiri.jpg",
        "price": "1.09"
    },
    {
        "id": "4",
        "name": "Squid",
        "category": "nigiri",
        "pieces": "1",
        "img": "images/products/nigiri/squid-nigiri.jpg",
        "price": "0.99"
    },
    {
        "id": "5",
        "name": "Tuna",
        "category": "nigiri",
        "pieces": "1",
        "img": "images/products/nigiri/tuna-nigiri.jpg",
        "price": "0.99"
    },
    {
        "id": "6",
        "name": "Avocado",
        "category": "nigiri",
        "pieces": "1",
        "img": "images/products/nigiri/avocado-nigiri.jpg",
        "price": "0.89"
    },
    {
        "id": "7",
        "name": "Crab",
        "category": "nigiri",
        "pieces": "1",
        "img": "images/products/nigiri/crab-nigiri.jpg",
        "price": "0.99"
    },
    {
        "id": "8",
        "name": "Philadelphia",
        "category": "uramaki",
        "pieces": "8",
        "img": "images/products/uramaki/philly-uramaki.jpg",
        "price": "11.99"
    },
    {
        "id": "9",
        "name": "Wasabi Roll",
        "category": "uramaki",
        "pieces": "8",
        "img": "images/products/uramaki/wasabi-uramaki.jpg",
        "price": "10.99"
    },
    {
        "id": "10",
        "name": "Salmon",
        "category": "uramaki",
        "pieces": "8",
        "img": "images/products/uramaki/salmon-uramaki.jpg",
        "price": "10.99"
    },
    {
        "id": "11",
        "name": "Tiger Roll",
        "category": "uramaki",
        "pieces": "8",
        "img": "images/products/uramaki/tiger-uramaki.jpg",
        "price": "12.99"
    },
    {
        "id": "12",
        "name": "Dragon Roll",
        "category": "uramaki",
        "pieces": "8",
        "img": "images/products/uramaki/dragon-uramaki.jpg",
        "price": "10.99"
    },
    {
        "id": "13",
        "name": "Fish Roe",
        "category": "gunkan",
        "pieces": "4",
        "img": "images/products/gunkan/fishroe-gunkan.jpg",
        "price": "5.99"
    },
    {
        "id": "14",
        "name": "Salmon",
        "category": "gunkan",
        "pieces": "4",
        "img": "images/products/gunkan/salmon-gunkan.jpg",
        "price": "10.99"
    },
    {
        "id": "15",
        "name": "Wakame",
        "category": "gunkan",
        "pieces": "4",
        "img": "images/products/gunkan/wakame-gunkan.jpg",
        "price": "10.99"
    },
    {
        "id": "16",
        "name": "Tuna",
        "category": "gunkan",
        "pieces": "4",
        "img": "images/products/gunkan/tuna-gunkan.jpg",
        "price": "10.99"
    },
    {
        "id": "17",
        "name": "Spicy Salmon",
        "category": "gunkan",
        "pieces": "4",
        "img": "images/products/gunkan/spicy-gunkan.jpg",
        "price": "10.99"
    }
];

const injectBox = document.getElementById("injectBox");
const buttonBox = document.querySelector('.filterBtns');

// Load items on page load
window.addEventListener("DOMContentLoaded", function () {
    displayMenu(menu);
    displayButtons();
});

// Display items from the menu
function displayMenu(menuItems) {
    let displayItems = menuItems.map(item => {
        return `
        <div class="sushiBox">
            <img src="${item.img}">
            <div class="addCartOverlay" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}" data-pcs="${item.pieces}" data-img="${item.img}">Add to Cart
            </div>
            <p class="itemDescription">${item.pieces} pc ${item.name} ${item.price} €</p>
        </div>
    `;
    });
    displayItems = displayItems.join('');
    injectBox.innerHTML = displayItems;
    addToCartBtns();
}

// Display buttons dynamically. New category in item list -> new button created.
function displayButtons() {
    // Dynamic category items
    const btnCategories = menu.reduce(function (values, item) {
        if (!values.includes(item.category)) {
            values.push(item.category);
        }
        return values;
    }, ['all']);
    const buttonsToDisplay = btnCategories.map(button => {
        return `
        <button class="filterBtn" data-id="${button}">${button}</button>
        `;
    }).join('');
    buttonBox.innerHTML = buttonsToDisplay;
    const buttons = document.querySelectorAll(".filterBtn");

    buttons.forEach(button => button.addEventListener("click", function (e) {
        let category = e.target.dataset.id;
        let menuCategory = menu.filter(menuItem => {
            // Get menu items with the same category
            if (menuItem.category === category) {
                return menuItem;
            }
        });
        // Display items based by category
        if (category === 'all') {
            displayMenu(menu);
        } else {
            displayMenu(menuCategory);
        }
    }));
}

function openCart() {
    document.getElementById("sideBar").classList.add('active');
    showCartItems();
    updateTotal();
    checkIfCartIsEmpty();
    let removeItem = document.querySelectorAll('#remove');
    removeItem.forEach(button => {
        button.addEventListener('click', function (e) {
            let itemID = e.target.dataset.id;
            for (let i = 0; i < cart.length; i++) {
                if (cart[i].targetID == itemID) {
                    cart.splice(i, 1);
                    showCartItems();
                    openCart();
                    break;
                }
            }
        });
    });
}

function closeCart() {
    document.getElementById("sideBar").classList.remove('active');
}

function addToCartBtns() {
    const addCartBtns = document.querySelectorAll(".addCartOverlay");
    addCartBtns.forEach(button => button.addEventListener("click", function (e) {
        let targetID = e.target.dataset.id;
        let targetPrice = e.target.dataset.price;
        let targetName = e.target.dataset.name;
        let targetImage = e.target.dataset.img;
        let targetPieces = e.target.dataset.pcs;
        let targetProduct = {
            targetID,
            targetName,
            targetPieces,
            targetPrice,
            targetImage
        };
        cart.push(targetProduct);
        counterUpdate();
        closeCart();
    }));
}

const cartItemDiv = document.getElementById('cartItemsDiv');

function checkIfCartIsEmpty() {
    if (cart.length === 0) {
        cartItemsDiv.innerHTML = `<p class="empty-cart-txt">Cart is empty. Add some sushi!</p>`;
    }
}

function showCartItems() {
    let cartItem = cart.map(item => {
        return `
            <table class="cart-item">
            <tr>
            <td><img class="cart-img" src="${item.targetImage}"></td>
            <td><p class="cart-txt">${item.targetName} ${item.targetPieces} pc</p></td>
            <td><p class="cart-txt">${item.targetPrice} €</p></td>
            <td><p data-id="${item.targetID}" id="remove">X</p></td>
            </tr>
        </table>
            `;
    });
    cartItem = cartItem.join("");
    cartItemDiv.innerHTML = cartItem;
}

function counterUpdate() {
    // Update navbar item counter
    const cartItemCount = document.getElementById("itemsInCart");
    let itemCount = 0;
    cart.forEach(items => itemCount++);
    cartItemCount.textContent = `${itemCount} items`;
}

function updateTotal() {
    let totalSum = 0;
    const totalDiv = document.getElementById("total");
    document.getElementById("sideBar").classList.add('active');
    cart.forEach(item => {
        totalSum += Number(item.targetPrice);
    });
    let finalSum = totalSum.toFixed(2);
    totalDiv.textContent = `Total: ${finalSum} €`;
}

function clearCart() {
    cart = [];
    showCartItems();
    updateTotal();
    counterUpdate();
    checkIfCartIsEmpty();
}

const clearCartBtn = document.getElementById("clearCart");
const closeCartBtn = document.getElementById("closeCart");
const shoppingCartBtn = document.getElementById("shopping-cart");
shoppingCartBtn.addEventListener("click", openCart);
closeCartBtn.addEventListener("click", closeCart);
clearCartBtn.addEventListener("click", clearCart);
document.querySelector(".brand-name").addEventListener("click", closeCart);