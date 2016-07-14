
var template = $.trim($('#rowTemplate').html());
function updateTable(matrix) {

  var tableString="";
  $.each(matrix,function (index,obj) {
    tableString+=template.replace (/{{YEAR}}/ig,1960+obj[0])
                      .replace (/{{RURAL}}/ig,obj[1])
                      .replace (/{{URBAN}}/ig,obj[2]);

          }

   );
   //console.log(tableString);
   $('.existingTable').html("<table > <tr><th>Year</th> <th>Rural Population</th><th>Urban Population</th></tr></table>");
   $('.existingTable').append( tableString );
}
