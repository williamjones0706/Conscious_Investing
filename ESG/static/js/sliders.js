function modifyOffset() {
    var el, newPoint, newPlace, offset, siblings, k;
    width = this.offsetWidth;
    newPoint = (this.value - this.getAttribute("min")) / (this.getAttribute("max") - this.getAttribute("min"));
    offset = -5;
    if (newPoint < 0) { newPlace = 0; }
    else if (newPoint > 1) { newPlace = width; }
    else { newPlace = width * newPoint + offset; offset -= newPoint; }
    siblings = this.parentNode.childNodes;
    for (var i = 0; i < siblings.length; i++) {
        sibling = siblings[i];
        if (sibling.id == this.id) { k = true; }
        if ((k == true) && (sibling.nodeName == "OUTPUT")) {
            outputTag = sibling;
        }
    }
    outputTag.style.left = newPlace + "px";
    outputTag.style.marginLeft = offset;
    outputTag.innerHTML = this.value;
    // console.log(this.value);
}

function modifyInputs() {

    var inputs = document.getElementsByTagName("input");
    for (var i = 0; i < inputs.length; i++) {
        if (inputs[i].getAttribute("type") == "range") {
            inputs[i].onchange = modifyOffset;


            // the following taken from http://stackoverflow.com/questions/2856513/trigger-onchange-event-manually
            if ("fireEvent" in inputs[i]) {
                inputs[i].fireEvent("onchange");
            } else {
                var evt = document.createEvent("HTMLEvents");
                evt.initEvent("change", false, true);
                inputs[i].dispatchEvent(evt);

            }
        }
    }
}


async function handleSubmit(event) {
    var envi = 33.33 - envOUT.value * 3.33;
    var soci = 33.33 - socOUT.value * 3.33;
    var govi = 33.33 - govOUT.value * 3.33;
    // console.log(envi);
    // console.log(soci);
    // console.log(govi);

    event.preventDefault();
    let json = {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json"
        },
        redirect: "follow",
        referrer: "no-referrer",
        body: JSON.stringify(
            {
                data: {
                    "E": envi,
                    "S": soci,
                    "G": govi,
                }
            })
    }
    console.log(json);
    const result = await fetch('/output', json);

    const result_json = await result.json();
    model_results = JSON.parse(result_json)
    model_group = model_results.Result.Output
    console.log(model_group)
    
    showOutput(model_group)
    

};

