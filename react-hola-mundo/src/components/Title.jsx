function Title(props) {
    const mapTitle = {
        h1: "text-6xl",
        h2: "text-5xl",
        h3: "text-4xl",
        h4: "text-3xl",
        h5: "text-2xl",
        h6: "text-xl",
    }
 
  return (
    <div className={mapTitle[props.size]}>
      <span>{props.text}</span>
    </div>
  );
}

export default Title;