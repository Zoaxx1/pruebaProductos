import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getToken } from '../../redux/actions'
import { Redirect } from 'react-router-dom'

type Information = {
    email: string,
    password: string
}

const Login = () => {

    const dispatch = useDispatch()

    const token = useSelector((state : any) => state.token)

    const [information, setInformation] = React.useState<Information>({
        email: '',
        password: ''
    })

    const Form = async (e : any) => {
        e.preventDefault()
        await dispatch(getToken(information))
        if(!!token){
            console.log(!!token)
            return <Redirect to='/products'/>
        }
    }

    const onChange = (e : any) => {
        setInformation({
            ...information,
            [e.target.name] : e.target.value
        })
    } 
    return (
        <div className='w-full h-full'>
            {
                !!token && <Redirect to='/products'/>
            }
            <p className='w-full text-center text-6xl text-yellow-500 mb-12'>Login</p>
            <div className='w-full items-center justify-center flex'>
            <form className='grid grid-rows-3 gap-4 w-96' onSubmit={Form}>
                <input type='text' className='h-16 rounded-md border-4 border-yellow-600 bg-yellow-500 pl-8 text-lg' name='email' onChange={onChange}/>
                <div className='relative'>
                <input type='password' className='w-full h-16 rounded-md border-4 border-yellow-600 bg-yellow-500 pl-8 text-lg' name='password' onChange={onChange}/>
                </div>
                <input type='submit' value='Enter' className='h-16 rounded-md border-4 border-yellow-700 bg-yellow-600 text-lg text-yellow-700'/>
            </form>
            </div>
        </div>
    )
}

export default Login