var arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var arr3 = ['a', 'b', 'c', 'd'];
var arr4 = ['A', 'B', 'C', 'D'];
var arr5 = ['!', '@', '#', '$'];

document.getElementById('param-1').oninput = function () {
    // ползунок - длина массива
    document.getElementById('password-length').innerHTML = this.value;
    
}
generatePass(); // запуск при старте
document.querySelectorAll('.generate_pass').forEach(function (){
    this.oninput = generatePass;  // онлайн при изменении собітия на инпут
})
document.getElementById('generator').onclick = generatePass;

function generatePass() {
    var result = [];
    if (document.getElementById('param-2').checked) {
        // включены ли цифры
        result = result.concat(arr2);
    }
    if (document.getElementById('param-3').checked) {
        // включены ли строчные символы
        result = result.concat(arr3);
    }
    if (document.getElementById('param-4').checked) {
        // включены ли пропись
        result = result.concat(arr4);
    }
    if (document.getElementById('param-5').checked) {
        // включены ли спецсимволы
        result = result.concat(arr5);
    }
    result.sort(compareRandom); // перемешиваю рез.массив
    //console.log(result);
    document.getElementById('out').innerHTML = '';
    for (var k = 0; k < 6; k++) {
        var pass = ''; // будущий пароль
        var passLength = parseInt(document.getElementById('param-1').value); // длина пароля
        for (var i = 0; i < passLength; i++) {
            // цикл по длине пароля
            // выбираю случайное значение из массива result
            pass += result[randomInteger(0, result.length - 1)];
        }
        //console.log(pass);
        document.getElementById('out').innerHTML += '<p>' + pass + '</p>';
    }
}

function compareRandom(a, b) {
    return Math.random() - 0.5;
}

function randomInteger(min, max) {
    var rand = min - 0.5 + Math.random() * (max - min + 1)
    rand = Math.round(rand);
    return rand;
}
