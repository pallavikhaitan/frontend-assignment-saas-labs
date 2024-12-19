export const fetchData = async () => {
    const response = await fetch(
        "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
    );
    const data = await response.json();
    return data;
};