<?php
if(count($_GET) > 2) { include(explode('?',$_GET[2])[0].'.php'); }
else { return http_response_code(404); }
?>