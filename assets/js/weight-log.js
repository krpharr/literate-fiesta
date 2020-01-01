ls = JSON.parse(localStorage.getItem("lf-weight"));

if (ls === null || ls.length < 1) {
    // deal with no entires
} else {
    ls.forEach(element => {
        console.log(element);
        if (element.type === "weight") {
            let container = $("<div>");
            // container.attr("style", "display:flex; justify-content: space-between;");
            let timestamp = moment(element.timestamp).format("MM/DD/YYYY hh:mm a");
            let span1 = $("<span>").attr("style", "padding:4px 8px;").text(`${element.weight}`);
            var str;
            element.dressed ? str = "dressed" : str = "";
            let span2 = $("<span>").attr("style", "padding:4px 8px;").text(str);
            let span3 = $("<span>").attr("style", "padding:4px 8px;").text(`${timestamp}`);
            container.append(span1, span2, span3);
            $("#weight-log-ID").append(container);
        }
    });
}