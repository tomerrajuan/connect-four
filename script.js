(function () {
  var currentPlayer;
  var foundEmptySlot;
  var button = $(".restart-btn");
  var slots = $(".board-column-slot");

  currentPlayer = "player-two-coin";

  $(".board-column").on("click", function (e) {
    timeRunningOut();
    switchPlayers();
    var col = $(e.currentTarget);
    var slotsInCol = col.children();

    for (var i = 5; i >= 0; i--) {
      if (
        !slotsInCol.eq(i).hasClass("player-one-coin") &&
        !slotsInCol.eq(i).hasClass("player-two-coin")
      ) {
        // add currentPlayer to board-column-slot
        foundEmptySlot = true;

        slotsInCol.eq(i).addClass(currentPlayer);
        changeClasses();
        break;
      }
    }
    // slotsInCol.eq(i).addClass(currentPlayer);
    if (!foundEmptySlot) {
      return;
    }

    //check for victory here

    var slotsInRow = $(".row" + i);

    if (checkForVictory(slotsInCol)) {
      doVictoryDance();
    } else if (checkForVictory(slotsInRow)) {
      doVictoryDance();
    } else if (checkDiagonal()) {
      doVictoryDance();
    } else {
      return;
    }
  });

  function timeRunningOut() {
    clearInterval(id);
    var secs = 7;
    var id = setInterval(function () {
      $(".clock").html(
        '<p class="time-left">' +
          "Time left:" +
          "</p>" +
          '<p class="time-waisted">' +
          secs +
          "</p>"
      );
      console.log(secs);
      secs--;

      $(".board-column").on("click", function () {
        clearInterval(id);
        secs = 7;
        return;
      });

      if (secs < 0) {
        $(".clock").html(
          '<p class="time-left">' +
            "Time left:" +
            "</p>" +
            "<p class='time-waisted'>" +
            "time out" +
            "</p>"
        );
        switchPlayers();
        secs = 7;
        changeClasses();

        return;
      }
    }, 1000);
  }

  function checkForVictory(slots) {
    var count = 0;

    for (var i = 0; i < slots.length; i++) {
      if (slots.eq(i).hasClass(currentPlayer)) {
        count++;
        if (count == 4) {
          return true;
        }
      } else {
        count = 0;
      }
    }
  }

  function checkDiagonal() {
    var victory = [
      [0, 7, 14, 21],
      [1, 8, 15, 22],
      [2, 9, 16, 23],
      [3, 8, 13, 18],
      [4, 9, 14, 19],
      [5, 10, 15, 20],
      [6, 13, 20, 27],
      [7, 14, 21, 28],
      [8, 15, 22, 29],
      [9, 14, 19, 24],
      [10, 15, 20, 25],
      [11, 16, 21, 26],
      [12, 19, 26, 33],
      [13, 20, 27, 34],
      [14, 21, 28, 35],
      [15, 20, 25, 30],
      [16, 21, 26, 31],
      [17, 22, 27, 32],
      [18, 25, 32, 39],
      [19, 26, 33, 40],
      [20, 27, 34, 41],
      [21, 26, 31, 36],
      [22, 27, 32, 37],
      [23, 28, 33, 38],
    ];
    for (var d = 0; d < victory.length; d++) {
      var count = 0;
      for (var k = 0; k < 4; k++) {
        if (slots.eq(victory[d][k]).hasClass(currentPlayer)) {
          count++;
          if (count == 4) {
            return true;
          }
          // console.log("winner");
        } else {
          count = 0;
        }
      }
    }
  }

  function switchPlayers() {
    changeClasses();
    if (currentPlayer == "player-one-coin") {
      currentPlayer = "player-two-coin";
    } else {
      currentPlayer = "player-one-coin";
    }
  }

  function changeClasses() {
    if (currentPlayer == "player-one-coin") {
      $(".player-one-box").addClass("on");
      $(".player-two-box").addClass("on");
    } else if (currentPlayer == "player-two-coin") {
      $(".player-one-box").removeClass("on");
      $(".player-two-box").removeClass("on");
    }
  }

  function doVictoryDance() {
    $(".winningMessage").addClass("on");
    $(".player-one-box").addClass("on");
    $(".player-two-box").removeClass("on");
    $(".player-one-box").addClass("off");
    $(".player-two-box").addClass("off");
    $(".clock").addClass("on");
    $(".board").addClass("on");
    if (currentPlayer == "player-one-coin") {
      $(".winningMessage").html("<h1>The winner is: player-one-coin</h1>");
    } else if (currentPlayer == "player-two-coin") {
      $(".winningMessage").html("<h1>The winner is: player-two-coin</h1>");
    }
  }

  button.on("click", function () {
    location.reload();
  });
})();
