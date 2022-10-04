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
        if (ope === "Sum-query")
            initArr('+');
        else if (ope === "Multiply-query")
            initArr('*');
        else if (ope === "Max-query")
            initArr('max');
        else if (ope === "Min-query")
            initArr('min');
        else if (ope === "xor-query")
            initArr('^');
    }
    event.preventDefault();
}, false);
function buildsegmant(node, l, r, op) {
    let myNodeCircle = document.querySelector(`.circle${node}`);
    let myNodeText = document.querySelector(`.text${node}`);
    let myNodequery = document.querySelector(`.query${node}`);

    myNodeCircle.classList.remove('hide');
    myNodeCircle.classList.add('show');
    myNodeText.innerHTML = '?';
    MyFadeFunction(`circle${node}`);
    if (l === r) {
        treesegmant[node] = arrsegmant[l];
        myNodeText.innerHTML = `${treesegmant[node]}`;
        myNodequery.innerHTML = `[${l}:${l}]`;
        myNodequery.style.fill = "#1685c6";
        myNodeText.classList.remove('hide');
        myNodeText.classList.add('show');
        myNodequery.classList.remove('hide');
        myNodequery.classList.add('show');
        // MyFadeFunction(`circle${node}`);
        MyFadeFunction(`text${node}`);
        MyFadeFunction(`query${node}`);
        return;
    }
    let md = Math.floor((l + r) / 2);
    let myNodeleft = document.querySelector(`.from${node}to${node * 2}`);
    let myNoderight = document.querySelector(`.from${node}to${node * 2 + 1}`);
    myNodeleft.classList.remove('hide');
    myNodeleft.classList.add('show');
    MyFadeFunction(`from${node}to${node * 2}`);
    buildsegmant(node * 2, l, md, op);
    myNoderight.classList.remove('hide');
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
    myNodequery.classList.remove('hide');
    myNodequery.classList.add('show');
    MyFadeFunction(`query${node}`);
    myNodeText.innerHTML = `${treesegmant[node]}`;
    myNodeText.classList.remove('hide');
    myNodeText.classList.add('show');
    MyFadeFunction(`text${node}`);
}


function MyFadeFunction(obj) {
    document.querySelector(`.${obj}`).style.animation = "0.5s fade-in-out both";
    document.querySelector(`.${obj}`).style.animationDelay = `${dela}s`
    dela += 1;
    setTimeout(() => {
        document.querySelector(`.${obj}`).style.animation = "";
        document.querySelector(`.${obj}`).style.animationDelay = ``;
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
        op = '+';
        arrsegmant = [0, 1, 8, 9, 10, 4, 5, 7, 9];
    }
    treesegmant = [];
    for (let i = 0; i <= Nsegmant * 4; i++) {
        treesegmant.push(0);
    }
    buildsegmant(1, 1, arrsegmant.length - 1, op);
}

function showMen() {
    console.log(1);
    sideMen.style.right = "0";
}