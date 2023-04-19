import css from "./text.module.css";

export const Text = ({
  type,
  children,
  noWrap,
}: {
  type: "paragraph" | "heading";
  children: string;
  noWrap?: boolean;
}) => {
  return (
    <div
      className={css[type]}
      style={
        noWrap
          ? {
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }
          : {}
      }
    >
      {children}
    </div>
  );
};
