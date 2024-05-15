import React from 'react';

const Loading = () => {
    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="animate-spin rounded-full h-24 w-24 border-t-2 border-b-2 border-black"></div>
        </div>
    );
};

export default Loading;
