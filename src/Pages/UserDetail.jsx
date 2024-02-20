import { useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Button from "../Components/Button/Button";

const UserDetail = () => {
    const [sex, setSex] = useState("");
    const [user, setUser] = useState(null);
    const params = useParams();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["user", params.id],
        queryFn: async () => {
            const response = await axios.get(
                "../../../public/generated_data.json"
            );
            return response.data.filter(
                (user) => user.id === parseInt(params.id)
            );
        },
    });

    if (isLoading) return <Loading />;

    console.log(data);

    const handleUpdateProfile = async (e) => {
        console.log(e);
    };

    return (
        <div>
            <form onSubmit={handleUpdateProfile} className="card-body">
                <div className="flex gap-2 items-start">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input
                            type="name"
                            placeholder="name"
                            name="name"
                            className="input input-bordered"
                            defaultValue={data[0].firstName}
                            required
                        />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input
                            type="name"
                            placeholder="name"
                            name="name"
                            className="input input-bordered"
                            defaultValue={data[0].lastName}
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-2 items-start">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Company</span>
                        </label>
                        <input
                            type="name"
                            placeholder="name"
                            name="name"
                            className="input input-bordered"
                            defaultValue={data[0].company}
                            required
                        />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Blood Group</span>
                        </label>
                        <select
                            className="border border-slate-300 p-3 rounded-lg"
                            defaultValue={
                                data[0].sex ? data[0].sex : "Select Sex"
                            }
                            onChange={(e) => {
                                setSex(e.target.value);
                            }}
                        >
                            <option disabled>Select Sex</option>
                            <option value="M">Male</option>
                            <option value="F">Female</option>
                        </select>
                    </div>
                </div>

                <div className="form-control mt-6">
                    <Button type="submit" text="Update Profile" />
                </div>
            </form>
        </div>
    );
};

export default UserDetail;
