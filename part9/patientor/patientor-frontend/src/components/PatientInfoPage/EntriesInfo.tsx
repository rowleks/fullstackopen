import { Box, Typography } from "@mui/material";
import { Entry } from "../../types";

const EntryDescription = ({
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

const DiagnosesInfo = ()=> {
    
}

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
          </Box>
        ))
      )}
    </Box>
  );
};

export default EntriesInfo;
