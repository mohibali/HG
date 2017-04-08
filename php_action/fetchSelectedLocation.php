<?php 	

require_once 'core.php';

$locationId = $_POST['locationId'];

$sql = "SELECT location_id,location_name,location_active, location_status FROM locations WHERE location_id = $locationId";
$result = $connect->query($sql);

if($result->num_rows > 0) { 
 $row = $result->fetch_array();
} // if num_rows

$connect->close();

echo json_encode($row);