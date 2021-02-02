const colorThief = new ColorThief();

function setHeaderColor() {  // finds dominant color of conflag and applies it to header bg
    var flag = document.getElementById("flag")
    var bg_color = colorThief.getColor(flag, 5);  // getColor() function... no idea how it works
    console.log(bg_color);
    document.getElementById("header").style.backgroundColor = "rgb" + "(" + bg_color + ")";  // sets header bg_color to the color returned by the getColor() funciton
}
