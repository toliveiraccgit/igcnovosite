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
  getByPriorityAndService: ({ locale, priority, service }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    const priorityQuery = priority ? `&filters[priority]=${priority}` : ``;
    const serviceQuery = service
      ? `&populate=servico&filters[servico][name]=${service}`
      : ``;

    return client.get(
      `/transacoes?populate=image&populate=setor${serviceQuery}${priorityQuery}&${query}`
    );
  },
  getBySpeciality: ({ locale, speciality }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(
      `/transacoes?populate=image&populate=setor&populate=servico&filters[setor][name]=${speciality}&${query}`
    );
  },
  getBasic: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/transacoes?populate=image&${query}`);
  },
  getSpecialties: ({ locale }) => {
    const query = new URLSearchParams({
      ...(locale && { locale }),
    });

    return client.get(`/specialties?${query}`);
  },
};
