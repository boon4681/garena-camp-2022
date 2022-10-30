
fetch("https://gamertocoder.garena.co.th/api/minigames")
    .then((response) => {
        if (response.status !== 200) {
            return response.status;
        }
        return response.json();
    })
    .then((data) => {
        if (typeof data == "number") {
            alert(data);
        } else {
            for (let i = 0; i < data.length; i++) {
                const currentData = data[i];
                const newListItem = document.createElement("li");
                newListItem.classList.add("minigame-card");
                newListItem.id = `${currentData.no}`
                const genre_array = currentData.genre;
                let genre_string = genre_array[0];
                if (genre_array.length > 1) {
                    for (let j = 1; j < genre_array.length; j++) {
                        genre_string = genre_string + ", " + genre_array[j];
                    }
                }
                const html =

                    '<div class="name " onclick="changeName(' + currentData.name + ')">' +
                    currentData.name +
                    '</div>' +
                    '<div>'+
                    '<img class="responsive-img" src="' + currentData.icon + '" alt="minigame-icon"/>' +
                    '</div>'+
                    '<div class="type">ประเภท: ' + genre_string + '</div>' +
                    '<div class="detail">' + currentData.description + '</div>';
                //'<div class="link-button"><a href="https://blockmango.garena.com/mini_games/index/en/" >ดูเพิ่มเติม</a></div>';
                html.trim();
                newListItem.innerHTML = html;
                document.getElementById("list").appendChild(newListItem);
            }
        }
        let card = document.querySelectorAll(".minigame-card")
        card.forEach(item => {
            item.addEventListener("click", (event) => {
                let ele;
                console.log(event.target.className)
                if (event.target.className==="minigame-card"){
                    ele = event.target
                    
                }
                else{
                    ele=event.target.parentElement
                }
            
                for (let i = 0; i < data.length; i++) {
                    let current = data[i];
                    if (current.no == ele.id) {
                        for (let i = 0; i < current.images.length; i++) {
                            let modal =
                                `<img class="resize"src="${current.images[i]}">`;
                            document.getElementById("show-modal").insertAdjacentHTML('beforeend',modal)
                        }
                    }
                }
            })
        })

    });


