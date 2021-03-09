var displayCurrentDay = document.querySelector("#currentDay");
var currentDay = moment();
displayCurrentDay.textContent = currentDay.format("dddd, MMMM Do YYYY");

// time blocks for standard biz hours
var timeBlock = $(".time-block").addClass("row");
var blockText = $("<p>").addClass("description");
timeBlock.append(blockText);

var events = {};
var times = [];
var currentHour = moment().format("LT");

// time blocks COLOR CODED to indicate past, present, or future
var createEvent = function (eventText, eventTime) {
    var eventLi = $("<li>")
        .addClass("time-block");

    var eventP = $("<p>")
        .addClass("description")
        .text(eventText);


    // append p element to parent li
    eventLi.append(eventP);
};

var loadEvents = function () {
    events = JSON.parse(localStorage.getItem("events"));

    if (!events) {
        events = []
    };

    $.each(events, function (arr) {
        arr.forEach(function (event) {
            createEvent(event.text, event.time);
        });
    });
};
// click save button, save event text in local storage
var saveEvents = function () {
    localStorage.setItem("events", JSON.stringify(events));
}

var updateEvent = function () {
    var tempArr = [];
    $(this)
        .children()
        .each(function () {
            tempArr.push({
                text: $(this)
                    .find("textarea")
                    .text()
                    .trim(),
                time: $(this)
                    .find("h4")
                    .text()
                    .trim()
            });
        });
    saveEvents();
}

var auditEvent = function (eventEl) {
    var time = $(eventEl)
        .find("textarea")
        .text()
        .trim();

    var currentTime = moment();

    if (moment().isAfter(currentTime)) {
        $(eventEl).addClass("future");
    } else if (moment().isBefore(currentTime)) {
        $(eventEl).addClass("past");
    } else if (moment().is(currentTime)) {
        $(eventEl).addClass("present");
    }
};


// click on time block, enter event
$("description .saveBtn").click(function () {
    var eventText = $("textarea").val();
    var eventTime = $("h4").val();

    if (eventText && eventTime) {
        createEvent(eventText, eventTime, "update");

        events.update.push({
            text: eventText,
            time: eventTime
        });

        saveEvents();
    }
});

$(".description").on("click", "textarea", function() {
    var text = $(this)
    .text()
    .trim();

    var textInput = $("<textarea>")
    .addClass("description")
    .val(text);
    $(this).replaceWith(textInput);

    textInput.trigger("focus");
});

$(".description").on("blur", "textarea", function() {
    var text = $(this)
    .val();

    var status = $(this)
    .closest("h4")
    .val();

    events[status].text = text;
    saveEvents();

    var editedEvent = $("<textarea>")
    .addClass("description")
    .text(text);

    $(this).replaceWith(editedEvent);
});

loadEvents();

setInterval(function() {
    $(".description").each(function() {
        auditEvent();
    });
}, (1000 * 60) *60);







// refresh page, saved events persist




