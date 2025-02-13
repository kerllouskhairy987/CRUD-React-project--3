import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import { CSSProperties } from "react";

const Row = ({ index, style }: {index: number, style: CSSProperties}) => (
  <div className={index % 2 ? "ListItemOdd" : "ListItemEven"} style={style}>
    Row {index}
  </div>
);

const ListVirtualization = () => {
  return (
    <div>
      <AutoSizer style={{width: "100%", height: "100vh"}}>
        {({ height, width }) => (
          <List
            className="List"
            height={height}
            itemCount={1000}
            itemSize={35}
            width={width}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
    </div>
  )
}

export default ListVirtualization