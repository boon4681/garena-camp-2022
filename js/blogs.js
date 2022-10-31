let newsbtn = document.getElementById("news-btn")
let eventbtn=document.getElementById("event-btn")
let news = document.getElementById("news")
let evento=document.getElementById("event")
let skateman=document.getElementById("skateman")

const pig = document.getElementById("piggy")
let positionX = 0;
let positionY = 0;


skateman.addEventListener("click",()=>{
    alert("สเกตบอย : ขอทางหน่อยครับสุดหล่อ บรื๊นๆๆๆๆ")
})
piggy.addEventListener("click",()=>{
    alert("เบค่อนคุง : อู๊ดๆ")
})
piggy.addEventListener("mouseover",()=>{
    positionY= Math.random()*800+200;
    positionX=Math.random()*800+200;
    piggy.style.transform=`translate(${positionX}px,${positionY}px)`
    piggy.style.transition="all 1s ease"
    }
)

eventbtn.addEventListener("click",()=>{
    news.style.display="none"
    evento.style.display="block"
    eventbtn.classList.add("underline")
    newsbtn.classList.remove("underline")
    
})

newsbtn.addEventListener("click",()=>{
    evento.style.display="none"
    news.style.display="block"
    newsbtn.classList.add("underline")
    eventbtn.classList.remove("underline")
})

