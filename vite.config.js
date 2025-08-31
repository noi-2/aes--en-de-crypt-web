import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {reportCompressedSize:true, rollupOptions:{output:{manualChunks(id){
     if (id.includes("@mui/material")) {
    return 'vendor-@mui/material';
  };
  //  if (id.includes("@mui/icons-material")) {
  //   return 'vendor-@mui/icons-material';
  // };


// if(id.includes("react-dom-server")){;
//     console.log(id);
//     return `react-dom-server`;
//   }
  if(id.includes("react-dom")){;
    console.log(id);
    return `react-dom`;
  }
  if(/@mui\/[^\/]+/.test(id)){
    console.log(id)
    return `vendor-@mui-${id.match(/@mui\/([^\/]+)/)[1]}`
  }
  return undefined;
  }}}}
})
