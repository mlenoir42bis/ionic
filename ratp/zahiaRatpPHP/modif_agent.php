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

$date_validite_permis = isset($request->date_validite_permis)?$request->date_validite_permis:null;
$date_validite_permis = mysqli_real_escape_string($con, $date_validite_permis);
$date_validite_permis = stripslashes($date_validite_permis);

$date_validite_FCO = isset($request->date_validite_FCO)?$request->date_validite_FCO:null;
$date_validite_FCO = mysqli_real_escape_string($con, $date_validite_FCO);
$date_validite_FCO = stripslashes($date_validite_FCO);

$nom_site = isset($request->nom_site)?$request->nom_site:null;
$nom_site = mysqli_real_escape_string($con, $nom_site);
$nom_site = stripslashes($nom_site);

$dates_suivi = isset($request->dates_suivi)?$request->dates_suivi:null;
$dates_suivi = mysqli_real_escape_string($con, $dates_suivi);
$dates_suivi = stripslashes($dates_suivi);

$prochaine_date_suivi = isset($request->prochaine_date_suivi)?$request->prochaine_date_suivi:null;
$prochaine_date_suivi = mysqli_real_escape_string($con, $prochaine_date_suivi);
$prochaine_date_suivi = stripslashes($prochaine_date_suivi);

$commentaire_suivi = isset($request->commentaire_suivi)?$request->commentaire_suivi:null;
$commentaire_suivi = mysqli_real_escape_string($con, $commentaire_suivi);
$commentaire_suivi = stripslashes($commentaire_suivi);

$derniere_date_EAP = isset($request->derniere_date_EAP)?$request->derniere_date_EAP:null;
$derniere_date_EAP = mysqli_real_escape_string($con, $derniere_date_EAP);
$derniere_date_EAP = stripslashes($derniere_date_EAP);

$prochaine_date_EAP = isset($request->prochaine_date_EAP)?$request->prochaine_date_EAP:null;
$prochaine_date_EAP = mysqli_real_escape_string($con, $prochaine_date_EAP);
$prochaine_date_EAP = stripslashes($prochaine_date_EAP);

$commentaire_EAP = isset($request->commentaire_EAP)?$request->commentaire_EAP:null;
$commentaire_EAP = mysqli_real_escape_string($con, $commentaire_EAP);
$commentaire_EAP = stripslashes($commentaire_EAP);

$dates_validation_AC = isset($request->dates_validation_AC)?$request->dates_validation_AC:null;
$dates_validation_AC = mysqli_real_escape_string($con, $dates_validation_AC);
$dates_validation_AC = stripslashes($dates_validation_AC);

$commentaire_AC = isset($request->commentaire_AC)?$request->commentaire_AC:null;
$commentaire_AC = mysqli_real_escape_string($con, $commentaire_AC);
$commentaire_AC = stripslashes($commentaire_AC);

$date_ouverture_PP = isset($request->date_ouverture_PP)?$request->date_ouverture_PP:null;
$date_ouverture_PP = mysqli_real_escape_string($con, $date_ouverture_PP);
$date_ouverture_PP = stripslashes($date_ouverture_PP);

$date_cloture_PP = isset($request->date_cloture_PP)?$request->date_cloture_PP:null;
$date_cloture_PP = mysqli_real_escape_string($con, $date_cloture_PP);
$date_cloture_PP = stripslashes($date_cloture_PP);

$commentaire_PP = isset($request->commentaire_PP)?$request->commentaire_PP:null;
$commentaire_PP = mysqli_real_escape_string($con, $commentaire_PP);
$commentaire_PP = stripslashes($commentaire_PP);

$total_jours_absences = isset($request->total_jours_absences)?$request->total_jours_absences:null;
$total_jours_absences = mysqli_real_escape_string($con, $total_jours_absences);
$total_jours_absences = stripslashes($total_jours_absences);

$jour_reaccueil = isset($request->jour_reaccueil)?$request->jour_reaccueil:null;
$jour_reaccueil = mysqli_real_escape_string($con, $jour_reaccueil);
$jour_reaccueil = stripslashes($jour_reaccueil);

$commentaire_reaccueil = isset($request->commentaire_reaccueil)?$request->commentaire_reaccueil:null;
$commentaire_reaccueil = mysqli_real_escape_string($con, $commentaire_reaccueil);
$commentaire_reaccueil = stripslashes($commentaire_reaccueil);

