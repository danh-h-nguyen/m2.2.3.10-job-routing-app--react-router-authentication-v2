import React, { useEffect, useState } from "react";
import { Box, Container } from "@mui/material";
import { useLocation } from "react-router-dom";

import JobCard from "../components/JobCard";

import jobs from "../data/jobs.json";

function HomePage() {
  const location = useLocation();
  const [selectedJob, setSelectedJob] = useState(null); // State để lưu công việc đã được chọn

  // Khi HomePage được render, kiểm tra nếu có jobId trong location.state
  useEffect(() => {
    if (location.state?.jobId) {
      const jobId = location.state.jobId; // Lấy jobId từ state
      const job = jobs.jobs.find((job) => job.id === jobId); // Tìm công việc tương ứng trong jobs
      if (job) {
        setSelectedJob(job); // Cập nhật công việc đã chọn
      }
    }
  }, [location.state]);

  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "left",
        }}
      >
        {/* Nếu có công việc đã được chọn (selectedJob), hiển thị JobCard này */}
        {selectedJob && <JobCard job={selectedJob} />}

        {/* Render danh sách công việc từ jobs */}
        {jobs.jobs.slice(0, 5).map((job) => (
          <div key={job.id}>
            <JobCard job={job}></JobCard>
          </div>
        ))}
      </Box>
    </Container>
  );
}

export default HomePage;
