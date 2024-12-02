import { auth } from "../config/firebase";
import {createUserWithEmailAndPassword} from "firebase/auth";
import { useState } from "react";

export const Auth = () => {
  
        const [email, setEmail] = useState('');
        const [password, setPassword] = useState('');

       
        const signIn = async ()=> {
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                console.log('User created');
            }catch (err) {
                console.error(err);
                console.log('Error creating user');
            }
            
        }
    
    return (
        <div>
            <input 
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}/>
            <input 
            placeholder="Password..."
            onChange={(e) => setPassword(e.target.value)}
            type="password"/>
            <button onClick={signIn}>Sign In</button>
        </div>
    )
}