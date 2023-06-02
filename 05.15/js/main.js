class Product {
  constructor(id, title, categories, description, price, image) {
    this.id = id;
    this.title = title;
    this.categories = categories;
    this.description = description;
    this.price = price;
    this.image = image;
  }
}

class ContainerElem {
  constructor(type, nameOfClass, theId) {
    this.elem = document.createElement(type);
    this.elem.className = nameOfClass;
    this.elem.id = theId;
  }
}

class TextElem {
  constructor(type, nameOfClass, text) {
    this.elem = document.createElement(type);
    this.elem.className = nameOfClass;
    this.elem.innerText = text;
  }
}

class Image {
  constructor(nameOfClass, source) {
    this.img = document.createElement("img");
    this.img.className = nameOfClass;
    this.img.src = source;
  }
}

class Button {
  constructor(nameOfClass, text, handler) {
    this.btn = document.createElement("button");
    this.btn.className = nameOfClass;
    this.btn.innerText = text;
    this.btn.addEventListener("click", handler);
  }
}

class Input {
  constructor(placeholderText) {
    this.input = document.createElement("input");
    this.input.type = "text";
    this.input.placeholder = placeholderText;
  }
}

const Products = [
  new Product(
    "1",
    "Apricot",
    ["fruits", "high fiber", "weight loss"],
    "The tastiest apricot is ours",
    6.99,
    "apricot.jpg"
  ),
  new Product(
    "2",
    "Apple",
    ["fruits", "high fiber", "weight loss"],
    "The tastiest apple is ours",
    4.89,
    "apple.jpg"
  ),
  new Product(
    "3",
    "Banana",
    ["fruits", "high fiber", "high carb", "tropical"],
    "The tastiest banana is ours",
    9.99,
    "banana.jpg"
  ),
  new Product(
    "4",
    "Broccoli",
    [
      "vegetables",
      "cruciferous",
      "freeze well",
      "weight loss",
      "high fiber",
      "low carb",
    ],
    "Our broccoli will keep you healthy",
    5.49,
    "broccoli.jpg"
  ),
  new Product(
    "5",
    "Cabbage",
    ["vegetables", "cruciferous", "freeze well", "high fiber"],
    "Our cabbage will keep you healthy",
    11.99,
    "cabbage.jpg"
  ),
  new Product(
    "6",
    "Carrot",
    ["vegetables", "root", "freeze well", "weight loss", "high fiber"],
    "Our carrot is extremely beneficial to your health",
    3.99,
    "carrot.jpg"
  ),
  new Product(
    "7",
    "Potato",
    ["vegetables", "root", "freeze well", "high carb"],
    "Cook the yummiest mash potatoes with our potatoes",
    8.99,
    "potato.jpg"
  ),
  new Product(
    "8",
    "Strawberry",
    ["fruits", "freeze well", "high fiber", "weight loss"],
    "The most delicious strawberries are ours",
    15.79,
    "strawberry.jpg"
  ),
  new Product(
    "9",
    "Tomato",
    [
      "vegetables",
      "low carb",
      "high fiber",
      "nightshade",
      "freeze well",
      "weight loss",
    ],
    "Our yummiest tomato is really yummy",
    8.99,
    "tomato.jpg"
  ),
  new Product(
    "10",
    "Watermelon",
    ["fruits", "low fiber", "tropical", "weight loss"],
    "Our yummy watermelon is the best",
    19.99,
    "watermelon.jpg"
  ),
  new Product(
    "11",
    "Cucumber",
    ["vegetables", "low carb", "freeze well", "weight loss"],
    "Our special cucumber is the best",
    7.99,
    "cucumber.jpg"
  ),
  new Product(
    "12",
    "Eggplant",
    ["vegetables", "low carb", "nightshade", "freeze well"],
    "Our yummy eggplant is just the best around!",
    12.99,
    "eggplant.jpg"
  ),
  new Product(
    "13",
    "Spinach",
    ["vegetables", "low carb", "high fiber", "freeze well", "weight loss"],
    "Popeye knows he's business! Get your spinach today!",
    3.59,
    "spinach.jpg"
  ),
];

const Main = document.querySelector("main");
const ProductsContainer = document.createElement("div");
ProductsContainer.className = "products-container";

Products.forEach(createArticle);

