import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { useEffect, useState } from "react";
import "./table.css";
import Button from "../Button/Button";
import { Link } from "react-router-dom";
const UserTable = () => {
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(0);
    const [pages, setPages] = useState([]);
    const {
        data: users,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const response = await axios.get(
                "../../../public/generated_data.json"
            );
            return response.data;
        },
    });
    useEffect(() => {
        const pages = [];
        for (let i = 0; i < Math.ceil(users?.length / itemsPerPage); i++) {
            pages.push(i);
        }
        setPages(pages);
    }, [currentPage, itemsPerPage, users]);

    if (isLoading) return <Loading />;
    if (isError) return <Error error={error} />;

    const handleItemsPerPage = (e) => {
        setItemsPerPage(parseInt(e.target.value));
        setCurrentPage(0);
    };

    const handlePrevPage = () => {
        setCurrentPage(currentPage - 1);
    };

    const handleNextpage = () => {
        setCurrentPage(currentPage + 1);
    };
    return (
        <>
            <>
                <div className="overflow-x-auto">
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
                            {users
                                ?.slice(
                                    currentPage * itemsPerPage,
                                    currentPage * itemsPerPage + itemsPerPage
                                )
                                .map((user) => (
                                    <tr key={user.id}>
                                        <td>{user.firstName}</td>
                                        <td>{user.lastName}</td>
                                        <td>{user.company}</td>
                                        <td>{user.sex}</td>
                                        <td>
                                            <Link to={`/userdetail/${user.id}`}>
                                                <Button text="Edit" />
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                        </tbody>
                    </table>
                    <div className="pagination">
                        <button
                            onClick={handlePrevPage}
                            disabled={currentPage === 0}
                            className="bg-mainCol p-2 rounded-md"
                        >
                            Previous
                        </button>
                        {pages.map((page) => (
                            <button
                                className={
                                    currentPage === page
                                        ? "selected p-2"
                                        : "bg-gray-300 p-2"
                                }
                                onClick={() => setCurrentPage(page)}
                                key={page}
                            >
                                {page + 1}
                            </button>
                        ))}
                        <button
                            onClick={handleNextpage}
                            disabled={currentPage === pages[pages.length - 1]}
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
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                            </select>
                        </div>
                    </div>
                </div>
            </>
        </>
    );
};

export default UserTable;
