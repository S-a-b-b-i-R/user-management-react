import Button from "../Components/Button/Button";

const CreateUser = () => {
    const setSex = (e) => {
        console.log(e);
    };

    return (
        <div className="px-40">
            <div className=" mx-auto">
                <form className="card-body">
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
