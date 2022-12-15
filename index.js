const URL_LIST_USERS = "https://jsonplaceholder.typicode.com/users";
//Полоска загрузки, появляется при медленном интернете.
const loader = document.querySelector(".progress");
//Div с доченими кнопками выбора.
const selection = document.querySelector(".selection");
//Div, куда выводятся карточки.
const divOutput = document.querySelector(".output");

//Помошник содания HTML элементов.
const createElement = (tag, attributes, parent) => {
    const el = document.createElement(tag);
    if (attributes.class)
        attributes.class.forEach(i => el.classList.add(i));
    if (attributes.text)
        el.textContent = attributes.text;
    if (attributes.href)
        el.href = attributes.href;
    if (attributes.data)
        el.dataset[attributes.data.name] = attributes.data.value;
    if (attributes.style)
        el.style[attributes.style.name] = `${attributes.style.value}`;
    Array.from(document.querySelectorAll(parent)).at(-1).append(el);
}

//Шаблон Materialize "Badges in Collapsibles".
const badgesInCollapsibles = dataArray => {
    createElement("ul", {
            class: ["collapsible"],
            data: {name: "name", value: "collapsible"}
        },
        ".output");
    dataArray.forEach(card => {
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
        createElement("table", {class: ["responsive-table"]}, ".collapsible-body");
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
        createElement("a", {href: "#", text: `${card.website}`}, "td");
    });
    //Magic materialize.
    M.Collapsible.init(document.querySelectorAll(".collapsible"));
}

//Шаблон Materialize "Basic Card".
const basicCard = dataArray => {
    createElement("div", {
            class: ["row"],
            data: {name: "name", value: "basic_card"}
        },
        ".output");
    dataArray.forEach(card => {
        createElement("div", {class: ["col", "s12", "l6"]}, '[data-name="basic_card"]');
        createElement("div", {class: ["card", "blue-grey", "darken-1"]}, ".col");
        createElement("div", {class: ["card-content", "white-text"]}, ".card");
        createElement("span", {
            class: ["card-title", "center-align", "truncate"],
            text: card.name
        }, ".card-content");
        createElement("div", {
                class: ["row"],
                style: {name: "marginBottom", value: '0'}
            },
            ".card-content");
        createElement("div", {class: ["col", "s2"]}, ".row");
        createElement("i", {
                class: ["medium", "material-icons"],
                text: "add_a_photo"
            },
            ".col");
        createElement("div", {class: ["col", "s8", "offset-s2"]}, ".row");
        createElement("p", {class: ["truncate"], text: `Company: "${card.company.name}"`}, ".col");
        createElement("p", {
            class: ["truncate"],
            text: card.company.bs[0].toUpperCase() + card.company.bs.slice(1)
        }, ".col");
        createElement("p", {class: ["truncate"], text: `Phone: ${card.phone}`}, ".col");
        createElement("div", {class: ["card-action", "center-align", "truncate"]}, ".card");
        createElement("a", {href: "#", text: `${card.email}`}, ".card-action");
        createElement("a", {href: "#", text: `${card.website}`}, ".card-action");
    });
}

//Проверяет пуст ли div для вывода, если нет, то очищает или скрывает его.
const cleanOutput = dataValue => {
    if (divOutput.firstElementChild?.dataset.name === dataValue) {
        divOutput.classList.toggle("hide");
        return false;
    } else if (divOutput.childNodes.length && divOutput.firstElementChild?.dataset.name !== dataValue) {
        divOutput.classList.remove("hide");
        divOutput.replaceChildren();
        return true;
    }
    return true;
}

//Обраболтка кнопок выбора шаблона.
const output = dataArray => {
    selection.addEventListener("click", event => {
        const isSelectedButtons = event.target.closest(".selected_button")
        if (isSelectedButtons.classList.contains("badges_in_collapsibles") && cleanOutput("collapsible"))
            badgesInCollapsibles(dataArray);
        if (isSelectedButtons.classList.contains("basic_card") && cleanOutput("basic_card"))
            basicCard(dataArray);
    })
}

//Переключатель полоски загрузки.
//Можно закоментоить finally в getData, чтобы рассмотреть.
const toggleLoader = () => {
    loader.classList.toggle("hide");
}

//Получение данных с сайта.
const getData = () => {
    toggleLoader();
    fetch(URL_LIST_USERS)
        .then(response => response.json()
        )
        .then(output)
        .catch(error => console.error("Что-то пошло не так...", error)
        )
        .finally(() => toggleLoader()
        );
}

//Запуск
getData();