function createArticle(prod) {
  const prodArticle = new ContainerElem(
    "article",
    "each-prod",
    `prod-${prod.id}`
  ).elem;

  const prodTitle = new TextElem("h2", "prod-title", prod.title).elem;

  const prodCategories = new TextElem(
    "p",
    "prod-categories",
    prod.categories.join(", ")
  ).elem;

  const prodDescription = new TextElem(
    "p",
    "prod-description",
    prod.description
  ).elem;

  const prodPrice = new TextElem("h3", "prod-price", prod.price).elem;

  const prodImage = new Image(
    "prod-image",
    `./assets/images/${prod.image.split(".")[0] + "_200x200.jpg"}`
  ).img;

  const buyNowBtn = new Button("buy-now-btn", "Buy Now", orderProduct).btn;

  const delProdBtn = new Button("del-prod-btn", "X", deleteItem).btn;

  prodArticle.append(
    prodImage,
    prodTitle,
    prodCategories,
    prodDescription,
    prodPrice,
    buyNowBtn,
    delProdBtn
  );

  ProductsContainer.appendChild(prodArticle);
}

Main.appendChild(ProductsContainer);

function getProdName(prod) {
  return prod.parentElement.firstChild.src
    .split("/")
    .slice(-1)[0]
    .split("_")[0]
    .toUpperCase();
}

function orderProduct() {
  alert("You bought: " + getProdName(this));
}

function deleteItem() {
  this.parentElement.remove();
  alert(
    `As per your request, ${getProdName(
      this
    )} will be permanently removed from your account`
  );

  const itemId = this.parentElement.id.split("-")[1]; // grab the product's ID from the article's id attribute
  for (let i = 0; i < Products.length; i++) {
    const currentProd = Products[i];
    if (currentProd.id === itemId) {
      Products.splice(i, 1);
      break;
    }
  }
}

// I created a form-container (in addition to the form element) to wrap the form element
// because I gave the form element display flex and it didn't work so well with display none -
// so instead I'm toggling the form-container display block/none
// and the form element remains flex at all times
const formContainer = new ContainerElem("div", "not-showing", "form-container")
  .elem;
const form = new ContainerElem("div", "form", "form").elem;

// SHOW/HIDE FORM BUTTON
const toggleFormBtn = new Button("toggle-form-btn", "Show Form", function () {
  if (this.nextElementSibling.className === "not-showing") {
    this.nextElementSibling.className = "showing";
    this.innerText = "Hide form";
  } else {
    this.nextElementSibling.className = "not-showing";
    this.innerText = "Show form";
  }
}).btn;

formContainer.appendChild(form);
Main.append(toggleFormBtn, formContainer);
Main.appendChild(formContainer);

const formTitle = document.createElement("h2");
formTitle.innerText = "Add New Product";

const $FormElems = {
  prodId: new Input("Product ID").input,
  prodTitle: new Input("Product Title").input,
  prodCategories: new Input(
    "Product Categories,separated by 1 comma and a space"
  ).input,
  prodDescription: new Input("Product Description").input,
  prodPrice: new Input("Product Price").input,
  prodImage: new Input("Product Image filename").input,
};

const addNewProdBtn = document.createElement("button");
addNewProdBtn.className = "add-new-prod-btn";
addNewProdBtn.innerText = "Add New Product";
addNewProdBtn.addEventListener("click", addNewProd);

function isValidForm() {
  return (
    $FormElems.prodId.value &&
    $FormElems.prodTitle.value &&
    $FormElems.prodCategories.value &&
    $FormElems.prodDescription.value &&
    $FormElems.prodPrice.value &&
    $FormElems.prodImage.value
  );
}

function isUniqueId(newProdId) {
  for (prod of Products) {
    if (prod.id === newProdId) return false;
  }
  return true;
}

function clearForm() {
  for (const key in $FormElems) {
    $FormElems[key].value = "";
  }
}

function addNewProd() {
  if (isValidForm()) {
    if (isUniqueId($FormElems.prodId.value)) {
      const newProd = new Product(
        $FormElems.prodId.value,
        $FormElems.prodTitle.value,
        $FormElems.prodCategories.value.split(", "),
        $FormElems.prodDescription.value,
        +$FormElems.prodPrice.value,
        $FormElems.prodImage.value
      );
      Products.push(newProd);
      createArticle(newProd);
      clearForm();
      return;
    } else {
      alert(`Product Id ${$FormElems.prodId.value} aleady exists.`);
    }
  } else {
    alert("You must fill all the fields in this form");
  }
  return;
}

form.append(
  formTitle,
  $FormElems.prodId,
  $FormElems.prodTitle,
  $FormElems.prodCategories,
  $FormElems.prodDescription,
  $FormElems.prodPrice,
  $FormElems.prodImage,
  addNewProdBtn
);
