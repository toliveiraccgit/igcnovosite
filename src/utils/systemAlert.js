export default {
  localeNotFound: (locale) => {
    return alert(
      `Error: System translation.\nMessage: O idioma (${locale}) não foi configurado nessa página.\n\nPor favor, configure o idioma no CMS.`
    );
  },
};
