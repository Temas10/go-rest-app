# --- Стадия 1: Сборка проекта ---
# Изменили версию Node.js на 20
FROM node:20-alpine AS build

WORKDIR /app

# Копируем package.json и package-lock.json для кэширования слоя зависимостей
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем исходный код
COPY . .

# Собираем проект (папка dist будет создана)
RUN npm run build

# --- Стадия 2: Запуск через Nginx ---
FROM nginx:alpine

# Копируем конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы из стадии build в папку, которую обслуживает Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]