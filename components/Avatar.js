export default function Avatar({ img, diameter }) {
  const addDefaultSrc = (e) => {
    console.log("addDefaultSrc called");
    e.target.src = defaultImg;
  };
  {
    if (img == "") img = defaultImg;
  }

  const style = {...avatar, width: diameter, height: diameter};

  return (
    <div>
      <img src={img} style={style} onError={addDefaultSrc} />
    </div>
  );
}

const defaultImg = "/default-avatar.jpg";

Avatar.defaultProps = {
  img: defaultImg,
  diameter: "50px",
};

const avatar = {
  verticalAlign: "middle",
  borderRadius: "50%",
};
