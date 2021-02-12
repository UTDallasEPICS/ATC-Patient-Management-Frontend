export default function Avatar({ img }) {
  return (
    <div>
      <img
        src={img}
        alt=""
        style={avatar}
      />
    </div>
  );
}

Avatar.defaultProps = {
    img: "/default-avatar.jpg"
}


const avatar = {
  verticalAlign: "middle",
  width: "50px",
  height: "50px",
  borderRadius: "50%",
};
