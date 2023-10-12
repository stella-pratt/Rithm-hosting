import { menu_btns, mouse_move_updates, mouse_window } from "./global_functions.js";

let seat_hover = document.querySelector(".seat_hover");
let cursor = document.querySelector(".mouse_follow");
const SPACE_ROWS = 12;
const PRICES = { "1": 90, "2": 90, "3": 90, "4": 80, "5": 80, "6": 80, "7": 70, "8": 70, "9": 70 };



// define row names
const ROWS = ['just to make "A" have an index of 1', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ']

function getSeatInfo(event_element) {
    let id_str = event_element.id;
    // seat num
    let seat = id_str.split(/\D/g)[1];
    // row num
    let row = id_str.replace(/[0-9]/g, '');
    // section num
    let section = id_str.split(/\D/g)[0];
    // return the rows etc
    return { "section": section, "row": row, "seat": seat };
}


function mySplice(num_remove, array_remove) {
    // loop for each sumbmitted value
    for (let i = 0; i < num_remove.length; i++){
        // remove the elements from the array if they are in it
        if (array_remove.includes(num_remove[i])){
            array_remove.splice(array_remove.indexOf(num_remove[i]), 1);
        }
    }
    return array_remove;
}
let ticket_details = [[], []];
// update the tickets
function update_tickets(details) {
    // create a total cost
    let total_cost = 0;
    // remove all current tickets
    document.querySelectorAll(".ticket").forEach((ticket) => {ticket.remove()});
    // add the new tickets
    for (let i = 0; i < details.length; i++){
        //create main ticket div
        let ticket_div = document.createElement("div");
        ticket_div.classList.add("ticket");
        //add the number
        let ticket_num = document.createElement("div");
        ticket_num.classList.add("ticket_num");
        ticket_num.innerHTML = (i + 1).toString();
        ticket_div.appendChild(ticket_num);
        // add the info div
        let ticket_info = document.createElement("div");
        ticket_info.classList.add("ticket_info");
        ticket_div.appendChild(ticket_info);
        // set up ticket price variable
        let ticket_cost = "";
        // add the details
        // check if seat has been chosen
        if (details[i].length === 0){
            let select_seat = document.createElement("div");
            select_seat.classList.add("select_seat");
            select_seat.innerHTML = "Please select a seat";
            ticket_info.appendChild(select_seat);
            // set price to 0
            ticket_cost = "$00.00";
        } else {
            // create the seat info and add to info div
            let seat_section = document.createElement("div");
            seat_section.innerHTML = "Section: " + details[i][0];
            ticket_info.appendChild(seat_section);
            let seat_row = document.createElement("div");
            seat_row.innerHTML = "Row: " + details[i][1];
            ticket_info.appendChild(seat_row);
            let seat_num = document.createElement("div");
            seat_num.innerHTML = "Seat: " + details[i][2];
            ticket_info.appendChild(seat_num);
            // set ticket price
            let ticket_dollars = PRICES[details[i][0]];
            ticket_cost = "$" + ticket_dollars.toString() + ".00";
            total_cost += ticket_dollars;
        }
        // add the price
        let ticket_price = document.createElement("div");
        ticket_price.innerHTML = ticket_cost;
        ticket_div.appendChild(ticket_price);
        // add the remove button
        let ticket_remove = document.createElement("img");
        ticket_remove.src = "images/trash.png";
        ticket_remove.alt = "Remove Ticket";
        ticket_remove.classList.add("delete_ticket");
        ticket_div.appendChild(ticket_remove);
        // change border lefts colour
        if (details[i].length === 0){
            ticket_div.style.borderLeft = "0.4vw solid var(--bg_black)";
        } else if (details[i][0] === "2" || details[i][0] === "5" || details[i][0] === "8"){
            ticket_div.style.borderLeft = "0.4vw solid var(--site_pink)";
        } else {
            ticket_div.style.borderLeft = "0.4vw solid var(--site_purple)";
        }
        // add the ticket to the page
        document.querySelector(".tickets").appendChild(ticket_div);
    }
    // update the total cost
    document.querySelector(".total_cost").innerHTML = "$" + total_cost.toString() + ".00";
    // update count
    document.querySelector(".seat_count").innerHTML = ticket_details.length.toString();
}
update_tickets(ticket_details);




document.addEventListener("mousemove", function(e) {
    mouse_move_updates(e)
    // add delay because mouse follow function has delay
    setTimeout(()=>{
        // make seat hover follow cursor
        const cursor_info = cursor.getBoundingClientRect();
        seat_hover.style.left = cursor_info["left"] + (cursor_info["width"]/2) + "px";
        seat_hover.style.top = cursor_info["top"]+(cursor_info["height"]/2) + "px";
    }, 20)
    // show the popup
    if (document.querySelector(".seat:hover") != null){
        document.querySelector(".seat_hover").classList.add("seatpop_show");
        //change the elements to current hover
        seat_hover.children[2].children[1].innerHTML = getSeatInfo(e.target)["seat"];
        seat_hover.children[1].children[1].innerHTML = getSeatInfo(e.target)["row"];
        // set accessible or standard
        let seat_section = e.target.parentElement.classList;
        if (seat_section.contains("space")){
            seat_hover.children[3].children[1].innerHTML = "Accessible";
        } else if (seat_section.contains("standard")){
            seat_hover.children[3].children[1].innerHTML = "Standard";
        }
        // change section and price
        let section = getSeatInfo(e.target)["section"];
        seat_hover.children[0].children[1].innerHTML = section;
        seat_hover.children[4].children[1].innerHTML = "$" + PRICES[section] + ".00";

    } else {
         document.querySelector(".seat_hover").classList.remove("seatpop_show");
    }
});

// hide the mouse if not in the viewport
document.addEventListener("mouseleave", function () {
    mouse_window("leave");
})
document.addEventListener("mouseenter", function () {
    mouse_window("enter");
})

function center_section(section) {
    // reset the centering of the stage container
    stage_container.style.top = "0";
    stage_container.style.left = "0";
    // get distance from section to edge of .right_side
    let section_top = (parent_stage.getBoundingClientRect()["height"] - section.getBoundingClientRect()["height"])/2;
    let section_left = (parent_stage.getBoundingClientRect()["width"] - section.getBoundingClientRect()["width"])/2;
    // get distances to edge of stage container
    let stage_top = (section.getBoundingClientRect()["top"]-stage_container.getBoundingClientRect()["top"]);
    let stage_left = (section.getBoundingClientRect()["left"]-stage_container.getBoundingClientRect()["left"]);
    // transform the stage container to the new centered position
    stage_container.style.transform = `translate(${section_left - stage_left + "px"}, ${section_top - stage_top + "px"})`;
}

// center the stage container using top and left
let stage_container = document.querySelector(".stage_container");
let parent_stage = document.querySelector(".right_side");
// save for reuse later
let default_stage_top = (parent_stage.getBoundingClientRect()["height"] - stage_container.getBoundingClientRect()["height"])/2 + "px";
let default_stage_left = (parent_stage.getBoundingClientRect()["width"] - stage_container.getBoundingClientRect()["width"])/2 + "px";
stage_container.style.top = default_stage_top;
stage_container.style.left = default_stage_left;

// add a click checker to add buttons to elements
document.addEventListener("click", function(e) {
    menu_btns(e) // check if menu buttons clicked
    if (e.target.classList.contains("space") || e.target.classList.contains("standard")) {
        // when seat area clicked
        let section = e.target;
        const seats = section.querySelectorAll(".seat");
        //reset all section seats
        document.querySelectorAll(".seat_show").forEach((seat) => {seat.classList.remove("seat_show")});
        //reset all section colours
        document.querySelectorAll(".space").forEach((space) => {space.style.background = "var(--site_purple)";})
        document.querySelectorAll(".standard").forEach((standard) => {standard.style.background = "var(--site_pink)";})
        // fade section
        section.style.background = "var(--bg_black)";
        // show seats
        seats.forEach((seat) => {seat.classList.add("seat_show");})
        // zoom and center section
        stage_container.style.width = "175%";
        center_section(section)
    } else if (e.target.classList.contains("count_btn")){
        // add or subtract to the number of seats
        if (e.target.innerHTML === "-"){
            if (ticket_details.length > 0 && ticket_details[0].length > 0) {
                // remove the last ticket
                let seat_id_info = ticket_details.pop();
                // remove associated tick on seat
                // create seat id
                console.log(seat_id_info)
                let seat_remove_id = seat_id_info.join("");
                document.getElementById(seat_remove_id).children[0].remove();
            }
            // if 0 tickets remain add a dud
            if (ticket_details.length === 0) {
                // add the dud
                ticket_details = [[]]
            }
            update_tickets(ticket_details)
        } else if (e.target.innerHTML === "+"){
            // add to count
            if (ticket_details.length < 10){
                ticket_details.push([]);
                update_tickets(ticket_details);
            }

        }
    } else if (e.target.classList.contains("seat")){
        //check if seat is already selected
        if (e.target.children.length > 0) {
            // remove the tick
            e.target.children[0].remove();
            if (ticket_details.length > 1){
                // remove the matching ticket
                for (let i = 0; i < ticket_details.length; i++){
                    if (ticket_details[i][0] === getSeatInfo(e.target)["section"] && ticket_details[i][1] === getSeatInfo(e.target)["row"] && ticket_details[i][2] === getSeatInfo(e.target)["seat"]){
                        // remove the ticket
                        ticket_details.splice(i, 1);
                        break;
                    }
                }
            } else {
                // if only one left make it blank
                ticket_details = [[]]
            }
        } else {
            // add the ticket
            // check if any empty tickets
            if (ticket_details[ticket_details.length-1].length === 0){
                // loop to find first empty ticket detail
                for (let i = 0; i < ticket_details.length; i++){
                    // if ticket is empty add the clicked seat info
                    if (ticket_details[i].length === 0){
                        ticket_details[i] = Object.values(getSeatInfo(e.target));
                        // add the tick
                        let tick = document.createElement("img");
                        tick.src = "images/tick.png";
                        tick.alt = "Tick";
                        tick.className = ("tick");
                        e.target.appendChild(tick);
                        break;
                    }
                }
            } else {
                // add a new ticket if 10 tickets not reached
                if (ticket_details.length < 10){
                    ticket_details.push(Object.values(getSeatInfo(e.target)));
                    // add the tick
                    let tick = document.createElement("img");
                    tick.src = "images/tick.png";
                    tick.alt = "Tick";
                    tick.className = ("tick");
                    e.target.appendChild(tick);
                }

            }
        }
        // when seat clicked update the ticket details
        update_tickets(ticket_details);
    } else if (e.target.classList.contains("delete_ticket")) {
        if (ticket_details.length > 0 && ticket_details[0].length > 0) {
            // remove the ticket
            let seat_id_info = ticket_details.splice(e.target.parentElement.children[0].innerHTML - 1, 1);
            // remove associated tick on seat
            // create seat id
            let seat_remove_id = seat_id_info[0].join("");
            document.getElementById(seat_remove_id).children[0].remove();
        }
        // if 0 tickets remain add a dud
        if (ticket_details.length === 0) {
            // add the dud
            ticket_details = [[]]
        }
        // update the tickets
        update_tickets(ticket_details);
    } else if (e.target.classList.contains("checkout")){
        // open the popup if more than 0 tickets and all tickets selected
        if (ticket_details[0].length > 0) {
            // show pop up
            document.querySelector(".checkout_border").style.display = "flex";
            document.querySelector(".fade").style.opacity = "80%";
            document.querySelector(".fade").style.pointerEvents = "all";
            // remove empty list items
            let final_details = ticket_details.filter((seat) => seat.length > 1);
            final_details.forEach((seat) => {
                final_details[final_details.indexOf(seat)] = seat.join("")
            });
            // change the info on pop up
            document.getElementById("price").innerHTML = document.querySelector(".total_cost").innerHTML;
            document.querySelector(".ticket_total").innerHTML = document.querySelector(".seat_count").innerHTML;
            // add in the booked seats
            document.getElementById("seats_input").value = final_details;
        }
    } else if (e.target.classList.contains("fade") || e.target.classList.contains("cancel")){ // click off and canecl btn
        // close the popup
        document.querySelector(".checkout_border").style.display = "none";
        document.querySelector(".fade").style.opacity = "0%";
        document.querySelector(".fade").style.pointerEvents = "none";
    }
})


// accessible seat creation
const space = document.querySelectorAll(".space")
// keep track of which section for id
const id_sections = [1, 3, 4, 6, 7, 9];
let id_section = 0;
space.forEach((spacey) => {
    // fill the grid with circles
    for (let r = 0; r < SPACE_ROWS; r++) { // repeat for rows
        for (let c = 0; c < 10; c++) { // repeat for columns
            let seat = document.createElement("div");
            seat.classList.add("seat");
            seat.style.gridRow = (r + 1).toString();
            seat.style.gridColumn = (c + 1).toString();
            seat.id = id_sections[id_section] + ROWS[r + 1] + (c + 1);
            spacey.appendChild(seat);
        }
    }
    // add 1 for next section
    id_section += 1;
});
// standard seat creation
const standard = document.querySelectorAll(".standard");
let standard_sections = 2
standard.forEach((standardy) => {
    // fill the grid with circles
    for (let r = 0; r < 18; r++) { // repeat for rows
        for (let c = 0; c < 30; c++) { // repeat for columns
            let seat = document.createElement("div");
            seat.classList.add("seat");
            seat.classList.add("standard_seat")
            seat.style.gridRow = (r + 1).toString();
            seat.style.gridColumn = (c + 1).toString();
            seat.id = standard_sections + ROWS[r + 1] + (c + 1);
            standardy.appendChild(seat);
        }
    }
    standard_sections += 3;
});


//recieve the booked seats from node js
fetch("/bookings")
    // then so it happens after recieving
    .then(response => {
        if (response.ok) {
            return response.json();
        }
    }).then(data => { // assign the data to a variable
        if (data) {
            let keys = Object.keys(data);
            keys.forEach((key) => {
                data[key].forEach((taken_seat) => {
                    // grey out the seats needeed
                    let edit_seat = document.getElementById(taken_seat);
                    edit_seat.style.background = "#989898";
                    edit_seat.style.pointerEvents = "none";
                });
            });
        }
    }).catch(err => console.error(err));




