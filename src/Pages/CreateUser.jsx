import { useState } from "react";
import Button from "../Components/Button/Button";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { createUser } from "../API/api";
import Swal from "sweetalert2";

const CreateUser = () => {
    const [sex, setSex] = useState("");
    const [active, setActive] = useState("");

    const { mutateAsync } = useMutation({
        mutationFn: createUser,
    });

    const handelAddUser = async (e) => {
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
            id: 0,
            firstName,
            lastName,
            active: active === "Active" ? true : false,
            company,
            sex,
            contact: {
                id: 0,
                phone,
                address,
                city,
                country,
            },
            role: {
                id: 0,
                role,
            },
        };
        console.log(user);
        try {
            await mutateAsync(user);
            Swal.fire({
                title: "User Created",
                text: "Thank you for creating a new user",
                icon: "success",
            });
            e.target.reset();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="px-40">
            <div className=" mx-auto">
                <form onSubmit={handelAddUser} className="card-body">
                    <div className="flex gap-2">
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">First Name</span>
                            </label>
                            <input
                                type="fname"
                                placeholder="first name"
                                name="fname"
                                className="input input-bordered"
                                required
                            />
                        </div>
                        <div className="form-control w-1/2">
                            <label className="label">
                                <span className="label-text">Last Name</span>
                            </label>
                            <input
                                type="lname"
                                placeholder="last name"
                                name="lname"
                                className="input input-bordered"
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
                                defaultValue="Select Status"
                                onChange={(e) => {
                                    setActive(e.target.value);
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
                                defaultValue="Select Sex"
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
                        <Button type="submit" text="Create User" />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
