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

let index = 0;

const $img = document.querySelector(".meal__img");
const $tag = document.querySelector(".tag");
const $title1 = document.querySelector(".meal__title > :nth-child(1)");
const $title2 = document.querySelector(".meal__title > :nth-child(2)");

const $next = document.querySelector(".next");
$next.addEventListener("click", async function () {
    index = index + 1 === data.length ? 0 : index + 1;
    const meal = data[index]
    await Promise.all([animate($tag, "clip-to-right"), animate($title1, "clip-to-left"), animate($title2, "clip-to-right")]);
    $tag.classList.add("invisible");
    $title1.classList.add("invisible");
    $title2.classList.add("invisible");

    await animate($img, "rotate--out");
    $img.classList.add("invisible");

    $tag.innerText = meal['tag']
    $title1.innerText = meal['title1']
    $title2.innerText = meal['title2']
    $img.src = meal['img']
    await timeout(300);

    $img.classList.remove("invisible");
    await animate($img, "rotate--in");
    $tag.classList.remove("invisible");
    animate($tag, "fill-to-left");
    $title1.classList.remove("invisible");
    animate($title1, "fill-to-right");
    $title2.classList.remove("invisible");
    animate($title2, "fill-to-left");
});

function reset_animation($el) {
    $el.style.animation = "none";
    void $el.offsetWidth;
    $el.style.animation = null;
}

async function animate($el, animation_class) {
    $el.classList.add(animation_class);

    return new Promise((resolve) => {
        $el.addEventListener(
            "animationend",
            function () {
                $el.classList.remove(animation_class);
                resolve();
            },
            { once: true },
        );
    });
}

async function timeout(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
