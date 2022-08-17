const { Facebook } = require("mdi-material-ui")

module.exports = {
  internal: [
    {
      id: "home",
      label: {
        en: "Home",
        es: "Inicio",
        de: "Startseite",
      },
      url: {
        en: "/",
        es: "/",
        de: "/",
      },
    },
    {
      id: "dogs",
      label: {
        en: "Dogs",
        es: "Perros",
        de: "Hunde",
      },
      url: {
        en: "/dogs",
        es: "/perros",
        de: "/hunde",
      },
    },
    {
      id: "cats",
      label: {
        en: "Cats",
        es: "Gatos",
        de: "Katzen",
      },
      url: {
        en: "/cats",
        es: "/gatos",
        de: "/katzen",
      },
    },
    {
      id: "services",
      label: {
        en: "Services",
        es: "Servicios",
        de: "Dienste",
      },
      url: {
        en: "/services",
        es: "/servicios",
        de: "/dienste",
      },
    },
    {
      id: "about",
      label: {
        en: "About us",
        es: "Conócenos",
        de: "Über uns",
      },
      url: {
        en: "/about",
        es: "/conocenos",
        de: "/uber-uns",
      },
    },
    {
      id: "contact",
      label: {
        en: "Contact us",
        es: "Contacto",
        de: "Kontakt",
      },
      url: {
        en: "/contact",
        es: "/contacto",
        de: "/kontakt",
      },
    },
    {
      highlight: true,
      id: "booking",
      label: {
        en: "Book now!",
        es: "¡Reserva ahora!",
        de: "Buchen Sie jetzt!",
      },
      url: {
        en: "/book-now",
        es: "/reserva-ahora",
        de: "/buchen",
      },
    },
  ],
  external: [
    {
      name: "Facebook",
      url: "https://facebook.com/",
      Icon: Facebook,
    },
  ],
}
