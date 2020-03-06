// // Add event listener for submit button
d3.select("#submit").on("click", handleSubmit);

// Submit Button handler
function handleSubmit() {
  // Prevent the page from refreshing
  d3.event.preventDefault();
  // Select the input value from the form
  var stock = d3.select("#stockInput").node().value;
  console.log(stock);
  // clear the input value
  d3.select("#stockInput").node().value = "";
  // Build the plot with the new stock
  getCompanyInfo(stock)
  // build_Basic_Line_Plot(stock);
  build_Candlestick_Plot(stock);
  // build_gauge_ESG(stock);
  // build_gauge_E(stock);
  // build_gauge_S(stock);
  // build_gauge_G(stock);
  getIncomeStatementData(stock)
  getCashFlowData(stock)
  getBalanceSheetData(stock)
  buildGetESGscores(stock)
}

// Collect Company Info
function getCompanyInfo(stock) {
  var queryUrl = `https://financialmodelingprep.com/api/v3/company/profile/${stock}`;
  d3.json(queryUrl).then(function(data) {
    var profile_info = data['profile'];
    var company_name = profile_info['companyName'];
    console.log(company_name);
    var company_description = profile_info['description'];
    var company_exchange = profile_info['exchange'];
    var company_industry = profile_info['industry'];
    var company_website = profile_info['website'];
    var company_ceo = profile_info['ceo'];
    var company_sector = profile_info['sector'];
    var company_logo = profile_info['image'];
    // d3.event.preventDefault();
    d3.select("#Company-Name").text(company_name);
    d3.select("#Compant-Logo").attr("src", company_logo);
    d3.select("#Company-Website-Link").attr("href", company_website);
    d3.select("#Company-Description").text(company_description);
    d3.select("#Company-Details-Header").text("Company Details");

    var table = d3.select("#details-table");
    var tbody = table.select("tbody");
    tbody.node().innerHTML = "";
    var trow_website = tbody.append("tr");
    var trow_exchange = tbody.append("tr");
    var trow_ceo = tbody.append("tr");
    var trow_sector = tbody.append("tr");
    var trow_industry = tbody.append("tr");

    trow_website.append("td").text("Website: ");
    trow_website.append("td").text(company_website);
    trow_exchange.append("td").text("Exchange: ");
    trow_exchange.append("td").text(company_exchange);
    trow_ceo.append("td").text("CEO: ");
    trow_ceo.append("td").text(company_ceo);
    trow_sector.append("td").text("Sector: ");
    trow_sector.append("td").text(company_sector);
    trow_industry.append("td").text("Industry: ");
    trow_industry.append("td").text(company_industry);
  });
}

// Build Guage Charts
function buildGetESGscores(stock) {
  d3.json("../static/data/ESG_Scores.json").then((data) => {
      // Slice and filer the data from Samples
      console.log(data);
      data_array = Object.entries(data);
      console.log(data_array);
      data_arrar_score = data_array.find(e => e[0] === stock)[1];
      console.log(data_arrar_score);
      console.log(stock)
      ESG_Score_Value = data_arrar_score['ESG Risk Score'];
      E_Score_Value = data_arrar_score['Environment Risk Score'];
      S_Score_Value = data_arrar_score['Social Risk Score'];
      G_Score_Value = data_arrar_score['Governance Risk Score'];

      console.log(ESG_Score_Value)
      console.log(E_Score_Value)
      console.log(S_Score_Value)
      console.log(G_Score_Value)

      build_gauge_ESG(ESG_Score_Value)
      build_gauge_E(E_Score_Value)
      build_gauge_S(S_Score_Value)
      build_gauge_G(G_Score_Value)

  });
};


function build_gauge_ESG(ESG_Score_Value) {
  var data = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: ESG_Score_Value,
      title: { text: "ESG Score", font: { size: 16 } },
      gauge: {
        axis: { range: [null, 100], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 33], color: "green" },
          { range: [33, 66], color: "yellow" },
          { range: [66, 100], color: "red" }
        ]
      }
    }
  ];
  
  var layout = {
    width: 325,
    height: 300,
    // margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { color: "darkblue", family: "Arial" }
  };
  
  Plotly.newPlot('Gauge_ESG', data, layout);

}

