/**
 * Creator : alexis favier
 * domaine : afavier.fr
 * version : 1.0
 * licence : MIT
 **/

/** DOCUMENTATION **/
/**
 * CLASSES :
 *      aform_number = only [0-9]
 *      aform_date = only [dd/mm/yyyy]
 *      aform_tel = only [00.00.00.00.00]
 *      aform_mail = only [mail@mail.com]
 *      aform_dateAuto = autocomplétion de la date avec la date courante
 *
 * NEED :
 *      on <form> =  onsubmit="return aform_submit('myForm');
 */

/** Nom des classes pour le CSS (a renseigner !!)**/
const if_Wrong = "wrong";

/** Déclaration des REGEX **/
const RegexVide = new RegExp('^$');
const RegexNumber = new RegExp('^[0-9]*$');
const RegexDate = new RegExp('^(0[1-9]|[12][0-9]|3[01])[/](0[1-9]|1[012])[/](19|20)\\d\\d$');
const RegexMail = new RegExp('#^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$#');
const RegexTel = new RegExp('^([0-9]{2,2}\.){4,4}([0-9]{2,2})$');

/** Fonction dynamique **/
$(".aform_number").keyup(function () {
    if(!$(this).val().substr($(this).val().length - 1).match('[0-9]')){
        $(this).val($(this).val().substr(0, $(this).val().length - 1));
    }
});

$(".aform_dateAuto").blur(function () {
    $date = makeDate($(this).val());
    $(this).val($date);
});

$(".aform_tel").keyup(function () {
    if(!$(this).val().substr($(this).val().length - 1).match('[0-9]')){
        $(this).val($(this).val().substr(0, $(this).val().length - 1));
    }

    if($(this).val().length === 2 || $(this).val().length === 5 || $(this).val().length === 8 || $(this).val().length === 11){
        $(this).val($(this).val() + ".");
    }
});

$(".aform_date").keyup(function () {
    if(!$(this).val().substr($(this).val().length - 1).match('[0-9]')){
        $(this).val($(this).val().substr(0, $(this).val().length - 1));
    }

    if($(this).val().length === 2 || $(this).val().length === 5){
        $(this).val($(this).val() + "/");
    }
});

/** Fonction qui crée une date auto en fonction de la date courante **/
function makeDate($date){
    //On récupère les donnée de la date courante
    $today = new Date();
    $mois = $today.getMonth()+1;
    if($mois.length = 1){
        $mois = "0" + $mois;
    }
    $an = $today.getFullYear();

    //On decompose la date user
    $values = $date.split('/');
    if($values[$values.length-1] == ""){
        $values.pop();
    }

    $newDate = "";

    //Si il n'y a que le jour de rentré
    if($values.length == 1){
        $newDate = $values[0] + '/' + $mois + '/' + $an;
    }
    //Si il n'y a le jour et le mois de rentré
    else if($values.length == 2){
        //Si mois a un seul chiffre
        if($values[1].length == 1){
            $values[1] = 0 + $values[1];
        }
        $newDate = $values[0] + '/' + $values[1] + '/' + $an;
    }
    //Si il n'y a le jour et le mois et l'anné de rentré
    else if($values.length == 3){
        $newDate = $date;
    }
    return $newDate;
}

/** Fonction de verification "submit" **/
function aform_submit(idFrom){
    var flag = true;
    var form = $('#' +idFrom);

    flag = aform_number(form)? flag : false;
    flag = aform_dateAuto(form)? flag : false;
    flag = aform_date(form)? flag : false;
    flag = aform_mail(form)? flag : false;
    flag = aform_tel(form)? flag : false;

    console.log(flag);
    return false;
}

function aform_number(form) {
    let flag = true;
    let elmtNumber = form.find('.aform_number');

    for(let i=0; i < elmtNumber.length; i++){
        let elmtValue = elmtNumber.get(i).value;
        if(!(RegexVide.test(elmtValue) || RegexNumber.test(elmtValue))){
            flag = false;
            wrongColor(elmtNumber.get(i).id);
        }else{
            defaultColor(elmtNumber.get(i).id);
        }
    }
    return flag;
}

function aform_dateAuto(form) {
    let elmtNumber = form.find('.aform_dateAuto');

    for(let i=0; i < elmtNumber.length; i++){
        let elmtValue = elmtNumber.get(i).value;
        let date = makeDate(elmtValue);
        $("#" + elmtNumber.get(i).id).val(date);
    }
}

function aform_date(form) {
    let flag = true;
    let elmtDate = form.find('.aform_date');

    for(let i=0; i < elmtDate.length; i++){
        let elmtValue = elmtDate.get(i).value;
        if(!(RegexVide.test(elmtValue) || RegexDate.test(elmtValue))){
            flag = false;
            wrongColor(elmtDate.get(i).id);
        }else{
            defaultColor(elmtDate.get(i).id);
        }
    }
    return flag;
}

function aform_mail(form) {
    let flag = true;
    let elmtMail = form.find('.aform_mail');

    for(let i=0; i < elmtMail.length; i++){
        let elmtValue = elmtMail.get(i).value;
        if(!(RegexVide.test(elmtValue) || RegexMail.test(elmtValue))){
            flag = false;
            wrongColor(elmtMail.get(i).id);
        }else{
            defaultColor(elmtMail.get(i).id);
        }
    }
    return flag;
}

function aform_tel(form) {
    let flag = true;
    let elmtTel = form.find('.aform_tel');

    for(let i=0; i < elmtTel.length; i++){
        let elmtValue = elmtTel.get(i).value;
        if(!(RegexVide.test(elmtValue) || RegexTel.test(elmtValue))){
            flag = false;
            wrongColor(elmtTel.get(i).id);
        }else{
            defaultColor(elmtTel.get(i).id);
        }
    }
    return flag;
}

/** Fonction de mise en forme **/
function wrongColor(id) {
    $('#'+id).addClass(if_Wrong);
}

function defaultColor(id){
    $('#'+id).removeClass(if_Wrong);
}
