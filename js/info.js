import {menu_btns, mouse_move_updates, mouse_window} from "./global_functions.js";

document.addEventListener("mousemove", function(e) {
    //
    mouse_move_updates(e)
});

// add a click checker to add buttons to elements
document.addEventListener("click", function(e) {
    menu_btns(e)
})

document.addEventListener("mouseleave", function () {
    mouse_window("leave");
})
document.addEventListener("mouseenter", function () {
    mouse_window("enter");
})
