function filterProduct() {
    var input, filter, ul, a, i;
    input = document.getElementById('search');
    filter = input.value.toUpperCase();
    ul = document.getElementById('search-list');
    li = ul.getElementsByClassName('filled-item');

    if (filter === '') {
        ul.style.display = 'none';
    }
    else {
        ul.style.display = 'block';

        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName('li')[0];
            if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = '';
            } else {
                li[i].style.display = 'none';
            }
        }
    }

}
document.getElementById('search').addEventListener('keyup', filterProduct);
//menu scripts
function onMenuIconClick() {
    this.classList.toggle('menu-icon-active');
    document.getElementById('toolkit-menu').classList.toggle('menu-display');
}
var menuIcon = document.getElementById('menu-icon');
menuIcon.addEventListener('click', onMenuIconClick);

//sticky menu

window.onscroll = function(){onStick(); };

var navbar = document.getElementById("tool-wrapper");
var category = document.getElementById('category');
var sticky = navbar.offsetTop;
var catSticky = category.offsetTop;
var toolkitMenu = document.getElementById('toolkit-menu');
var searchList = document.getElementById('search-list');
var content = document.getElementsByTagName("main")[0];

function onStick(){
    if(window.pageYOffset >= sticky){
        
        navbar.classList.add("sticky");
        if(window.pageYOffset + 50 >= catSticky){
            category.classList.add("cat-sticky");
            content.style.paddingTop = "110px";
            toolkitMenu.style.top = "110px";
            searchList.style.top = "102px";
            
        }else{
            toolkitMenu.style.top = "50px";
            content.style.paddingTop = "50px";
            category.classList.remove("cat-sticky");
            searchList.style.top = "42px";
        } 
    }else{
        navbar.classList.remove("sticky");
        content.style.paddingTop = "0";
    }
    

}


//menu-tabs

var deviceLinks = document.getElementsByClassName("device-link");

function changeDeviceLinkTab(evt, tabId) {
    var linkButtons = document.getElementsByClassName("device-link"), i;
    for (i = 0; i < linkButtons.length; i++)
        linkButtons[i].className = linkButtons[i].className.replace(" active-device-link", "");
   
    evt.currentTarget.className += " active-device-link";

    var tabs = document.getElementsByClassName("device-link-content");
    for (i = 0; i < tabs.length; i++)
        tabs[i].style.display = 'none';

    document.getElementById(tabId).style.display = "block";
}


deviceLinks[0].addEventListener("click", function (event) { changeDeviceLinkTab(event, "mobile-link-content") });
deviceLinks[1].addEventListener("click", function (event) { changeDeviceLinkTab(event, "laptop-link-content") });
deviceLinks[2].addEventListener("click", function (event) { changeDeviceLinkTab(event, "tablet-link-content") });
deviceLinks[3].addEventListener("click", function (event) { changeDeviceLinkTab(event, "accessory-component-link-content") });

deviceLinks[0].click();


//slides script

var slider = document.getElementById('ad-slider');
adItems = document.getElementById('slides');
pre = document.getElementById('pre');
next = document.getElementById('next');
t_slides = adItems.getElementsByClassName('slide');
ad_dots = document.getElementById("dot-container").getElementsByTagName("span");
var slideSize;

const sliderStyle = getComputedStyle(document.querySelector("#ad-slider"));

for (var i = 0; i < t_slides.length; i++)
    t_slides[i].style.width = sliderStyle.width;

adItems.style.left = '-' + sliderStyle.width;




window.addEventListener("resize", function () {
    for (var i = 0; i < t_slides.length; i++)
        t_slides[i].style.width = sliderStyle.width;
    let size = t_slides[0].style.width;
    slideSize = parseInt(size.substring(0, size.length - 2));
    adItems.style.left = '-' + sliderStyle.width;

})


function slide(wrapper, items, prev, next, dots = null) {
    slideSize = items.getElementsByClassName('slide')[0].offsetWidth;
    var posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        threshold = 100,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        allowShift = true;

    //Clone first and last slide

    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);

    wrapper.classList.add('loaded');

    //mouse event
    items.onmousedown = dragStart;

    //Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);


    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });
    // setInterval(()=>shiftSlide(1) , 8000);

    items.addEventListener('transitionend', checkIndex);

    //dots event
    if (dots !== null) {
        for (var i = 0; i < dots.length; i++) {
            dots[i].addEventListener('click', (event) => {
                let j, k;
                for (j = 0; j < dots.length; j++) {
                    if (dots[j] !== event.currentTarget)
                        dots[j].className = dots[j].className.replace(" dot-active", "");
                    else k = j;
                }
                if (k == index);
                else {
                    
                    event.currentTarget.className += " dot-active";
                    items.style.left = -slideSize * (k + 1) + "px";
                    index = k;
                }
            });
        }

        dots[0].className += " dot-active";
    }



    function dragStart(e) {
        e = e || window.event;
        // e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }

    }

    function dragAction(e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;

        }
        items.style.left = (items.offsetLeft - posX2) + "px";

    }

    function dragEnd(e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }

        document.onmouseup = null;
        document.onmousemove = null;
    }


    function shiftSlide(dir, action) {
        items.classList.add('shifting');
        if (allowShift) {
            if (!action) { posInitial = items.offsetLeft; }

            if (dir == 1) {
                items.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                items.style.left = (posInitial + slideSize) + "px";
                index--;
            }


        };

        allowShift = false;
    }

    function checkIndex() {
        items.classList.remove('shifting');

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
        if (dots !== null) {
            for (let j = 0; j < dots.length; j++) {
                dots[j].className = dots[j].className.replace(" dot-active", "");
            }
            dots[index].className += " dot-active"; for (let j = 0; j < dots.length; j++) {
                dots[j].className = dots[j].className.replace(" dot-active", "");
            }
            dots[index].className += " dot-active";
        }

    }
}

slide(slider, adItems, prev, next, ad_dots);

function slideItem(slider ,items){
    let posX1 = 0, posX2 = 0;
    let itm = items.getElementsByClassName("slide");
    let lastone = itm[itm.length - 1].offsetLeft + itm[itm.length - 1].offsetWidth; 
    let left = 0;
    items.onmousedown = dragStart;

    //Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    function dragStart(e){
        e = e || window.event;
        // e.preventDefault();
        if(e.type == 'touchstart'){
            posX1 = e.touches[0].clientX;
        }else{
            posX1 = e.clientX;
        }

        document.onmouseup = dragEnd;
        document.onmousemove = dragAction;
    }

    function dragEnd(e){
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function dragAction(e){
        e = e || window.event;
        if(e.type == 'touchmove'){
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        }else{
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        if(slider.offsetWidth < lastone){
            items.style.left = (items.offsetLeft - posX2) + 'px';
            left = items.offsetLeft - posX2;
            if(left > 0) items.style.left = `0px`;
            if(lastone + left < slider.offsetWidth) items.style.left = `${slider.offsetWidth - lastone}px`;
        }
        

    }
}
pItem = document.getElementById("item-slides");
pSlider = document.getElementById("item-slider");
slideItem(pSlider, pItem);
brandFilter = document.getElementById("brand-filter");
brands = document.getElementById("brands");
slideItem(brandFilter, brands);

brandList = brands.getElementsByClassName("slide");

for(let i = 0 ; i< brandList.length; i++){
    brandList[i].addEventListener("click", function (){
        this.classList.toggle("check");
    });
    brandList[i].addEventListener("tou", function (){
        this.classList.toggle("check");
    });
}
