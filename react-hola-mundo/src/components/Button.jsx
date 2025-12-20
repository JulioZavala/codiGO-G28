function Button (props) {
  const variants = {
    primary: "bg-gray-950 text-white",
    warning: "bg-yellow-500 text-black",
    info: "bg-sky-500 text-white",
    danger: "bg-red-500 text-white",
  };

  return (
    <>
      <button
        type={props.type}
        className={`px-4 py-3 rounded-md font-medium ${
          variants[props.variant]
        }`}
      >
        {props.text}
      </button>
    </>
  );
}


export default Button;