/*
$tab = array();
$tab['matricule_agents'] = $matricule_agents;
$tab['date_validite_permis'] = $date_validite_permis;
$tab['date_validite_FCO'] = $date_validite_FCO;
$tab['dates_suivi'] = $dates_suivi;
$tab['prochaine_date_suivi'] = $prochaine_date_suivi;
$tab['commentaire_suivi'] = $commentaire_suivi;
$tab['derniere_date_EAP'] = $derniere_date_EAP;
$tab['prochaine_date_EAP'] = $prochaine_date_EAP;
$tab['commentaire_EAP'] = $commentaire_EAP;
$tab['dates_validation_AC'] = $dates_validation_AC;
$tab['commentaire_AC'] = $commentaire_AC;
$tab['date_ouverture_PP'] = $date_ouverture_PP;
$tab['date_cloture_PP'] = $date_cloture_P;
$tab['commentaire_PP'] = $commentaire_PP;
$tab['total_jours_absences'] = $total_jours_absences;
$tab['jour_reaccueil'] = $jour_reaccueil;
$tab['commentaire_reaccueil'] = $commentaire_reaccueil;
*/

$sql = "UPDATE `agents` SET date_validite_permis=?,date_validite_FCO=?,nom_site=? WHERE matricule_agents=?";

$ret = array();
if($query = $con->prepare($sql)){
    $query->bind_param('sssi', $date_validite_permis, $date_validite_FCO, $nom_site, $matricule_agents);

    if ($result = $query->execute()){
        $ret['errUpdateAgents'] = false;
        $query->free_result();
    
    }
    else {
        $ret['errUpdateAgents'] = true;
        $ret['msgUpdateAgents'] = $query->error;
    }
    $query->close();

}else{
   var_dump($con->error);
}

"UPDATE `entretien_appreciation_professionnelle` SET derniere_date_EAP=?, prochaine_date_EAP=?, commentaire_EAP=? WHERE matricule_agents=?";

if($query = $con->prepare($sql)){
    $query->bind_param('sssi', $derniere_date_EAP, $prochaine_date_EAP, $commentaire_EAP, $matricule_agents);

    if ($result = $query->execute()){
        $ret['errUpdateEntretien_appreciation_professionnelle'] = false;
        $query->free_result();
    
    }
    else {
        $ret['errUpdateEntretien_appreciation_professionnelle'] = true;
        $ret['msgUpdateEntretien_appreciation_professionnelle'] = $query->error;
    }
    $query->close();

}else{
   var_dump($con->error);
}

$sql = "UPDATE `suivi` SET dates_suivi=?,prochaine_date_suivi=?, commentaire_suivi=? WHERE matricule_agents=?";

if($query = $con->prepare($sql)){
    $query->bind_param('sssi', $dates_suivi, $prochaine_date_suivi, $commentaire_suivi, $matricule_agents);

    if ($result = $query->execute()){
        $ret['errUpdateSuivi'] = false;
        $query->free_result();
    
    }
    else {
        $ret['errUpdateSuivi'] = true;
        $ret['msgUpdateSuivi'] = $query->error;
    }
    $query->close();

}else{
   var_dump($con->error);
}

$sql = "UPDATE `ambition_clients` SET dates_validation_AC=?, commentaire_AC=? WHERE matricule_agents=?";

if($query = $con->prepare($sql)){
    $query->bind_param('ssi', $dates_validation_AC, $commentaire_AC, $matricule_agents);

    if ($result = $query->execute()){
        $ret['errUpdateSuivi'] = false;
        $query->free_result();
    
    }
    else {
        $ret['errUpdateSuivi'] = true;
        $ret['msgUpdateSuivi'] = $query->error;
    }
    $query->close();

}else{
   var_dump($con->error);
}

$sql = "UPDATE `plan_de_progres` SET date_ouverture_PP=?, date_cloture_PP=?, commentaire_PP=? WHERE matricule_agents=?";

if($query = $con->prepare($sql)){
    $query->bind_param('sssi', $date_ouverture_PP, $date_cloture_PP, $commentaire_PP, $matricule_agents);

    if ($result = $query->execute()){
        $ret['errPlan_de_progres'] = false;
        $query->free_result();
    
    }
    else {
        $ret['errPlan_de_progres'] = true;
        $ret['msgPlan_de_progres'] = $query->error;
    }
    $query->close();

}else{
   var_dump($con->error);
}

$sql = "UPDATE `re_accueil` SET total_jours_absences=?, jour_reaccueil=?, commentaire_reaccueil=? WHERE matricule_agents=?";

if($query = $con->prepare($sql)){
    $query->bind_param('sssi', $total_jours_absences, $jour_reaccueil, $commentaire_reaccueil, $matricule_agents);

    if ($result = $query->execute()){
        $ret['errRe_accueil'] = false;
        $query->free_result();
    
    }
    else {
        $ret['errRe_accueil'] = true;
        $ret['msgRe_accueil'] = $query->error;
    }
    $query->close();

}else{
   var_dump($con->error);
}

mysqli_close($con);

echo json_encode($ret);