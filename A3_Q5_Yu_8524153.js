//array of length 10 represent the move of each animal given the random index
const tortoiserule = [3, 3, 3, 3, 3, -6, -6, 1, 1, 1];
const harerule = [0, 0, 9, 9, -12, 1, 1, 1, 2, 2];

// initlize the game
function $(id) {
    return document.getElementById(id);
}

function init() {
    var hpath = [];
    var tpath = [];
    hpath[0] = '<span class="hare"></span>';
    tpath[0] = '<span class="tortoise"></span>';
    for (let i = 0; i < 69; i++) {
        hpath.push('<span class="block"></span>');
        tpath.push('<span class="block"></span>');
    }
    display(tpath, hpath)
    $('display').innerText=''
}

function display(tpath, hpath) {
    $('tortoise').innerHTML = tpath.join('');
    $('hare').innerHTML = hpath.join('');
}

function showPosition(tpos, hpos, ouch) {
    var hpath = [];
    var tpath = [];
    for (let i = 0; i < 70; i++) {
        hpath.push('<span class="block"></span>');
        tpath.push('<span class="block"></span>');
    }


    for (let i = 0; i < ouch.length; i++) {
        hpath[ouch[i]]= '<span class="ouch"><br>OUCH!</span>'
    }
    hpath[hpos] = '<span class="hare"></span>';
    tpath[tpos] = '<span class="tortoise"></span>';
    display(tpath, hpath);
}
//from: https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function game(interval) {
    var tpos = 0;
    var hpos = 0;
    var ouch = [];
    var gameon = true;
    $('display').innerText = 'ON YOUR MARK, GET SET\n';
    const start = new Audio('start.mp3');
    const ouchsound = new Audio('ouch.mp3');
    const win = new Audio('win.mp3');
    const lost = new Audio('lost.mp3');
    start.play();
    await sleep(3500);
    $('display').innerText += 'BANG!!!\n';
    await sleep(200);
    $('display').innerText += 'AND THEY’RE OFF!!!';
    while (gameon) {
        await sleep(interval);
        var hmove = Math.floor(Math.random() * 10);
        var tmove = Math.floor(Math.random() * 10);
        tpos += tortoiserule[tmove];
        hpos += harerule[hmove];
        if (hpos < 0) {
            hpos = 0;
        }
        if (tpos < 0) {
            tpos = 0
        }

        showPosition(tpos, hpos, ouch);
        if (tpos === hpos) {
            ouch.push(hpos);
            ouchsound.play();
        }
        if (tpos >= 70 || hpos >= 70) {

            gameon = false;
        }
        console.log(hpos, tpos)

    }
    if (tpos >= 70 && hpos >= 70) {
        $('display').innerText = 'IT’S A TIE.'
    } else if (tpos > hpos) {
        $('display').innerText = 'TORTOISE WINS!!! YAY!!!';
        win.play();
    } else {
        $('display').innerText = 'HARE WINS. YUCK!';
        lost.play();
    }
}

init();
$('start').addEventListener('click', function () {
    game(parseInt($('interval').value))
});
$('reset').addEventListener('click', function () {
    init();
});