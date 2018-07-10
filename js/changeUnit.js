function isName(str) {
    var a = str.charCodeAt(0);
    if (a >= 65 && a <= 90 || a >= 97 && a <= 122) return true;
    return false;
}

function isIndexStart(str) {
    var a = str.charCodeAt(0);
    if (a == '94') return true;
    return false;
}

function isNumber(str) {
    var a = str.charCodeAt(0);
    if (a >= 48 && a <= 57 || a  == 45) return true;
    return false;
}


function changeUnit(str) {
    
    if(str == null) return '';
    
    var html = '';
    for(var z=0;z<str.length;z++){
        if(isName(str[z])){
            html += str[z]; 
        }else if(isIndexStart(str[z])){
            html +='';
        }else if(isNumber(str[z])){
            html +='<sup>' + str[z] + '</sup>';
        }
    }
    

    return html;
}
