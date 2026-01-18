import { Box, Typography } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import WorkIcon from "@mui/icons-material/Work";
import MedicalServicesIcon from "@mui/icons-material/MedicalServices";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import { Entry } from "../../types";

type BaseCardProps = {
  date: string;
  description: string;
  icon: JSX.Element;
  rating?: number;
  employerName?: string;
  specialist: string;
};

const BaseCard = ({
  date,
  icon,
  rating,
  description,
  specialist,
  employerName,
}: BaseCardProps) => {
  let ratingIcon: JSX.Element | null = null;

  switch (rating) {
    case 0:
      ratingIcon = <FavoriteIcon fontSize="large" sx={{ color: "green" }} />;
      break;
    case 1:
      ratingIcon = <FavoriteIcon fontSize="large" sx={{ color: "yellow" }} />;
      break;
    case 2:
      ratingIcon = <FavoriteIcon fontSize="large" sx={{ color: "orange" }} />;
      break;
    case 3:
      ratingIcon = <FavoriteIcon fontSize="large" sx={{ color: "red" }} />;
      break;
    default:
      ratingIcon = null;
  }

  return (
    <>
      <Box
        sx={{
          border: "1px solid black",
          padding: "1em",
          display: "grid",
          gap: "0.75em",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
          <Typography variant="subtitle1">{date}</Typography>

          <Box sx={{ display: "flex", alignItems: "center", gap: "0.5em" }}>
            {icon && <Box>{icon}</Box>}
            {employerName && (
              <Typography variant="body2">{employerName}</Typography>
            )}
          </Box>
        </Box>

        <i>{description}</i>

        {ratingIcon && <Box>{ratingIcon}</Box>}

        <Typography variant="body2">diagnosed by {specialist}</Typography>
      </Box>
    </>
  );
};

export const EntryCard = ({ entry }: { entry: Entry }) => {
  switch (entry.type) {
    case "Hospital":
      return (
        <BaseCard
          date={entry.date}
          icon={<LocalHospitalIcon sx={{ color: "black" }} />}
          description={entry.description}
          specialist={entry.specialist}
        />
      );
    case "OccupationalHealthcare":
      return (
        <BaseCard
          date={entry.date}
          icon={<WorkIcon sx={{ color: "black" }} />}
          description={entry.description}
          specialist={entry.specialist}
          employerName={entry.employerName}
        />
      );
    case "HealthCheck":
      return (
        <BaseCard
          date={entry.date}
          icon={<MedicalServicesIcon sx={{ color: "black" }} />}
          description={entry.description}
          rating={entry.healthCheckRating}
          specialist={entry.specialist}
        />
      );
    default:
      const _exhaustiveCheck: never = entry;
      return _exhaustiveCheck;
  }
};
