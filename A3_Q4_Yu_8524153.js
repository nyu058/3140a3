
//return array of prime numbers less than or equal to num
function primeBelow(num) {
    var arr = [];
    var result=[];
    for (let i = 0; i <= num; i++) {
        arr[i] = 1;
    }
    arr[0] = 0;
    arr[1] = 0;
    for (let i = 2; i <= num; i++) {
        if (arr[i] === 1) {
            for (let j = i + 1; j <= num; j++) {
                if (j % i === 0) {
                    arr[j] = 0;
                }
            }
        }
    }
    for (let i=1; i<arr.length; i++) {
        if (arr[i] === 1) {
            result.push(i)
        }
    }
    return result;
}

function $(id) {
    return document.getElementById(id);
}

$('run').addEventListener('click', function () {

   $('result').innerText=primeBelow(1000).join(', ');
});