import React from 'react';
import { useSelector } from 'react-redux';
import JobCard from '../components/reusable/JobCard';
import Loading from '../components/reusable/Loading';
import { useSearchQuery } from '../redux/features/job/jobApi';

const SearchData = () => {
    const { searchValue } = useSelector((state) => state.auth);
    const { data, isLoading } = useSearchQuery(searchValue);

    if (isLoading) {
        return <Loading></Loading>;
    }


    return (
        <div>
            <div className='pt-14 max-w-7xl mx-auto'>
                <div className='bg-primary/10 p-5 rounded-2xl'>
                    <h1 className='font-semibold text-xl'>Find Jobs</h1>
                </div>
                <div className='grid grid-cols-2 gap-5 mt-5'>
                    {
                        (data?.length === 0) ?
                            <p>No Jobs Found in this  keyword</p>
                            :
                            data?.data.map(jobData => <JobCard key={jobData._id} jobData={jobData} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default SearchData;