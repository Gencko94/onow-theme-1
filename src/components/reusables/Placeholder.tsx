import ReactPlaceholder from "react-placeholder/lib";

interface IProps {
  type?: "rect" | "text" | "media" | "round" | "textRow";
  height: string;
  width?: string;
  ready: boolean;
  margin?: string;
}

const Placeholder: React.FC<IProps> = ({
  type = "rect",
  height,
  ready,
  children,
  margin,
  width = "100%",
}) => {
  return (
    <ReactPlaceholder
      type={type}
      style={{
        width,
        height,
        borderRadius: "6px",
        margin,
      }}
      color="#E0E0E0"
      showLoadingAnimation
      ready={ready}
    >
      {children}
    </ReactPlaceholder>
  );
};

export default Placeholder;
