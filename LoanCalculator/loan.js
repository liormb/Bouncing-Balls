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

<script>
   "use strict";
function calculate(){
  // take up input
  var amount = document.getElementById("amount");
  var apr = document.getElementById("apr");
  var years=document.getElementById("years");
  var zipcode = document.getElementById("zipcode");
  var payment=document.getElementById("payment");
  var total = document.getElementById("total");
 var totalinterest=document.getElementById("totalinterest");
 var principal = parseFloat(amount.value);
 var interest = parseFloat(apr.value)/100/12;
 var payments = parseFloat(years.value)*12;
 
 
 var x = Math.pow(1+interest ,payments);
 var monthly = prinicpal*x*interest / (x-1);
 
 if(isFinite(monthly)){
  payment.innerHTML = monthly.toFixed(2);
  total.innerHTML = (monthly*payments).toFized(2);
  totalinterest.innerHTML=((monthly*payments)-principal).toFixed(2);
  
  save(amount.value , apr.value , years.value , zipcode.value);
  try{
   getLenders(amount.value , apr.value , years.value , zipcode.value);
  }
  catch(e){
  }
 }else
  
  payment.innerHTML = " " ;
  total.innerHTML = "";
  totalinterest.innerHTML="";
  chart();
}
}

function save(amount , apr , years,zipcode ){
  if(window.localStorage){
   localStorage.loan_amount = amount ;
   localStorage.loan_apr = apr ;
   localStorage.loan_years = years ;
   localStorage.loan_zipcode = zipcode ;
  }
}

// restore input feilds when document first loads 

 window.onload = function(){
  if(window.localStorage && localStorage.loan_amount ){
    document.getElementById("amount").value = localStorage.loan_amount ; 
   document.getElementById("apr").value = localStorage.loan_apr ; 
   document.getElementById("years").value = localStorage.loan_years ; 
   document.getElementById("zipcode").value = localStorage.loan_zipcode ; 
  }
 }; 


function getLenders(amount ,apr ,years,zipcode ){
  if(!windows.XMLHttpRequest) return;
  var ad = document.getElementById("lenders");
 if(!ad) return ; 
 
}









   
  }
}
