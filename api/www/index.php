<?php
header('Access-Control-Allow-Origin: *');
$data = [];

//$data['SERVER'] = $_SERVER;
$query_string = $qs = $_SERVER['QUERY_STRING'];
parse_str($query_string, $query_array);
$qa = $query_array;

$request_method = $_SERVER['REQUEST_METHOD'];
$request_uri = $_SERVER['REQUEST_URI'];
$sitemap = [
    "/",
    "/home/"
];


$_GET = $get = array_filter(explode('/',trim($request_uri,'/')));
$got =  count($_GET);
$query = array_slice($_GET,3);
$params = count($query);
$endpoints = ['create', 'read', 'update', 'delete'];
$host = $_SERVER['HTTP_HOST'];
$arrhost = explode('.',$host);
$arrhostcount = count($arrhost);
$domain = $arrhost[count($arrhost)-2];
$tld = $arrhost[count($arrhost)-1];
$request_uri = in_array($_SERVER['REQUEST_URI'],$sitemap) ? 'index.html' : $_SERVER['REQUEST_URI'];
$api = ['api.'.$domain.'.'.$tld, 'api-fapbux.herokuapp.com'];
$beta = 'beta.'.$domain.'.'.$tld;

$data["srv"] = $server = [
   'GET' => $_GET,
   'HTTP_HOST' => $host,
   'HOST_API' => $api,
   'HOST_ARRAY' => $arrhost,
   'HOST_COUNT' => count($arrhost),
   'HOST_ARRAY_LENGTH' => $arrhostcount,
   'HOST_DOMAIN' => $domain,
   'HOST_TLD' => $tld,
   'REQUEST_URI' => $request_uri
];
if($request_method == "POST") { $_POST = $post = json_decode(file_get_contents('php://input'),true); }

if(count($arrhost) > 2) {

    $subdomain = $arrhost[count($arrhost)-3];

    if(count($arrhost) > 3) {

        $data['error'] = ["code" => 404, "message" => "Unauthorized"];

    } else {
        
        if(in_array($host,$api)) {
            #$data['SERVER']['HOST'] = $api;
            #$data['SERVER']['HOST_MODE'] = 'API';
            if(count($_GET) > 1) {
                header('Content-Type: application/json');
                include(__DIR__.'/../'.$_GET[0].'/'.$_GET[1].'/index.php');
                count($data) > 0 ? print_r(json_encode($data, JSON_PRETTY_PRINT)) : null;
                unset($data);
            } else {
                http_response_code(404);
                $data['error'] = ["code" => 404, "message" => "Unauthorized"];
                print_r(json_encode($data, JSON_PRETTY_PRINT));
                die();
            }
        }

    }

} else {
    http_response_code(404);
    print_r(json_encode($data, JSON_PRETTY_PRINT));
    die();
}

unset($data);
?>
