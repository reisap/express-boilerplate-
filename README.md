# Express JS WITH SUPER POWER

### Tools :

> Node JS (Standart) :D it's only js not typescript
>
> Routing version (so you can deploy any version of your api)
>
> Email Sender for verify user and forgot password user
>
> Realtime data used SocketIO for frontend
>
> MySQL Database
>
> JWT Token for auth (header or cookie mmm)
>
> Docker (for make us happy :P)

---

## Sample email verification

![Sample email verification](./email-verification.PNG)

TODO :

    1. RabbitMQ / event emitter (DONE)
    2. Redis (for cache) --> (DONE)
    3. Sample Deploy with kubernetes
    4. github action for CI/CD

---

---

---

---

# Play with Typescript

```
npm i -g typescript
npm i -g ts-node

//install types for dependecy project
npm i -D @types/body-parser @types/express @types/node @types/@redis/client @types/bcrypt @types/cookie-parser @types/cookie-session @types/cors @types/debug @types/helmet @types/jsonwebtoken @types/morgan @types/nodemailer @types/redis @types/response-time @types/sequelize @types/socket.io @types/winston

//create typesript config file
tsconfig.json

{
    "compilerOptions" : {
        "outDir" : "./dist",
        "moduleResolution" : "node",
        "module" : "commonjs",
        "allowJs" : true, //if you wanna js file after compile ts code
        "target" : "es6"
    },
     "include": ["./domain/**/*", "./lib/**/*", "./routes/**/*", "./test/**/*", "app.ts"]
}

//change all file .js with .ts
// maybe you will found some error but its ok,, just fix it dont be afraid, typescript help us for better coding now
```
