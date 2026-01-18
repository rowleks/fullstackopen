import { Box, Typography } from "@mui/material";
import { Entry } from "../../types";
import { EntryDescription, DiagnosesInfo } from "./EntriesData";

const EntriesInfo = ({ entries }: { entries: Entry[] }) => {
  return (
    <Box>
      <Typography variant="h6" sx={{ marginBlock: "1rem" }}>
        Entries
      </Typography>
      {entries.length === 0 ? (
        <Typography>No entries available</Typography>
      ) : (
        entries.map((entry) => (
          <Box key={entry.id}>
            <EntryDescription
              date={entry.date}
              description={entry.description}
            />
            <DiagnosesInfo diagnosisCodes={entry.diagnosisCodes} />
          </Box>
        ))
      )}
    </Box>
  );
};

export default EntriesInfo;
