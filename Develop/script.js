var displayCurrentDay = document.querySelector("#currentDay");
var currentDay = moment();
displayCurrentDay.textContent = currentDay.format("dddd, MMMM Do YYYY");

// time blocks for standard biz hours
var timeBlock = $(".time-block").addClass("row");
var blockText = $("<p>").addClass("description");
timeBlock.append(blockText);

// format() returns string
var currentHour = parseInt(moment().format("H"));

var events = {};

// refresh page, saved events persist
var loadEvents = function () {
    events = JSON.parse(localStorage.getItem("events") || {});

    for (var i = 0; i < events.length; i++) {
        var eventText = $("<textarea>");
        eventText.text(events[i]);
    }
    $("textarea").append(eventText);

    // // loop over events object properties
    // $.each(events, function () {
    //     // loop over sub-array
    //     arr.forEach(function (event) {
    //         createEvent(event.text, event.time);
    //     });
    // });
};

var updateEvent = function () {
    var tempArr = [];
    $(this).each(function () {
        tempArr.push({
            text: $(this)
                .find("textarea")
                .text()
                .trim(),
            time: $(this)
                .find("id")
                .val()
        });
    });
    loadEvents();
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

// click save button to update event
$("button.saveBtn").click(function (event) {
    event.preventDefault();

    // $(this) current button being clicked
    var $element = $(this).siblings("textarea");
    // get time via id attribute
    var time = $element.attr("id");
    // get text content via $.val()
    var text = $element.val().trim();

    events[time] = text;
    events.push(text);

    loadEvents(events);

    localStorage.setItem("events", JSON.stringify(events));
    // if (id && text !== "") {
    //     events.push({
    //         text, time
    //     });
    //     saveEvents();
    // }
});

$(".saveBtn").hover(function () {
    $(this).addClass("saveBtn:hover");
});

loadEvents();
