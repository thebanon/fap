<?php
if($params > 0) {
    //$data['query'] = $query;   
    if($params > 1 && $query[0] == "freak") {
        if($params > 1 && $query[0] == "id") {
        }
    }
} else {
    http_response_code(404);
    $data['error'] = ["code" => 404, "message" => "Unauthorized"];
    die();
}
?>