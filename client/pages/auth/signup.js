import React, { useState } from 'react'
import Router from 'next/router'
import userRequest from '../../hooks/user-request'

function signup() {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const {doRequest , errors} = userRequest({
        url: '/api/users/signup',
        method: 'post' ,
        body: {
            email , password
        },
        onSuccess: () => Router.push('/')
    })

    async function onSubmit(e) {
        e.preventDefault()

        await doRequest()

        
    }

  return (
    <form onSubmit={onSubmit}>
        <h1>Sign up</h1>
        <div className='form-group'>
            <label>Email Address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className='form-control' />
        </div>
        <div className='form-group'>
            <label>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type='password' className='form-control' />
        </div>
        {errors}
        <button className='btn btn-primary mt-3'>Sign Up</button>
    </form>
  )
}

export default signup