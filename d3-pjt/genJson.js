/*
Function to convert the input csv line into Array output
*/

function csvToArray(line) {
  /* Regular expression  pattern to validate CSV line input*/
  var re_valid = /^\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*(?:,\s*(?:'[^'\\]*(?:\\[\S\s][^'\\]*)*'|"[^"\\]*(?:\\[\S\s][^"\\]*)*"|[^,'"\s\\]*(?:\s+[^,'"\s\\]+)*)\s*)*$/;
  var re_value = /(?!\s*$)\s*(?:'([^'\\]*(?:\\[\S\s][^'\\]*)*)'|"([^"\\]*(?:\\[\S\s][^"\\]*)*)"|([^,'"\s\\]*(?:\s+[^,'"\s\\]+)*))\s*(?:,|$)/g;
//fix for avoiding invalid entry like "Cote d'Ivoire"
  line=line.replace("'"," ");
  line=line.replace("'"," ");
  // Return null for invalid input
  if (!re_valid.test(line)) return null;
  var a=[];
  line.replace(re_value, // "Walk" the string using replace with callback.
          function(m0, m1, m2, m3) {
              // Remove backslash from \' in single quoted values.
              if      (m1 !== undefined) a.push(m1.replace(/\\'/g, "'"));
              // Remove backslash from \" in double quoted values.
              else if (m2 !== undefined) a.push(m2.replace(/\\"/g, '"'));
              else if (m3 !== undefined) a.push(m3);
              return ''; // Return empty string.
          });
      // Handle special case of empty last value.
      if (/,\s*$/.test(line)) a.push('');
      return a;
  }
/*
Function to write to output stream
*/
  function writeToFile (line,ostream,cnt) {
    var result={};
    var len=line.length;
    for (var i=0;i<len;i++) {
      result[header[i]]=line[i];
    }
    if (cnt==1) { // check flag to know whether it is first element
      ostream.write(JSON.stringify(result));
    }else {
      // Insert comma for all elemnts other than first one
      ostream.write("," + JSON.stringify(result));
    }
    cnt++;
    return cnt;

  }

// Declaration to read file as a stream
var fs=require('fs'),
    readline=require('readline'),
    stream=require('stream');
// Array of ASIAN countries to filter required data
var ASIAN_COUNTRIES = ["Afghanistan", "Bahrain", "Bangladesh", "Bhutan", "Myanmar", "Cambodia", "China", "India", "Indonesia", "Iraq", "Israel", "Japan", "Jordan", "Kazakhstan", "Lebanon", "Malaysia", "Maldives", "Mongolia", "Nepal",
"Oman", "Pakistan", "Philippines", "Qatar", "Saudi Arabia", "Singapore", "Sri Lanka", "Syrian Arab Republic", "Tajikistan", "Thailand", "Timor-Leste", "Turkmenistan", "United Arab Emirates", "Uzbekistan", "Vietnam", "Yemen"];
var cntryCount=ASIAN_COUNTRIES.length;
var ip1=fs.ReadStream('Indicators.csv'),
    op1=fs.WriteStream('India_Population.json'),
    op2=fs.WriteStream('Asia_Population.json');
var rl=readline.createInterface (
        { input: ip1, terminal :false}
      );
// Flags for processing first line i.e HEADER
var cnt1=0,cnt2=0,cntryIdx,indIdx;
var header=[];

// Read line by line and convert into ARRAY
rl.on('line',function (line) {
  if (cnt1==0) { //build header

    header=csvToArray(line);

    if (header!=null) {
    cntryIdx=header.indexOf("CountryName");
    indIdx=header.indexOf("IndicatorCode");
    }
// Write opening brackets
    op1.write("[ ");
    op2.write("[ ");
    cnt1=1;
    cnt2=1;
  }
  else {
    curLine=csvToArray(line);
    if ( curLine == null) {console.log("error - invalid line"+line );return;}
// Filter required data i.e write to output only if condition matches
    if (curLine[cntryIdx]==="India" && ((curLine[indIdx]==="SP.RUR.TOTL.ZS")||(curLine[indIdx]==="SP.URB.TOTL.IN.ZS"))) {
      cnt1=writeToFile(curLine,op1,cnt1);
    } else if (curLine[indIdx]==="SP.RUR.TOTL" || curLine[indIdx]==="SP.URB.TOTL") {
      //Loop for Asian countries and write to o/p if it matches
      var match=false;
      for (var i=0;i<cntryCount;i++) {
        if (curLine[cntryIdx]===ASIAN_COUNTRIES[i]) {match=true;break;}
      }
      if (match) {
        cnt2=writeToFile(curLine,op2,cnt2);

      }

    }


  }
});
// After reaching EOF (end of file) apeend closing brackets
rl.on('close',function () {op1.write(" ]"); op2.write(" ]");});
