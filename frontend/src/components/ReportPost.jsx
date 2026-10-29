import { useState } from 'react';

const ReportPost = ({ postId }) => {
    const [reportReason, setReportReason] = useState('');
    const [reported, setReported] = useState(false);

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
                <option value="">
                    Select reason
                </option>

                <option value="Spam">
                    Spam
                </option>

                <option value="Inappropriate Content">
                    Inappropriate Content
                </option>

                <option value="Harassment">
                    Harassment
                </option>

                <option value="Other">
                    Other
                </option>
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