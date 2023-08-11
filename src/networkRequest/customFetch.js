function customFetch(url,body)
{
    const token=localStorage.getItem('token');
    return(fetch(url,{
            method: "POST",
            mode:'cors',
            body: JSON.stringify({token:token,...body}),
            headers: {
            "Content-Type": "application/json"
            }
        }
    ));
}
export default customFetch;