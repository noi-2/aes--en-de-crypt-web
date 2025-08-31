import { useState } from 'react'
import { AES,enc } from 'crypto-js';
import {Box,TextField} from '@mui/material';

import './App.css'

function App() {
  const [count, setCount] = useState(0);
  const [input_value,set_input_value] = useState("");
  const [input_key,set_input_key] = useState("");
  const [input_key_error,set_input_key_error] = useState(false);
  
  const [input_secret,set_input_secret] = useState("");
  const [input_secret_error,set_input_secret_error] = useState(false);
  return (
    <Box sx={{maxWidth:400}} >
      <TextField multiline label="value" focused fullWidth sx={{mt:5}} 
      value={input_value}
      onChange={e=>{
        if(e.target.value.length > 0 && input_key.length > 0) {
          set_input_secret( AES.encrypt(e.target.value,input_key).toString() );
          set_input_key_error(false);
          set_input_secret_error(false);
        }
        set_input_value(e.target.value);
      }}/>
      <TextField multiline label="key" focused fullWidth sx={{mt:5}}
      error={input_key_error}
      value={input_key}
      onChange={e=>{
        if(input_value.length > 0 && e.target.value.length > 0){
          set_input_secret( AES.encrypt(input_value,e.target.value).toString() );
        }else if(input_value.length === 0 && input_secret.length > 0 && e.target.value.length > 0){
          let _res;
          try{
          _res = AES.decrypt(e.target.value,input_key).toString(enc.Utf8);
          if(_res.length === 0) {throw Error("decrypt value nothing")}
          set_input_value(_res);
          }catch(e){
            console.log(e.message);
            set_input_key_error(true);
            set_input_secret_error(true);
          }
        }else{
        set_input_key_error(false);
        }
        set_input_key(e.target.value);

      }}/>
      <TextField multiline label="secret" focused fullWidth sx={{mt:5}} 
      value={input_secret}
      error={input_secret_error}
      onChange={e=>{
        if(input_key.length > 0 && e.target.value.length > 0 ){
          let _res;
          try{
          _res = AES.decrypt(e.target.value,input_key).toString(enc.Utf8);
          if(_res.length === 0) {throw Error("decrypt value nothing")}
          set_input_value(_res);
          }catch(e){
            console.log(e.message);
            set_input_key_error(true);
            set_input_secret_error(true);
          }
        }else{
        set_input_secret_error(false);
        };
        set_input_secret(e.target.value);
        

        }}/>
    </Box>
  )
}

export default App
