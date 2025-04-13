import React from 'react';

interface ErrorViewProps {
    error: string;
}

const ErrorView: React.FC<ErrorViewProps> = ({ error }) => {
    return (
        <div className="text-center mt-5 text-red-500">
            <h1 className="text-2xl font-bold">Error</h1>
            <p>{error}</p>
        </div>
    );
};

export default ErrorView;