import { useState } from "react"

export const useForm=(initialValue)=>{
const [values,SetValues]=useState(initialValue)
    const HandeleChange=(event)=>{
        SetValues({
            ...values,
            [event.target.name]:event.target.value
        })
    }
    return [values,HandeleChange]
}