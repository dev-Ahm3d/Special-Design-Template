/* General Functions */ 
let gotoSection = (elements)=>{
    elements.forEach(el=>{
        el.addEventListener('click' , e =>{
            e.preventDefault();     // عشان اوقف عمل اللينكات
            document.querySelector("."+e.target.dataset.section).scrollIntoView({     // دى ميثود جديدة اتضافت 
                behavior : 'smooth'     // بقوله خلى السكرول سموث
            })
        }) 
    })
}
/* General Functions */ 

/* start landing page */
gotoSection(document.querySelectorAll('.links a')) ; 
/* end landing page */

/* start settings box */

// restet all options
document.querySelector('.reset-options').onclick = ()=>{
    localStorage.clear();
    window.location.reload();
}

// toggle and spin
let settingsBox = document.querySelector('.settings-box') ; 
let toggler = document.querySelector('.settings-toggle'); 
let gear  = document.querySelector('.fa-cog'); 
toggler.onclick = ()=>{
    gear.classList.toggle('fa-spin')
    settingsBox.classList.toggle('open');
}


// change main color and store it in localStorage
let colors = document.querySelectorAll('.colors li') ; 
colors.forEach( li =>{

    // get main color from localStorage
    let storedColor = localStorage.getItem('main-color') ;  
    if(storedColor) document.documentElement.style.setProperty('--main-color' , storedColor )


    // change active class if there is a color in localStorage
    li.parentElement.childNodes.forEach(ch =>{
        if(ch.classList) ch.classList.remove('active-color');
    })
    // هعمل هنا سيت تايم اوت بزيرو عشان اخلى اللى جاى يتنفذ بعد الامر اللى فوق مش اكتر لانه بيتنفذ قبله
    setTimeout(()=>{
        if(localStorage.getItem('main-color') && li.style.backgroundColor == localStorage.getItem('main-color')){
            li.classList.add('active-color')
        }else if(!localStorage.getItem('main-color')){
            colors[0].classList.add('active-color')
        }
    },0)


    // onclick event
    li.onclick = ()=>{
        document.documentElement.style.setProperty('--main-color' , li.style.backgroundColor) ; // documentElement ==> :root
        li.parentElement.childNodes.forEach(ch =>{
            if(ch.classList) ch.classList.remove('active-color');
            //console.log('here')
        })
        li.classList.add('active-color'); 
        localStorage.setItem('main-color' , li.style.backgroundColor ) ; 
    }
})

/* end settings box */


/* start changing background randomly */
let landingPage = document.querySelector('.landing-page') ; 
let imagesArray = ['0.jpg' , '1.jpg' , '2.jpg' , '3.jpg'] ; 
let randomNumber ; 
let interval ;
let userChoice = true ;  
let choiceButtons = document.querySelectorAll('.choices') ;
let chooseButton = document.querySelector('.choose') ; 

// show images and change active class 
chooseButton.onclick = ()=>{
    document.querySelector('.backImages').style.display = 'flex' ;
    chooseButton.classList.add('active'); 
    chooseButton.parentElement.children[0].classList.remove('active'); 
}

// user chooses if he wants random images or one he chooses
choiceButtons.forEach(myChoice =>{
    myChoice.onclick = ()=>{
        if(myChoice.dataset.randback == 'yes'){
            userChoice = true ;
            interval();
            myChoice.classList.add('active');
            myChoice.parentElement.children[1].classList.remove('active'); 
            document.querySelector('.backImages').style.display = 'none' ; 
            localStorage.removeItem('selectedImage')
        }else{
            userChoice = false ; 
            interval();    
            document.querySelector('.landing-page').style.background = 'url("' +myChoice.getAttribute('src')  +'")' ;
            myChoice.parentElement.childNodes.forEach(el =>{
                if(el.classList) el.classList.remove('active');
            })
            myChoice.classList.add('active');
            localStorage.setItem('selectedImage' , myChoice.getAttribute('src'));
        }
    }
})


// check in localStorage if user selected an image before 
if(localStorage.getItem('selectedImage')){
    let mySrc = localStorage.getItem('selectedImage') ;
    document.querySelector('.landing-page').style.background = 'url("' +mySrc +'")' ;
    let myDiv = document.querySelector('.choice');
    myDiv.children[0].classList.remove('active');
    myDiv.children[1].classList.add('active');
    document.querySelector('.backImages').style.visibility = 'visible' ; 
    let myImages = document.querySelectorAll('.backImages img');
    myImages.forEach(el =>{
        if(el.getAttribute('src')==mySrc) el.classList.add('active')
    })
    userChoice = false ; 
    setTimeout(()=>{
        interval();
    },0)
}

// the function change between images or clear the interval according to userChoise variable
interval = ()=>{
    setInterval(() => {
        if(userChoice){
            randomNumber  = Math.floor(Math.random()*imagesArray.length) ; 
            landingPage.style.background = `url('images/${randomNumber}.jpg')`
        }else clearInterval(interval) ;
    }, 5000);
}
interval();
/* end changing background randomly */

/* start our skills */  
let ourSkillsSection = document.querySelector('.our-skills') ; 
window.onscroll = ()=>{
    if(window.pageYOffset > (ourSkillsSection.offsetTop + ourSkillsSection.offsetHeight - window.innerHeight) ){
        document.querySelectorAll('.skill-progress span').forEach(el =>{
            el.style.width = el.dataset.progress ; 
        })
    }
}
/* end our skills*/

/* start  gallery  */
let images = document.querySelectorAll('.gallery .images img'); 
images.forEach(el =>{
    el.onclick = () => {
        let overlay = document.createElement('div') ; 
        overlay.className = 'popup-up-overlay' ;        //adding class
        document.body.appendChild(overlay);

        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box' ; 
        overlay.appendChild(popupBox);

        let popupImg = document.createElement('img') ; 
        popupImg.src = el.getAttribute('src') ; 
        popupImg.className = 'popup-img' ; 
        popupBox.appendChild(popupImg);

        let closeSpan = document.createElement('span');
        closeSpan.textContent = 'X' ; 
        closeSpan.className = 'close-span' ;
        popupBox.appendChild(closeSpan) ; 

        closeSpan.onclick = ()=>{
            overlay.remove();
        }
        window.addEventListener('keyup' , e =>{
            if(e.code == 'Escape') overlay.remove();
        })
    }
})
/* end gallery */

/* start bullets */
gotoSection(document.querySelectorAll('.bullet')) ; 
/* end bullets */


/* start toggled menu */
let links = document.querySelector('.links');
let toggledMenuButton = document.querySelector('.header-area .links-container button');

toggledMenuButton.onclick = (e)=>{
    e.stopPropagation();
    toggledMenuButton.classList.toggle('menu-active')
    links.classList.toggle('open')
}
links.onclick = (e)=>{
    e.stopPropagation();
}

document.addEventListener('click' , (e)=>{
    if(e.target !== links && e.target !== toggledMenuButton){
        links.classList.remove('open');
        toggledMenuButton.classList.remove('menu-active')
    }
    // لو مكنتش عملت خطوة ال ستوب بروباجيشن فوق .. كان هييجى هنا يفتكر ان اى عنصر جوا المينيو مش تبعها
})
/* end toggled menu */