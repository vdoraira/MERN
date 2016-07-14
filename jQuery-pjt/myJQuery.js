(
  function() {
    var jsonData='';
  var table=$(".table-area");
  var file=table.data("file");
  var template = $.trim($('#rowTemplate').html());
  //console.log(template);
  $.getJSON(file,function(data) {
    jsonData=data;

    var matrix=drawChart(data);
    //console.log(matrix);
    updateTable(matrix);

     asiaPopulation(matrix);

// To remove table rows on clicking delete button

     //$('table').on('click','button',function (e) {
      $('.existingTable').on('click','button',function (e) {
       //alert("testing table click");
       self=$(this);
       var gp=$(self).closest("tr").css("background-color","red");
       var yr=gp.children().eq(0).html();
       var rmYr=parseFloat(yr)-1960;
       //console.log("Before" + jsonData.length);
       jsonData=$.grep(jsonData,function(e){
        // console.log("e.year" + e.Year + "yr" + yr);
         return e.Year != yr;
       });
       matrix=drawChart(jsonData);

      setTimeout(function (){gp.remove();},3000);
       //gp.remove();
       //console.log(matrix);
      // console.log("data" + data);
       d3.select("body svg").data([]).exit().remove();
       asiaPopulation(matrix);
     }); // Remove table rows on delete function

     // To add rows in table
     $('.add').click(function(e) {
       // alert("check");
       e.preventDefault();
       //console.log("values entered " + $('#yearIP').val() + " " + $('#ruralIP').val() + " "  + $('#urbanIP').val());
       var x,y,z,tableString="";
       x=$('#yearIP').val();
       y=parseFloat($('#ruralIP').val());
       z=parseFloat($('#urbanIP').val());
       if (x<1960 || x>2015) {
              alert ("Eneter year value between 1960 and 2015");
            }
       else {

            // Insert new record/row in JSON and update table
            var adYr=parseFloat(x)-1960;
            matrix[adYr]=[adYr,y,z];
            updateTable(matrix);
            d3.select("body svg").data([]).exit().remove();
            asiaPopulation(matrix);
           }

     }

     );
     // Add table rows function

    } ); // getJson
  } // function



)(); // self invoking main jQuery call




//var jsonData="Asia_Population.json";
//drawStackChart(jsonData);
