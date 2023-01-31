let arr = [
  {
    image: "kebabpizza.png",
    title: "Kebabpizza",
    desc: "Tomatsås, Ost , Isberssallad, gurka, gullök, feferoni och kebab",
    price: 90,
  },
  {
    image: "kycklingpizza.png",
    title: "Kycklingpizza",
    desc: "Tomatsås, Ost, Kycklingkebab",
    price: 90,
  },
  {
    image: "margarita.png",
    title: "Margarita",
    desc: "Tomatsås, Ost",
    price: 70,
  },
  {
    image: "kycklingspecial.png",
    title: "Kycklingspecial",
    desc: "Tomatsås, Ost, Isberssallad, Gurka, Feferoni, Tomat, Kycklingkebab",
    price: 100,
  },
];

arr.forEach((x, i) => {
  let p = document.createElement("h1");
  let b = document.createElement("img");
  let d = document.createElement("p");
  let cost = document.createElement("p");

  b.src = `./Labb1Bilder/${arr[i].image}`;
  p.innerText = arr[i].title;
  d.innerText = arr[i].desc;
  cost.innerText = arr[i].price;
  p.style.color = "gold";
  p.style.fontSize = "24px";
  d.style.color = "white";

  document.getElementById("produkter").appendChild(p);
  document.getElementById("produkter").appendChild(b);
  document.getElementById("produkter").appendChild(d);
  document.getElementById("produkter").appendChild(cost);
});
