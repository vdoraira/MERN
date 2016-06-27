/*
* Function to draw multi-series line chart
*/

function drawLineChart() {

  function population(rurData,urbData) {
    var oWidth=1060,
        oHeight=500;
        var margin={left:100,top:30,right:30,bottom:20};
        var iWidth= (oWidth-margin.left-margin.right);
        var iHeight= (oHeight-margin.top-margin.bottom);
    var svgCont=d3.select("body").append("svg");
        svgCont.attr("width",oWidth);
        svgCont.attr("height",oHeight);
    var xScale=d3.scale.linear();
        xScale.domain([1960,2015]);
        xScale.range([0,800]);
    var yScale=d3.scale.linear();
        yScale.domain([100,0]);
        yScale.range([0,400]);
    var xAx=d3.svg.axis().scale(xScale).orient("bottom");
    var yAx=d3.svg.axis().scale(yScale).orient("left");
    var g=svgCont.append("g");
        g.attr("transform","translate("+margin.left+","+margin.top+")");
    var xAxG=g.append("g").attr("transform","translate(0,400)");
    var yAxG=g.append("g");

        xAxG.call(xAx);
        yAxG.call(yAx);
    var div = d3.select("body")
        .append("div")
        .style("opacity", 0);
    svgCont.append("text")
          .attr("class","yaxis_label")
          .attr("text-anchor","middle")
//          .attr("transform","translate(20,"+(oHeight/2)+")rotate(-90)")
          .attr("transform","translate(50,300)rotate(-90)")
          .attr("font-size","xx-large")
          .text("Population (%)");
    svgCont.append("text")
           .attr("class","xaxis_label")
           .attr("text-anchor","middle")
        //   .attr("transform","translate("+(oWidth/2)+","+(oHeight-18)+")")
          .attr("transform","translate(200,480)")
           .attr("font-size","xx-large")
           .text("Year");
    svgCont.append("text")
           .attr("text-anchor","middle")
           //.attr("transform","translate("+(oWidth/2)+","+(oHeight-3)+")")
           .attr("transform","translate(500,480)")
           .text(" Rural Population (Orange) - Urban Population (Yellow)");
    var urbFunc=d3.svg.line ();
        urbFunc.x(function (d) {return 100 + (d.Year-1960)*(800/55);})
               .y(function (d) {return (400 - (d.Value*4) +10);});
    var urbGraph=svgCont.append("path")
                 .attr("d",urbFunc(urbData))
                 .attr("stroke","yellow")
                 .attr("stroke-width",2)
                 .attr("fill","none");
    var rurFunc=d3.svg.line();
        rurFunc.x(function (d) {return 100 + (d.Year-1960)*(800/55);})
               .y(function (d) {return (400 - (d.Value*4) +10);});
    var rurGraph=svgCont.append("path")
                .transition()
                .attr("d",rurFunc(rurData))
                .attr("stroke","orange")
                .attr("stroke-width",2)
                .attr("fill","none")
                .duration(1000);
    svgCont.selectAll("circle").data(inpData).enter().append("circle")
               .transition()
               .attr("cx",function (d) {return 100 + (d.Year-1960)*(800/55);})
               .attr("cy",function (d) {return (400 - (d.Value*4) +10);})
               .attr("r",3)
               .style("fill","none")
               .style("stroke","blue")
               .style("stroke-width",2)
               .duration(2000);
               //.on();

    //svgCont.selectAll("circle").exit().remove();
  }


  var inpData=[];
  var rurData=[];
  var urbData=[];
  d3.json("India_Population.json",function (d) {
    inpData=d;
    var urbLen=inpData.length;
    for (var i=0;i<urbLen;i++) {
      if (inpData[i].IndicatorCode==="SP.URB.TOTL.IN.ZS") {
        urbData.push(inpData[i]);
      } else if (inpData[i].IndicatorCode==="SP.RUR.TOTL.ZS") {
        rurData.push(inpData[i]);
      }
    }

    population(rurData,urbData);
    });


} // drawLineChart

/*
* Function to draw stacked bar  chart
*/

