// Who's in the room
var ME={name:"Xavier Ruiz",role:"Product Marketing Specialist"};
// The little house on the shelf opens this card
var ABOUT={"title": "Home", "text": "Howdy! I'm Xavier Ruiz, a Boston based Product Marketer for ServiceNow. Welcome to my page!", "bio": ["At ServiceNow, I work where product, data and storytelling meet. I help bring products to market by shaping the messaging and positioning behind launches, building the dashboards that show what's working, and running the tests and customer research that feed into what we build next.", "I studied Technology Management at Texas A&M, but music has been part of my life for much longer. I played guitar and violin for more than a decade, and that love lives on in the records on the shelf, all from my own collection. Lately I've been putting the same creative energy into building with AI, and this room is one of those projects. Nearly everything here is interactive, so feel free to look around."], "email": "xavier.ruiz@servicenow.com", "linkedin": "https://www.linkedin.com/in/xavier-ruiz-0b1617201"};
// The house dresses up for the time of year on its own. To preview another look, set one of:
// "halloween", "fall", "holiday", "winter", "spring", "summer"  (null = follow the calendar)
var SEASON_OVERRIDE=null;
// What's on the turntable when the page loads (a record id from RECS)
var NOW_ID="carti",NOW_SINCE="Sunday";
// The collection. g = which shelf pocket it lives in: "hiphop", "rock" or "misc".
// fc/bc = front/back cover images; records without one get a printed placeholder.
// lb = a photo of just the centre label (square, label filling the frame)
// sp = a photo of the spine (long and thin, reading left to right)
// dk = a photo of the disc itself (square, disc filling the frame) for colored pressings.
var RECS=[
{"id": "15171776", "a": "Childish Gambino", "t": "Awaken, My Love!", "y": "2016", "f": "LP", "n": 1, "v": null, "c": "#1c1a19", "fc": "covers/awaken-front.jpg", "bc": null, "g": "misc"},
{"id": "16233494", "a": "Childish Gambino", "t": "Because The Internet", "y": "2020", "f": "2×LP · Repress", "n": 2, "v": null, "c": "#2c2f3a", "fc": "covers/bti-front.jpg", "bc": "covers/bti-back.jpg", "g": "hiphop", "lb": "covers/bti-label.jpg"},
{"id": "22983704", "a": "Childish Gambino With Jaden Smith", "t": "Kauai", "y": "2022", "f": "LP · Yellow & blue split vinyl · EP · Record Store Day · Limited · Reissue", "n": 1, "v": "#8fd3ec", "c": "#4fa3b8", "fc": "covers/kauai-front.jpg", "bc": "covers/kauai-back.jpg", "g": "misc", "dk": "covers/kauai-disc.jpg"},
{"id": "7837449", "a": "Earl Sweatshirt", "t": "Doris", "y": "2015", "f": "LP", "n": 1, "v": null, "c": "#c7a57c", "fc": "covers/doris-front.jpg", "bc": "covers/doris-back.jpg", "g": "hiphop"},
{"id": "233445", "a": "Kanye West", "t": "The College Dropout", "y": "2004", "f": "2×LP", "n": 2, "v": null, "c": "#a67c52", "fc": "covers/dropout-front.jpg", "bc": "covers/dropout-back.jpg", "g": "hiphop"},
{"id": "530085", "a": "Kanye West", "t": "Late Registration", "y": "2005", "f": "2×LP", "n": 2, "v": null, "c": "#6b3b2a", "fc": "covers/latereg-front.jpg", "bc": "covers/latereg-back.jpg", "lb": "covers/latereg-label.jpg", "g": "hiphop"},
{"id": "1608688", "a": "Kanye West", "t": "808s & Heartbreak", "y": "2008", "f": "2×LP · Deluxe · Gatefold", "n": 2, "v": null, "c": "#d9d5cd", "fc": "covers/808s-front.jpg", "bc": "covers/808s-back.jpg", "lb": "covers/808s-label.jpg", "g": "hiphop"},
{"id": "2606952", "a": "Kanye West", "t": "My Beautiful Dark Twisted Fantasy", "y": "2010", "f": "3×LP · Limited", "n": 3, "v": null, "c": "#c0262d", "fc": "covers/mbdtf-front.jpg", "bc": "covers/mbdtf-back.jpg", "lb": "covers/mbdtf-label.jpg", "g": "hiphop"},
{"id": "12292679", "a": "Kanye West", "t": "Ye", "y": "2018", "f": "LP", "n": 1, "v": null, "c": "#5f7b5c", "fc": "covers/ye-front.jpg", "bc": "covers/ye-back.jpg", "lb": "covers/ye-label.jpg", "g": "hiphop"},
{"id": "1979157", "a": "Kid Cudi", "t": "Man On The Moon: The End Of Day", "y": "2009", "f": "2×LP", "n": 2, "v": null, "c": "#2d2d2d", "fc": null, "bc": null, "g": "hiphop"},
{"id": "2605105", "a": "Kid Cudi", "t": "Man On The Moon II: The Legend Of Mr. Rager", "y": "2010", "f": "2×LP", "n": 2, "v": null, "c": "#5a1f24", "fc": "covers/motm2-front.jpg", "bc": "covers/motm2-back.jpg", "g": "hiphop"},
{"id": "4569817", "a": "Kid Cudi", "t": "Indicud", "y": "2013", "f": "3×LP", "n": 3, "v": null, "c": "#cf3a2f", "fc": "covers/indicud-front.jpg", "bc": "covers/indicud-back.jpg", "g": "hiphop"},
{"id": "21318349", "a": "Kid Cudi", "t": "Man On The Moon III: The Chosen", "y": "2021", "f": "2×LP", "n": 2, "v": null, "c": "#3f4d8c", "fc": null, "bc": null, "g": "hiphop"},
{"id": "29558410", "a": "Kid Cudi", "t": "Insano", "y": "2024", "f": "2×LP · Red vinyl", "n": 2, "v": "#b3202a", "c": "#b3202a", "fc": null, "bc": null, "g": "hiphop"},
{"id": "12720668", "a": "KIDS SEE GHOSTS", "t": "Kids See Ghosts", "y": "2018", "f": "LP", "n": 1, "v": null, "c": "#d9a05b", "fc": null, "bc": null, "g": "hiphop"},
{"id": "3492331", "a": "Mac Miller", "t": "Blue Slide Park", "y": "2012", "f": "2×LP", "n": 2, "v": null, "c": "#3b6fb6", "fc": null, "bc": null, "g": "hiphop"},
{"id": "7835074", "a": "Mac Miller", "t": "GO:OD AM", "y": "2015", "f": "2×LP", "n": 2, "v": null, "c": "#e6e3dc", "fc": null, "bc": null, "g": "hiphop"},
{"id": "8618845", "a": "Mac Miller", "t": "Best Day Ever", "y": "2016", "f": "2×LP · Mixtape · Reissue", "n": 2, "v": null, "c": "#e9a13b", "fc": null, "bc": null, "g": "hiphop"},
{"id": "13153676", "a": "Mac Miller", "t": "Watching Movies With The Sound Off", "y": "2016", "f": "2×LP · Reissue", "n": 2, "v": null, "c": "#c94c5e", "fc": null, "bc": null, "g": "hiphop"},
{"id": "12681974", "a": "Mac Miller", "t": "Swimming", "y": "2018", "f": "2×LP", "n": 2, "v": null, "c": "#9fc7d9", "fc": null, "bc": null, "g": "hiphop"},
{"id": "15040115", "a": "Mac Miller", "t": "Circles", "y": "2020", "f": "2×LP · Clear vinyl", "n": 2, "v": "clear", "c": "#d4d1ca", "fc": null, "bc": null, "g": "hiphop"},
{"id": "15764968", "a": "Mac Miller", "t": "K.I.D.S. (Kickin Incredibly Dope Shit)", "y": "2020", "f": "2×LP · Mixtape · Reissue", "n": 2, "v": null, "c": "#e3c84f", "fc": null, "bc": null, "g": "hiphop"},
{"id": "15247638", "a": "Mac Miller", "t": "The Divine Feminine", "y": "2020", "f": "2×LP · Pink vinyl · Limited · Reissue", "n": 2, "v": "#f0a3c0", "c": "#e7a9b8", "fc": null, "bc": null, "g": "hiphop"},
{"id": "20593756", "a": "Mac Miller", "t": "Faces", "y": "2021", "f": "3×LP · Yellow vinyl · Mixtape · Reissue", "n": 3, "v": "#f2c230", "c": "#7a2632", "fc": null, "bc": null, "g": "hiphop"},
{"id": "22668080", "a": "Mac Miller", "t": "Macadelic", "y": "2022", "f": "2×LP · Mixtape · Reissue", "n": 2, "v": "#f1efe8", "c": "#efeeea", "fc": "covers/macadelic-front.jpg", "bc": "covers/macadelic-back.jpg", "dk": "covers/macadelic-disc.jpg", "g": "hiphop"},
{"id": "iwy", "a": "Red Hot Chili Peppers", "t": "I'm With You", "y": "2011", "f": "2×LP · 180g", "n": 2, "v": null, "c": "#efeeea", "fc": "covers/iwy-front.jpg", "bc": "covers/iwy-back.jpg", "lb": "covers/iwy-label.jpg", "sp": "covers/iwy-spine.jpg", "g": "rock"},
{"id": "lonerism", "a": "Tame Impala", "t": "Lonerism", "y": "2012", "f": "2×LP", "n": 2, "v": null, "c": "#d7643a", "fc": "covers/lonerism-front.jpg", "bc": "covers/lonerism-back.jpg", "dk": "covers/lonerism-disc.jpg", "g": "rock"},
{"id": "wywh", "a": "Pink Floyd", "t": "Wish You Were Here", "y": "2016", "f": "LP · 180g · Reissue · with postcard", "n": 1, "v": null, "c": "#f2f0ea", "fc": "covers/wywh-front.jpg", "bc": "covers/wywh-back.jpg", "lb": "covers/wywh-label.jpg", "g": "rock"},
{"id": "1927874", "a": "Pink Floyd", "t": "The Dark Side Of The Moon", "y": "1988", "f": "LP · Pink vinyl · Limited · Reissue", "n": 1, "v": "#f0a3c0", "c": "#121212", "fc": "covers/dsotm-front.jpg", "bc": "covers/dsotm-back.jpg", "g": "rock", "dk": "covers/dsotm-disc.jpg"},
{"id": "7435327", "a": "Travis Scott", "t": "Rodeo", "y": "2015", "f": "2×LP", "n": 2, "v": null, "c": "#4a4644", "fc": "covers/7435327-front.jpg", "bc": "covers/7435327-back.jpg", "g": "hiphop"},
{"id": "carti", "a": "Playboi Carti", "t": "Playboi Carti", "y": "2017", "f": "LP", "n": 1, "v": null, "c": "#8aa1b5", "fc": "covers/carti-front.jpg", "bc": null, "g": "hiphop"},
{"id": "cherrybomb", "a": "Tyler, The Creator", "t": "Cherry Bomb", "y": "2025", "f": "2×LP · Red translucent · Reissue · \"C\" variant cover", "n": 2, "v": "#d8141c", "c": "#7fa6cf", "fc": "covers/cherrybomb-front.jpg", "bc": "covers/cherrybomb-back.jpg", "g": "hiphop", "dk": "covers/cherrybomb-disc.jpg"}
];
// Top 10 pocket, #1 first. These live in the Top 10 pocket instead of their genre pocket.
var TOP10=["2606952", "7435327", "12720668", "1979157", "12681974", "1608688", "15040115", "16233494", "7837449", "233445"];
// The four pockets: which cube of the shelf each one uses (col 0-2 from the left, row 0 = top)
var POCKETS=[{k:"top10",name:"Top 10",col:0,row:0},{k:"hiphop",name:"Hip-Hop / Rap",col:1,row:0},{k:"new",name:"New Arrivals",col:0,row:1},{k:"rock",name:"Rock",col:1,row:1},{k:"misc",name:"Misc",col:2,row:1}];
// Liner notes per record id. Add your stories here.
// What each record is, pulled from published sources (Wikipedia, AllMusic, Album of the Year and press coverage) and
// written up short. Replace any of these with your own story about the record.
var NOTES={
"15171776":"Donald Glover's third album as Childish Gambino (December 2016) traded rapping for singing: psychedelic soul and funk in the line of Funkadelic, Sly Stone and Prince, made with Ludwig Göransson. Much of it was shaped by the birth of his first child, and it gave us \"Redbone.\"",
"16233494":"His second album (December 2013), named on Beck's suggestion and made with Ludwig Göransson in a rented Los Angeles mansion after he left Community. It came with a 72-page screenplay, and features \"3005\" and \"Sweatpants.\"",
"22983704":"A breezy, beach-bright EP from October 2014, a companion to the Because the Internet world. Jaden Smith plays \"The Boy,\" the character from Glover's screenplay, with spoken parts on \"Pop Thieves\" and \"Late Night in Kauai.\"",
"7837449":"Earl Sweatshirt's debut (August 2013), started after he came home from a boarding school in Samoa. Named for his late grandmother, it works through grief, his relationship with his father and doubts about fame, with much of it self-produced as randomblackdude.",
"233445":"Kanye West's debut (February 2004). Labels had passed on him as a rapper, so he proved it himself: sped-up \"chipmunk soul\" samples, \"Through the Wire\" recorded with his jaw wired shut, and lyrics about family, faith and school instead of gangster tropes. It won the Grammy for Best Rap Album.",
"530085":"His second album (August 2005). Wary of everyone copying his sample style, Kanye brought in film composer Jon Brion, whose orchestral arrangements reshaped the record. It includes \"Gold Digger,\" \"Touch the Sky\" and \"Heard 'Em Say.\"",
"1608688":"Recorded in a few weeks in late 2008, after the death of his mother Donda and the end of his engagement. Kanye mostly sings through Auto-Tune over Roland TR-808 drums and cold synths. The lyrics are about loss, loneliness and the strain of fame.",
"2606952":"Made during a self-imposed exile in Hawaii, where Kanye ran round-the-clock sessions with dozens of collaborators. Released November 2010, it was the critics' consensus album of the year, with Bon Iver, Jay-Z, Nicki Minaj, Rick Ross and Kid Cudi among the guests.",
"12292679":"Seven songs, released June 2018 and largely remade in two weeks at a ranch in Jackson Hole, Wyoming, after Kanye scrapped an earlier version. It deals openly with his mental health and family, under a photo of Wyoming's Teton Range.",
"1979157":"Kid Cudi's debut (September 2009) and the first of the Man on the Moon trilogy, narrated by Common. A five-act concept album about loneliness, dreams and nightmares, drawing on new wave, techno and ambient music.",
"2605105":"The 2010 sequel and middle chapter of the trilogy, produced mostly by Emile Haynie and Plain Pat. Darker and more experimental, it follows Cudi fighting his demons, with Mr. Rager standing in for his drug use.",
"4569817":"Cudi's third album (April 2013) and his first outside the Man on the Moon story. He produced almost every beat himself, designed the cover, and aimed for more upbeat, positive music. It debuted at number two.",
"21318349":"Ten years after Mr. Rager, the trilogy's final chapter arrived in December 2020. Across 18 songs, with Pop Smoke, Skepta, Trippie Redd and Phoebe Bridgers, Cudi looks back on his mental-health journey from a calmer, more hopeful place.",
"29558410":"Cudi's ninth album (January 2024), and his last on Republic Records, the label he had been with since his debut. Twenty-one tracks with Travis Scott, Pharrell, A$AP Rocky, Lil Yachty and Young Thug, under a KAWS painting on the cover.",
"12720668":"Kanye West and Kid Cudi as a duo, released June 2018 and recorded at the same Wyoming ranch as Ye. Seven songs about pain and healing, ten years into their partnership, with cover art by Takashi Murakami after Hokusai's views of Mount Fuji.",
"3492331":"Mac Miller's debut (November 2011), named after a playground in Pittsburgh's Frick Park near where he grew up. Produced largely by ID Labs with no features, it debuted at number one, the first independently distributed debut to do so in sixteen years.",
"7835074":"His third album and first on a major label (September 2015). Mac called it the first album he had made while happy in a long time, a clear-eyed record about addiction and insomnia, with \"100 Grandkids\" and \"Weekend.\"",
"8618845":"The March 2011 mixtape that followed K.I.D.S. and kicked off his breakout year. Bright, feel-good party rap from before he was famous, including \"Donald Trump,\" his first Billboard Hot 100 hit.",
"13153676":"His second album (June 2013), which he called very introspective and very personal. Building on Macadelic, it leans into psychedelic, experimental hip-hop and came out to praise for his growth as a lyricist.",
"12681974":"His fifth album, released August 3, 2018, and the last before his death a month later. A warm, funk-soaked record about climbing out of rock bottom toward self-acceptance, with Thundercat on bass and Jon Brion producing. It includes \"Small Worlds\" and \"Self Care.\"",
"15040115":"The posthumous companion to Swimming (January 2020), together making \"Swimming in Circles.\" Mac was still working on it when he died, and Jon Brion finished it from their sessions and conversations, keeping the songs as close as possible to what Mac intended.",
"15764968":"The August 2010 mixtape that broke Mac Miller out. Its title is a backronym and a nod to the 1995 film Kids, quoted throughout, over '90s boom-bap beats and coming-of-age rhymes.",
"15247638":"A 2016 album about love: falling into it, learning from it and missing it, blending rap and R&B. Kendrick Lamar, Anderson .Paak and Ariana Grande appear, and \"Dang!\" was the single.",
"20593756":"A sprawling, raw 25-track mixtape first released free on Mother's Day 2014, the year after Watching Movies. It reached streaming and vinyl in October 2021, with proceeds from the vinyl going to The Mac Miller Fund.",
"22668080":"The March 2012 mixtape where Mac turned inward and darker, deciding to stop thinking about what music he should make and say what he wanted to say. Psychedelic production and guests including Kendrick Lamar, Lil Wayne, Juicy J and Joey Bada$$.",
"iwy":"The Chili Peppers' tenth album (August 2011), their first after a five-year break and the first with guitarist Josh Klinghoffer replacing John Frusciante. Produced by Rick Rubin, with \"The Adventures of Rain Dance Maggie.\"",
"lonerism":"Tame Impala's second album (October 2012), written, played and produced almost entirely by Kevin Parker in Perth and a Paris apartment. More synths and pop melody than the debut, all about being alone in a crowd, with \"Feels Like We Only Go Backwards\" and \"Elephant.\"",
"wywh":"Pink Floyd's 1975 album is a tribute to founder Syd Barrett, who had left the band seven years earlier, and a jab at the music industry. While they were mixing \"Shine On You Crazy Diamond\" at Abbey Road, Syd walked in unannounced, so changed that most of them did not recognise him.",
"1927874":"Pink Floyd's 1973 concept album about the pressures of modern life, time, money, madness and mortality, partly inspired by Syd Barrett. Engineered by Alan Parsons, it spent fourteen years on the Billboard chart and has sold an estimated 45 million copies.",
"7435327":"Travis Scott's debut studio album (September 2015), the record that took his dark, psychedelic take on trap mainstream. Produced with Metro Boomin, WondaGurl and Mike Dean, with Future, Quavo, 2 Chainz and Kacy Hill.",
"carti":"Playboi Carti's debut mixtape (April 2017) on A$AP Mob's AWGE, executive produced by A$AP Rocky and produced mostly by Pi'erre Bourne. Its airy, minimalist beats gave us \"Magnolia\" and \"wokeuplikethis*.\"",
"cherrybomb":"Tyler, the Creator's 2015 album, a loud, colorful swerve away from his shock-rap past, inspired by Stevie Wonder and the noise of Death Grips. Produced entirely by Tyler, with uncredited guests including Kanye West, Lil Wayne, Pharrell and Kali Uchis."
};
// Spotify album links; anything not listed opens a Spotify search for the artist and album
var SPOTIFY={"7837449": "https://open.spotify.com/album/5vRfIDOPJHy3W2wHWbzLlE", "wywh": "https://open.spotify.com/album/0bCAjiUamIFqKJsekOYuRw", "1927874": "https://open.spotify.com/album/4LH4d3cOWNNsVw41Gqt2kv", "12681974": "https://open.spotify.com/album/5wtE5aLX5r7jOosmPhJhhk", "15040115": "https://open.spotify.com/album/5sY6UIQ32GqwMLAfSNEaXb", "7435327": "https://open.spotify.com/album/4PWBTB6NYSKQwfo79I3prg", "iwy": "https://open.spotify.com/album/5wZtSIvijWCMc1vlPFqAyB", "3492331": "https://open.spotify.com/album/5SPKcrC7nPiDCjILhxRobb", "7835074": "https://open.spotify.com/album/2Tyx5dLhHYkx6zeAdVaTzN", "8618845": "https://open.spotify.com/album/2OxW8MjnnNSAvFoG7igg7M", "13153676": "https://open.spotify.com/album/4iwdNpYgW4MwnJ3q1JZ88U", "15764968": "https://open.spotify.com/album/4GtuTUDyatvSHAoAr8bwsF", "15247638": "https://open.spotify.com/album/6f6tko6NWoH00cyFOl4VYQ", "20593756": "https://open.spotify.com/album/5SKnXCvB4fcGSZu32o3LRY", "22668080": "https://open.spotify.com/album/5uLB6ONw5NOYUNaKlnH7S1", "cherrybomb": "https://open.spotify.com/album/621OhgnZJ7Pz8iUazct1In"};
// Posters on the wall. x/y = center on the back wall in meters (x: 0 is the shelf's middle, y: height off the floor),
// w = width in meters (height follows the image), r = tilt, hang = "tape" | "pins" | "clip". Add more over time.
var POSTERS=[
{k:"macadelic",src:"posters/macadelic-tour.jpg",ar:600/399,x:-.52,y:1.46,w:.3,r:.045,hang:"tape",t:"The Macadelic Tour",c:"Featuring Mac Miller."},
{k:"mbdtf",src:"posters/mbdtf-ballerina.jpg",ar:600/598,x:.64,y:1.52,w:.36,r:-.03,hang:"pins",t:"My Beautiful Dark Twisted Fantasy",c:"The fold-out ballerina, creases and all."},
{k:"donda",src:"posters/kanye-donda.jpg",ar:599/309,x:1.12,y:1.42,w:.22,r:.022,hang:"clip",t:"Kanye and Donda",c:""},
{k:"bear",src:"posters/dropout-bear.jpg",ar:1,x:.98,y:1.02,w:.25,r:-.05,hang:"tape",t:"The Dropout Bear",c:""}
];
// TV channels, in order. Each is a 4:3 clip in media/ saved as both .mp4 and .webm (list it without the extension). Click the TV to flip through them.
var TV_CHANNELS=[{src:"media/tv-ch1",name:"Cows on the bluff"},{src:"media/tv-ch2",name:"The redwoods"},{src:"media/tv-ch3",name:"Sailboats in the fog"},{src:"media/tv-ch4",name:"Waves on the rocks"},{src:"media/tv-ch5",name:"Breggy at Fenway"}];
