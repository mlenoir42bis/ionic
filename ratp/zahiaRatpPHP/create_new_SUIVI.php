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

$date_suivi = isset($request->dates_suivi)?$request->dates_suivi:null;
$date_suivi = mysqli_real_escape_string($con, $date_suivi);
$date_suivi = stripslashes($date_suivi);

$prochaine_date_suivi = isset($request->prochaine_date_suivi)?$request->prochaine_date_suivi:null;
$prochaine_date_suivi = mysqli_real_escape_string($con, $prochaine_date_suivi);
$prochaine_date_suivi = stripslashes($prochaine_date_suivi);

$commentaire_suivi = isset($request->commentaire_suivi)?$request->commentaire_suivi:null;
$commentaire_suivi = mysqli_real_escape_string($con, $commentaire_suivi);
$commentaire_suivi = stripslashes($commentaire_suivi);

/*
$tab = array();
$tab['matricule_agents'] = $matricule_agents;
$tab['date_suivi'] = $date_suivi;
$tab['prochaine_date_suivi'] = $prochaine_date_suivi;
$tab['commentaire_suivi'] = $commentaire_suivi;
*/

$sql = "INSERT INTO `suivi` ( dates_suivi, prochaine_date_suivi, commentaire_suivi, matricule_agents) VALUES (?,?,?,?)";

$ret = array();
if($query = $con->prepare($sql)){
    $query->bind_param('sssi', $date_suivi, $prochaine_date_suivi, $commentaire_suivi, $matricule_agents);

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