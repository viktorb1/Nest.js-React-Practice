"use client"

import React, { SyntheticEvent, useState } from 'react'
import constants from "@/constants"

const Details = ({quantities, code}: {  quantities: { [product_id: number]: number }, code: string
}) => {
    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [zip, setZip] = useState('')
    // console.log(process.env.NEXT_PUBLIC_STRIPE_KEY)


    const submit = async (e: SyntheticEvent) => {
        e.preventDefault()

        const transformedArray = Object.entries(quantities).map(([product_id, quantity]) => ({
          product_id: parseInt(product_id, 10),
          quantity
        }));

        const data = await fetch(`${constants.endpoint}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            first_name,
            last_name,
            email,
            address,
            country,
            city,
            zip,
            code,
            products: transformedArray,
          }),
        });

        const jsonData = await data.json()
        window.location.href = jsonData.url;
    }

  return (
    <div className="col-md-7 col-lg-8">
    <h4 className="mb-3">Personal Info</h4>
    <form className="needs-validation" noValidate onSubmit={submit}>
      <div className="row g-3">
        <div className="col-sm-6">
          <label htmlFor="firstName" className="form-label">First name</label>
          <input type="text" className="form-control" id="firstName" defaultValue="" placeholder="First Name" required onChange={e => setFirstName(e.target.value)} />
        </div>
        <div className="col-sm-6">
          <label htmlFor="lastName" className="form-label">Last name</label>
          <input type="text" className="form-control" id="lastName" defaultValue="" placeholder="Last Name" required onChange={e => setLastName(e.target.value)} />
        </div>
        <div className="col-12">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control" id="email" placeholder="you@example.com" required onChange={e => setEmail(e.target.value)} />
        </div>
        <div className="col-12">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" placeholder="1234 Main St" required onChange={e => setAddress(e.target.value)} />
        </div>
        <div className="col-md-5">
          <label htmlFor="country" className="form-label">Country</label>
          <input type="text" className="form-control" id="country" placeholder="United States" onChange={e => setCountry(e.target.value)} />
        </div>
        <div className="col-md-4">
          <label htmlFor="city" className="form-label">City</label>
          <input type="text" className="form-control" id="city" placeholder="City" onChange={e => setCity(e.target.value)} />
        </div>
        <div className="col-md-3">
          <label htmlFor="zip" className="form-label">Zip</label>
          <input type="text" className="form-control" id="zip" placeholder="Zip" onChange={e => setZip(e.target.value)} />
        </div>
      </div>
      
      <hr className="my-4" />
      
      <button className="w-100 btn btn-primary btn-lg" type="submit">Checkout</button>
    </form>
    </div>
  )
}

export default Details