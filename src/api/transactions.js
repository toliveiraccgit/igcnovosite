import client from "../services/http";

export default {
  get: ({ locale, filter, search }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    const specialtie =
      filter &&
      filter.specialtie &&
      `&filters[setor][id][$eq]=${filter.specialtie}`;
    const origem =
      filter && filter.origen && `&filters[origem][id][$eq]=${filter.origen}`;
    const perfil =
      filter && filter.perfil && `&filters[perfi][id][$eq]=${filter.perfil}`;

    const searchs = search && `&filters[name][$containsi]=${search}`;

    const format = `${specialtie || ""}${origem || ""}${perfil || ""}${
      searchs || ""
    }`;

    return client.get(`/transacoes?populate=*&${query}${format}`);
  },

  page: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/pagina-transacoe?${query}`);
  },

  get_origem: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/origems?${query}`);
  },

  get_specialtie: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/specialties?${query}`);
  },

  get_perfil: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/perfis?${query}`);
  },
};
