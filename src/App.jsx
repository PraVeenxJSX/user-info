import React, { useEffect, useState } from 'react';
import './App.css'; 

const APIurl = "https://jsonplaceholder.typicode.com/photos";

const JsonPlaceholder = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ status: false, msg: "" });

    const fetchData = async (APIurl) => {
        setLoading(true);
        setError({ status: false, msg: "" });
        try {
            const response = await fetch(APIurl);
            const data = await response.json();
            setData(data);
            setLoading(false);
            setError({ status: false, msg: "" });
        } catch (error) {
            setLoading(false);
            setError({ status: true, msg: "Something went wrong" });
        }
    };

    useEffect(() => {
        fetchData(APIurl);
    }, []);

    if (loading) {
        return <div className="loading"><h2>Loading...</h2></div>;
    }

    if (error?.status) {
        return <div className="error"><h2>{error.msg}</h2></div>;
    }

    return (
        <ul className="list-container">
            {data.slice(0, 50).map((user) => { // Limiting to 50 items for better performance
                const { id, title, url, thumbnailUrl } = user;
                return (
                    <li key={id} className="list-item">
                        <img src={thumbnailUrl} alt={title} className="thumbnail" />
                        <div className="item-info">
                            <h3>{title}</h3>
                            <a href={url} target="_blank" rel="noopener noreferrer" className="image-link">View Image</a>
                        </div>
                    </li>
                );
            })}
        </ul>
    );
};

export default JsonPlaceholder;