function build_gauge_E(E_Score_Value) {
  var data = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: E_Score_Value,
      title: { text: "Environment", font: { size: 16 } },
      gauge: {
        axis: { range: [null, 100], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 33], color: "green" },
          { range: [33, 66], color: "yellow" },
          { range: [66, 100], color: "red" }
        ]
      }
    }
  ];
  
  var layout = {
    width: 275,
    height: 250,
    // margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { color: "darkblue", family: "Arial" }
  };
  
  Plotly.newPlot('Gauge_E', data, layout);

}

function build_gauge_S(S_Score_Value) {
  var data = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: S_Score_Value,
      title: { text: "Social", font: { size: 16 } },
      gauge: {
        axis: { range: [null, 100], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 33], color: "green" },
          { range: [33, 66], color: "yellow" },
          { range: [66, 100], color: "red" }
        ]
      }
    }
  ];
  
  var layout = {
    width: 275,
    height: 250,
    // margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { color: "darkblue", family: "Arial" }
  };
  
  Plotly.newPlot('Gauge_S', data, layout);

}

function build_gauge_G(G_Score_Value) {
  var data = [
    {
      type: "indicator",
      mode: "gauge+number",
      value: G_Score_Value,
      title: { text: "Governance", font: { size: 16 } },
      gauge: {
        axis: { range: [null, 100], tickwidth: 1, tickcolor: "darkblue" },
        bar: { color: "darkblue" },
        bgcolor: "white",
        borderwidth: 2,
        bordercolor: "gray",
        steps: [
          { range: [0, 33], color: "green" },
          { range: [33, 66], color: "yellow" },
          { range: [66, 100], color: "red" }
        ]
      }
    }
  ];
  
  var layout = {
    width: 275,
    height: 250,
    // margin: { t: 25, r: 25, l: 25, b: 25 },
    paper_bgcolor: 'rgba(0,0,0,0)',
    font: { color: "darkblue", family: "Arial" }
  };
  
  Plotly.newPlot('Gauge_G', data, layout);

}

// Build Candle Stick Chart
function build_Candlestick_Plot(stock) {

  var url = `https://financialmodelingprep.com/api/v3/historical-price-full/${stock}?timeseries=1265`;

  d3.json(url).then(function(data) {

    // Grab values from the response json object to build the plots
    var timeseries_data = data['historical'];
    console.log(timeseries_data);
    var end_date = timeseries_data['0']['date'];
    console.log(end_date);
    var start_date = timeseries_data['1264']['date'];
    console.log(start_date);

    var dates = timeseries_data.map(row => row['date']);
    console.log(dates);
    
    var closingPrices = timeseries_data.map(row => row['close']);
    console.log(closingPrices);

    var openingPrices = timeseries_data.map(row => row['open']);
    console.log(openingPrices);

    var highPrices = timeseries_data.map(row => row['high']);
    console.log(highPrices);

    var lowPrices = timeseries_data.map(row => row['low']);
    console.log(lowPrices);

      var trace1 = {
      type: "scatter",
      mode: "lines",
      name: "Stock Price",
      x: dates,
      y: closingPrices,
      line: {
        color: "#17BECF"
      }
    };

    // Candlestick Trace
    var trace2 = {
      type: "candlestick",
      name: "Daily Range",
      x: dates,
      high: highPrices,
      low: lowPrices,
      open: openingPrices,
      close: closingPrices
    };

    var data = [trace1, trace2];

    var layout = {
      title: `${stock} closing prices`,
      xaxis: {
        title: "Date",
        range: [start_date, end_date],
        type: "date"
      },
      yaxis: {
        title: "Stock Price ($)",
        autorange: true,
        type: "linear"
      },
      paper_bgcolor: 'rgba(0,0,0,0)',
    };

    Plotly.newPlot("Stock_Chart", data, layout);
  });
}

// Format functions for tables
function formatNumber (num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
}

function formatYear (date) {
  var year = date.split("-");
  return year[0];
}

