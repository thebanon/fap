<?php
$data['params'] = $params; 
$data['query'] = $query; 
if($params > 0) {  
    if($params > 1) {
        if($query[0] == "id") {
        }
    }
} else {
    http_response_code(404);
    $data['error'] = ["code" => 404, "message" => "Unauthorized"];
    die();
}
?>