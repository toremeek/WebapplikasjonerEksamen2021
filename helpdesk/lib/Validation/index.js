//valideringsbjekt som returnerer true om value er kortere eller lik length //

export const validate = {
    minLength(length, value) {
      if (length && value?.length >= length) {return true}

      else{
          return false
      }
    },  
    
    maxLength(length, value) {
        console.log(value.length)
        if (length && value?.length <= length) {return true}
        else{
            return false
        }
       
    },
    minMaxLength(min, max, value){
        console.log(value)
        if(value?.length >= min && value?.length <= max) {return true}
        else{
            return false
    }  
  }
}