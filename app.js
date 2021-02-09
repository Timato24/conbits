const colorThief = new ColorThief();

function setBgColors() {  // finds dominant color of conflag and applies it to header and tab bgs. Called when page loads
    const flag = document.getElementById('flag')
    var bgColor = colorThief.getColor(flag, 5);  // getColor() function from Colorthief library
    document.getElementById('header').style.backgroundColor = "rgb" + "(" + bgColor + ")";  // sets header bg_color to the color returned by the getColor() funciton
    
    var bgColorSum = 0;
    for (var i=0; i < bgColor.length; i++) {  // adds all of the rgb values returned by the getColor() command to determine whether white or black text should be used
        bgColorSum = bgColorSum + bgColor[i];
    }
    if (bgColorSum >= 383) {  // 383 is the average rgb color sum rounded up
        document.getElementById('title').style.color = "black";
    }
    else {
        document.getElementById('title').style.color = "white";
    }


    var tabColor = [];
    for (var i=0; i < bgColor.length; i++) {  // subtracts 20 from each rgb value to get a darker color
        if (bgColor[i] >= 20) {
            tabColor[i] = bgColor[i] - 20;
        }
        else {
            tabColor[i] = 0;
        }
    }
    const tabButtons = document.getElementsByClassName('tab-button');
    Array.from(tabButtons).forEach(button => {
        button.style.backgroundColor = "rgb" + "(" + tabColor + ")";  // applies that color to all buttons first
    });

    var selectedTabColor = [];
    for (var i=0; i < bgColor.length; i++) {  // subtracts 35 from original color for selected-button
        if (bgColor[i] >= 35) {
            selectedTabColor[i] = bgColor[i] - 35;
        }
        else {
            selectedTabColor[i] = 0;
        }
    }
    document.getElementById('default-button').style.backgroundColor = "rgb" + "(" + selectedTabColor + ")";  // overwrites previous function for selected button and sets its own bg color


    var selectedTabColorSum = 0;
    for (var i=0; i < bgColor.length; i++) {  // sets text to be white or black for all buttons based on whether the darkest button is dark enough to have white text
        selectedTabColorSum = selectedTabColorSum + selectedTabColor[i];
    }
    if (selectedTabColorSum >= 383) {
        Array.from(tabButtons).forEach(button => {
            button.style.color = "black";
        });
    }
    else {
        Array.from(tabButtons).forEach(button => {
            button.style.color = "white";
        });
    }


    const tabs = document.querySelectorAll('[data-tab-target]');
    const tabContents = document.querySelectorAll('[data-tab-content]')

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = document.querySelector(tab.dataset.tabTarget);
            tabContents.forEach(tabContent => {
                tabContent.classList.remove('active');
            });
            target.classList.add('active');

            Array.from(tabButtons).forEach(button => {
                button.style.backgroundColor = "rgb" + "(" + tabColor + ")"; // applies neutral color to all tabs first
            });

            tab.querySelector('div').style.backgroundColor = "rgb" + "(" + selectedTabColor + ")"; // applies selected color to the tab that was clicked
        });
    });
}
