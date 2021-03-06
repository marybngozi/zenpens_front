/* eslint-disable prettier/prettier */
module.exports = {
  variants: {
    opacity: ['disabled'],
    outline: ['responsive', 'focus', 'hover', 'active'],
    borderWidth: ['hover', 'focus'],
  },
  purge: ["./src/**/*.html", "./src/**/*.vue", "./src/**/*.jsx"],
  theme: {
    zIndex: {
      '9999': 9999,
    },
    extend: {
      colors: {
        "footer-bg": "#0C2034",
        "hr-color": "#377781",
        "unidark": "#0b6b3d",
        "uniblue": "#0278F2",
        "unidarkblue": "#05A658",
        "unilightblue": "#05a658a6",
        "uniyellow": "#F0FF00",
        "uniorange": "#d25400",
        "uniash": "#F2F8FE"
      }
    },
    screens: {
      xs: "320px",

      sm: "425px",
      // => @media (min-width: 425px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px"
      // => @media (min-width: 1280px) { ... }
    },
    fontFamily: {
      // eslint-disable-next-line prettier/prettier
      "unihostelFont": "Noto Sans",
      "poppins": "Poppins"
    }
  },
  plugins: []
};
  