// In your HTML, you must only have a main tag. DONE
// In JS, create a container div for all your products. DONE

// Run a loop through each product that will create a separate tag (article) per item.
// Each property will have its own tag (div, h3, p, span, img...) and a class to style it.
// after the article tag is ready, append it to a container.

// once the code is out of the loop, take the container and append it to the main tag in your HTML. DONE

const Products = [
  {
    id: 1,
    title: "The Must Have Watch",
    categories: ["Watches", "Luxury", "Sports"],
    description: "This describes the most beautiful watch",
    price: 1800,
    img: "watch.jpg",
  },

  {
    id: 2,
    title: "The Every Day Suit",
    categories: ["Suits", "Luxury", "Casual"],
    description: "This describes the perfect suit",
    price: 700,
    img: "suit.jpg",
  },

  {
    id: 3,
    title: "Borsalino Hat",
    categories: ["Hats", "Luxury", "Evening"],
    description: "Magnificent pure rabbit felt hat",
    price: 1000,
    img: "borsalino_hat.jpg",
  },

  {
    id: 4,
    title: "Umbrella",
    categories: ["Accessories", "Family", "Casual"],
    description: "Look sharp with this awesome umbi",
    price: 200,
    img: "umbrella.jpg",
  },

  {
    id: 5,
    title: "Awesome Jacket",
    categories: ["Jackets", "Familly", "Sports"],
    description: "This describes the most beautiful jacket",
    price: 1800,
    img: "jacket.jpg",
  },

  {
    id: 6,
    title: "High Heels",
    categories: ["Shoes", "Luxury", "Women", "Evening", "Elegant"],
    description: "The most expensive high heels",
    price: 27000,
    img: "high_heels.jpg",
  },

  {
    id: 7,
    title: "Running Shoes",
    categories: ["Shoes", "Family", "casual", "Sports"],
    description: "Wonderful running shoes",
    price: 650,
    img: "running_shoes.jpg",
  },

  {
    id: 8,
    title: "Dinnerware Set",
    categories: ["Accessories", "Luxury", "Special Occasion"],
    description: "Look sharp with this awesome dinnerware set",
    price: 600,
    img: "dinnerware_set.jpg",
  },

  {
    id: 9,
    title: "Table Lamp",
    categories: ["Lamps", "Home", "Lighting", "Family"],
    description: "Awesome lamp for your table",
    price: 290,
    img: "table_lamp.jpg",
  },

  {
    id: 10,
    title: "Cap Hat",
    categories: ["Hats", "Casual", "Family"],
    description: "This describes the perfect cap hat",
    price: 150,
    img: "cap_hat.jpg",
  },

  {
    id: 11,
    title: "Irrigation System",
    categories: ["Gardening", "Intelligent", "Watering", "Home"],
    description: "Intelligent watering system for your home garden",
    price: 1050,
    img: "irrigation_system.jpg",
  },

  {
    id: 12,
    title: "Trolley Suitcase",
    categories: ["Accessories", "Travel", "Family", "Casual"],
    description: "Look sharp with this awesome trolley suitcase",
    price: 995,
    img: "trolley_suitcase.jpg",
  },
];

const Main = document.querySelector("main");
const Container = document.createElement("div");
Container.className = "products-container";

Products.forEach(createArticle);

function createArticle(prod) {
  const article = document.createElement("article");
  article.className = "each-prod";
  const h3 = document.createElement("h3");
  const cats = document.createElement("p");
  const desc = document.createElement("p");
  const price = document.createElement("h4");
  const img = document.createElement("img");
  const btn = document.createElement("button");
  article.id = "prod_" + prod.id;
  h3.innerText = prod.title;
  cats.innerText = prod.categories.join(", ");
  desc.innerText = prod.description;
  price.innerText = prod.price;
  img.src = "./assets/images/" + prod.img;
  btn.innerText = "Order Now";
  btn.addEventListener("click", orderProduct);
  article.append(h3, cats, desc, price, img, btn);
  Container.append(article);
}

function orderProduct() {
  const productID = this.parentElement.id.split("_")[1];
  alert("You bought this product: " + productID);
}

Main.append(Container);
