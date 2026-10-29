import { useState } from 'react';
import { useEffect } from 'react';

const ReportPost = ({ postId }) => {
    const [reportReason, setReportReason] = useState('');
    const [reported, setReported] = useState(false);
    const [reasons, setReasons] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/report-reasons')
            .then(response => response.json())
            .then(data => {
                setReasons(data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleReport = async () => {
        try {
            await fetch(
                `http://localhost:3000/api/posts/${postId}/report`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        reason: reportReason
                    })
                }
            );

            alert('Post reported!');
            setReported(true);

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <>
            <select
                value={reportReason}
                onChange={(e) =>
                    setReportReason(e.target.value)
                }
            >
                {reasons.map(reason => (
                    <option
                        key={reason._id}
                        value={reason.reason}
                    >
                        {reason.reason}
                    </option>
                ))}
            </select>

            <button
                disabled={reported}
                onClick={handleReport}
            >
                {reported ? 'Reported' : 'Report'}
            </button>
        </>
    );
};

export default ReportPost;