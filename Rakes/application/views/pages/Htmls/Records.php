<html>
<head>
<title>Display records</title>
<style>
table, th, td {
  border: 1px solid black;
  border-collapse: collapse;
}
</style>
</head>
 
<body>
  <table width="600" border="0" cellspacing="5" cellpadding="5">
  <tr style="background:#CCC">
    <th>ID</th>
    <th>First Name</th>
    <th>Last Name</th>
    <th>Email</th>
  </tr>
 <?php
  $i=1;
  foreach($data as $row)
  {
  echo "<tr>";
  echo "<td>".$i."</td>";
  echo "<td>".$row->FNAME."</td>";
  echo "<td>".$row->LNAME."</td>";
  echo "<td>".$row->EMAIL."</td>";
  echo "</tr>";
  $i++;
  }
    ?>
</table>
</body>
</html>
