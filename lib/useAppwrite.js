import { useState, useEffect } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await fn(); // Call the passed function
            setData(response); // Set data
        } catch (error) {
            Alert.alert('Error', error.message); // Handle error
        } finally {
            setIsLoading(false); // Stop loading after fetch
        }
    };

    useEffect(() => {
        fetchData(); // Fetch data on component mount
    }, []); // Empty dependen

    const refetch = () => fetchData(); // Fix here

    return { data, isLoading, refetch };
};

export default useAppwrite;
