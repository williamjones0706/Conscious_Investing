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
    const result = await fetch('/something', json);

    const something = await result.json();

    console.log(something)
    
    document.getElementById("TheResult").innerText = something;
    document.getElementById("TheRecommendations").style.display = 'block';

};



modifyInputs();