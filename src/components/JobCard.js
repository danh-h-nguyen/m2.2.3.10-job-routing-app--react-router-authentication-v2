import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
// import { useNavigate } from "react-router-dom";
import { Dialog, DialogActions, DialogContent, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import useAuth from "../hooks/useAuth";

export default function JobCard({ job }) {
  // const navigate = useNavigate();

  // const handleClick = () => {
  //   navigate(`/job/${job.id}`);
  // };

  const [open, setOpen] = React.useState(false); // state to handle the dialog open/close
  const [showLoginDialog, setShowLoginDialog] = React.useState(false);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!isAuthenticated) {
      setShowLoginDialog(true);
    } else {
      setOpen(true); // Open the dialog when the card is clicked
    }
  };

  const handleSignInNow = () => {
    navigate("/", { state: { jobID: job.id } });
  };

  const handleClose = () => {
    setOpen(false); // Close the dialog when the "Close" button is clicked
  };

  return (
    <>
      <Card sx={{ maxWidth: 345, height: 165, m: 1 }} onClick={handleClick}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {job.title}
            </Typography>

            <Typography
              variant="body2"
              sx={{
                color: "text.secondary",
                display: "-webkit-box",
                WebkitBoxOrient: "vertical",
                overflow: "hidden",
                WebkitLineClamp: 3,
                textOverflow: "ellipsis",
              }}
            >
              {job.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Dialog thông báo nếu người dùng chưa đăng nhập */}
      <Dialog open={showLoginDialog} onClose={() => setShowLoginDialog(false)}>
        <DialogContent>
          <Typography variant="h6" sx={{ color: "error.main" }}>
            You need to sign in first!
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => handleSignInNow()} color="primary">
            Sign in now
          </Button>
          <Button onClick={() => setShowLoginDialog(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog (Pop-up) */}
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <Typography variant="h5">{job.title}</Typography>

          <Typography variant="body1" sx={{ mt: 2 }}>
            <strong>Description:</strong> {job.description}
          </Typography>

          <Typography variant="body2" sx={{ mt: 2 }}>
            <strong>Location:</strong> {job.city}
          </Typography>

          <Typography variant="body2" sx={{ mt: 1 }}>
            <strong>Salary:</strong> ${job.salaryLow} - ${job.salaryHigh}
          </Typography>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
