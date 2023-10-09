import {menu_btns, mouse_move_updates, mouse_window} from "./global_functions.js";

let seat_hover = document.querySelector(".seat_hover");
let cursor = document.querySelector(".mouse_follow");
let SPACE_ROWS = 12;
let PRICES = {"1": 90, "2": 90, "3": 90, "4": 80, "5": 80, "6": 80, "7": 70, "8": 70, "9": 70};


// node testing
fs.readFile("./seats.json", 'utf8', function readFileCallback(err, data) {
    if (err) {
        console.log(err);
    } else {
        fs.writeFile("./seats.json", JSON.stringify("test"), 'utf8', err => {
        if (err) throw err;
            console.log('File has been saved!');
      });
    }
});



// define row names
const ROWS = ['just to make "A" have an index of 1', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'AA', 'AB', 'AC', 'AD', 'AE', 'AF', 'AG', 'AH', 'AI', 'AJ', 'AK', 'AL', 'AM', 'AN', 'AO', 'AP', 'AQ', 'AR', 'AS', 'AT', 'AU', 'AV', 'AW', 'AX', 'AY', 'AZ']

function getSeatInfo(event_element) {
    // seat num
    let seat = event_element.style.gridColumn.replace(/\D/g, '')
    // row num
    let row = ROWS[event_element.style.gridRow.replace(/\D/g, '')]
    // section num
    let seat_section = event_element.parentElement.classList;
    let sections = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];
    // keep 3 sections based on sect
    if (seat_section.contains("sect1")){
        sections = sections.splice(0,3);
    } else if (seat_section.contains("sect2")){
        sections = sections.splice(3,3);
    } else if (seat_section.contains("sect3")){
        sections = sections.splice(6,3);
    }
    // remove the sections that seat cannot be in
    if (seat_section.contains("standard")){
        sections = mySplice(["1", "3", "4", "6", "7", "9"], sections);
    } else {
        // if accessible seat
        sections = mySplice(["2", "5", "8"], sections);
        if (seat_section.contains("left_space")){
            // remove right sections
            sections = mySplice(["3", "6", "9"], sections);
        } else if (seat_section.contains("right_space")){
            // remove left sections
            sections = mySplice(["1", "4", "7"], sections);
        }
    }
    return {"section": sections[0], "row": row, "seat": seat};
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
            //check if 1 can be subtracted
            if (ticket_details.length > 1){
                ticket_details.pop();
                update_tickets(ticket_details);
            }
        } else if (e.target.innerHTML === "+"){
            // add to count
            if (ticket_details.length < 10){
                ticket_details.push([]);
                update_tickets(ticket_details);
            }

        }
    } else if (e.target.classList.contains("seat")){
        //check if seat is already selected
        if (e.target.children.length > 0){
            // remove the tick if more than 1 remaining
            if (ticket_details.length > 1){
                e.target.children[0].remove();
                // remove the ticket
                // find the matching index
                for (let i = 0; i < ticket_details.length; i++){
                    if (ticket_details[i][0] === getSeatInfo(e.target)["section"] && ticket_details[i][1] === getSeatInfo(e.target)["row"] && ticket_details[i][2] === getSeatInfo(e.target)["seat"]){
                        // remove the ticket
                        ticket_details.splice(i, 1);
                        break;
                    }
                }
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
    } else if (e.target.classList.contains("delete_ticket")){
        // check to see how many tickets left
        if (ticket_details.length > 1) {
            // remove the ticket
            ticket_details.splice(e.target.parentElement.children[0].innerHTML - 1, 1);
            // update the tickets
            update_tickets(ticket_details);
        }
    } else if (e.target.classList.contains("checkout")){
        // open the popup if more than 0 tickets and all tickets selected
        if (ticket_details[0].length > 0 && ticket_details[-1] !== []){
            // show pop up
            document.querySelector(".checkout_border").style.display = "flex";
            document.querySelector(".fade").style.opacity = "80%";
            document.querySelector(".fade").style.pointerEvents = "all";
            // change the info on pop up
            document.getElementById("price").innerHTML = document.querySelector(".total_cost").innerHTML;
            document.querySelector(".ticket_total").innerHTML = document.querySelector(".seat_count").innerHTML;
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
space.forEach((spacey) => {
    // fill the grid with circles
    for (let r = 0; r < SPACE_ROWS; r++) { // repeat for rows
        for (let c = 0; c < 10; c++) { // repeat for columns
            let seat = document.createElement("div");
            seat.classList.add("seat");
            seat.style.gridRow = (r + 1).toString();
            seat.style.gridColumn = (c + 1).toString();
            spacey.appendChild(seat);
        }
    }
});
// standard seat creation
const standard = document.querySelectorAll(".standard");
standard.forEach((standardy) => {
    // fill the grid with circles
    for (let r = 0; r < 18; r++) { // repeat for rows
        for (let c = 0; c < 30; c++) { // repeat for columns
            let seat = document.createElement("div");
            seat.classList.add("seat");
            seat.classList.add("standard_seat")
            seat.style.gridRow = (r + 1).toString();
            seat.style.gridColumn = (c + 1).toString();
            standardy.appendChild(seat);
        }
    }
});



