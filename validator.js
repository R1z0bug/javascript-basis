
//Contructor function
function Validator(options){

    // hàm thực hiện validate
    function validate(inputElement, rule){
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);

        
        if(errorMessage){
            errorElement.innerText = errorMessage;
            inputElement.parentElement.classList.add('invalid');
        } else{
            errorElement.innerText = '';
            inputElement.parentElement.classList.remove('invalid');
        }
    }
     //get element for form validate
    var formElement = document.querySelector(options.form);
    //  console.log(formElement)
    if(formElement){

        options.rules.forEach(function(rule){
            var inputElement = formElement.querySelector(rule.selector);
            // console.log(inputElement);
            // xử lý trường hợp blur khỏi input
            if (inputElement){
                inputElement.onblur = function(){
                   validate(inputElement,rule);
                    
                }

                // xử lý mỗi khi ngườI dùng nhập vào input
                inputElement.oninput = function(){
                    var errorElement = inputElement.parentElement.querySelector(options.errorSelector);
                    errorElement.innerText = '';
                    inputElement.parentElement.classList.remove('invalid');
                }
            }
        });
 }
}


// define
Validator.isRequired = function(selector){
    return {
        selector: selector,
        test : function(value){
            return value.trim() ? undefined :'Vui lòng nhập trường này'
        }
    };
}
Validator.isEmail = function(selector){
    return {
        selector: selector,
        test : function(value){
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined :'Trường này phải là email'
        }
    };
}

Validator.minLength = function(selector,min){
    return {
        selector: selector,
        test : function(value){
            return value.length >= min ? undefined  : `Vui lòng nhập tối thiểu ${min} kí tự`
        }
    };
}