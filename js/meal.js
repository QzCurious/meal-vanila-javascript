// To avoid confusion of `this`, simply don't do `this`
// Drawback: Name collison can not be solve by accessing `this`, like i and function goto(index)
function Meal($root, data) {
    let i = 0;
    const $img = $root.querySelector(".meal__img");
    const $tag = $root.querySelector(".tag");
    const $title1 = $root.querySelector(".meal__title > :nth-child(1)");
    const $title2 = $root.querySelector(".meal__title > :nth-child(2)");
    const $next = $root.querySelector(".next");
    set_data(data[i]);
    $next.addEventListener("click", next);

    function set_data(data) {
        $tag.innerText = data["tag"];
        $title1.innerText = data["title1"];
        $title2.innerText = data["title2"];
        $img.src = data["img"];
    }

    function prev() {
        i = i == 0 ? data.length - 1 : i - 1;
        goto(i);
    }

    function next() {
        i = i + 1 === data.length ? 0 : i + 1;
        goto(i);
    }

    async function animate_in() {
        await Promise.all([animate($tag, "clip-to-right"), animate($title1, "clip-to-left"), animate($title2, "clip-to-right")]);
        $tag.classList.add("invisible");
        $title1.classList.add("invisible");
        $title2.classList.add("invisible");

        await animate($img, "rotate--out");
    }

    async function animate_out() {
        $img.classList.remove("invisible");
        await animate($img, "rotate--in");
        $tag.classList.remove("invisible");
        animate($tag, "fill-to-left");
        $title1.classList.remove("invisible");
        animate($title1, "fill-to-right");
        $title2.classList.remove("invisible");
        animate($title2, "fill-to-left");
    }

    async function goto(index) {
        if (index < 0 || index >= data.length) {
            throw Error(`i out of range: ${index}`);
        }

        i = index;

        await animate_in();
        $img.classList.add("invisible");

        set_data(data[i]);
        await timeout(300);
        await animate_out();
    }

    // Encapsulate!!
    return {
        next,
        goto,
        prev,
    };
}
