let piggy = document.getElementById("piggy")
let positionX;
let positionY
let newsbtn = document.getElementById("news-btn")
let eventbtn=document.getElementById("event-btn")
let news = document.getElementById("news")
let Event=document.getElementById("event")
let skateman=document.getElementById("skateman")
let bunny=document.getElementById("run")
let superstar=document.getElementById("superstar")
let scale=1
let mascos=document.getElementById("mascos")

bunny.addEventListener("click",()=>{
    alert("น้องบันนี่ : ห้องแห่งความลับสนุกสนุดๆเลย")
})
mascos.addEventListener("click",()=>{
    alert("ไดโนซอร์แมน : (ฟิ้ววววว.....)")
})
superstar.addEventListener("click",()=>{
    alert("ซุปเปอร์สตาร์ : ยินดีต้อนรับสู่ห้องแห่งความลับ หวังว่าคุณจะสนุกกับเว็บไซต์นะ")
})
skateman.addEventListener("click",()=>{
    alert("สเกตบอย : ขอทางหน่อยครับสุดหล่อ บรื๊นๆๆๆๆ")
})
piggy.addEventListener("click",()=>{
    alert("พิกกี้ : อู๊ดๆ")
})

setInterval(function () {
    positionY= Math.random()*800+200;
    positionX=Math.random()*800+200;
    bunny.style.transform=`translate(${positionX}px,${positionY}px)`
    bunny.style.transition="all 1s ease"
}, 1500);

setInterval(function () {
    positionY= Math.random()*800+200;
    positionX=Math.random()*800+200;
    piggy.style.transform=`translate(${positionX}px,${positionY}px)`
    piggy.style.transition="all 1s ease"
}, 1000);