/////style
import "./styles.scss";
const Card = ({ notification, img }) => {
  return (
    <>
      <div
        className="card-container"
        style={{
          backgroundImage: `url(${img})`,
        }}
      >
        {notification && (
          <dl className="on_live">
            <dt>
              <p className="live_icon">
                <span></span> LIVE
              </p>
            </dt>

            <dd>
              <p>Cricket</p>
              <span id="count">5</span>
            </dd>

            <dd>
              <p>Soccer</p>
              <span id="count">0</span>
            </dd>

            <dd>
              <p>Tennis</p>
              <span id="count">41</span>
            </dd>

            <dd>
              <p>E-Soccer</p>
              <span id="count">0</span>
            </dd>
          </dl>
        )}
        <dl className="entrance-title">
          <dt>Sports</dt>
          <dd>Play Now</dd>
        </dl>
      </div>
    </>
  );
};

export default Card;
