import Square from "./square";

export default function Board() {
  return (
    <div>
      <div className="flex">
        <Square value="x" />
        <Square value="x" />
        <Square value="x" />
      </div>
      <div className="flex">
        <Square value="x" />
        <Square value="x" />
        <Square value="x" />
      </div>
      <div className="flex">
        <Square value="x" />
        <Square value="x" />
        <Square value="x" />
      </div>
    </div>
  );
}
