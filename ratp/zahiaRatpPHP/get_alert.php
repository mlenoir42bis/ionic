
<?php

if (isset($_SERVER['HTTP_ORIGIN'])) {
    header("Access-Control-Allow-Origin: {$_SERVER['HTTP_ORIGIN']}");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
}

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         

    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers:        {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");

    exit(0);
}

require "connexion.php";

$data = file_get_contents("php://input");
$request = json_decode($data);

$login = isset($request->login)?$request->login:null;
$login = mysqli_real_escape_string($con, $login);
$login = stripslashes($login);

$sql = "SELECT derniere_date_EAP, ADDDATE(derniere_date_EAP, INTERVAL 2 YEAR) FROM entretien_appreciation_professionnelle";

$result = mysqli_query($con, $sql);

$response = array();
$ret = array();
if($query = $con->prepare($sql)){

    if ($result = $query->execute()){
        $data = $query->get_result();

        while($row = mysqli_fetch_array($data)){
                array_push($response, array("derniere_date_EAP"=>$row['derniere_date_EAP'],
                "ADDDATE"=>$row["ADDDATE(derniere_date_EAP, INTERVAL 2 YEAR)"],
                ));                                        
            }

        $ret['err'] = false;
        $ret['data'] = $response;
        $query->free_result();
    
    }
    else {
        $ret['err'] = true;
        $ret['msg'] = $query->error;
    }
    $query->close();

}else{
   var_dump($con->error);
}


mysqli_close($con);

echo json_encode($ret);


?>
