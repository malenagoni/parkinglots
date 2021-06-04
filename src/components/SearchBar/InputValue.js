import React from 'react'

export const inputValue = (e) => {
    console.log(e?.target?.value)
    let location 
    if(e?.target?.value === undefined) {
        location = 'san francisco'
    } else {
        location = e.target.value
    }
    return location 
}
