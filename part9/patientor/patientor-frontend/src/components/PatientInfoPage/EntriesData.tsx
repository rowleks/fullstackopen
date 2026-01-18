import { List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import diagnosesService from "../../services/diagnoses";

export const EntryDescription = ({
  description,
  date,
}: {
  description: string;
  date: string;
}) => {
  return (
    <>
      <Typography variant="subtitle1">
        {date}: <i>{description}</i>
      </Typography>
    </>
  );
};

export const DiagnosesInfo = ({
  diagnosisCodes,
}: {
  diagnosisCodes?: string[];
}) => {
  const [diagnosis, setDiagnosis] = useState<{ code: string; name: string }[]>(
    []
  );

  useEffect(() => {
    if (!diagnosisCodes || diagnosisCodes.length === 0) {
      setDiagnosis([]);
      return;
    }

    let ignore = false;

    void Promise.all(
      diagnosisCodes.map((code) => diagnosesService.getById(code))
    ).then((data) => {
      if (!ignore) {
        setDiagnosis(data.filter((d) => d && d.code));
      }
    });

    return () => {
      ignore = true;
    };
  }, [diagnosisCodes]);

  return (
    <List dense>
      {diagnosis.map((d) => (
        <ListItem
          key={d.code}
          divider
          component="li"
          sx={{ listStyleType: "number" }}
        >
          <ListItemText>
            {d.code} {d.name}
          </ListItemText>
        </ListItem>
      ))}
    </List>
  );
};
