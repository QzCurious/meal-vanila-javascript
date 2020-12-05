function restart_animation($el) {
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
