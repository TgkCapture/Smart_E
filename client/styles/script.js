function _(id){
    return document.getElementById(id);
}

function Popup(id, num){
    if(num == 0){
        _(id).style.opacity = 1;
        _(id).style.visibility = "visible";
    }
    else{
        _(id).style.opacity = 0;
        _(id).style.visibility = "hidden";
    }
}

function DropDown(id, blur, num){
    if(num == 0){
        _(id).style.opacity = 1;
        _(id).style.visibility = "visible";
        _(id).style.transform = "translateY(40px)";
        _(blur).style.opacity = 1;
        _(blur).style.visibility = "visible";
    }
    else{
        _(id).style.opacity = 0;
        _(id).style.visibility = "hidden";
        _(id).style.transform = "translateY(20px)";
        _(blur).style.opacity = 0;
        _(blur).style.visibility = "hidden";
    }
}