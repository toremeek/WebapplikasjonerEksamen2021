//valideringsbjekt som returnerer true om value er kortere eller lik length //

export const validate = {
    minLength(length, value) {
      if (length && value?.length >= length) {return true}

      else{
          return false
      }
    },  
    
    maxLength(length, value) {
        if (length && value?.length <= length) {return true}
        else{
            return false
        }
       
    },
    minMaxLength(min, max, value){
        if(value?.length >= min && value?.length <= max) {return true}
        else{
            return false
    }  
  },
  nameCheck(value){
        const checkWhiteSpace = new RegExp("\\s+");
            if(checkWhiteSpace.test(value)){
                return value
                .split(" ")
                .filter(Boolean)
                .every((s) => s[0].toUpperCase() === s[0]);}
                },
}