function drawStackChart() {

  d3.json("Asia_Population.json",function (d) {

  type (d);
    var dLen=d.length;
    var prepData=[];
    //create array of objects
    for (var  i=0;i<dLen;i++) {
      var myYear=d[i].Year;
      var indx=(myYear-1960);
      var myVal=d[i].Value;
      var myPrefix=(d[i].IndicatorCode==="SP.RUR.TOTL"?"R":"U");
      if (!prepData[indx]) {prepData[indx]=[];}
      if (myPrefix=="R") {
        if (!prepData[indx][0]) {prepData[indx][0]=[];}
        prepData[indx][0].push(myVal);
      } else {
        if (!prepData[indx][1]) {prepData[indx][1]=[];}
          prepData[indx][1].push(myVal);
      }
    }
    //console.log(prepData);

    var inMatrix=[];

    var len=prepData.length;
    //console.log("len" +len);
    for (var i=0;i<len;i++) {
        var rSum=0,uSum=0;
        len1=prepData[i].length;
        for (var j=0;j<len1;j++) {
          var sum=0;
          len2=prepData[i][j].length;
          for (var k=0;k<len2;k++) {
            sum +=prepData[i][j][k];
            (j==0?rSum=sum:uSum=sum);
          } //k loop
      //    console.log( "rSum" + rSum);
      //    console.log("uSum" + uSum);
        } // j loop
        inMatrix[i]=[i,rSum,uSum];
      } // i loop
    console.log(inMatrix);
    asiaPopulation(inMatrix);
  }
  ); // d3.json call

  function type (d) {
    d.forEach (function (d1) {
    //  console.log("in type" + d1);
      d1.Year= +d1.Year;
      d1.Value=+d1.Value;
    } ) ;

    return d;

  }

  function asiaPopulation(inMatrix) {
    var remapped=["c1","c2"].map(function (dat,i) {
      return inMatrix.map(function (d,j) {
        return {x:j,y:d[i+1]};
      });
    });
  console.log(remapped);
  var stacked=d3.layout.stack()(remapped);
  console.log(stacked);

  var ow=1060,oh=500;
  var margin={left:30,top:20,right:20,bottom:20};
  var iw=(ow-margin.left-margin.right);
  var ih=(oh-margin.top-margin.bottom);

  var svg=d3.select("body").append("svg:svg")
          .attr("width",ow)
          .attr("height",oh)
          .append("svg:g");
          //.attr("transform","translate("+margin.left+","+ih+")");
  var x=d3.scale.linear().range([0,iw-200]);
  var y=d3.scale.linear().range([ih-100,0]);



    x.domain([1960,2015]);
    y.domain([0,d3.max(stacked[stacked.length - 1], function(d) { return (d.y + d.y0)/100000000; })]);
  //var revDomain=d3.extent(stacked[stacked.length - 1], function(d) { return (d.y0 + d.y)/100000000; });
  //y.domain(revDomain.reverse());
  //  console.log(y.domain());
    //return;
  //  y.domain(y.domain().reverse);

  var colors=d3.scale.category10();
  var xAx=d3.svg.axis().orient("bottom").scale(x);
  var yAx=d3.svg.axis().orient("left").scale(y);
  var xAxG=svg.append("g").attr("transform","translate(100,410)");
  var yAxG=svg.append("g").attr("transform","translate(100,50)");

      xAxG.call(xAx);
      yAxG.call(yAx);
      svg.append("text")
                //  .attr("x","-200")
                //  .attr("y","40")
                  .attr("class", "yaxis_label")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate (50,300) rotate(-90)")
                  .attr("font-size","xx-large")
                  .text("Population");

          svg.append("text")
                  .attr("class", "xaxis_label")
                  .attr("text-anchor", "middle")
                  .attr("transform", "translate(200,470)")
                  .attr("font-size","xx-large")
                  .text("Year");

          svg.append("text")
                //  .attr("text-anchor", "middle")
                  .attr("transform", "translate(400,470)")
                //  .attr("font-size","xx-large")
                  .text("Asian countries Rural-Urban population");



  // Add a group for each column.
  var valG=svg.selectAll("g.valG")
          .data(stacked)
          .enter().append("svg:g")
          .attr("class","valG")
          .attr("transform", "translate(100,+410)")
          .style("fill",function (d,i) {return colors(i);})
          .style("stroke",function (d,i){return d3.rgb(colors(i)).darker();});

  // Add a rect for each date.
  var rect=valG.selectAll("rect")
          .data(function (d) { return d;})
          .enter().append("svg:rect")
          .transition()
          .attr("x",function (d){return  (d.x*810/55);})
          .attr("y",function(d) {return  ((y(d.y + d.y0))/100000000);})
          .attr("height",function(d){return   ((y(d.y0) - y(d.y + d.y0))/100000000);})
          .attr("width",(810/55/2))
          .duration(1000);
          //.attr("width",x.rangeBand());

        //  rect.exit().remove();
  ;

  } //asiaPopulation function


} // drawStackChart
