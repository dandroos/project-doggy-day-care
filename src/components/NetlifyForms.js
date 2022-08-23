import React from "react"

const NetlifyForms = () => {
  return (
    <>
      <form
        name="contact"
        action="#"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="booking" />
        <input type="hidden" name="name" />
        <input type="hidden" name="email" />
        <input type="hidden" name="phone" />
        <input type="hidden" name="message" />
      </form>
      <form
        name="booking"
        action="#"
        method="POST"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
      >
        <input type="hidden" name="form-name" value="booking" />
        <input type="hidden" name="name" />
        <input type="hidden" name="email" />
        <input type="hidden" name="phone" />
        <input type="hidden" name="address" />
        <input type="hidden" name="from" />
        <input type="hidden" name="to" />
        <input type="hidden" name="drop_off_time" />
        <input type="hidden" name="pick_up_time" />
        <input type="hidden" name="comments" />
        {[1, 2, 3, 4, 5, 6].map((i) => {
          return (
            <>
              <input type="hidden" name={`pet_${i}_type`} />
              <input type="hidden" name={`pet_${i}_name`} />
              <input type="hidden" name={`pet_${i}_breed`} />
              <input type="hidden" name={`pet_${i}_bath`} />
              <input type="hidden" name={`pet_${i}_preferred_food`} />
            </>
          )
        })}
      </form>
    </>
  )
}

export default NetlifyForms
