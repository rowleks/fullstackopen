import { Box, Button, Typography } from "@mui/material";
import { Entry } from "../../types";
import { DiagnosesInfo } from "./EntriesData";
import { EntryCard } from "./EntryCard";

const EntriesInfo = ({ entries }: { entries: Entry[] }) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ marginBlock: "2rem" }}>
        Entries
      </Typography>
      {entries.length === 0 ? (
        <Typography>No entries available</Typography>
      ) : (
        entries.map((entry) => (
          <Box key={entry.id}>
            <EntryCard entry={entry} />

            <Box sx={{ marginBlock: "1rem" }}>
              <DiagnosesInfo diagnosisCodes={entry.diagnosisCodes} />
            </Box>
          </Box>
        ))
      )}

      <Button variant="contained" sx={{ marginTop: "1rem" }}>
        Add New Entry
      </Button>
    </Box>
  );
};

export default EntriesInfo;
