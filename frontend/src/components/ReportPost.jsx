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
                style={styles.select}
                value={reportReason}
                onChange={(e) =>
                    setReportReason(e.target.value)
                }
            >
                <option value="">
                    Select Reason
                </option>

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
                style={
                    reported
                    ? styles.disabledButton
                    : styles.button
                }
                disabled={reported}
                onClick={handleReport}
            >
                {reported
                    ? 'Reported'
                    : 'Report Post'}
            </button>
        </>
    );
};

const styles = {
    select: {
        padding: '8px',
        borderRadius: '10px',
        border: '1px solid #d6c4b2',
        marginRight: '10px',
        backgroundColor: '#fffaf2'
    },

    button: {
        backgroundColor: '#b23a48',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '8px 14px',
        cursor: 'pointer'
    },

    disabledButton: {
        backgroundColor: '#999',
        color: 'white',
        border: 'none',
        borderRadius: '10px',
        padding: '8px 14px',
        cursor: 'not-allowed'
    }
};

export default ReportPost;