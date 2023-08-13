import React, { useEffect } from "react";
import JobCard from "../components/reusable/JobCard";
import { useGetJobsQuery } from "../redux/features/job/jobApi";

const Jobs = () => {
  const { data, isLoading, isError } = useGetJobsQuery();
  useEffect(() => {
    if (isLoading && isError) {
      return <p>Loading...</p>
    }
  }, [isLoading, isError])
  return (
    <div className='pt-14 max-w-7xl mx-auto'>
      <div className='bg-primary/10 p-5 rounded-2xl'>
        <h1 className='font-semibold text-xl'>Find Jobs</h1>
      </div>
      <div className='grid grid-cols-2 gap-5 mt-5'>
        {
          data?.data.map(jobData => <JobCard key={jobData._id} jobData={jobData} />)
        }
      </div>
    </div>
  );
};

export default Jobs;
