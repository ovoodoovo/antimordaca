
let slots = [];

const gerarCpf = function () {
    const n1 = aleatorio(), n2 = aleatorio(), n3 = aleatorio(), d1 = dig(n1, n2, n3);
    return "" + n1 + n2 + n3 + d1 + dig(n1, n2, n3, d1);
}

const dig = function (n1, n2, n3, n4) { 
    let nums = n1.split("").concat(n2.split(""), n3.split("")), x = 0;    
    if (n4) nums[9] = n4;
    for (let i = (n4 ? 11:10), j = 0; i >= 2; i--, j++) x += parseInt(nums[j]) * i;
    return (y = x % 11) < 2 ? 0 : 11 - (y = x % 11); 
}

const aleatorio = function () {
    return ("" + Math.floor(Math.random() * 999)).padStart(3, '0'); 
}

const sortear = function(cpf) {    
    // isolar somente o número
    const numCpf = cpf.match(/\d/g).join("");

    for (let i = 0; i < 10000000; i++)
    {
        let points = 0;
        let novoCpf = gerarCpf();
        for (let j = 0; j <= 10; j++) {
            // número igual, acrescenta 1 ponto
            if (numCpf[j] === novoCpf[j])
            {
                points++;
            }
            // 6 (seis) e 3 (três) soam semelhantes
            else if (numCpf[j] === "6" && novoCpf[j] === "3" 
                    || numCpf[j] === "3" && novoCpf[j] === "6")
            {
                points += 0.9;
            }
            // menos pontos para números distantes
            else
            {
                points += Math.abs(parseInt(numCpf[j]) - parseInt(novoCpf[j])) * 0.01;
            }
        }

        for (let slot = 0; slot < 10; slot++) {
            if (slots[slot] === undefined || slots[slot].points < points)
            {
                slots[slot] = {
                    points: points,
                    cpf: novoCpf
                };
                break;
            }
        }
    }

    return slots;
}

const listarCpfs = function() {
    const cpf = $("#cpf").val();
    const result = sortear(cpf);

    const lstResult = $("#resultados");

    $(this).prop("disable", true);

    lstResult.empty();

    result.forEach(function(item) {
        lstResult.append('<li>' + item.cpf  + ' - ' + item.points.toFixed(2) + ' pontos</li>');
    });

    $(this).prop("disable", false);
}

const limparCpfs = function() {
    if (confirm("Tem certeza que deseja limpar os resultados já encontrados?"))
    {
        slots = [];
        $("#resultados").empty();
    }
}
