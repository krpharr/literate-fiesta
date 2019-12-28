const APP_ID = "ac5cb494";
const APP_KEY = "0bd3fa37851816752a8884d6a237c9fe";

$("#btn-weight-ID").on("click", function(event) {
    event.preventDefault();
    console.log(event.target);
    console.log($("#input-weight-ID").val());

    let w = $("#input-weight-ID").val();
    let d = moment();

    let dataObj = {
        type: "weight",
        weight: w,
        timestamp: d.format()
    }

    let lf = JSON.parse(localStorage.getItem("lf-weight"));
    if (lf === null) lf = [];
    lf.push(dataObj);
    localStorage.setItem("lf-weight", JSON.stringify(lf));
});

$("#btn-food-ID").on("click", function(event) {
    event.preventDefault();
    let n = $("#input-num-food-ID").val();
    let s = $("#input-size-ID").val();
    let f = $("#input-food-ID").val();
    let a = $("#input-AND-ID").val();


    if (f === "") return;

    if (a !== "") f += " AND " + a;

    let query = `https://api.edamam.com/api/nutrition-data?app_id=${APP_ID}&app_key=${APP_KEY}&nutrition-type=logging&ingr=${n}%20${s}%20${f}`;

    $.ajax({
        url: query,
        method: "GET"

    }).then(function(response) {
        console.log(response);
    });
});