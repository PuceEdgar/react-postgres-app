import { styled } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

export const ShowButton = styled(Button)({
  background: "linear-gradient(90deg, #00bcd4 30%, #00bfa5 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 30,
  padding: "0 30px",
});

export const AddButton = styled(Button)({
  background: "linear-gradient(45deg, #00bcd4 50%, #00bfa5 50%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
});

export const SubmitButton = styled(Button)({
  //   background: "linear-gradient(90deg, #00e676 30%, #64dd17 90%)",
  background: "#00bcd4",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
  color: "white",
  height: 39,
  padding: "0 30px",
});
