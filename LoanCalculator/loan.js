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
<style> // CSS style sheet adds style to program output 
.output{ font-weight: bold; }
#payment { text-decoration: underline;}
#graph {border: solid black 1px ;}
th ,td {vertical-align: top;}
</style>
</head>
<body>

<table>
 <tr><th>Enter Loan Data:</th>
      <td></td>
 <th>Loan Balance , Cumulative Equity , and Interest Payments</th></tr>
 <tr><td>