// Creat Tables
function getIncomeStatementData(stock) {

  var queryUrl = `https://financialmodelingprep.com/api/v3/financials/income-statement/${stock}`;
  d3.json(queryUrl).then(function(data) {
    var financial_data = data['financials'];
    var dates = financial_data.map(row => row['date']).reverse();
    console.log(dates);
    var revenue = financial_data.map(row => row['Revenue']).reverse();
    console.log(revenue);
    var cost_of_revenue = financial_data.map(row => row['Cost of Revenue']).reverse();
    console.log(cost_of_revenue);
    var gross_profit = financial_data.map(row => row['Gross Profit']).reverse();
    console.log(gross_profit);
    var research_expenses = financial_data.map(row => row['R&D Expenses']).reverse();
    console.log(research_expenses);
    var SGA_expenses = financial_data.map(row => row['SG&A Expense']).reverse();
    console.log(SGA_expenses);
    var operating_expenses = financial_data.map(row => row['Operating Expenses']).reverse();
    console.log(operating_expenses);
    var operating_income = financial_data.map(row => row['Operating Income']).reverse();
    console.log(operating_income);
    var interest_expense = financial_data.map(row => row['Interest Expense']).reverse();
    console.log(interest_expense);
    var earnings_before_tax = financial_data.map(row => row['Earnings before Tax']).reverse();
    console.log(earnings_before_tax);
    var income_tax_expense = financial_data.map(row => row['Income Tax Expense']).reverse();
    console.log(income_tax_expense);
    var net_income = financial_data.map(row => row['Net Income']).reverse();
    console.log(net_income);
    var eps = financial_data.map(row => row['EPS']).reverse();
    console.log(eps);
    console.log(data);
    buildIncomeSheetHeaders(dates);
    buildIncomeSheetRows(dates, revenue, cost_of_revenue, gross_profit, research_expenses, SGA_expenses,operating_expenses,operating_income,interest_expense,earnings_before_tax,income_tax_expense,net_income,eps);
  });
}

function buildIncomeSheetHeaders(dates) {
  var date_length = dates.length
  var table = d3.select("#Income-Sheet");
  var thead = table.select("thead");
  var trow = thead.select('tr');
  trow.node().innerHTML = "";
  trow.append('th').text("Income Statement");
  for (var i = 8; i < date_length; i++) {
    trow.append('th').text(formatYear(dates[i]));
  }
}
function buildIncomeSheetRows(dates, revenue, cost_of_revenue, gross_profit, research_expenses,SGA_expenses,operating_expenses,operating_income,interest_expense,earnings_before_tax,income_tax_expense,net_income,eps) {
  var date_length = dates.length
  var table = d3.select("#Income-Sheet");
  var tbody = table.select("tbody");
  tbody.node().innerHTML = "";
  var trevenue;
  trevenue = tbody.append('tr');
  trevenue.append('td').text("Revenue")
  for (var i = 8; i < date_length; i++) {
    trevenue.append('td').text(formatNumber(revenue[i]))
  }
  var tcost_of_revenue;
  tcost_of_revenue = tbody.append('tr');
  tcost_of_revenue.append('td').text("Cost of Revenue")
  for (var i = 8; i < date_length; i++) {
    tcost_of_revenue.append('td').text(formatNumber(cost_of_revenue[i]))
  }
  var tgross_profit;
  tgross_profit = tbody.append('tr');
  tgross_profit.append('td').text("Gross Profit")
  for (var i = 8; i < date_length; i++) {
    tgross_profit.append('td').text(formatNumber(gross_profit[i]))
  }
  var tresearch_expenses;
  tresearch_expenses = tbody.append('tr');
  tresearch_expenses.append('td').text("R&D Expenses")
  for (var i = 8; i < date_length; i++) {
    tresearch_expenses.append('td').text(formatNumber(research_expenses[i]))
  }
  var tSGA_expenses;
  tSGA_expenses = tbody.append('tr');
  tSGA_expenses.append('td').text("SG&A Expenses")
  for (var i = 8; i < date_length; i++) {
    tSGA_expenses.append('td').text(formatNumber(SGA_expenses[i]))
  }
  var toperating_expenses;
  toperating_expenses = tbody.append('tr');
  toperating_expenses.append('td').text("Operating Expenses")
  for (var i = 8; i < date_length; i++) {
    toperating_expenses.append('td').text(formatNumber(operating_expenses[i]))
  }
  var toperating_income;
  toperating_income = tbody.append('tr');
  toperating_income.append('td').text("Operating Income")
  for (var i = 8; i < date_length; i++) {
    toperating_income.append('td').text(formatNumber(operating_income[i]))
  }
  var tinterest_expense;
  tinterest_expense = tbody.append('tr');
  tinterest_expense.append('td').text("Interest Expenses")
  for (var i = 8; i < date_length; i++) {
    tinterest_expense.append('td').text(formatNumber(interest_expense[i]))
  }
  var tearnings_before_tax;
  tearnings_before_tax = tbody.append('tr');
  tearnings_before_tax.append('td').text("Earnings Before Tax")
  for (var i = 8; i < date_length; i++) {
    tearnings_before_tax.append('td').text(formatNumber(earnings_before_tax[i]))
  }
  var tincome_tax_expense;
  tincome_tax_expense = tbody.append('tr');
  tincome_tax_expense.append('td').text("Income Tax Expenses")
  for (var i = 8; i < date_length; i++) {
    tincome_tax_expense.append('td').text(formatNumber(income_tax_expense[i]))
  }
  var tnet_income;
  tnet_income = tbody.append('tr');
  tnet_income.append('td').text("Net Income")
  for (var i = 8; i < date_length; i++) {
    tnet_income.append('td').text(formatNumber(net_income[i]))
  }
  var teps;
  teps = tbody.append('tr');
  teps.append('td').text("Earnings per Share")
  for (var i = 8; i < date_length; i++) {
    teps.append('td').text(formatNumber(eps[i]))
  }
}

