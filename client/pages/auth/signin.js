import React, { useState } from 'react'
import Router from 'next/router'
import userRequest from '../../hooks/user-request'

function signin() {
    const [email , setEmail] = useState('')
    const [password , setPassword] = useState('')
    const {doRequest , errors} = userRequest({
        url: '/api/users/signin',
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
        <h1>Sign in</h1>
        <div className='form-group'>
            <label>Email Address</label>
            <input value={email} onChange={e => setEmail(e.target.value)} className='form-control' />
        </div>
        <div className='form-group'>
            <label>Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type='password' className='form-control' />
        </div>
        {errors}
        <button className='btn btn-primary mt-3'>Sign in</button>
    </form>
  )
}

export default signin