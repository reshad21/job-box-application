import React from 'react';
import { useSelector } from 'react-redux';
import JobCard from '../../components/reusable/JobCard';
import { useAppliedJobQuery } from '../../redux/features/job/jobApi';

const JobApplied = () => {
    const {user:{email}} = useSelector(state=>state.auth);
    const {data} = useAppliedJobQuery(email);
    console.log(data);
    return (
        <div>
            <div className='grid grid-cols-2 gap-5 p-5'>
                {data?.data?.map((job) => (
                    <JobCard jobData={job} />
                ))}
            </div>
        </div>
    );
};

export default JobApplied;