const Nsegmant = 16;
let treesegmant = [];
let arrsegmant = [];
let btn = document.querySelector(".btnPlay");
let btnsubmit = document.querySelector(".query-form");
let sideMen = document.querySelector(".sample");
btn.addEventListener("click", initArr, { once: true });
sideMen.addEventListener("click", showMen);
let dela = 0;
btnsubmit.addEventListener("submit", (event) => {
    sideMen.style.right = "-386px";
    const data = new FormData(btnsubmit);
    let valid = true;
    let len = 0;
    let inp = data.get(`input-data`);
    let ope = data.get(`operation`);
    for (const i in inp) {
        if (isNaN(inp[i]) && inp[i] !== ',') valid = false;
        else if (inp[i] === ',') len++;
    }
    if (len > 16 || !valid || inp.length === 0) {
        prompt("Data isnot valid");
    } else {
        arrsegmant = [];
        arrsegmant.push(0);
        inp.split(',').forEach(element => {
            arrsegmant.push(parseInt(element));
        });
        initArr(ope);
    }
    event.preventDefault();
}, false);
function buildsegmant(node, l, r, op) {
    let myNodeCircle = document.querySelector(`.circle${node}`);
    let myNodeText = document.querySelector(`.text${node}`);
    let myNodequery = document.querySelector(`.query${node}`);

    myNodeText.innerHTML = '?';
    appear(myNodeCircle);
    if (l === r) {
        treesegmant[node] = arrsegmant[l];
        myNodeText.innerHTML = `${treesegmant[node]}`;
        myNodequery.innerHTML = `[${l}:${l}]`;
        myNodequery.style.fill = "#1685c6";
        appear(myNodeText);
        appear(myNodequery);
        return;
    }
    let md = Math.floor((l + r) / 2);
    let myNodeleft = document.querySelector(`.from${node}to${node * 2}`);
    let myNoderight = document.querySelector(`.from${node}to${node * 2 + 1}`);
    appear(myNodeleft);
    buildsegmant(node * 2, l, md, op);
    appear(myNoderight);
    buildsegmant(node * 2 + 1, md + 1, r, op);

    if (op === "Sum-query")
        treesegmant[node] = treesegmant[node * 2] + treesegmant[node * 2 + 1];
    else if (op === "Multiply-query")
        treesegmant[node] = treesegmant[node * 2] * treesegmant[node * 2 + 1];
    else if (op === "Max-query")
        treesegmant[node] = Math.max(treesegmant[node * 2], treesegmant[node * 2 + 1]);
    else if (op === "Min-query")
        treesegmant[node] = Math.min(treesegmant[node * 2], treesegmant[node * 2 + 1]);
    else if (op === "xor-query")
        treesegmant[node] = treesegmant[node * 2] ^ treesegmant[node * 2 + 1];
    myNodequery.innerHTML = `[${l}:${r}]`;
    myNodequery.style.fill = "#1685c6";
    appear(myNodequery);
    myNodeText.innerHTML = `${treesegmant[node]}`;
    appear(myNodeText);
}

function appear(obj) {
    obj.classList.remove('hide');
    obj.classList.add('show');
    MyFadeFunction(obj);
}
function MyFadeFunction(obj) {
    obj.style.animation = "0.5s fade-in-out both";
    obj.style.animationDelay = `${dela}s`
    dela += 1;
    setTimeout(() => {
        obj.style.animation = "";
        obj.style.animationDelay = ``;
    }, dela * 1000);
}
function initArr(op) {
    let svg = document.querySelectorAll(`ellipse,text,path`);
    for (const iterator of svg) {
        iterator.classList.add("hide");
    }
    dela = 0;
    btn.style.display = "none";
    if (arrsegmant.length === 0) {
        op = "Sum-query";
        arrsegmant = [0, 1, 8, 9, 10, 4, 5, 7, 9];
    }
    treesegmant = [];
    for (let i = 0; i <= Nsegmant * 4; i++) {
        treesegmant.push(0);
    }
    buildsegmant(1, 1, arrsegmant.length - 1, op);
}

function showMen() {
    sideMen.style.right = "0";
}