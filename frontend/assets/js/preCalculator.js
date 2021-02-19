$(document).ready(function() {
    //$("#datepicker").datepicker();
    $("#dateofbirth").on("change", fnLoad);
    $("#btnGetValue").on("click", fnGetPremiumValue);
    $("#frecuencie").on("change", fnGetValues);
    document.getElementById("frecuencie").disabled = true;
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

function fnGetPremiumValue(e) {

    e.preventDefault();

    document.getElementById('premium').value = "";
    document.getElementById('monthly').value = "";
    document.getElementById('annual').value = "";

    var _dateOfBirth = document.getElementById('dateofbirth').value;
    var _state = document.getElementById('state').value;
    var _age = document.getElementById('age').value;

    var fieldsValid = fnValidDateOfBirth(_dateOfBirth) && fnValidState(_state) && fnValidAge(_age);

    if (fieldsValid) {

        $.ajax({
            type: "POST",
            url: "https://precalculatorapi.azurewebsites.net/api/Configuration",
            data: JSON.stringify({ dateOfBirth: _dateOfBirth, state: _state, age: Number(_age) }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                document.getElementById('premium').value = data.premium;
                document.getElementById("frecuencie").disabled = false;
            },
            error: function(errMsg) {
                console.log(errMsg);
                document.getElementById('premium').value = "";
                document.getElementById('monthly').value = "";
                document.getElementById('annual').value = "";
            }
        });
    } else {
        alert('Error in parameters');
    }

}

function fnGetValues(e) {

    e.preventDefault();
    premium = Number(document.getElementById("premium").value);
    frecuencie = Number(document.getElementById("frecuencie").value);
    var annual = premium * (12 / frecuencie),
        monthly = premium / frecuencie;

    document.getElementById("annual").value = annual;
    document.getElementById("monthly").value = monthly;
}

function fnValidDateOfBirth(dateOfBirth) {
    return true;
}

function fnValidState(state) {
    if (state.length == 0) {
        return false;
    }

    return true;
}

function fnValidAge(age) {
    var regex = /^[0-9]+$/;

    if (age.match(regex)) {
        return true;
    }

    return false;
}