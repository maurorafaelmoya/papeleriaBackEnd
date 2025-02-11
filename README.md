## Papeleria Moya backEnd
- Recommended `node js 18.18+`
- Install dependencies: `npm install` 
- Start the server: `npm run dev` 

## instrucciones para variables de entorno:
-1. tenemos que crear un archivo llamado .env con las siguientes variables de entorno:
    -PORT=
    -MONGODB=
    -SECRETKEYJWT=
    -EmailUser=
    -EmailPass=
    -URL_BACKEND=

## instrucciones para ejecutar:

```
-1. descargar la carpeta "git clone https://github.com/maurorafaelmoya/papeleriaBackEnd"
-2. acceder a la carpeta desde consola
-3. ejecutar el comando para instalar las librerias "npm install" 
-4. ejecutar el comando para ejecutar "npm run dev" 
```


## instrucciones para docker:
```
-1. docker build -t papeleria-backend . -f DockerFile 
-2. docker run --env-file .env -p 4000:4000 papeleria-backend
```