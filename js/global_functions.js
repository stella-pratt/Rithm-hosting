export function menu_btns(e) {
    if (e.target.classList.contains("menu_click_detect")){
        // if the menu button is clicked, toggle the menu
        document.querySelector(".nav_icon").classList.toggle("open")
        let drops = document.querySelectorAll(".menu_dropdown");
        drops.forEach((drop) => {
            drop.classList.toggle("open");
        })
    } else if (e.target.classList.contains("menu_dropdown") || e.target.classList.contains("menu_dropdown_img")){
        // using the source from the image inside the dropdown or the image, log the dropdown name
        let new_page = ""
        if (e.target.classList.contains("menu_dropdown_img")){
            // get the button if img clicked
            new_page = e.target.src.split("/").pop().split(".")[0]
        } else if (e.target.classList.contains("menu_dropdown")){
            // get the button if button clicked
            new_page = e.target.querySelector("img").src.split("/").pop().split(".")[0]
        }
        // change the page
        window.location.href = new_page + ".html"
    }
}

export function mouse_move_updates(e) {
    // add custom cursor
    let circle = document.querySelector(".mouse_follow");

    // change cursor to hover style
    if (document.querySelector(".artist_name:hover") || document.querySelector(".artist_slide_faded:hover") || document.querySelector(".checkout:hover") || document.querySelector(".cancel:hover") != null) {
        circle.classList.add("mouse_follow_hover");
    } else if (document.querySelector(".menu_click_detect:hover") || document.querySelector(".menu_dropdown:hover") != null){
        circle.classList.add("mouse_follow_hover2");
    } else {
        circle.classList.remove("mouse_follow_hover");
        circle.classList.remove("mouse_follow_hover2");
    }
    setTimeout(() => {
        // update the circles location with delay for smoothing.
        circle.style.left = e.clientX - circle.offsetWidth/2 + "px";
        circle.style.top = e.clientY - circle.offsetHeight/2 + "px";
    }, 20)

}

export function mouse_window(type) {
    if (type === "enter"){
        document.querySelector(".mouse_follow").style.opacity = "100";
    } else if (type === "leave") {
        document.querySelector(".mouse_follow").style.opacity = "0";
    }
}
