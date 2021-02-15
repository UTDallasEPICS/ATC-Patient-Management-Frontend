export default function Avatar({ img }) {
  const addDefaultSrc = (e) => {
    console.log("addDefaultSrc called");
    e.target.src = defaultImg;
  };
  {
    if (img == "") img = defaultImg;
  }

  return (
    <div>
      <img src={img} style={avatar} onError={addDefaultSrc} />
    </div>
  );
}

const defaultImg = "/default-avatar.jpg";

Avatar.defaultProps = {
  img: defaultImg,
};

const avatar = {
  verticalAlign: "middle",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
};
