

export var converte_data = function(data, tem_hora = 0){
    if(tem_hora){
        return data.substr(0, 10).split('-').reverse().join('/')+' '+data.substr(11, 5);
    }else{
        return data.substr(0, 10).split('-').reverse().join('/');
    }
};

export var valida_cpf = function(cpf){
    var numeros, digitos, soma, i, resultado, digitos_iguais;
    digitos_iguais = 1;
    if (cpf.length < 11)
          return false;
    for (i = 0; i < cpf.length - 1; i++)
          if (cpf.charAt(i) != cpf.charAt(i + 1))
                {
                digitos_iguais = 0;
                break;
                }
    if (!digitos_iguais)
          {
          numeros = cpf.substring(0,9);
          digitos = cpf.substring(9);
          soma = 0;
          for (i = 10; i > 1; i--)
                soma += numeros.charAt(10 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(0))
                return false;
          numeros = cpf.substring(0,10);
          soma = 0;
          for (i = 11; i > 1; i--)
                soma += numeros.charAt(11 - i) * i;
          resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
          if (resultado != digitos.charAt(1))
                return false;
          return true;
          }
    else
          return false;
}

export var nome_sobrenome = function(str) {
      var arr = str.split(' ');
      var keep = arr[1][0].toUpperCase() != arr[1][0];
      return arr.slice(0, keep ? 3 : 2).join(' ');
    }
 
export var color = ['#0088FE', '#8884d8', '#82ca9d', '#FF8042', '#ff6666', '#FFBB28', '#66b266', '##8dd1e1', '#00C49F'];