function showOutput(model_group) {
    console.log(model_group)
    if (model_group == 0) {
        file_path = "../static/data/group0.json";
        d3.json("../static/data/group0.json").then(function(data) {
            console.log(data);
            var table = d3.select("#Recommendations-Output");
            var tbody = table.select("tbody");
            tbody.node().innerHTML = "";
            for(var i=0; i<data.length; i++) {
                console.log(data[i].Ticker);
                var trow;
                trow = tbody.append("tr");          
                trow.append("td").text(data[i].Ticker);
                trow.append("td").text(data[i].Company);
                trow.append("td").text(data[i].RoR);
            }
        });
      } else if (model_group == 1) {
        file_path = "../static/data/group1.json";
        d3.json("../static/data/group1.json").then(function(data) {
            console.log(data);
            var table = d3.select("#Recommendations-Output");
            var tbody = table.select("tbody");
            tbody.node().innerHTML = "";
            for(var i=0; i<data.length; i++) {
                console.log(data[i].Ticker);
                var trow;
                trow = tbody.append("tr");          
                trow.append("td").text(data[i].Ticker);
                trow.append("td").text(data[i].Company);
                trow.append("td").text(data[i].RoR);
            }
        });
      } else if (model_group == 2) {
        file_path = "../static/data/group2.json";
        d3.json("../static/data/group2.json").then(function(data) {
            console.log(data);
            var table = d3.select("#Recommendations-Output");
            var tbody = table.select("tbody");
            tbody.node().innerHTML = "";
            for(var i=0; i<data.length; i++) {
                console.log(data[i].Ticker);
                var trow;
                trow = tbody.append("tr");          
                trow.append("td").text(data[i].Ticker);
                trow.append("td").text(data[i].Company);
                trow.append("td").text(data[i].RoR);
            }
        });
      } else if (model_group == 3) {
        file_path = "../static/data/group3.json";
        d3.json("../static/data/group3.json").then(function(data) {
            console.log(data);
            var table = d3.select("#Recommendations-Output");
            var tbody = table.select("tbody");
            tbody.node().innerHTML = "";
            for(var i=0; i<data.length; i++) {
                console.log(data[i].Ticker);
                var trow;
                trow = tbody.append("tr");          
                trow.append("td").text(data[i].Ticker);
                trow.append("td").text(data[i].Company);
                trow.append("td").text(data[i].RoR);
            }
        });
      } else if (model_group == 4) {
        file_path = "../static/data/group4.json";
        d3.json("../static/data/group4.json").then(function(data) {
            console.log(data);
            var table = d3.select("#Recommendations-Output");
            var tbody = table.select("tbody");
            tbody.node().innerHTML = "";
            for(var i=0; i<data.length; i++) {
                console.log(data[i].Ticker);
                var trow;
                trow = tbody.append("tr");          
                trow.append("td").text(data[i].Ticker);
                trow.append("td").text(data[i].Company);
                trow.append("td").text(data[i].RoR);
            }
        });
      } else if (model_group == 5) {
        file_path = "../static/data/group5.json";
        d3.json("../static/data/group5.json").then(function(data) {
            console.log(data);
            var table = d3.select("#Recommendations-Output");
            var tbody = table.select("tbody");
            tbody.node().innerHTML = "";
            for(var i=0; i<data.length; i++) {
                console.log(data[i].Ticker);
                var trow;
                trow = tbody.append("tr");          
                trow.append("td").text(data[i].Ticker);
                trow.append("td").text(data[i].Company);
                trow.append("td").text(data[i].RoR);
            }
        });
      } else if (model_group == 6) {
        file_path = "../static/data/group6.json";
        d3.json("../static/data/group6.json").then(function(data) {
            console.log(data);
            var table = d3.select("#Recommendations-Output");
            var tbody = table.select("tbody");
            tbody.node().innerHTML = "";
            for(var i=0; i<data.length; i++) {
                console.log(data[i].Ticker);
                var trow;
                trow = tbody.append("tr");          
                trow.append("td").text(data[i].Ticker);
                trow.append("td").text(data[i].Company);
                trow.append("td").text(data[i].RoR);
            }
        });
      } else if (model_group == 7) {
        file_path = "../static/data/group7.json";
        d3.json("../static/data/group7.json").then(function(data) {
            console.log(data);
            console.log(data.length)
            var table = d3.select("#Recommendations-Output");
            var tbody = table.select("tbody");
            tbody.node().innerHTML = "";
            for(var i=0; i<data.length; i++) {
                console.log(data[i].Ticker);
                var trow;
                trow = tbody.append("tr");          
                trow.append("td").text(data[i].Ticker);
                trow.append("td").text(data[i].Company);
                trow.append("td").text(data[i].RoR);
            }
        });
      } 
    console.log(file_path)
    document.getElementById("TheRecommendations").style.display = 'block';  
    // d3.json(file_path).then(function(data) {
    //     console.log(data);
    //     var table = d3.select("#Recommendations-Output");
    //     var tbody = table.select("tbody");
    //     tbody.node().innerHTML = "";
    //     for(var i=0; i<data.length; i++) {
    //         console.log(data[i].Ticker);
    //         var trow;
    //         trow = tbody.append("tr");          
    //         trow.append("td").text(data[i].Ticker);
    //         trow.append("td").text(data[i].Company);
    //         trow.append("td").text(data[i].RoR);
    //     }
    // })

    // document.getElementById("TheResult").innerText = model_group;
    
}


modifyInputs();