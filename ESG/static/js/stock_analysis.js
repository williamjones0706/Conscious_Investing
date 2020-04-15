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
  // getBalanceSheetData(stock)
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
    build_Income_Statement_Plots(dates, revenue, cost_of_revenue, gross_profit, research_expenses, SGA_expenses,operating_expenses,operating_income,interest_expense,earnings_before_tax,income_tax_expense,net_income,eps);
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

  var queryUrl = `https://financialmodelingprep.com/api/v3/financials/cash-flow-statement/${stock}`;
  d3.json(queryUrl).then(function(data) {
    var financial_data = data['financials'];
    var dates = financial_data.map(row => row['date']).reverse();
    console.log(dates);
    var depreciation_amortization = financial_data.map(row => row['Depreciation & Amortization']).reverse();
    console.log(depreciation_amortization);
    var stock_based_compensation = financial_data.map(row => row['Stock-based compensation']).reverse();
    console.log(stock_based_compensation);
    var operating_cash_flow = financial_data.map(row => row['Operating Cash Flow']).reverse();
    console.log(operating_cash_flow);
    var capital_expenditures = financial_data.map(row => row['Capital Expenditure']).reverse();
    console.log(capital_expenditures);
    var acquisitions = financial_data.map(row => row['Acquisitions and disposals']).reverse();
    console.log(acquisitions);
    var investment_purchases = financial_data.map(row => row['Investment purchases and sales']).reverse();
    console.log(investment_purchases);
    var investment_cash_flow = financial_data.map(row => row['Investing Cash flow']).reverse();
    console.log(investment_cash_flow);
    var net_debt = financial_data.map(row => row['Issuance (repayment) of debt']).reverse();
    console.log(net_debt);
    var share_repurchases = financial_data.map(row => row['Issuance (buybacks) of shares']).reverse();
    console.log(share_repurchases);
    var dividends = financial_data.map(row => row['Dividend payments']).reverse();
    console.log(dividends);
    var financing_cash_flow = financial_data.map(row => row['Financing Cash Flow']).reverse();
    console.log(financing_cash_flow);
    var free_cash_flow = financial_data.map(row => row['Free Cash Flow']).reverse();
    console.log(free_cash_flow);
    console.log(data);
    buildCashFlowHeaders(dates);
    buildCashFlowRows(dates, depreciation_amortization, stock_based_compensation,operating_cash_flow,capital_expenditures,acquisitions,investment_purchases,investment_cash_flow,net_debt,share_repurchases,dividends,financing_cash_flow,free_cash_flow);
    build_Cash_Flow_Plots(dates, depreciation_amortization, stock_based_compensation,operating_cash_flow,capital_expenditures,acquisitions,investment_purchases,investment_cash_flow,net_debt,share_repurchases,dividends,financing_cash_flow,free_cash_flow);
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
function buildCashFlowRows(dates, depreciation_amortization, stock_based_compensation,operating_cash_flow,capital_expenditures,acquisitions,investment_purchases,investment_cash_flow,net_debt,share_repurchases,dividends,financing_cash_flow,free_cash_flow) {
  var date_length = dates.length
  var table = d3.select("#Cash-Flow");
  var tbody = table.select("tbody");
  tbody.node().innerHTML = "";
  var tdepreciation;
  tdepreciation = tbody.append('tr');
  tdepreciation.append('td').text("Depreciation & Amortization")
  for (var i = 8; i < date_length; i++) {
    tdepreciation.append('td').text(formatNumber(depreciation_amortization[i]))
  }
  var tstockcompensation;
  tstockcompensation = tbody.append('tr');
  tstockcompensation.append('td').text("Stock-based Compensation")
  for (var i = 8; i < date_length; i++) {
    tstockcompensation.append('td').text(formatNumber(stock_based_compensation[i]))
  }
  var toperatingcashflow;
  toperatingcashflow = tbody.append('tr');
  toperatingcashflow.append('td').text("Operating Cash Flow")
  for (var i = 8; i < date_length; i++) {
    toperatingcashflow.append('td').text(formatNumber(operating_cash_flow[i]))
  }
  var tcapitalexpenditures;
  tcapitalexpenditures = tbody.append('tr');
  tcapitalexpenditures.append('td').text("Capital Expenditures")
  for (var i = 8; i < date_length; i++) {
    tcapitalexpenditures.append('td').text(formatNumber(capital_expenditures[i]))
  }
  var tacquisition;
  tacquisition = tbody.append('tr');
  tacquisition.append('td').text("Acquisitions and Disposals")
  for (var i = 8; i < date_length; i++) {
    tacquisition.append('td').text(formatNumber(acquisitions[i]))
  }
  var tinvestmentpurchases;
  tinvestmentpurchases = tbody.append('tr');
  tinvestmentpurchases.append('td').text("Investment Purchases and Sales")
  for (var i = 8; i < date_length; i++) {
    tinvestmentpurchases.append('td').text(formatNumber(investment_purchases[i]))
  }
  var tinvestmentcashflow;
  tinvestmentcashflow = tbody.append('tr');
  tinvestmentcashflow.append('td').text("Investing Cash flow")
  for (var i = 8; i < date_length; i++) {
    tinvestmentcashflow.append('td').text(formatNumber(investment_cash_flow[i]))
  }
  var tnetdebt;
  tnetdebt = tbody.append('tr');
  tnetdebt.append('td').text("Issuance (Repayment) of Debt")
  for (var i = 8; i < date_length; i++) {
    tnetdebt.append('td').text(formatNumber(net_debt[i]))
  }
  var tsharerepurchases;
  tsharerepurchases = tbody.append('tr');
  tsharerepurchases.append('td').text("Issuance (Buybacks) of Shares")
  for (var i = 8; i < date_length; i++) {
    tsharerepurchases.append('td').text(formatNumber(share_repurchases[i]))
  }
  var tdividends;
  tdividends = tbody.append('tr');
  tdividends.append('td').text("Dividend Payments")
  for (var i = 8; i < date_length; i++) {
    tdividends.append('td').text(formatNumber(dividends[i]))
  }
  var tfinancingcashflow;
  tfinancingcashflow = tbody.append('tr');
  tfinancingcashflow.append('td').text("Financing Cash Flow")
  for (var i = 8; i < date_length; i++) {
    tfinancingcashflow.append('td').text(formatNumber(financing_cash_flow[i]))
  }
  var tfreecashflow;
  tfreecashflow = tbody.append('tr');
  tfreecashflow.append('td').text("Free Cash Flow")
  for (var i = 8; i < date_length; i++) {
    tfreecashflow.append('td').text(formatNumber(free_cash_flow[i]))
  }
}

// function getBalanceSheetData(stock) {

//   var queryUrl = `https://financialmodelingprep.com/api/v3/financials/income-statement/${stock}`;
//   d3.json(queryUrl).then(function(data) {
//     var financial_data = data['financials'];
//     var dates = financial_data.map(row => row['date']).reverse();
//     console.log(dates);
//     var revenue = financial_data.map(row => row['Revenue']).reverse();
//     console.log(revenue);
//     var gross_profit = financial_data.map(row => row['Gross Profit']).reverse();
//     console.log(gross_profit);
//     console.log(data);
//     buildBalanceSheetHeaders(dates);
//     buildBalanceSheetRows(dates, revenue, gross_profit);
//   });
// }

// function buildBalanceSheetHeaders(dates) {
//   var date_length = dates.length
//   var table = d3.select("#Balance-Sheet");
//   var thead = table.select("thead");
//   var trow = thead.select('tr');
//   trow.node().innerHTML = "";
//   trow.append('th').text("Balance Sheet");
//   for (var i = 8; i < date_length; i++) {
//     trow.append('th').text(formatYear(dates[i]));
//   }
// }
// function buildBalanceSheetRows(dates, revenue, gross_profit) {
//   var date_length = dates.length
//   var table = d3.select("#Balance-Sheet");
//   var tbody = table.select("tbody");
//   tbody.node().innerHTML = "";
//   var trevenue;
//   trevenue = tbody.append('tr');
//   trevenue.append('td').text("Revenue")
//   for (var i = 8; i < date_length; i++) {
//     trevenue.append('td').text(formatNumber(revenue[i]))
//   }
//   var tgross_profit;
//   tgross_profit = tbody.append('tr');
//   tgross_profit.append('td').text("Gross Profit")
//   for (var i = 8; i < date_length; i++) {
//     tgross_profit.append('td').text(formatNumber(gross_profit[i]))
//   }
// }


function build_Income_Statement_Plots(dates, revenue, cost_of_revenue, gross_profit, research_expenses, SGA_expenses,operating_expenses,operating_income,interest_expense,earnings_before_tax,income_tax_expense,net_income,eps) {
  var date_length = dates.length
  var x_data = [];
  var y_revenue = [];
  var y_cost_of_revenue = [];
  var y_gross_profit = [];
  var y_research_expenses = [];
  var y_SGA_expenses = [];
  var y_operating_expenses = [];
  var y_operating_income = [];
  var y_interest_expense = [];
  var y_earnings_before_tax = [];
  var y_income_tax_expense = [];
  var y_net_income = [];
  var y_eps = [];


  for (var i = 3; i < date_length; i++) {
    x_data.push(formatYear(dates[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_revenue.push(formatNumber(revenue[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_cost_of_revenue.push(formatNumber(cost_of_revenue[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_gross_profit.push(formatNumber(gross_profit[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_research_expenses.push(formatNumber(research_expenses[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_SGA_expenses.push(formatNumber(SGA_expenses[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_operating_expenses.push(formatNumber(operating_expenses[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_operating_income.push(formatNumber(operating_income[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_interest_expense.push(formatNumber(interest_expense[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_earnings_before_tax.push(formatNumber(earnings_before_tax[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_income_tax_expense.push(formatNumber(income_tax_expense[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_net_income.push(formatNumber(net_income[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_eps.push(eps[i])
  }

  var trace_revenue = {
    x: x_data,
    y: y_revenue,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_revenue = [trace_revenue];
  var layout_revenue = {
    title: 'Revenue',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
    // paper_bgcolor: 'rgb(153, 153, 153)',
    // plot_bgcolor: 'rgb(153, 153, 153)',
  };
  Plotly.newPlot('Revenue_Chart', data_revenue, layout_revenue);

  var trace_cost_of_revenue = {
    x: x_data,
    y: y_cost_of_revenue,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_cost_of_revenue = [trace_cost_of_revenue];
  var layout_cost_of_revenue = {
    title: 'Cost of Revenue',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('Cost_of_Revenue_Chart', data_cost_of_revenue, layout_cost_of_revenue);

  var trace_gross_profit = {
    x: x_data,
    y: y_gross_profit,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_gross_profit = [trace_gross_profit];
  var layout_gross_profit = {
    title: 'Gross Profit',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('Gross_Profit_Chart', data_gross_profit, layout_gross_profit);

  var trace_research_expenses = {
    x: x_data,
    y: y_research_expenses,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_research_expenses = [trace_research_expenses];
  var layout_research_expenses = {
    title: 'Research & Development Expenses',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('Research_Expenses_Chart', data_research_expenses, layout_research_expenses);

  var trace_SGA_expenses = {
    x: x_data,
    y: y_SGA_expenses,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_SGA_expenses = [trace_SGA_expenses];
  var layout_SGA_expenses = {
    title: 'Selling, General and Administrative (SG&A) Expenses',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('SGA_Expenses_Chart', data_SGA_expenses, layout_SGA_expenses);

  var trace_operating_expenses = {
    x: x_data,
    y: y_operating_expenses,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_operating_expenses = [trace_operating_expenses];
  var layout_operating_expenses = {
    title: 'Operating Expenses',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('Operating_Expenses_Chart', data_operating_expenses, layout_operating_expenses);

  var trace_operating_income = {
    x: x_data,
    y: y_operating_income,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_operating_income = [trace_operating_income];
  var layout_operating_income = {
    title: 'Operating Income',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('Operating_Income_Chart', data_operating_income, layout_operating_income);

  var trace_interest_expense = {
    x: x_data,
    y: y_interest_expense,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_interest_expense = [trace_interest_expense];
  var layout_interest_expense = {
    title: 'Interest Expense',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('Interest_Expense_Chart', data_interest_expense, layout_interest_expense);

  var trace_earnings_before_tax = {
    x: x_data,
    y: y_earnings_before_tax,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_earnings_before_tax = [trace_earnings_before_tax];
  var layout_earnings_before_tax = {
    title: 'Earnings Before Taxes',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('Earnings_Before_Tax_Chart', data_earnings_before_tax, layout_earnings_before_tax);
  
  var trace_income_tax_expense = {
    x: x_data,
    y: y_income_tax_expense,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_income_tax_expense = [trace_income_tax_expense];
  var layout_income_tax_expense = {
    title: 'Income Tax Expenses',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('Income_Tax_Expense_Chart', data_income_tax_expense, layout_income_tax_expense);

  var trace_net_income = {
    x: x_data,
    y: y_net_income,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_net_income = [trace_net_income];
  var layout_net_income = {
    title: 'Net Income',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('Net_Income_Chart', data_net_income, layout_net_income);

  var trace_eps = {
    x: x_data,
    y: y_eps,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_eps = [trace_eps];
  var layout_eps = {
    title: 'Earnings per Share',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('EPS_Chart', layout_eps, data_eps);

}

function build_Cash_Flow_Plots(dates, depreciation_amortization, stock_based_compensation,operating_cash_flow,capital_expenditures,acquisitions,investment_purchases,investment_cash_flow,net_debt,share_repurchases,dividends,financing_cash_flow,free_cash_flow) {
  var date_length = dates.length
  var x_data = [];
  var y_depreciation_amortization = [];
  var y_stock_based_compensation = [];
  var y_operating_cash_flow = [];
  var y_capital_expenditures = [];
  var y_acquisitions = [];
  var y_investment_purchases = [];
  var y_investment_cash_flow = [];
  var y_net_debt = [];
  var y_share_repurchases = [];
  var y_dividends = [];
  var y_financing_cash_flow = [];
  var y_free_cash_flow = [];


  for (var i = 3; i < date_length; i++) {
    x_data.push(formatYear(dates[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_depreciation_amortization.push(formatNumber(depreciation_amortization[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_stock_based_compensation.push(formatNumber(stock_based_compensation[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_operating_cash_flow.push(formatNumber(operating_cash_flow[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_capital_expenditures.push(formatNumber(capital_expenditures[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_acquisitions.push(formatNumber(acquisitions[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_investment_purchases.push(formatNumber(investment_purchases[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_investment_cash_flow.push(formatNumber(investment_cash_flow[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_net_debt.push(formatNumber(net_debt[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_share_repurchases.push(formatNumber(share_repurchases[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_dividends.push(formatNumber(dividends[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_financing_cash_flow.push(formatNumber(financing_cash_flow[i]))
  }
  for (var i = 3; i < date_length; i++) {
    y_free_cash_flow.push(free_cash_flow[i])
  }

  var trace_depreciation_amortization = {
    x: x_data,
    y: y_depreciation_amortization,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_depreciation_amortization = [trace_depreciation_amortization];
  var layout_depreciation_amortization = {
    title: 'Depreciation & Amortization',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('DepreciationAmortization_Chart', data_depreciation_amortization, layout_depreciation_amortization);

  var trace_stock_based_compensation = {
    x: x_data,
    y: y_stock_based_compensation,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_stock_based_compensation = [trace_stock_based_compensation];
  var layout_stock_based_compensation = {
    title: 'Stock-based Compensation',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('StockbasedCompensation_Chart', data_stock_based_compensation, layout_stock_based_compensation);

  var trace_operating_cash_flow = {
    x: x_data,
    y: y_operating_cash_flow,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_operating_cash_flow = [trace_operating_cash_flow];
  var layout_operating_cash_flow = {
    title: 'Operating Cash Flow',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('OperatingCashFlow_Chart', data_operating_cash_flow, layout_operating_cash_flow);

  var trace_capital_expenditures = {
    x: x_data,
    y: y_capital_expenditures,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_capital_expenditures = [trace_capital_expenditures];
  var layout_capital_expenditures = {
    title: 'Capital Expenditures',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('CapitalExpenditures_Chart', data_capital_expenditures, layout_capital_expenditures);

  var trace_acquisitions = {
    x: x_data,
    y: y_acquisitions,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_acquisitions = [trace_acquisitions];
  var layout_acquisitions = {
    title: 'Acquisitions and Disposals',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('AcquisitionsDisposals_Chart', data_acquisitions, layout_acquisitions);

  var trace_investment_purchases = {
    x: x_data,
    y: y_investment_purchases,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_investment_purchases = [trace_investment_purchases];
  var layout_investment_purchases = {
    title: 'Investment Purchases and Sales',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('InvestmentPurchasesSales_Chart', data_investment_purchases, layout_investment_purchases);

  var trace_investment_cash_flow = {
    x: x_data,
    y: y_investment_cash_flow,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_investment_cash_flow = [trace_investment_cash_flow];
  var layout_investment_cash_flow = {
    title: 'Investing Cash Flow',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('InvestingCashFlow_Chart', data_investment_cash_flow, layout_investment_cash_flow);

  var trace_net_debt = {
    x: x_data,
    y: y_net_debt,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_net_debt = [trace_net_debt];
  var layout_net_debt = {
    title: 'Issuance (Repayment) of Debt',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('NetDebt_Chart', data_net_debt, layout_net_debt);

  var trace_share_repurchases = {
    x: x_data,
    y: y_share_repurchases,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_share_repurchases = [trace_share_repurchases];
  var layout_share_repurchases = {
    title: 'Issuance (Buybacks) of Shares',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('ShareRepurchases_Chart', data_share_repurchases, layout_share_repurchases);
  
  var trace_dividends = {
    x: x_data,
    y: y_dividends,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_dividends = [trace_dividends];
  var layout_dividends = {
    title: 'Dividend Payments',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('Dividends_Chart', data_dividends, layout_dividends);

  var trace_financing_cash_flow = {
    x: x_data,
    y: y_financing_cash_flow,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_financing_cash_flow = [trace_financing_cash_flow];
  var layout_financing_cash_flow = {
    title: 'Financing Cash Flow',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('FinancingCashFlow_Chart', data_financing_cash_flow, layout_financing_cash_flow);

  var trace_free_cash_flow = {
    x: x_data,
    y: y_free_cash_flow,
    type: 'bar',
    marker: {
      color: 'rgb(142,124,195)'
    }
  };
  var data_free_cash_flow = [trace_free_cash_flow];
  var layout_free_cash_flow = {
    title: 'Free Cash Flow',
    font:{
      family: 'Raleway, sans-serif'
    },
    showlegend: false,
    xaxis: {
      tickangle: 0
    },
    yaxis: {
      zeroline: false,
      gridwidth: 2
    },
    bargap :0.05
  };
  Plotly.newPlot('FreeCashFlow_Chart', data_free_cash_flow, layout_free_cash_flow);
  document.getElementById("TheCompanyInfo").style.display = 'block';

}