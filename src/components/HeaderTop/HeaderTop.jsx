import "./HeaderTop.scss";

import { useDispatch, useSelector } from "react-redux";
import { get_async_locale, set_locale } from "../../store/locales";

import { useEffect, useState } from "react";
import APIHeader from "../../api/header";

function HeaderTop() {
  const dispatch = useDispatch();
  const { locales, locale } = useSelector((state) => state.locales);
  const [header, setHeader] = useState([]);

  useEffect(() => {
    dispatch(get_async_locale());

    APIHeader.get({ locale })
      .then((response) => {
        setHeader(response.data.data.attributes.button);
      })
      .catch((error) => {
        setHeader([]);
      });
  }, [locale]);

  const handleLocaleChange = (event) => {
    const locale = event.target.value;
    dispatch(set_locale(locale));
  };

  return (
    <div className="headerTop-container">
      <div className="theContainer">
        <ul>
          {header.map((header_i, index) => {
            {
              return (
                !header_i.disabled && (
                  <li key={index}>
                    <a
                      target={header_i.redirect && "_blank"}
                      href={header_i.link}
                    >
                      {header_i.label}
                    </a>
                  </li>
                )
              );
            }
          })}
        </ul>
        <select onChange={handleLocaleChange}>
          {locales.map((locale_i) => (
            <option
              value={locale_i.code}
              selected={locale_i.code === locale || locale_i.isDefault}
              key={locale_i.id}
            >
              {locale_i.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default HeaderTop;
