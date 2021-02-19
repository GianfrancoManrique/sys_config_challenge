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
    document.getElementById("statelbl").style.display = 'none';
    document.getElementById("parameterslbl").style.display = 'none';
}

function fnSetDateOfBirth(e) {

    e.preventDefault();

    isValidDateofBirth = false;

    document.getElementById("btnGetValue").disabled = true;

    dateOfBirthParts = document.getElementById('dateofbirth').value.split("-");

    dateOfBirth = new Date(dateOfBirthParts[0], dateOfBirthParts[1] - 1, +dateOfBirthParts[2]);

    today = new Date((new Date()).getFullYear(), (new Date()).getMonth(), (new Date()).getDate());

    var edad = fnCalculateAge(dateOfBirth, today);

    if (isNaN(edad) || edad < 18) {

        isValidDateofBirth = false;
        document.getElementById("dateofbirthlbl").style.display = 'block';
        document.getElementById('age').value = "";

    } else {

        isValidDateofBirth = true;
        document.getElementById("dateofbirthlbl").style.display = 'none';
        document.getElementById('age').value = edad;

    }

    document.getElementById("btnGetValue").disabled = !isValidDateofBirth;
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

    isValidState = false;
    document.getElementById("btnGetValue").disabled = true;

    if (this.value.trim().length == 0) {

        document.getElementById("statelbl").style.display = 'block';
        document.getElementById("btnGetValue").disabled = true;

    } else {
        isValidState = true;
        document.getElementById("statelbl").style.display = 'none';
    }

    document.getElementById("btnGetValue").disabled = !isValidState;

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

        document.getElementById("parameterslbl").style.display = 'none';

        $.ajax({
            type: "POST",
            //url: "https://precalculatorapi.azurewebsites.net/api/Configuration",
            url: "https://localhost:44353/api/Configuration",
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

        alert('Parameters for premium value are invalid');
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

function fnValidDateOfBirth(dateOfBirth) {
    return true;
}

function fnValidState(state) {

    if (state.trim().length > 0) {
        return true;
    }

    return false;
}

function fnValidAge(age) {
    var regex = /^[0-9]+$/;

    if (age.match(regex)) {
        return true;
    }

    return false;
}