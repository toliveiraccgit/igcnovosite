import "./TopPage.scss";

function TopPage({ aboutUs }) {
  return (
    <>
      <div className="topPage">
        <div className="theContainer">
          <p>{aboutUs && aboutUs.title}</p>
        </div>
      </div>

      <div className="FirstSectionContainer">
        <div className="theContainer">
          <div className="right">
            <h4>{aboutUs && aboutUs.label}</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: aboutUs && aboutUs.description,
              }}></p>
          </div>
          <div className="left">
            {aboutUs?.media?.data && (
              <img
                src={`${
                  aboutUs &&
                  aboutUs.media &&
                  aboutUs.media.data &&
                  aboutUs.media.data.attributes &&
                  aboutUs.media.data.attributes.url
                }`}
                alt=""
              />
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TopPage;
