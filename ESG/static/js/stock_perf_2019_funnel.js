var gd = document.getElementById('funnel');
var data = [
    {
        type: 'funnel',
        y: ["<b>All Stocks</b>", "<b>> 0% Returns</b>", "<b>> 10% Returns</b>", "<b>> 20% Returns</b>", "<b>> 40% Returns</b>", 
        "<b>> 60% Returns</b>", "<b>> 90% Returns</b>", "<b>> 110% Returns</b>"],
        x: [724, 623, 539, 421, 181, 61, 12, 4],
        hoverinfo: 'x+percent previous+percent initial'
    }];

var layout = {
    margin: {
        l: 150,
        r: 150,
        t: 0,
        b: 0
    },
    width: 1110,
    height: 400
}

Plotly.newPlot('funnel', data, layout);
