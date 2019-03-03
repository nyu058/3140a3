function $(id) {
    return document.getElementById(id);
}
function printLatinWord(words) {
    var tokenized = words.split(' ');

    var result=[];
    for (let word of tokenized){
        console.log(word[0]);
        var latin = word.substr(1, word.length)+word[0]+'ay';
        result.push(latin)

    }
    $('result').value+=result.join(' ')+'\n'
}

$('convert').addEventListener('click', function () {
   printLatinWord($('words').value)
});