function getCashFlowData(stock) {

  var queryUrl = `https://financialmodelingprep.com/api/v3/financials/income-statement/${stock}`;
  d3.json(queryUrl).then(function(data) {
    var financial_data = data['financials'];
    var dates = financial_data.map(row => row['date']).reverse();
    console.log(dates);
    var revenue = financial_data.map(row => row['Revenue']).reverse();
    console.log(revenue);
    var gross_profit = financial_data.map(row => row['Gross Profit']).reverse();
    console.log(gross_profit);
    console.log(data);
    buildCashFlowHeaders(dates);
    buildCashFlowRows(dates, revenue, gross_profit);
  });
}

function buildCashFlowHeaders(dates) {
  var date_length = dates.length
  var table = d3.select("#Cash-Flow");
  var thead = table.select("thead");
  var trow = thead.select('tr');
  trow.node().innerHTML = "";
  trow.append('th').text("Cash Flow");
  for (var i = 8; i < date_length; i++) {
    trow.append('th').text(formatYear(dates[i]));
  }
}
function buildCashFlowRows(dates, revenue, gross_profit) {
  var date_length = dates.length
  var table = d3.select("#Cash-Flow");
  var tbody = table.select("tbody");
  tbody.node().innerHTML = "";
  var trevenue;
  trevenue = tbody.append('tr');
  trevenue.append('td').text("Revenue")
  for (var i = 8; i < date_length; i++) {
    trevenue.append('td').text(formatNumber(revenue[i]))
  }
  var tgross_profit;
  tgross_profit = tbody.append('tr');
  tgross_profit.append('td').text("Gross Profit")
  for (var i = 8; i < date_length; i++) {
    tgross_profit.append('td').text(formatNumber(gross_profit[i]))
  }
}

function getBalanceSheetData(stock) {

  var queryUrl = `https://financialmodelingprep.com/api/v3/financials/income-statement/${stock}`;
  d3.json(queryUrl).then(function(data) {
    var financial_data = data['financials'];
    var dates = financial_data.map(row => row['date']).reverse();
    console.log(dates);
    var revenue = financial_data.map(row => row['Revenue']).reverse();
    console.log(revenue);
    var gross_profit = financial_data.map(row => row['Gross Profit']).reverse();
    console.log(gross_profit);
    console.log(data);
    buildBalanceSheetHeaders(dates);
    buildBalanceSheetRows(dates, revenue, gross_profit);
  });
}

function buildBalanceSheetHeaders(dates) {
  var date_length = dates.length
  var table = d3.select("#Balance-Sheet");
  var thead = table.select("thead");
  var trow = thead.select('tr');
  trow.node().innerHTML = "";
  trow.append('th').text("Balance Sheet");
  for (var i = 8; i < date_length; i++) {
    trow.append('th').text(formatYear(dates[i]));
  }
}
function buildBalanceSheetRows(dates, revenue, gross_profit) {
  var date_length = dates.length
  var table = d3.select("#Balance-Sheet");
  var tbody = table.select("tbody");
  tbody.node().innerHTML = "";
  var trevenue;
  trevenue = tbody.append('tr');
  trevenue.append('td').text("Revenue")
  for (var i = 8; i < date_length; i++) {
    trevenue.append('td').text(formatNumber(revenue[i]))
  }
  var tgross_profit;
  tgross_profit = tbody.append('tr');
  tgross_profit.append('td').text("Gross Profit")
  for (var i = 8; i < date_length; i++) {
    tgross_profit.append('td').text(formatNumber(gross_profit[i]))
  }
}
