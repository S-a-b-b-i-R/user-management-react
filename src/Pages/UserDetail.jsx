import { Link, useParams } from "react-router-dom";
import Loading from "../Components/Loading/Loading";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Button from "../Components/Button/Button";
import { useState } from "react";
import Swal from "sweetalert2";

const UserDetail = () => {
    const [sex, setSex] = useState("");
    const [active, setActive] = useState("");
    const params = useParams();

    const { data, isLoading, isError, error, refetch } = useQuery({
        queryKey: ["user", params.id],
        queryFn: async () => {
            const response = await axios.get(
                `http://10.10.83.41:50/api/users/getById?id=${params.id}`
            );
            return response.data;
        },
    });

    if (isLoading) return <Loading />;

    console.log(data);

    const handleActiveChange = (value) => {
        setActive(value);
    };

    const handleSexChange = (value) => {
        setSex(value);
    };

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        const firstName = e.target.fname.value;
        const lastName = e.target.lname.value;
        const phone = e.target.phone.value;
        const address = e.target.address.value;
        const city = e.target.city.value;
        const country = e.target.country.value;
        const role = e.target.role.value;
        const company = e.target.company.value;
        const user = {
            id: data.id,
            firstName,
            lastName,
            active: active === "Active" ? true : false,
            company,
            sex,
            contact: {
                id: data.contact.id,
                phone,
                address,
                city,
                country,
            },
            role: {
                id: data.role.id,
                role,
            },
        };
        console.log(user);
        try {
            await fetch(`http://10.10.83.153:50/api/users/update`, {
                method: "PUT",
                // headers: {
                //     "Content-Type": "application/json",
                // },
                body: user,
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data) {
                        Swal.fire({
                            title: "User Updated",
                            text: "Thank you for Updating the user",
                            icon: "success",
                        });
                        refetch();
                    } else {
                        Swal.fire({
                            title: "Error",
                            text: "There was an error while updating the user",
                            icon: "error",
                        });
                    }
                });
        } catch (error) {
            Swal.fire({
                title: "Error",
                text: "There was an error while updating the user",
                icon: "error",
            });
        }
    };

    return (
        <div>
            <form onSubmit={handleUpdateProfile} className="card-body">
                {/* go back button */}
                <Link className="flex justify-center" to="/json">
                    <Button text="Go Back" />
                </Link>
                <div className="flex gap-2 items-start">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input
                            type="name"
                            placeholder="fname"
                            name="fname"
                            className="input input-bordered"
                            defaultValue={data.firstName}
                            required
                        />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input
                            type="name"
                            placeholder="lname"
                            name="lname"
                            className="input input-bordered"
                            defaultValue={data.lastName}
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            type="phone"
                            placeholder="phone number"
                            name="phone"
                            className="input input-bordered"
                            defaultValue={data.contact.phone}
                            required
                        />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Address</span>
                        </label>
                        <input
                            type="address"
                            placeholder="address"
                            name="address"
                            className="input input-bordered"
                            defaultValue={data.contact.address}
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">City</span>
                        </label>
                        <input
                            type="city"
                            placeholder="city"
                            name="city"
                            className="input input-bordered"
                            defaultValue={data.contact.city}
                            required
                        />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Country</span>
                        </label>
                        <input
                            type="conutry"
                            placeholder="country"
                            name="country"
                            className="input input-bordered"
                            defaultValue={data.contact.country}
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Company</span>
                        </label>
                        <input
                            type="company"
                            placeholder="company"
                            name="company"
                            className="input input-bordered"
                            defaultValue={data.company}
                            required
                        />
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <input
                            type="role"
                            placeholder="role"
                            name="role"
                            className="input input-bordered"
                            defaultValue={data.role.name}
                            required
                        />
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Active</span>
                        </label>
                        <select
                            className="border border-slate-300 p-3 rounded-lg"
                            value={data.active ? "Active" : "Inactive"}
                            onChange={(e) => {
                                handleActiveChange(e.target.value);
                            }}
                        >
                            <option disabled>Select Status</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                        </select>
                    </div>
                    <div className="form-control w-1/2">
                        <label className="label">
                            <span className="label-text">Sex</span>
                        </label>
                        <select
                            className="border border-slate-300 p-3 rounded-lg"
                            value={data.sex === "M" ? "M" : "F"}
                            onChange={(e) => {
                                handleSexChange(e.target.value);
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
