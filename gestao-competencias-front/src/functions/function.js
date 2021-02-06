import { FaMarsDouble } from "react-icons/fa";

export var converte_data = function(data, tem_hora = 0){
    if(tem_hora){
        return data.substr(0, 10).split('-').reverse().join('/')+' '+data.substr(11, 5);
    }else{
        return data.substr(0, 10).split('-').reverse().join('/');
    }
};
