import React,{Fragment} from 'react'
import {FormControl,InputLabel,Input,FormHelperText,Button} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import styled from 'styled-components';
import {useForm} from 'react-hook-form';
import './Login.css'
const Login = () => {
  

    const {register,formState:{errors},handleSubmit} =useForm();
    const onSubmit=(data,e)=>{
    }

    return (
        <div className="bgimage">

            <div className='container centrar '>
                <div className=" background">
                    
                    <div id='user-image'>
                    <img   src="https://cdn.icon-icons.com/icons2/1879/PNG/512/iconfinder-3-avatar-2754579_120516.png" alt="F "/>
                    </div>
                
                        <form onSubmit={handleSubmit(onSubmit) }  className='formularios' >
                            <div className="inputWithIcon">
                                <PersonIcon className='icon'/>
                                <input type="text"
                                    placeholder='Nombre de usuario'
                                    name='userName'
                                    

                                    ref={
                                        register('userName',{
                                            required:{value: true, message:"Campo requerido"}
                                        })
                                    }
                                />
                                
                                <span className="text-danger text-small d-block mb-2">
                                        {errors?.pass?.message}
                                </span>
                            </div>
                            <div className="inputWithIcon">
                                <LockIcon className='icon'/>
                                <input type="Password"
                                    placeholder='Contraseña'
                                    name='pass'
                                    
                                    ref={
                                        register('pass',{
                                            required:{value: true, message:"Campo requerido"}
                                        })
                                    }
                                />

                                    <span className="text-danger text-small d-block mb-2">
                                        {errors?.pass?.message}
                                    </span> 
                                       
                            </div>
                            <div className="btcentrar">

                                <Button type='submit'  variant="contained" color="primary" endIcon={<ArrowForwardIcon/>}>Iniciar</Button>
                            </div>
                        </form>
                    
                </div>
            
            </div>
        </div>
    )
    
}

export default Login

const Container= styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    margin:50px;
`