var displayCurrentDay = document.querySelector("#currentDay");
var currentDay = moment();
displayCurrentDay.textContent = currentDay.format("dddd, MMMM Do YYYY");

// time blocks for standard biz hours
var timeBlock = $(".time-block").addClass("row");
var blockText = $("<p>").addClass("description");
timeBlock.append(blockText);

// format() returns string
var currentHour = parseInt(moment().format("H"));

var events = [];

// refresh page, saved events persist
var loadEvents = function (timeSlots) {
    events = [];
    // array of objects
    events = JSON.parse(localStorage.getItem("events")) || [];
    // console.log(typeof tempEvents);

    for (var i = 0; i < timeSlots.length; i++) {
        // console.log(timeSlots[i]);

        // find is a for loop

        // find the first value of time that is equal to value of time in index of timeSlots
        var event = events.find(x => x.time === timeSlots[i].time);
        if (event) {
            // 
            timeSlots[i].text.val(event.text);
        }
    }
};

var fetchEvents = function () {
    var tempArr = [];
    $("textarea").each(function (index, elem) {
        tempArr.push({
            time: $(elem)
                .attr("id"),
            text: $(elem)
        });
    });
    loadEvents(tempArr);
}

// time blocks COLOR CODED to indicate past, present, or future
$("textarea").each(function () {
    var $this = $(this);
    var id = parseInt($this.attr("id"));

    if (id < currentHour) {
        $(this).addClass("past");
    }
    if (id > currentHour) {
        $(this).addClass("future");
    }
    if (id === currentHour) {
        $(this).addClass("present");
    }
});

// click save button to add value to events
$("button.saveBtn").click(function (event) {
    event.preventDefault();

    // $(this) current button being clicked
    var $element = $(this).siblings("textarea");
    // console.log($element);
    // get time via id attribute
    var time = $element.attr("id");
    console.log(time);
    // get text content via $.val()
    var text = $element.val().trim();
    console.log(text);
    console.log(events);

    // save events to localStorage
    if (time && text !== "") {
        events.push({
            time, text
        });
        localStorage.clear();
        localStorage.setItem("events", JSON.stringify(events));

        // Find value in array??
        // events[i].text=text;
    };
});


$(".saveBtn").hover(function () {
    $(this).addClass("saveBtn:hover");
});

fetchEvents();
