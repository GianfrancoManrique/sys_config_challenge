$(document).ready(function() {

    fnConfigureComponents();
});

function fnConfigureComponents() {

    document.getElementById("dateofbirth").addEventListener("change", fnSetDateOfBirth);
    document.getElementById("state").addEventListener("keyup", fnSetState);
    document.getElementById("btnGetValue").addEventListener("click", fnGetPremiumValue);
    document.getElementById("frecuencie").addEventListener("change", fnGetValues);

    document.getElementById("btnGetValue").disabled = true;
    document.getElementById("frecuencie").disabled = true;

    document.getElementById("dateofbirthlbl").style.display = 'none';
    document.getElementById("isValidDateofBirthlbl").style.display = 'none';

    document.getElementById("statelbl").style.display = 'none';
    document.getElementById("isValidStatelbl").style.display = 'none';

}

function fnSetDateOfBirth(e) {

    e.preventDefault();

    dateOfBirthParts = document.getElementById('dateofbirth').value.split("-");

    dateOfBirth = new Date(dateOfBirthParts[0], dateOfBirthParts[1] - 1, +dateOfBirthParts[2]);

    today = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());

    var edad = fnCalculateAge(dateOfBirth, today);

    if (isNaN(edad) || edad < 18) {

        document.getElementById("isValidDateofBirthlbl").innerHTML = '0';
        document.getElementById("dateofbirthlbl").style.display = 'block';
        document.getElementById('age').value = "";

        fnClearPremiumValues();

    } else {

        document.getElementById("isValidDateofBirthlbl").innerHTML = '1';
        document.getElementById("dateofbirthlbl").style.display = 'none';
        document.getElementById('age').value = edad;

    }

    fnValidateParameters();

}

function fnCalculateAge(dateofbirth, today) {

    var age = today.getFullYear() - dateofbirth.getFullYear();
    var monthDif = today.getMonth() - dateofbirth.getMonth();

    if (monthDif < 0 || (monthDif === 0 && today.getDate() < dateofbirth.getDate())) {
        age--;
    }

    return age;
}

function fnSetState(e) {

    if (this.value.trim().length == 0) {

        document.getElementById("statelbl").style.display = 'block';
        document.getElementById("isValidStatelbl").innerHTML = '0';

        fnClearPremiumValues();

    } else {

        document.getElementById("statelbl").style.display = 'none';
        document.getElementById("isValidStatelbl").innerHTML = '1';
    }

    fnValidateParameters();

}

function fnGetPremiumValue(e) {

    e.preventDefault();

    fnClearPremiumValues();

    var _dateOfBirth = document.getElementById('dateofbirth').value;
    var _state = document.getElementById('state').value;
    var _age = document.getElementById('age').value;

    var fieldsValid = fnValidAge(_age);

    if (fnValidAge(_age)) {

        $.ajax({
            type: "POST",
            url: "https://precalculatorapi.azurewebsites.net/api/Configuration",
            //url: "https://localhost:44353/api/Configuration",
            data: JSON.stringify({ dateOfBirth: _dateOfBirth, state: _state, age: Number(_age) }),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function(data) {
                document.getElementById('premium').value = data.premium;
                document.getElementById("frecuencie").disabled = false;
            },
            error: function(error) {
                alert(error.responseText);

                document.getElementById('premium').value = "";
                document.getElementById('monthly').value = "";
                document.getElementById('annual').value = "";
            }
        });
    } else {
        alert('Parameters are invalid');
    }

}

function fnGetValues(e) {

    e.preventDefault();
    premium = Number(document.getElementById("premium").value);
    frecuencie = Number(document.getElementById("frecuencie").value);

    document.getElementById("annual").value = "";
    document.getElementById("monthly").value = "";

    if (frecuencie != 0) {

        annual = Number(Math.round(premium * (12 / frecuencie) + 'e2') + 'e-2');
        monthly = Number(Math.round(premium / frecuencie + 'e2') + 'e-2');

        document.getElementById("annual").value = annual;
        document.getElementById("monthly").value = monthly;
    }

}

function fnValidAge(age) {
    var regex = /^[0-9]+$/;

    if (age.match(regex)) {
        return true;
    }

    return false;
}

function fnValidateParameters() {

    document.getElementById("btnGetValue").disabled = true;

    var isValidDateofBirth = Number(document.getElementById("isValidDateofBirthlbl").innerHTML);
    var isValidState = Number(document.getElementById("isValidStatelbl").innerHTML);

    if (isValidDateofBirth == 1 && isValidState == 1) {
        document.getElementById("btnGetValue").disabled = false;
    }
}

function fnClearPremiumValues() {
    document.getElementById('frecuencie').value = "0";
    document.getElementById('premium').value = "";
    document.getElementById('monthly').value = "";
    document.getElementById('annual').value = "";
}