const APP_ID = "ac5cb494";
const APP_KEY = "0bd3fa37851816752a8884d6a237c9fe";

$("#btn-weight-ID").on("click", function(event) {
    event.preventDefault();
    // console.log(event.target);
    // console.log($("#input-weight-ID").val());
    // console.log($("#cb-dressed-ID"));
    // console.log($("#cb-dressed-ID").val());
    // console.log($("#cb-dressed-ID")[0].checked);

    let w = $("#input-weight-ID").val();
    let dressed = $("#cb-dressed-ID")[0].checked;
    let date = moment();

    let dataObj = {
        type: "weight",
        weight: w,
        dressed: dressed,
        timestamp: date.format()
    }

    let lf = JSON.parse(localStorage.getItem("lf-weight"));
    if (lf === null) lf = [];
    lf.push(dataObj);
    localStorage.setItem("lf-weight", JSON.stringify(lf));
    $("#weight-form-ID")[0].reset();
});

$("#btn-food-ID").on("click", function(event) {
    event.preventDefault();
    let n = $("#input-num-food-ID").val();
    let s = $("#input-size-ID").val();
    let f = $("#input-food-ID").val();
    let a = $("#input-AND-ID").val();


    if (f === "") return;
    let fa = f;
    if (a !== "") fa += " AND " + a;

    let query = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&nutrition-type=logging&ingr=${n}%20${s}%20${fa}`;

    $.ajax({
        url: query,
        method: "GET",
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            alert("some error");
        }

    }).then(function(response) {
        console.log(response);
        if (response.calories === 0 && response.totalWeight === 0) {
            // alert("check your entries");
            return;
        }

        let foodTodayCard = $("<div class='food-today-item-card'>")
        let controlRow = $("<div class='row' style='margin:0;'>");
        let closeCol = $("<div class='col 12 food-today-close'>").html("<i class='material-icons'>close</i>");
        controlRow.append(closeCol);
        foodTodayCard.append(controlRow);

        let foodEntry = $("<div>").addClass("food-today-item");
        let str = `${n} ${s} ${f}`;
        if (a !== "") str += ` & ${a}`;
        // foodEntry.append(controlRow);
        let row = $("<div class='row'>");
        let meal = $("<span class='col 1'>").text(str);
        let cal = $("<span  class='col 3 calories'>").text(response.calories);
        row.append(meal, cal);
        foodEntry.append(row);
        foodTodayCard.append(foodEntry);
        $("#food-today-ID").append(foodTodayCard);

        updateFoodTodayContainer();

        $(".food-today-close").on("click", function() {
            console.log(this);
            // console.log($(this).parent()[0].remove());
            let p = $(this).parent().parent()[0];
            p.remove();

        });


    });
});



function updateFoodTodayContainer() {
    let calories = 0;
    let cArray = $("#food-today-ID").children();
    console.log(cArray);
}