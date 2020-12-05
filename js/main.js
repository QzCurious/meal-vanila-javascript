const data = [
    {
        img: "./images/meal1.png",
        tag: "#1 Most loved meal",
        title1: "Lotek",
        title2: "Perkedel",
    },
    {
        img: "./images/meal2.png",
        tag: "#2 Most loved meal",
        title1: "Lamb Steak",
        title2: "Potato",
    },
];

const $meal = document.querySelector("template.meal-template").content.cloneNode(true);
const meal = Meal($meal, data)
document.querySelector("main").appendChild($meal);
