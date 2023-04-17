import "./HeaderTop.scss";

import { useDispatch, useSelector } from "react-redux";
import { get_async_locale, set_locale } from "../../store/locales";

import { useEffect, useState } from "react";
import APIHeader from "../../api/header";

function HeaderTop() {
  const dispatch = useDispatch();
  const { locales, locale } = useSelector((state) => state.locales);
  const [header, setHeader] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    dispatch(get_async_locale());

    APIHeader.get({ locale })
      .then((response) => {
        setHeader(response.data.data.attributes.button);
        dispatch(set_locale("pt-BR"));
      })
      .catch((error) => {
        setHeader([]);
      });
  }, [locale]);

  console.log(locale);

  const handleLocaleChange = (event) => {
    const locale = event.target.value;
    dispatch(set_locale(locale));
  };

  const handleDropdownClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLocaleClick = (locale) => {
    dispatch(set_locale(locale));
    setIsOpen(false);
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
        <div className="dropdown">
          <div className="dropdown-toggle" onClick={handleDropdownClick}>
            {locales.find((loc) => loc.code === locale)
              ? locales.find((loc) => loc.code === locale).name
              : ""}
          </div>
          {isOpen && (
            <ul className="dropdown-menu">
              {locales.map((locale_i) => (
                <li
                  key={locale_i.id}
                  onClick={() => handleLocaleClick(locale_i.code)}
                  style={{
                    display: locale_i.code === locale ? "none" : "block",
                  }}
                >
                  <div
                    className={
                      (locale_i.name === "EN" || locale_i.name == "ES") &&
                      locale != "pt-BR"
                        ? "line"
                        : locale == "pt-BR" && locale_i.name === "EN"
                        ? "line"
                        : "no-line"
                    }
                  >
                    {locale_i.name}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default HeaderTop;
