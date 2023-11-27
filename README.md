# not_a_hackaton
Ищем работу для Эндрю

P.S Docker чуть позже

## Запуск Database
Port 5432

```
    docker-compose up -d
```


## Запуск backend
```
    mvn clean install
    mvn spring-boot:run
```



## Запуск frontend
.env.example => .env : URL для Backend по примеру
Нужна NodeJS

```
npm ci
npm run dev -- --host
```

