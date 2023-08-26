import "./TopPage.scss";

function TopPage({ startPage }) {
  return (
    <>
      <div className="topPage">
        <div className="theContainer">
          <p>{startPage && startPage.title}</p>
        </div>
      </div>

      <div className="FirstSectionContainer">
        <div className="theContainer">
          <div className="right">
            <h4>{startPage && startPage.label}</h4>
            <p
              dangerouslySetInnerHTML={{
                __html: startPage && startPage.description,
              }}></p>
          </div>
          <div className="left">
            {startPage?.media?.data && (
              <img
                src={`${
                  startPage &&
                  startPage.media &&
                  startPage.media.data &&
                  startPage.media.data.attributes &&
                  startPage.media.data.attributes.url
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
