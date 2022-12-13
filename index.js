const URL_LIST_USERS = "https://jsonplaceholder.typicode.com/users";
const loader = document.querySelector(".progress");

const createElement = (tag, attributes, parent) => {
    const el = document.createElement(tag);
    if (attributes.class)
        attributes.class.forEach(i => el.classList.add(i));
    if (attributes.text)
        el.textContent = attributes.text;
    if (attributes.href)
        el.href = attributes.href;
    Array.from(document.querySelectorAll(parent)).at(-1).append(el);
}

const listTemplate = list => {
    createElement("ul", {class: ["collapsible"]}, "#cards");
    list.forEach(card => {
        createElement("li", {}, ".collapsible");
        createElement("div", {class: ["collapsible-header", "teal", "accent-1"]}, "li");
        createElement("i", {
            class: ["material-icons", "teal-text", "text-darken-2"],
            text: "assignment_ind"
        }, ".collapsible-header");
        createElement("span", {text: `${card.name}`}, ".collapsible-header ");
        createElement("span", {
            class: ["badge", "white-text", "teal", "lighten-2"],
            text: `${card.id}`
        }, ".collapsible-header");
        createElement("div", {class: ["collapsible-body", "teal", "lighten-4"]}, "li");
        createElement("table", {}, ".collapsible-body");
        createElement("thead", {}, "table");
        createElement("tr", {}, "thead");
        createElement("th", {text: "Username"}, "tr");
        createElement("th", {text: "Email"}, "tr");
        createElement("th", {text: "Phone"}, "tr");
        createElement("th", {text: "Website"}, "tr");
        createElement("tbody", {}, "table");
        createElement("tr", {}, "tbody");
        createElement("td", {text: `${card.username}`}, "tr");
        createElement("td", {text: `${card.email}`}, "tr");
        createElement("td", {text: `${card.phone}`}, "tr");
        createElement("td", {}, "tr");
        createElement("a", {href: "#", text: `${card.website}`},"td");
    });
}

const toggleLoader = () => {
    loader.classList.toggle("hide");
}
fetch(URL_LIST_USERS)
    .then((response) => {
        toggleLoader();
        return response.json();
    })
    .then(listTemplate)
    //Magic materialize.
    .then(() => {
        const elems = document.querySelectorAll(".collapsible");
        const instances = M.Collapsible.init(elems);
    })
    .catch((error) => {
        toggleLoader();
        console.error("Что-то пошло не так...", error);
    })
    .finally(() => {
        toggleLoader();
    });