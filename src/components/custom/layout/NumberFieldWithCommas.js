import { TextField } from "react-admin";

const NumberFieldWithCommas = (props) => {
  const { record, source } = props;
  const value = record[source];
  const formattedValue = value ? value.toLocaleString() : "";
  return (
    <TextField {...props} record={{ ...record, [source]: formattedValue }} />
  );
};

export default NumberFieldWithCommas;
