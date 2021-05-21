import React from 'react'
import cc from 'classcat'
import { postProducts } from '../../redux/actions'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router'

type InformationProps = {
    name: string
    category: string
    price: string
    image?: string
    description?: string
}

const AddProduct = () => {

    const dispatch = useDispatch()

    const [information, setInformation] = React.useState<InformationProps>({
        name: '',
        category: '',
        price: '',
        image: '',
        description: ''
    })

    const [redirect, setRedirect] = React.useState<boolean>(false)

    const onChangeInformation = (e : any) => {
        setInformation({
            ...information,
            [e.target.name]: e.target.value
        })
    }

    const submitProduct = async (e : any) => {
        e.preventDefault()
        await dispatch(postProducts(information))
    }
    
    const backToProducts = () => {
        setRedirect(true)        
    }

    React.useEffect(()=> {
        setRedirect(false)
    },[])

    return (
        <div>
            {redirect && <Redirect to='/products'/>}
            <button onClick={backToProducts} className='bg-yellow-600 text-yellow-400 p-4 text-xl rounded'>{'<-'}</button>
            <p className='w-full text-center text-6xl text-yellow-600 mb-12'>Add Product</p>
            <div className='w-full items-center justify-center flex'>
                <form className='bg-yellow-600 rounded-lg p-8' style={{width: 800}} onSubmit={submitProduct}>
                    <ul className='grid grid-rows-4'>
                    {
                        ['Name', 'Category', 'Price', 'Description'].map((field : string, i : number) =>{
                            
                            const type = field !== 'Price' ? 'text' : 'number'

                            return (
                                <li key={i + 'field'} className={cc(['grid grid-cols-6 ',{
                                    'h-20': field === 'Description',
                                    'h-6': field !== 'Description'
                                }])}>
                                    <p className='text-lg text-yellow-300'>{field} </p>
                                    {field !== 'Description' ? 
                                    <input type={type} className='rounded-sm col-span-3 pl-4' name={field.toLowerCase()} onChange={onChangeInformation}/>
                                    :
                                    <textarea className='h-20 col-span-3 rounded-sm p-2' name={field.toLowerCase()} style={{resize: 'none'}} onChange={onChangeInformation}/>
                                }
                                </li>
                            )
                        })
                    }
                    </ul>
                    <button className='bg-yellow-300 text-yellow-500 p-4 text-xl rounded mt-8'>Add Product</button> 
                </form> 
            </div>
        </div>
    )
}

export default AddProduct