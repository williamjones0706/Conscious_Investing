$(document).ready( function () {
    $('#myTable').DataTable();
});

$(document).ready(function(){
    $("#selectField").on("change", function() {
      var value = $(this).val().toLowerCase();
      $("#myTable tr").filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
      });
    });
  });


// $ (document).ready (function() {
//     // function addRemoveClass (theRows) {
//     //     theRows.removeClass ("odd even");
//     //     theRows.filter(":odd").addClass ("odd");
//     //     theRows.filter(":even").addClass ("even");
//     // }
//     var rows= ("#myTable tr:not (HeadRow)");
//     removeClass (rows);
    
//     $ ("#selectField").change (function() {
//         var selected = $(this).value;
    
//         if (selected !="All") {

//             rows.filter("[Sector="+ selected +"]").show();
//             rows.not("[Sector="+ selected +"]").hide();
//             var visibleRows = rows.filter("[Sector="+ selected +"]");
//             addClass (visibleRows);
//         } 
//         else {
//             rows.show();
//             addClass (rows);
//         }
//     });
// });