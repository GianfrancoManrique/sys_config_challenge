$(document).ready(function() {
    //$("#datepicker").datepicker();
    $("#dateofbirth").on("change", fnLoad);
    $("#btnGetValue").on("click", fnGetValue);
});

function fnLoad(e) {
    e.preventDefault();

    var dateofbirthval = document.getElementById('dateofbirth').value;

    var edad = fnCalculateAge(dateofbirthval);

    document.getElementById('age').value = edad;

}

function fnCalculateAge(_dateofbirth) {

    var today = new Date();
    var dateofbirth = new Date(_dateofbirth);

    var age = today.getFullYear() - dateofbirth.getFullYear();
    var monthDif = today.getMonth() - dateofbirth.getMonth();

    if (monthDif < 0 || (monthDif === 0 && today.getDate() < dateofbirth.getDate())) {
        age--;
    }

    return age;
}

function fnGetValue(e) {

    e.preventDefault();

    $.ajax({
        type: "POST",
        //url: "https://precalculatorapi.azurewebsites.net/api/Configuration",
        url: "https://localhost:44353/api/Configuration",
        // The key needs to match your method's input parameter (case-sensitive).
        data: JSON.stringify({ dateOfBirth: "1990-01-09", state: "NY", age: 31 }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(data) { console.log(data); },
        error: function(errMsg) {
            console.log(errMsg);
        }
    });
}