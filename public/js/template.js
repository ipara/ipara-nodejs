document.querySelector(".menu-button").addEventListener("click", function (e) {
    document.querySelector(".menu").classList.toggle("active");
    const remover = document.createElement("div");
    remover.onclick = closeMenu;
    remover.classList.add("close-menu");
    document.querySelector(".wrapper").appendChild(remover);
});

function closeMenu() {
    document.querySelector(".menu").classList.remove("active");
    document
        .querySelector(".wrapper")
        .removeChild(document.querySelector(".close-menu"));
}

function undefined2Null(text) {
    if (!text) return "null";
    return text;
}
