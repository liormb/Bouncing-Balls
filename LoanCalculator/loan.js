/*
what a real world client-side JS plus HTML plus CSS program looks like 
the drone eye view of its working ::
- how to find elements in the document 
- how to get user input 
- how to set HTML content of document elements 
- store data in browser 
- scripted HTTP requests 
- draw graphics with the <canvas> element 
*/

<!DOCTYPE html>
<html>
<head>
<title> JavaScript Loan Calculator </title>
<style> 
.output{ font-weight: bold; }
#payment { text-decoration: underline;}
#graph {border: solid black 1px ;}
th ,td {vertical-align: top;}
</style>
</head>
<body>
 <!-- 
  this is an HTML table with <input> elements that allow the user to enter data and <span> elements in which displays the output
  elements have ids : "interest" and "years" . ids used in the js code that follow the table .some of the input elements define 
  "onchange " or "on click" event handler . these specify the string of JS code to be executed when user enters data or clicks.
  -->
<table>
 <tr><th>Enter Loan Data:</th>
      <td></td>
 <th>Loan Balance , Cumulative Equity , and Interest Payments</th></tr>
 <tr><td>Amount of loan:</td>
     <td><input id="amount" onchange= "calculate();"</td>
     <td rowspan=8>
         <canvas id="graph" width="400" height="250"></canvas></td></tr>
 <tr><td>Annual interest : </td>
     <td> input id="apr" onchange="calculate();"</td>
 <tr><td>Repayment period(years):</td>
     <td><input id="years" onchange="calculate();"></td>
<tr><td>Zipcode:</td>
    <td><input id ="zipcode" onchange="calculate();"></td>
<tr><th>Approximate payments:</th>
     <td><button onclick="calculate();">Calculate</button></td></tr>
<tr><td>Monthly payments:</td>
    <td>$<span class ="output" id="payment"></span></td></tr>
<tr><td>Total payments:</td>
    <td>$<span class ="output" id ="total"></span></td></tr>
<tr><td>Total interest:</td>
    <td>$<span class="output" id="totalinterest"></span></td></tr>
<tr><th>Sponsors:</th><td colspan=2>
 Apply for loans withthe fine lenders :
  <div id ="lenders"></div></td></tr>
</table>


