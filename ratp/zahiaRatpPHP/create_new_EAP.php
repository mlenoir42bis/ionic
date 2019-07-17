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

$matricule_agents = isset($request->matricule_agents)?$request->matricule_agents:null;
$matricule_agents = mysqli_real_escape_string($con, $matricule_agents);
$matricule_agents = stripslashes($matricule_agents);

$derniere_date_EAP = isset($request->derniere_date_EAP)?$request->derniere_date_EAP:null;
$derniere_date_EAP = mysqli_real_escape_string($con, $derniere_date_EAP);
$derniere_date_EAP = stripslashes($derniere_date_EAP);

$prochaine_date_EAP = isset($request->prochaine_date_EAP)?$request->prochaine_date_EAP:null;
$prochaine_date_EAP = mysqli_real_escape_string($con, $prochaine_date_EAP);
$prochaine_date_EAP = stripslashes($prochaine_date_EAP);

$commentaire_EAP = isset($request->commentaire_EAP)?$request->commentaire_EAP:null;
$commentaire_EAP = mysqli_real_escape_string($con, $commentaire_EAP);
$commentaire_EAP = stripslashes($commentaire_EAP);

/*
$tab = array();
$tab['matricule_agents'] = $matricule_agents;
$tab['derniere_date_EAP'] = $derniere_date_EAP;
$tab['prochaine_date_EAP'] = $prochaine_date_EAP;
$tab['commentaire_EAP'] = $commentaire_EAP;
*/

$sql = "INSERT INTO `entretien_appreciation_professionnelle` (derniere_date_EAP, prochaine_date_EAP, commentaire_EAP, matricule_agents) VALUES (?,?,?,?)";

$ret = array();
if($query = $con->prepare($sql)){
    $query->bind_param('sssi', $derniere_date_EAP, $prochaine_date_EAP, $commentaire_EAP, $matricule_agents);

    $query->execute();
    if ($result = $query->execute()){
        $ret['err'] = false;
        $query->free_result();
    
    }
    else {
        $ret['err'] = true;
    }
    $query->close();

}else{
   var_dump($con->error);
}

mysqli_close($con);

echo json_encode($ret);