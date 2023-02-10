const products = [
  {
    id: 0,
    image: "https://media1.matrecept.se/2020/05/Utkast-kebab.jpg",
    title: "Kebabpizza",
    ingrediens: "Tomatsås, Ost , Isberssallad, gurka, gullök, feferoni och kebab",
    desc: "Kcal: 1372\nkJ: 2600\nProtein: 100g\nFett: 213g\nKolhydrater: 500g\nKan innehålla spår av gluten.",
    price: 90,
    amount: 0,
  },
  {
    id: 1,
    image: "https://res.cloudinary.com/hufennija/image/upload/h_410,w_414,q_auto,f_auto,fl_progressive,c_lfill/435552",
    title: "Kycklingpizza",
    ingrediens: "Tomatsås, Ost, Kycklingkebab",
    desc: "Kcal: 1100\nkJ: 2210\nProtein: 200g\nFett: 112g\nKolhydrater: 235g\nKan innehålla spår av gluten.",
    price: 90,
    amount: 0,
  },
  {
    id: 2,
    image: "https://sv.food-of-dream.com/content/0/884/cb4732681fb010836df41beb0b0093e5.jpg",
    title: "Margarita",
    ingrediens: "Tomatsås, Ost",
    desc: "Kcal: 700\nkJ: 1000\nProtein: 2g\nFett: 1g\nKolhydrater: 1000g\nKan innehålla spår av gluten.",
    price: 70,
    amount: 0,
  },
  {
    id: 3,
    image: "https://imageproxy.wolt.com/menu/menu-images/6242b7ddbba669425de94037/fd4bb17e-af98-11ec-abc5-3a8d068dab06_campino_kyckling_special.jpeg",
    title: "Kycklingspecial",
    ingrediens: "Tomatsås, Ost, Isberssallad, Gurka, Feferoni, Tomat, Kycklingkebab",
    desc: "Kcal: 5000\nkJ: 10000\nProtein: 1quiz.g\nFett: 1000g\nKolhydrater: 2000g\nKan innehålla spår av gluten.",
    price: 100,
    amount: 0,
  },
];
const userCartKey = "MyCartProducts";
const userCartItems = [];

fetch("https://v2.jokeapi.dev/joke/Programming?type=single")
.then(response => response.json())
.then(data => {
  document.getElementById("myAPI").innerText = data.joke;
});

LoadUserCartItems();

products.forEach((product, i) => {
  const p = document.createElement("h1");
  const b = document.createElement("img");
  const d = document.createElement("p");
  const cost = document.createElement("p");
  const add = document.createElement("button");
  const info = document.createElement("button");
  const remove = document.createElement("button");

  info.dataset.toggle = "modal";
  info.dataset.target = "#myModal";

  add.classList.add("btn", "btn-primary");
  remove.classList.add("btn", "btn-danger");

  b.src = `${product.image}`;
  p.innerText = product.title;
  d.innerText = product.ingrediens;
  cost.innerText = product.price + " SEK";
  p.style.color = "marineblue";
  p.style.fontSize = "24px";
  d.style.color = "black";
  add.innerText = "Add Pizza";
  remove.innerText = "Remove Pizza"
  info.innerText = "Information";
  b.alt = product.title;

  info.classList.add("btn");
  info.classList.add("btn-info")
  
  add.onclick = () => {
    AddItemsToUserCart(product.id);
    ClearCheckOut();
    LoadUserCartItems();
  }
  remove.onclick = () => {
    RemoveItemFromUserCart(product.id);
    ClearCheckOut();
    LoadUserCartItems();
  }

  info.onclick = () => {
    document.getElementById("pizzaNamn").innerText = product.title;
    document.getElementById("pizzaInfo").innerText = product.desc;
  }

  document.getElementById("produkter").appendChild(p);
  document.getElementById("produkter").appendChild(b);
  document.getElementById("produkter").appendChild(d);
  document.getElementById("produkter").appendChild(cost);
  document.getElementById("produkter").appendChild(add);
  document.getElementById("produkter").appendChild(remove);
  document.getElementById("produkter").appendChild(info);
});



function LoadUserCartItems() {
  let cartFromStorage = localStorage.getItem(userCartKey);
  if(cartFromStorage === null || cartFromStorage === [] || cartFromStorage === "") {
    SaveToCart();
  }
  const checkout = document.createElement("button");
  userCartItems.forEach((product, i) => {
    let p = document.createElement("h3");
    let a = document.createElement("h4");

    p.innerText = product.title;
    a.innerText = product.amount;
    checkout.innerText = "Checkout";

    checkout.onclick = () => {
      CheckOut();
      ClearCheckOut();
    }

    document.getElementById("kundvagn").appendChild(p);
    document.getElementById("kundvagn").appendChild(a);
    document.getElementById("kundvagn").appendChild(checkout);
  });
}

function ClearCheckOut() {
    document.getElementById("kundvagn").innerHTML = "";
}

function SaveToCart() {
  console.log(userCartItems);
  localStorage.setItem(userCartKey, JSON.stringify(userCartItems));
}

function RemoveItemFromUserCart(id) {
  let productIndex = userCartItems.findIndex(p => p.id === id);

  if(productIndex == -1) {
    console.log("No products!");
    return;
  }
  else {
    userCartItems[productIndex].amount -= 1;
    if(userCartItems[productIndex].amount <= 0) {
      userCartItems.splice(productIndex, 1);
    }
    SaveToCart();
  }
}

function AddItemsToUserCart(id) {
  let product = products.find(p => p.id === id);
  if (product === undefined) {
    console.log("Product does not exist!");
    return;
  }

  let productInCartIndex = userCartItems.findIndex(p => p.id === id)
  if(productInCartIndex === -1)
  {
    product.amount = 1;
    userCartItems.push(product);
  } else {
    userCartItems[productInCartIndex].amount += 1;
  }

  console.log(product);
  console.log("added");
  SaveToCart();
}
function CheckOut() {
  localStorage.setItem(userCartKey, []);
  alert("Thanks for shopping, you have checked out now!");
}
