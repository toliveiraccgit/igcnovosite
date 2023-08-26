import { useRef } from "react";
import Tooltip from "react-bootstrap/Tooltip";
import "./Video.scss";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

function Video({ video }) {
  const refVideo = useRef(null);

  const unMute = () => {
    refVideo.current.muted = !refVideo.current.muted;
  };

  const renderTooltip = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      clique para ativar o áudio
    </Tooltip>
  );

  return (
    <div className="VideoArea">
      <div className="theContainer">
        {video && video?.data && (
          <OverlayTrigger
            placement="top"
            delay={{ show: 250, hide: 400 }}
            overlay={renderTooltip}>
            <video
              controls
              autoPlay
              muted
              playsInline
              loop
              className="video"
              onClick={unMute}
              src={`${
                video &&
                video.data &&
                video.data.attributes &&
                video.data.attributes.url
              }`}
              type="video/mp4"
            />
          </OverlayTrigger>
        )}
      </div>
    </div>
  );
}

export default Video;
