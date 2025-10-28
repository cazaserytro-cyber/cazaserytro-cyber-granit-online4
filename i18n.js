
import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  uk: { translation: {
    "title": "Granit Onlane - Вироби з натурального каменю",
    "contact": "Контакти",
    "catalog": "Каталог",
    "about": "Про нас",
    "gallery": "Галерея",
    "blog": "Блог",
    "add_to_cart": "Додати в кошик",
    "price": "Ціна",
    "login":"Увійти",
    "signup":"Реєстрація",
    "cart":"Кошик",
    "order":"Оформити замовлення"
  }},
  en: { translation: {
    "title": "Granit Onlane - Natural stone products",
    "contact": "Contacts",
    "catalog": "Catalog",
    "about": "About",
    "gallery": "Gallery",
    "blog": "Blog",
    "add_to_cart": "Add to cart",
    "price": "Price",
    "login":"Login",
    "signup":"Sign up",
    "cart":"Cart",
    "order":"Checkout"
  }}
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'uk',
  fallbackLng: 'uk',
  interpolation: { escapeValue: false }
})

export default i18n
