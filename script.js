const Nsegmant = 16;
let treesegmant = [];
let arrsegmant = [];
let btn = document.querySelector(".btn");
btn.addEventListener("click", initArr, { once: true });

function buildsegmant(node, l, r, op) {
    let myNodeCircle = document.querySelector(`.circle${node}`);
    let myNodeText = document.querySelector(`.text${node}`);
    let myNodequery = document.querySelector(`.query${node}`);
    myNodeCircle.classList.add('show');
    myNodeText.innerHTML = '?';
    MyFadeFunction(`circle${node}`);
    if (l === r) {
        treesegmant[node] = arrsegmant[l];
        myNodeText.innerHTML = `${treesegmant[node]}`;
        myNodequery.innerHTML = `[${l}:${l}]`;
        myNodequery.style.fill = "#1685c6";
        myNodeText.classList.add('show');
        myNodequery.classList.add('show');
        MyFadeFunction(`circle${node}`);
        MyFadeFunction(`text${node}`);
        MyFadeFunction(`query${node}`);
        return;
    }
    let md = Math.floor((l + r) / 2);
    let myNodeleft = document.querySelector(`.from${node}to${node * 2}`);
    let myNoderight = document.querySelector(`.from${node}to${node * 2 + 1}`);
    myNodeleft.classList.add('show');
    MyFadeFunction(`from${node}to${node * 2}`);
    buildsegmant(node * 2, l, md, op);
    myNoderight.classList.add('show');
    MyFadeFunction(`from${node}to${node * 2 + 1}`);
    buildsegmant(node * 2 + 1, md + 1, r, op);
    if (op === "+") {
        treesegmant[node] = treesegmant[node * 2] + treesegmant[node * 2 + 1];
    } else if (op === "+") {
        treesegmant[node] = treesegmant[node * 2] + treesegmant[node * 2 + 1];
    } else if (op === "*") {
        treesegmant[node] = treesegmant[node * 2] * treesegmant[node * 2 + 1];
    } else if (op === "^") {
        treesegmant[node] = treesegmant[node * 2] ^ treesegmant[node * 2 + 1];
    } else if (op === "min") {
        treesegmant[node] = Math.min(treesegmant[node * 2], treesegmant[node * 2 + 1]);
    } else if (op === "max") {
        treesegmant[node] = Math.max(treesegmant[node * 2], treesegmant[node * 2 + 1]);
    }
    myNodequery.innerHTML = `[${l}:${r}]`;
    myNodequery.style.fill = "#1685c6";
    myNodequery.classList.add('show');
    MyFadeFunction(`query${node}`);
    myNodeText.innerHTML = `${treesegmant[node]}`;
    myNodeText.classList.add('show');
    MyFadeFunction(`text${node}`);
}

let dela = 0;
function MyFadeFunction(obj) {
    document.querySelector(`.${obj}`).style.animation = "0.5s fade-in-out both";
    document.querySelector(`.${obj}`).style.animationDelay = `${dela}s`
    dela += 1;
}
function initArr() {
    dela = 0;
    btn.style.display = "none";
    arrsegmant = [0, 1, 8, 9, 10, 4, 5, 7, 9];
    treesegmant = [];
    for (let i = 0; i <= Nsegmant * 4; i++) {
        treesegmant.push(0);
    }
    buildsegmant(1, 1, arrsegmant.length - 1, "+");
}