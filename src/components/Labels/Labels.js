import React, { useContext } from "react";
import { Typography, Box } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import GlobalContext from "../../context/GlobalContext";
// import { withStyles } from "@material-ui/core/styles";

const Labels = () => {
  const { selectedLabels, updateLabel } = useContext(GlobalContext);

  return (
    <Box mt={3}>
      <Typography>My Events</Typography>
      <FormGroup>
        {selectedLabels.map(({ label: lbl, checked }, idx) => (
          <FormControlLabel
            key={idx}
            control={
              <Checkbox
                checked={checked}
                onChange={() => updateLabel({ label: lbl, checked: !checked })}
              />
            }
            label={lbl}
          />
        ))}
      </FormGroup>
    </Box>
  );
};

export default Labels;
