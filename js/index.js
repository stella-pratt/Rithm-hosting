import {menu_btns, mouse_move_updates, mouse_window} from "./global_functions.js";

// random number gen with min and max parameters
function GenerateRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function change_artist(curSlide) {
    //move all the elements to their new location
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${(index - curSlide) * 100}%)`;
        images_slide[index].style.transform = `translateX(${(index - curSlide-1) * 100}%)`;
        desc_slides[index].style.transform = `translateX(${(index - curSlide-1) * 100}%)`;
        // change the look of the words if not the central one
        if (slide.style.transform === "translateX(100%)"){
            slide.classList.remove("artist_slide_faded");
        } else {
            slide.classList.add("artist_slide_faded");
        }
    });
}

document.addEventListener("mouseleave", function () {
    mouse_window("leave");
})
document.addEventListener("mouseenter", function () {
    mouse_window("enter");
})



// define all variable and constants
let site_pink = "#ff0090"
let site_purple = "#c113f1"
let num_circles = 15
let circ_diameter;
let circ_x;
let circ_y;
let grad_angle;
let grad_percent;
let vh_diameter;
let MAX_CIRCLE_DIAMETER = window.innerWidth/4;
let MIN_CIRCLE_DIAMETER = window.innerWidth/15;
const circles = []
const circle_heights = []
let MAX_SPEED = 5
let MIN_SPEED = 1.1
let SHADOW_MULT = 50


const ARTIST_INFO = {
    tame: ["TAME IMPALA", "Tame Impala (Kevin Parker) has officially released his fourth studio album, The Slow Rush. It was recorded between Los Angeles and Parker’s studio in his hometown of Fremantle, Australia. The twelve tracks were written, recorded, produced and mixed by Parker. The Slow Rush is Parker’s deep dive into the oceans of time, conjuring the feeling of a lifetime in a lightning bolt, of major milestones whizzing by while you’re looking at your phone, it’s a paean to creation and destruction and the unending cycle of life."],
    weekend: ["THE WEEKND", "The Weeknd took over pop music & culture on his own terms filtering R&B, Pop,& hip-hop through an ambitious widescreen lens. In 2018, Starboy won the same award, making him the 1st artist ever to win twice. Pray For Me with Kendrick Lamar was featured in the trailer for the Academy Award winning Marvel film Black Panther. In 2020 the 80’s-nostalgic track Blinding Lights became a worldwide sensation, igniting viral dance challenges across social media, peaking at #1 in 30+ countries."],
    tv: ["TV GIRL", "TV Girl is an American indie pop band from San Diego, California, consisting of Brad Petering, Jason Wyman, and Wyatt Harmon. As of 2023, the group is now based in Los Angeles. TV Girl's 2012 mixtape The Wild, The Innocent, The TV Shuffle was released and given away for free with an accompanying downloadable coloring book. TV Girl's 2014 debut album French Exit was called 'remarkably solid' by Bandwagon Magazine and 'one of the most focused indie-pop albums of the 2010s' by The Daily Targum."],
    arctic: ["ARCTIC MONKEYS", "Arctic Monkeys are an English rock band formed in Sheffield in 2002. The group consists of Alex Turner, Jamie Cook, Nick O'Malley, and Matt Helders. Former band member Andy Nicholson left the band in 2006 shortly after their debut album was released. Arctic Monkeys were one of the first bands to come to public attention via the Internet. The band's wider international fame came with the success of their critically acclaimed fifth album AM (2013), which was supported by the global hit 'Do I Wanna Know?'."],
    hozier: ["HOZIER", "In September 2013, when Irish solo artist Andrew Hozier-Byrne released his debut single ‘Take Me To Church’ - which he had mostly recorded in the attic of his parent’s house in Wicklow, little did he know about the hurricane-strength surge in public interest that the song would spark, carrying him to international stardom. A full ten years and billions of streams later, his music takes him all over the world. The last decade has brought both public and critical acclaim."],
    neighbourhood: ["THE NEIGHBOURHOOD", "The Neighbourhood is an American rock band formed in Newbury Park, California, in 2011. The band is composed of vocalist Jesse Rutherford, guitarists Jeremy Freedman and Zach Abels, and bassist Mikey Margott. After releasing two EPs, I'm Sorry... and Thank You, the Neighbourhood released its debut album I Love You. The band has been called a one-hit wonder for their biggest hit song, 'Sweater Weather', peaking at number 14 in 2013 and re-surging in popularity nearly a decade later after becoming a viral phenomenon on TikTok."],
    girl: ["GIRL IN RED", "Marie Ulven Ringheim (born 16 February 1999) is a Norwegian singer-songwriter and record producer. Her first EPs Chapter 1 (2018) and Chapter 2 (2019) were recorded in her bedroom and feature songs about romance and mental health. Her debut studio album If I Could Make It Go Quiet (2021) was a critical and commercial success. Girl in Red has been cited as a queer icon by Paper, and 'one of the most astute and exciting singer-songwriters working in the world of guitar music' by The New York Times."],
    florence: ["FLORENCE + THE MACHINE", "Florence and the Machine are an English indie rock band that formed in London in 2007, consisting of lead vocalist Florence Welch, keyboardist Isabella Summers, guitarist Rob Ackroyd and harpist Tom Monger. The band's music has received acclaim across the media, especially from the BBC, which played a large part in their rise to prominence. The band's music is renowned for its dramatic, eccentric production and Welch's powerful vocals. Florence and the Machine's sound has been described as a combination of various genres, including rock and soul."],
    wallows: ["WALLOWS", "Wallows is an American alternative rock band based in Los Angeles composed of Dylan Minnette, Braeden Lemasters, and Cole Preston. The band began releasing songs independently in April 2017 starting with 'Pleaser', which reached number two on Spotify charts. In 2018, Wallows signed a deal with Atlantic Records and released their major-label debut EP, Spring. The band released their debut studio album, Nothing Happens, in 2019, which featured the single 'Are You Bored Yet?', followed by their 2020 EP Remote."],
    mgmt: ["MGMT", "MGMT was formed by Ben Goldwasser and Andrew VanWyngarden in 2001 while studying at Wesleyan University. Since their first release, the EP Time To Pretend in 2005, MGMT have released four critically acclaimed albums: Oracular Spectacular (2008), Congratulations (2010), MGMT (2013), and Little Dark Age (2018). In December 2019, the band released the new song 'In The Afternoon' followed by 'As You Move Through The World' in March 2020. MGMT have performed at festivals around the world from Glastonbury and Bonnaroo to Lollapalooza and Coachella."],
    strokes: ["THE STROKES", "The Strokes, American rock group often credited with having spearheaded a revival of 1960s-style garage rock in the early 21st century. Although their songs hinted at a rough-and-tumble life, the Strokes were composed mainly of privileged sons of the New York City elite. Playing at clubs on New York’s Lower East Side, the group quickly became local favourites. The Strokes’ lean hooks, laconic vocals, and spartan production inspired a wave of followers before the group’s first album had even been released."],
    killers: ["THE KILLERS", "The Killers are a Las Vegas-based four-piece formed in 2002, featuring Brandon Flowers, Ronnie Vanucci, Dave Keuning, and  Mark Stoermer. The band has sold over 25 million albums globally and received multiple Grammy nominations, AMA nominations, MTV VMA’s, and NME Awards. Their first album, 2004’s Hot Fuss, was released to worldwide acclaim and contained the singles 'Mr. Brightside', 'Somebody Told Me', and 'All These Things That I've Done'."],
    gizzard: ["KING GIZZARD &amp; THE LIZARD WIZARD", "King Gizzard & the Lizard Wizard is an Australian rock band formed in 2010 in Melbourne, Victoria. They are known for their energetic live shows and prolific recording output, having released two EPs, fifteen studio albums, and three live albums since their formation. Their debut EP, Willoughby's Beach (2011), and first album, 12 Bar Bruise (2012), primarily blended surf music and garage rock, and were released on the band's independent record label, Flightless, founded by Moore in 2012."],
    talking: ["TALKING HEADS", "At the start of their career, Talking Heads were all nervous energy, detached emotion, and subdued minimalism. When they released their last album about 12 years later, the band had recorded everything from art-funk to polyrhythmic worldbeat explorations and simple, melodic guitar pop. Between their first album in 1977 and their last in 1988, Talking Heads became one of the most critically acclaimed bands of the '80s, while managing to earn several pop hits. While some of their music can seem too self-consciously experimental, clever, and intellectual for its own good, at their best Talking Heads represent everything good about art-school punks."],
    joji: ["JOJI", "Joji is one of the most enthralling artists of the digital age. Following on the heels of RIAA platinum-certified single 'Glimpse of Us,' his new album SMITHEREENS expands on the melancholic, yet powerful emotions of the breakout hit. Comprising two parts, SIDE A of the album heralds a mature sonic direction for Joji through wistful and contemplative ballads accompanied by lush production that blooms within each song. SIDE B, produced mainly by Joji himself, digs deeper into the lo-fi and off-kilter sounds that hark back to his experimental beginnings as an artist. Of the album, Billboard raved, 'Anyone familiar with Joji’s dulcet tones and emotionally revealing lyricism could have predicted that he’d become a solo star.' AllMusic also said of the album, which clocks in at just under 25 minutes, 'is the perfect length to wallow in sadness before wiping off the tears and carrying on. It's not the happiest of experiences, but it is his most mature and relatable statement to date.' SMITHEREENS follows his album Nectar, executive produced and arranged by Joji, which bowed out at #3 on the Billboard 200 album chart."],
    dua: ["DUA LIPA", "Global pop superstar Dua Lipa released Future Nostalgia, her #1 UK sophomore album, this year to worldwide acclaim. It is one of the best reviewed albums of 2020 and debuted in the top 5 of the Billboard 200 Album Chart. Upon release, Future Nostalgia was the most streamed album in a day by a British female artist globally in Spotify history and has over 4.5 billion streams to date. Dua is the biggest female artist in the world on Spotify and is currently the third biggest artist overall with nearly 60 million monthly listeners. The album’s certified platinum lead single 'Don’t Start Now' is a worldwide hit with one billion streams on Spotify alone, and a #2 spot on the Billboard Hot 100, a career high for the pop star. The track also broke her personal best record of weeks at #1 at US Top 40 radio. Dua followed the success of 'Don’t Start Now' by releasing smash UK single 'Physical,' and her US Top 40 #1 'Break My Heart.' Most recently, Future Nostalgia was shortlisted for UK’s prestigious Mercury Prize. Future Nostalgia is the follow up to Dua’s eponymous 2017 debut, which is certified platinum and spawned 6 platinum tracks. She made BRIT Award history in 2018 by becoming the first female artist to pick up five nominations, with two wins for British Breakthrough Act and British Female Solo Artist, and received two Grammy awards for Best New Artist and Best Dance Recording in early 2019."],
    steve: ["STEVE LACY", "Steve Thomas Lacy-Moya (born May 23, 1998) is an American singer-songwriter, guitarist, and record producer. He gained recognition as the guitarist of the alternative R&B band the Internet.[4][5] In 2017, he released his self-produced debut EP, Steve Lacy's Demo.[6][7] Following this, Lacy was featured alongside Frank Ocean on the song '911 / Mr. Lonely' by Tyler, the Creator; and co-wrote songs for artists such as Solange Knowles,[8] Chloe x Halle,[9] and Kendrick Lamar, the latter of whom he worked with on the song 'Pride'."],
    vansire: ["VANSIRE", "Vansire is a dream pop band from Rochester, Minnesota consisting of Josh Augustin and Sam Winemiller. They are currently signed to Spirit Goth Records. Vansire has performed at ROCKChester and First Avenue, played a live session with Audiotree, and collaborated with artists such as Chester Watson, Jeremiah Jae, and Mick Jenkins.[2][3]"],
    cinema: ["TWO DOOR CINEMA CLUB", "Two Door Cinema Club are a band from Bangor, Northern Ireland. The band formed in 2007 and is composed of three members: Alex Trimble (vocals, rhythm guitar, beats, synths), Sam Halliday (lead guitar, backing vocals), and Kevin Baird (bass, synths, backing vocals). The band's debut album, Tourist History, was released on 1 March 2010 by French independent record label Kitsuné Music. In the United States, where the band are signed to Glassnote Records, the album was released on 27 April 2010. Tourist History was selected for the Choice Music Prize for Irish Album of the Year (2010) the following year."],
    hotel: ["HOTEL UGLY", "Hotel Ugly’s musical background can be attributed to a number of factors. Influenced at a young age, their music centric backgrounds has given them the legs to stand in their music production. Excelling in different aspects, Mike and Chris both have mastered their craft. Mike’s skills in music production and audio engineering have been finely combed through the years. Chris’s attention when it comes to songwriting and instrumental is unmatched. Together, they’ve formed the band known as 'Hotel Ugly'. An innovative approach to the industry, they’re Ep 'The Ugly EP', made a splash within the indie music scene."],
    thundercat: ["THUNDERCAT", "Thundercat is the virtuoso bassist & singer Stephen Bruner, a mercurial talent and multi-GRAMMY award winner. In 2023, Thundercat linked with Tame Impala releasing 'No More Lies,'. A musical match made in heaven, the duo of Bruner & Parker is an electrifying union. The song hits the sweet spot between their two individual, complementary styles with laser accuracy. Thundercat’s 2020 album, It Is What It Is, won the GRAMMY for Best Progressive R&B Album, and features Ty Dolla $ign, Childish Gambino, Lil B, Kamasi Washington, Steve Lacy, Steve Arrington, BADBADNOTGOOD, & more. It was co-produced by Thundercat and longtime friend and musical partner Flying Lotus."],
    mac: ["MAC DEMARCO", "Mac DeMarco's music is inextricably linked to his warmly weird personality, with his distinctive songwriting style and warped production sound mirroring his off-kilter charm and apparent laid-back look on life. While the Canadian artist's image projects a low-key slacker prone to occasional antics and never taking anything too seriously, his breezy songs ironically often hide mature themes of aging, commitment, and morals under layers of chorus and reverb. Early releases on Captured Tracks and endless touring enlarged DeMarco's fan base, and the 2014 album Salad Days pushed his strange mix of slacker pop, jazz, '70s soft rock, and glam into the vanguard realm, performing well commercially and changing the shape of what was happening in indie rock at the time. Subsequent moves to New York and Los Angeles each yielded quality releases on which the multi-instrumentalist DeMarco became known for playing and recording all of the parts himself. His 2017 album This Old Dog explored themes of getting older, this time with upgraded production, a trend that continued on 2019's Here Comes the Cowboy, which he released on his own imprint. In 2023, DeMarco released both the entirely instrumental album Five Easy Hot Dogs and One Wayne G, a collection of 199 pieces of music that clocked in at a run time of close to nine hours."],
    sports: ["SPORTS", "Oklahoma dream pop band Sports began playing together in grade school, cycling through different names until deciding to adopt a cheeky moniker after their self-described lack of athleticism. Bassist Jacob Theriot and guitarist Christian Theriot are brothers, forming the core trio with friend and vocalist Cale Chronister. Their '80s-influenced breezy indie pop sound informed much of their debut LP, Naked All the Time, which was recorded at Blackwatch Studio in Norman, Oklahoma, and released in late 2015. The following year, the band released its sophomore effort, the groove-heavy People Can't Stop Chillin'. ~ Neil Z. Yeung, Rovi"],
    men: ["MEN I TRUST", "The story of Men I Trust’s rise to indie fame is a bit more abnormal than most. The group initially started without their lead singer. In 2014 keyboardist Dragos Chiriac and bassist-guitarist Jessy Caron, both Quebec music graduates and high school friends reunited after college and came together to form a duo named Men I Trust. Their music was heavily inspired by the electronic movement of the 2000s. If you take for example a song from their self titled 2014 debut like Endless Strive and compare it to their most recent output you immediately hear the difference in their approach to production. The programmed robotic electronic drums alongside these boisterous synthesizers give you a closer look into how the duo looked at song creation. The basics where all there, the dance-inducing, funkiness and soothe demeanor coupled with great vocal performances by frequent guest collaborators offered a range of different song types. Sometime between June of that year and March of the next, Emma was asked to join the band as their official and full-time singer. In early March of 2016, they released their first single as Humming Man."],
    smiths: ["THE SMITHS", "The Smiths were an English rock band formed in Manchester in 1982 and composed of singer Morrissey, guitarist Johnny Marr, bassist Andy Rourke, and drummer Mike Joyce. Morrissey and Marr formed the band's songwriting partnership. The Smiths are regarded as one of the most important acts to emerge from 1980s British independent music. The Smiths signed to the independent label Rough Trade Records in 1983 and released their first album, The Smiths, in 1984. Their focus on a guitar, bass and drum sound, fusing 1960s rock and post-punk, was a rejection of the synth-pop sound predominant at the time. Several Smiths singles reached the top 20 of the UK Singles Chart, and all their studio albums reached the top five of the UK Albums Chart, including the number-one album Meat Is Murder (1985). They achieved mainstream success in Europe with The Queen Is Dead (1986) and Strangeways, Here We Come (1987), which both entered the top 20 of the European Albums Chart.[6] In early 1986, the band became a five-piece with the addition of guitarist Craig Gannon, though he departed by the end of that year, returning the band to its original four-piece line-up."],
    ekkstacy: ["EKKSTACY", "ekkstacy is an artist from Vancouver, Canada. He always wanted to be an artist, but he felt like that was something he couldn’t do because he didn’t have the confidence. However, after going through drug induced psychosis, his parents divorce, and alcohol abuse he found himself writing and recording music everyday. He took influence from film, and artists including Elliott Smith, The Drums, Bon Iver, and Bedroom. Right now, ekkstacy describes his current sound as a fuse of indie, post punk, and synth wave."],
}

// dynamically create  carousel
for (let i = 0; i < Object.keys(ARTIST_INFO).length; i++){
    // create text slides
    let slide = document.createElement("div");
    slide.className = "artist_slide";
    slide.innerHTML = Object.values(ARTIST_INFO)[i][0]
    document.querySelector(".artist_container").appendChild(slide)
    // create image slides
    let img_slide = document.createElement("img")
    img_slide.className = "artist_img";
    img_slide.src = "images/artist_imgs/" + Object.keys(ARTIST_INFO)[i] + ".jpg";
    img_slide.alt = "temporary"
    document.querySelector(".image_container").appendChild(img_slide)
    //create artist list
    let artist_name = document.createElement("a");
    artist_name.className = "artist_name";
    artist_name.innerHTML = Object.values(ARTIST_INFO)[i][0];
    document.querySelector(".artist_box").appendChild(artist_name)
    // add slash between artists
    let slash = document.createElement("a");
    slash.className = "slash";
    slash.innerHTML = "/";
    document.querySelector(".artist_box").appendChild(slash);
    // create the descriptions
    let description = document.createElement("div");
    description.innerHTML = ARTIST_INFO[Object.keys(ARTIST_INFO)[i]][1]
    description.className = "description"
    document.querySelector(".description_container").appendChild(description)
}

// get hieght after element creation for correct number
let body_height_vh = 100*(document.body.scrollHeight/window.innerHeight)

for (let i = 0; i < num_circles; i++) {
    // create all the gradient circles
    // add elements to a list
    circles.push(document.createElement("div"))

    //randomly generate all aspects of the circles
    grad_angle = GenerateRandomInt(0, 360);
    grad_percent = GenerateRandomInt(50, 100);
    circ_diameter = GenerateRandomInt(MIN_CIRCLE_DIAMETER, MAX_CIRCLE_DIAMETER);
    vh_diameter = (100*(circ_diameter/window.innerHeight))
    circ_x = GenerateRandomInt(57, 95);
    circ_y = GenerateRandomInt(0, body_height_vh*2.5+vh_diameter);

    // define element properties
    circles[i].className = "circle_graphic";
    circles[i].style.backgroundImage = 'linear-gradient(' + grad_angle + 'deg, ' + site_purple + ' 0%, ' + site_pink + ' ' + grad_percent + '%)';
    circles[i].style.height = circ_diameter + "px";
    circles[i].style.width = circ_diameter + "px";
    circles[i].style.left = circ_x + "vw";
    circles[i].style.top = circ_y-vh_diameter + "vh";
    // store extra info in another list
    circle_heights.push([circ_y-vh_diameter, Math.random() * (MAX_SPEED - MIN_SPEED) + MIN_SPEED]);
    // add element to site
    document.body.insertBefore(circles[i], document.getElementById("first_div"));
}
// define menu's gradient angle
document.querySelector(".menu_drop").style.backgroundImage = 'linear-gradient(' + GenerateRandomInt(0, 360) + 'deg, var(--site_purple), var(--site_pink)';


document.addEventListener("scroll", function() {
    // parallax scroll the circles
    for (let i = 0; i < num_circles; i++) {
        circles[i].style.top = circle_heights[i][0] - (100*(window.scrollY/window.innerHeight))*circle_heights[i][1] + "vh";
    }
});





document.addEventListener("mousemove", function(e) {
    shadow_update(e)
    mouse_move_updates(e)
});

function shadow_update(mousemovement) {
    // update the shadows for all circles
    for (let i = 0; i < num_circles; i++) {
        // calculate offset for the width of the circle
        let x_circle= circles[i].offsetLeft + circles[i].offsetWidth/2;
        let y_circle= circles[i].offsetTop + circles[i].offsetHeight/2;
        // take the distances and divide them for small shadows
        let shadowx = (x_circle - mousemovement.clientX)/SHADOW_MULT;
        let shadowy = (y_circle - mousemovement.clientY)/SHADOW_MULT;
        // change the style
        circles[i].style.boxShadow = shadowx+"px "+shadowy+"px 50px var(--bg_black)";
    }
    let menu_circ = document.querySelector(".menu_drop")
    // calculate offset for the width of the circle
    let x_circle= menu_circ.getBoundingClientRect()["x"] + menu_circ.offsetWidth/2; // getBoundingClientRect() returns the position relative to the viewport, better than offsetleft
    let y_circle= menu_circ.offsetTop + menu_circ.offsetHeight/2;
    // take the distances and divide them for small shadows
    let shadowx = (x_circle - mousemovement.clientX)/(SHADOW_MULT*1.6);
    let shadowy = (y_circle - mousemovement.clientY)/(SHADOW_MULT*1.6);
    // change the style

    menu_circ.style.boxShadow = shadowx+"px "+shadowy+"px 50px var(--bg_black)";
}


// collect all slides
const slides = document.querySelectorAll(".artist_slide");
const images_slide = document.querySelectorAll(".artist_img");
const desc_slides = document.querySelectorAll(".description");
let current_slide = 0;
slides.forEach((slide, index) => {
    // transform the slides
    slide.style.transform = `translateX(${index * 100}%)`;
    images_slide[index].style.transform = `translateX(${index*100}%)`;
    desc_slides[index].style.transform = `translateX(${index*100}%)`;
    // change the style of the current name
    if (slide.style.transform.replace(/\D/g, '') / 100 === 1){
        slide.classList.remove("artist_slide_faded")
    } else {
        slide.classList.add("artist_slide_faded")
    }
});

// add a click checker to add buttons to elements
document.addEventListener("click", function(e) {
    if (e.target.className === "artist_name"){
        // opens the menu
        document.querySelector(".fade").style.pointerEvents = "all";
        document.querySelector(".fade").style.opacity = "80%";
        // set width dependent on veritcal or horizontal display
        if(window.innerHeight < window.innerWidth){
            document.querySelector(".artist_pop_out").style.width = "40vw";
        } else {
            document.querySelector(".artist_pop_out").style.width = "100vw";
        }
        //create a list of the artist names
        const artist_slide_checker = [];
        for (let i= 0; i < Object.keys(ARTIST_INFO).length; i++){
            // push the name of the artist
            artist_slide_checker.push(ARTIST_INFO[Object.keys(ARTIST_INFO)[i]][0])
        }

        // set the carousel to the correct slide
        current_slide = artist_slide_checker.indexOf(e.target.innerHTML) - 1;
        change_artist(current_slide);

    } else if (e.target.className === "fade") {
        // close the menu
        document.querySelector(".fade").style.pointerEvents = "none";
        document.querySelector(".fade").style.opacity = "0%";
        document.querySelector(".artist_pop_out").style.width = "0vw";
    } else if (e.target.classList.contains("artist_slide")) {
        // rotate the carousel
        let click_index = e.target.style.transform.replace(/\D/g, '') / 100; // removes all non-numeric characters
        if (click_index < 1){
            current_slide--;
        } else if (click_index > 1){
            current_slide++;
        }
        change_artist(current_slide);
    } else {
        menu_btns(e)
    }
})


// change the pop out width if the window resizes
window.addEventListener("resize", function (){
    // check if menu is already open
    if(document.querySelector(".fade").style.pointerEvents === "all"){
        // set width dependent on veritcal or horizontal display
        if(window.innerHeight < window.innerWidth){
            document.querySelector(".artist_pop_out").style.width = "40vw";
        } else {
            document.querySelector(".artist_pop_out").style.width = "100vw";
        }
    }
    //change height of image container regardless
    document.querySelector(".image_container").style.height = document.querySelector(".artist_img").height + "px"
})

