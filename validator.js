
//Contructor function
function Validator(options){
    var selectorRules= {};


    // hàm thực hiện validate
    function validate(inputElement, rule){
        var errorMessage = rule.test(inputElement.value);
        var errorElement = inputElement.parentElement.querySelector(options.errorSelector);


        //get rules for selector
        var rules = selectorRules[rule.selector];
         // lặp qua từng rule & kiểm tra
         // Nếu có lỗi thì dừng
        for (var i =0; i< rules.length; i++){
            errorMessage = rules[i](inputElement.value);
            if(errorMessage) break;
        }
        
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
        //stop action submit
        formElement.onsubmit =function(e){
            e.preventDefault();


            // var       ;     
            //loop rules anf validate
            options.rules.forEach(function (rule){
                var inputElement = formElement.querySelector(rule.selector);
                validate(inputElement, rule);
            });
        }
        // loop rules and handling (listen event blur, input... )
        options.rules.forEach(function(rule){

            //save rule for inputs
            // selectorRules[rule.selector] = rule.test;
            // console.log(Array.isArray(selectorRules[rule.selector]));
            
            if(Array.isArray(selectorRules[rule.selector])){
                selectorRules[rule.selector].push(rule.test);
            }else{
               selectorRules[rule.selector] = [rule.test];
            }


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
Validator.isConfirmed = function(selector,getCofirmValue,message){
    return {
        selector: selector,
        test : function(value){
            return value === getCofirmValue() ? undefined :message || 'Giá trị nhập vào không chính xác'
        }
    };
}
