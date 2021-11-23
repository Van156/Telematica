import React from 'react';
import {useForm} from 'react-hook-form';
import axios from 'axios';
import './ModuloAdministracion.css';

const ModuloAdministracion = () => {

    const {register,errors,handleSubmit}=useForm();

    const onSubmit=(data,e)=>{
        console.log("Los datos recibidos son \n");
        console.log(data)
        console.log("El e es :\n");
        console.log(e);
        axios.post("http://localhost:4000/insert_users",data)
        .then(()=>{
            alert("Datos insertados exitosamente");
        });

    }
    return (
        <div className='AlberCachon'>
            <form >
            <input type="text" name="userName" placeholder="Nombre" 
                {
                    ...register('useName',{
                        required:{value:true , message:'Campo requerido'}
                    })
                }
            />
            <span>{errors?.userName?.message}</span>

            <input type="text" name="userLastName" placeholder="Apellido" 
                {
                    ...register('userLastName',{
                        required:{value:true, message:'Campo requerido'}
                    })
                }
            />
            <span>{errors?.userLastName?.message}</span>

            <input type="text" name='userId' placeholder='Cedula'
                {
                    ...register('userId',{
                        required:{value:true,message:'Campo requerido'}
                    })
                }
            />
            <span>{errors?.userId?.message}</span>

            <select name="userRol" 
                {
                    ...register('userRol',{
                        required:{value:true,message:'Campo requerido'}
                    })
                }
            >
                <option value="Medico">Medico</option>
                <option value="Ayudante">ayudante</option>

            </select >

            <input type="text" name="user" placeholder="usuario"
                {
                    ...register('user',{
                        required:{value:true,message:'Campo requerido'}
                    })
                }

            />
            <span>{errors?.user?.message}</span>

            <input type="text" name='password' placeholder='Contraseña'
                {
                    ...register('password',{
                        required:{value:true, message:'Campo requerido'}
                    })
                }
            />
            <span>{errors?.password?.message}</span>
            
            <button onClick={handleSubmit(onSubmit)}>Añadir usuario</button>

            </form>
        </div>
    )
}

export default ModuloAdministracion


