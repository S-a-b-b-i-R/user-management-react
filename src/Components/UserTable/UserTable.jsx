import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { useEffect, useState } from "react";
import "./table.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
const UserTable = () => {
    const [itemsPerPage, setItemsPerPage] = useState(2);
    const [currentPage, setCurrentPage] = useState(1);
    const [pages, setPages] = useState([]);

    const {
        data: users,
        isLoading,
        isError,
        error,
        refetch,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axios.get(
                `http://10.10.83.41:50/api/users/getAll?dataSource=json&pageNumber=${currentPage}&pageSize=${itemsPerPage}`
            );
            // console.log(response.data);
            return response.data;
        },
    });

    const { data: totalUsers, isLoading: totalUsersLoading } = useQuery({
        queryKey: ["totalusers"],
        queryFn: async () => {
            const response = await axios.get(
                `http://10.10.83.41:50/api/users/getAll?dataSource=json`
            );
            console.log(response.data);
            return response.data;
        },
    });
    useEffect(() => {
        const numberofPages = Math.ceil(7 / itemsPerPage);
        setPages([...Array(numberofPages).keys()]);
        console.log(pages);
        refetch();
    }, [itemsPerPage, currentPage, refetch, totalUsers]);

    if (isLoading || totalUsersLoading) return <Loading />;
    if (isError) return <Error error={error} />;

    const handleItemsPerPage = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(1);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextpage = () => {
        setCurrentPage(currentPage + 1);
        console.log(currentPage);
    };

    const handleDelete = (id) => {
        //delete the user from json file found in the public folder
        const newUsers = users.filter((user) => user.id !== id);
        axios
            .put("../../../public/generated_data.json", newUsers)
            .then((response) => {
                // console.log(response);
            })
            .catch((error) => {
                // console.log(error);
            });
    };
    return (
        <>
            <>
                <div className="overflow-x-auto space-y-5 mb-5">
                    <div className="flex justify-center">
                        <Link to="/createuser">
                            <Button text="Create New User"></Button>
                        </Link>
                    </div>
                    <table className="table w-full">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Website</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users?.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.company}</td>
                                    <td>{user.sex}</td>
                                    <td className="flex flex-col md:flex-row gap-2">
                                        <Link to={`/userdetail/${user.id}`}>
                                            <Button text="Edit" />
                                        </Link>
                                        <button
                                            className="btn bg-mainCol hover:bg-mainCol font-bold text-textCol"
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 1}
                            className="bg-mainCol p-2 rounded-md"
                        >
                            Previous
                        </button>
                        {pages.map((page) => (
                            <button
                                className={
                                    currentPage === page + 1
                                        ? "selected p-2"
                                        : "bg-gray-300 p-2"
                                }
                                onClick={() => setCurrentPage(page + 1)}
                                key={page - 1}
                            >
                                {page + 1}
                            </button>
                        ))}
                        <button
                            onClick={handleNextpage}
                            disabled={
                                currentPage - 1 === pages[pages.length - 1]
                            }
                            className="bg-mainCol p-2 rounded-md"
                        >
                            Next
                        </button>
                        <div className="flex items-center">
                            <select
                                value={itemsPerPage}
                                onChange={handleItemsPerPage}
                                className="w-32 lg:w-52 border-2 p-1"
                            >
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default UserTable;
