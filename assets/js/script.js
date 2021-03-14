var displayCurrentDay = document.querySelector("#currentDay");
var currentDay = moment();
displayCurrentDay.textContent = currentDay.format("dddd, MMMM Do YYYY");

// time blocks for standard biz hours
var timeBlock = $(".time-block").addClass("row");
var blockText = $("<p>").addClass("description");
timeBlock.append(blockText);

// format() returns string
var currentHour = parseInt(moment().format("H"));

// refresh page, saved events persist
var loadEvents = function (timeSlots) {
  // events = JSON.parse(localStorage.getItem(time, text) || "[]");
  // for (var i = 0; i < timeSlots.length; i++) {
  //     console.log(timeSlots[i]);
  //     let time = localStorage.getItem(parseInt(timeSlots[i].time));
  //     if (time) {
  //         timeSlots[i].text.val(time);
  //     }
  // }

  // each element is an instance of the time, text obj
  timeSlots.forEach((element) => {
    console.log(element);
    let text = localStorage.getItem(parseInt(element.time));
    console.log(text);
    if (text) {
      element.text.val(text);
    }
  });
};

var fetchEvents = function () {
  var tempArr = [];
  // array iterator method
  $("textarea").each(function (index, elem) {
    tempArr.push({
      time: $(elem).attr("id"),
      text: $(elem),
    });
  });
  loadEvents(tempArr);
};

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
$("button.saveBtn").click(function (event, loadEvents) {
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

  // save events to localStorage
  if (time && text !== "") {
    console.log(time, text);
    localStorage.setItem(time, text);
  }
});

$(".saveBtn").hover(function () {
  $(this).addClass("saveBtn:hover");
});

fetchEvents();
